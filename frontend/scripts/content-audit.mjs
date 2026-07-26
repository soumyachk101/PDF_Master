#!/usr/bin/env node
// Reports each tool's unique word count (seoArticle + steps + faqs, HTML stripped).
// A ruler for tasks 012-017, not a linter — it only counts, it doesn't judge prose.
//
//   node scripts/content-audit.mjs           # default --min 400
//   node scripts/content-audit.mjs --min 300

import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const toolsPath = join(here, '..', 'src', 'utils', 'tools.js');

// tools.js uses `export const` in a package with no "type": "module", so a plain
// require() throws on the bare `export` keyword. Transform just that away and
// require the result as CommonJS.
const src = readFileSync(toolsPath, 'utf8');
const tmpFile = join(tmpdir(), `content-audit-${Date.now()}.cjs`);
writeFileSync(tmpFile, src.replace(/export const/g, 'const') + '\nmodule.exports = { TOOLS };\n');
const require = createRequire(import.meta.url);
const { TOOLS } = require(tmpFile);
unlinkSync(tmpFile);

const stripHtml = (s) => (s || '').replace(/<[^>]*>/g, ' ');
const wordCount = (s) => stripHtml(s).split(/\s+/).filter(Boolean).length;

const minIdx = process.argv.indexOf('--min');
const min = minIdx !== -1 ? parseInt(process.argv[minIdx + 1], 10) : 400;

let failing = 0;
let total = 0;
const rows = TOOLS.map((t) => {
    const stepsWords = (t.steps || []).reduce((n, s) => n + wordCount(s), 0);
    const faqWords = (t.faqs || []).reduce((n, f) => n + wordCount(f.q) + wordCount(f.a), 0);
    const articleWords = wordCount(t.seoArticle);
    const words = articleWords + stepsWords + faqWords;
    total += words;
    if (words < min) failing++;
    return { slug: t.slug, words, articleWords, stepsWords, faqWords };
});

rows.sort((a, b) => a.words - b.words);
for (const r of rows) {
    const flag = r.words < min ? 'FAIL' : 'ok  ';
    console.log(`${flag}  ${r.slug.padEnd(16)} ${String(r.words).padStart(4)}w  (article ${r.articleWords}, steps ${r.stepsWords}, faqs ${r.faqWords})`);
}

console.log(`\n${rows.length} tools, ${failing} below ${min} words. Total unique words: ${total}.`);
process.exit(failing > 0 ? 1 : 0);
