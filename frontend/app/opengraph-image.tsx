import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/utils/ogTemplate';

export const alt = 'DocShift – Free PDF Tools that never upload your files';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
    return new ImageResponse(
        <OgCard
            title="Free PDF Tools Online"
            description="Merge, compress and convert PDFs in your browser. No uploads, 100% private."
        />,
        size,
    );
}
