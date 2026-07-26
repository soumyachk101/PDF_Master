import { ImageResponse } from 'next/og';

// iOS ignores SVG in the apple-touch-icon slot, so this must be a real PNG.
// Composition differs from the 1200x630 OG card (a landscape layout is
// unreadable at 180px) but the palette and wordmark are the same: #e5e7eb
// field, black block, white uppercase mark, six-colour bar.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e5e7eb',
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        width: '132px',
                        height: '132px',
                        fontSize: '22px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                    }}
                >
                    DocShift
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '6px',
                        display: 'flex',
                    }}
                >
                    <div style={{ flex: 1, backgroundColor: '#ff0000' }} />
                    <div style={{ flex: 1, backgroundColor: '#00ff00' }} />
                    <div style={{ flex: 1, backgroundColor: '#0000ff' }} />
                    <div style={{ flex: 1, backgroundColor: '#ffff00' }} />
                    <div style={{ flex: 1, backgroundColor: '#ff00ff' }} />
                    <div style={{ flex: 1, backgroundColor: '#00ffff' }} />
                </div>
            </div>
        ),
        size,
    );
}
