#!/usr/bin/env node
// Ping IndexNow (Bing, Yandex, Naver, Seznam) with the full DocShift URL list.
//
// MANUAL ONLY — never wire this into postbuild, CI or a deploy hook. It would
// fire on every preview deploy and burn the quota.
//
//   npm run indexnow -- --dry-run   # print the payload, send nothing
//   npm run indexnow                # actually submit
//
// No dependencies: Node's built-in fetch and fs only.

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'www.docshift.tech';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, '..', 'public');

// tools.js uses ESM syntax but the package is CJS, so it cannot be imported
// here. Read the slugs out directly — one source of truth, no duplicated list.
function toolSlugs() {
    const src = readFileSync(join(here, '..', 'src', 'utils', 'tools.js'), 'utf8');
    const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
    if (slugs.length === 0) throw new Error('No tool slugs found in src/utils/tools.js');
    return slugs;
}

// The key file is public/<key>.txt whose contents equal its own filename.
function indexNowKey() {
    const candidates = readdirSync(publicDir).filter((f) => /^[a-f0-9]{32,64}\.txt$/.test(f));
    if (candidates.length !== 1) {
        throw new Error(`Expected exactly one IndexNow key file in public/, found ${candidates.length}`);
    }
    const file = candidates[0];
    const key = file.replace(/\.txt$/, '');
    const contents = readFileSync(join(publicDir, file), 'utf8').trim();
    if (contents !== key) {
        throw new Error(`Key file ${file} must contain exactly "${key}", found "${contents}"`);
    }
    return key;
}

const urlList = [
    ORIGIN,
    ...toolSlugs().map((slug) => `${ORIGIN}/tool/${slug}`),
    `${ORIGIN}/about`,
    `${ORIGIN}/contact`,
    `${ORIGIN}/privacy`,
    `${ORIGIN}/terms`,
];

const key = indexNowKey();
const payload = { host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList };

const dryRun = process.argv.includes('--dry-run');

for (const url of urlList) console.log(url);
console.log(`\n${urlList.length} URLs · key ${key} · keyLocation ${payload.keyLocation}`);

if (dryRun) {
    console.log('\n--dry-run: nothing sent.');
    process.exit(0);
}

const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
});

console.log(`\nIndexNow responded ${res.status} ${res.statusText}`);
if (!res.ok) {
    console.error(await res.text());
    process.exit(1);
}
