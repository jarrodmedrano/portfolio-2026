import { NextResponse } from 'next/server';

const CONFIG = {
  HANDLE: 'jarrodmedrano.bsky.social',
  POST_LIMIT: 5,
  CACHE_DURATION: 300, // 5 minutes
} as const;

interface BlueSkyPost {
  post: {
    uri: string;
    record: {
      text: string;
      createdAt: string;
    };
    author: {
      handle: string;
    };
  };
}

interface BlueSkyResponse {
  feed: BlueSkyPost[];
}

export async function GET() {
  try {
    // BlueSky API endpoint for fetching posts
    const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${CONFIG.HANDLE}&limit=${CONFIG.POST_LIMIT}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: CONFIG.CACHE_DURATION },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch BlueSky posts');
    }

    const data = (await response.json()) as BlueSkyResponse;

    // Extract and format posts
    const posts = data.feed.map((item: BlueSkyPost) => ({
      uri: item.post.uri,
      text: item.post.record.text,
      createdAt: item.post.record.createdAt,
      author: item.post.author.handle,
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('BlueSky API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: errorMessage },
      { status: 500 },
    );
  }
}
