import { ImageResponse } from 'next/og';
import { getToolBySlug, TOOLS } from '@/utils/tools';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/utils/ogTemplate';

export function generateStaticParams() {
    return TOOLS.map((tool) => ({ toolSlug: tool.slug }));
}

// Route segment config is per-file, so this does NOT inherit from page.jsx.
// Without it, /tool/<any-invalid-slug>/opengraph-image happily renders a
// generic card with HTTP 200 — the same unbounded soft-200 surface task 001
// closed for the page itself.
export const dynamicParams = false;

export const alt = 'DocShift – Free & Private PDF Tools';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ toolSlug: string }> }) {
    const { toolSlug } = await params;
    const tool = getToolBySlug(toolSlug);

    return new ImageResponse(
        <OgCard
            title={tool ? tool.name : 'DocShift'}
            description={tool ? tool.shortDesc : 'Free & Private PDF Tools'}
        />,
        size,
    );
}
