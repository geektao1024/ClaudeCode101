import { NextRequest, NextResponse } from 'next/server';

import { getUserInfo } from '@/shared/models/user';

export async function GET(req: NextRequest) {
  const user = await getUserInfo();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse('Invalid url', { status: 400 });
  }

  if (parsed.protocol !== 'https:') {
    return new NextResponse('Only https allowed', { status: 400 });
  }

  // Block IP literals (v4/v6) and single-label hosts to defend against SSRF
  // against private ranges (10/8, 192.168/16, 172.16/12) and cloud metadata
  // endpoints (169.254.169.254). Requires hostname to be a multi-label name
  // with at least one alphabetic character.
  const hostname = parsed.hostname.toLowerCase();
  if (
    !/^[a-z0-9.-]+$/.test(hostname) ||
    !hostname.includes('.') ||
    !/[a-z]/.test(hostname)
  ) {
    return new NextResponse('Host not allowed', { status: 400 });
  }

  try {
    const response = await fetch(parsed.toString());

    if (!response.ok) {
      return new NextResponse(`Failed to fetch file: ${response.statusText}`, {
        status: response.status,
      });
    }

    const contentType =
      response.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
