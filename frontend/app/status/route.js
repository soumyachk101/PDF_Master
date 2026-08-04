import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        service: 'DocShift Frontend Status',
        message: 'Frontend Next.js application status is healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        uptime: Math.floor(process.uptime()),
    }, {
        headers: {
            'Cache-Control': 'no-store, max-age=0',
        }
    });
}
