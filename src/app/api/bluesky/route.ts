import { NextResponse } from 'next/server';

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
    // Replace with actual BlueSky handle
    const handle = 'jarrodmedrano.bsky.social';
    const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${handle}&limit=5`;

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
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
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 },
    );
  }
}
