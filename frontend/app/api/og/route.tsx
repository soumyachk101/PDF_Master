import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'DocShift';
  const description = searchParams.get('desc') || 'Free & Private PDF Tools';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#e5e7eb',
          padding: '80px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            DocShift
          </div>
        </div>
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#000000',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#444444',
            lineHeight: 1.4,
            maxWidth: '800px',
          }}
        >
          {description}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '8px',
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
    {
      width: 1200,
      height: 630,
    },
  );
}
