import { TOOLS, CATEGORIES } from '@/utils/tools';

// Static Route Handler, not a public/ file — regenerates from TOOLS at every
// build so it can never drift from what the tool pages actually say.
export const dynamic = 'force-static';

const stripHtml = (s?: string) => (s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const HUB_PAGES = [
    {
        name: 'Convert PDF',
        url: 'https://www.docshift.tech/convert-pdf',
        desc: 'Hub linking all 10 PDF conversion tools (5 converting a PDF to another format, 5 converting another format to PDF), with guidance on which conversion to use.',
    },
    {
        name: 'Free PDF Tools',
        url: 'https://www.docshift.tech/free-pdf-tools',
        desc: 'What "free" means on DocShift in concrete terms — no account, no email, no watermark on output, no daily limit, no premium tier — with all 30 tools grouped by category.',
    },
    {
        name: 'PDF Security Guide',
        url: 'https://www.docshift.tech/pdf-security-guide',
        desc: 'Explains file retention on upload-based PDF tools, user vs. owner passwords, redaction vs. a visual black box, visible vs. certificate-based signatures, and PDF/A archiving.',
    },
    {
        name: 'iLovePDF Alternative',
        url: 'https://www.docshift.tech/alternatives/ilovepdf',
        desc: 'What DocShift offers for people looking for an iLovePDF alternative: no signup, no premium tier, files deleted after processing, plus an honest note on which tools are still being rebuilt.',
    },
    {
        name: 'Smallpdf Alternative',
        url: 'https://www.docshift.tech/alternatives/smallpdf',
        desc: 'What DocShift offers for people looking for a Smallpdf alternative: no signup, no premium tier, files deleted after processing, plus an honest note on which tools are still being rebuilt.',
    },
];

export async function GET() {
    const lines: string[] = [];

    lines.push('# DocShift — Full Site Content');
    lines.push('');
    lines.push('> Free PDF tools online. Merge, compress, convert, split, edit, sign, redact, OCR, and translate PDFs — files are deleted from our server right after processing. No signup, no tracking.');
    lines.push('');
    lines.push('DocShift is a privacy-first PDF toolkit. Your file is uploaded securely to process it, then deleted from our server immediately afterward — never stored, logged, or shared.');
    lines.push('');
    lines.push('This file lists the full content of every tool and guide page in one fetch. For a short index instead, see https://www.docshift.tech/llms.txt');
    lines.push('');
    lines.push('## Guides & Hubs');
    lines.push('');
    for (const hub of HUB_PAGES) {
        lines.push(`### ${hub.name}`);
        lines.push(hub.url);
        lines.push(hub.desc);
        lines.push('');
    }

    const categories = CATEGORIES.filter((c) => c.id !== 'all');
    for (const cat of categories) {
        const tools = TOOLS.filter((t) => t.category === cat.id);
        if (!tools.length) continue;

        lines.push(`## ${cat.label}`);
        lines.push('');

        for (const tool of tools) {
            lines.push(`### ${tool.name}`);
            lines.push(`https://www.docshift.tech/tool/${tool.slug}`);
            lines.push(tool.seoDesc || tool.shortDesc || '');
            lines.push('');

            if (tool.seoArticle) {
                lines.push(stripHtml(tool.seoArticle));
                lines.push('');
            }

            if (tool.steps && tool.steps.length) {
                lines.push('Steps:');
                tool.steps.forEach((s: string, i: number) => lines.push(`${i + 1}. ${stripHtml(s)}`));
                lines.push('');
            }

            if (tool.faqs && tool.faqs.length) {
                tool.faqs.forEach((f: { q: string; a: string }) => {
                    lines.push(`Q: ${f.q}`);
                    lines.push(`A: ${stripHtml(f.a)}`);
                });
                lines.push('');
            }
        }
    }

    const body = lines.join('\n');

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
