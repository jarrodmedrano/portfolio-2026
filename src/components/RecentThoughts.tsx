'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface Post {
  uri: string;
  text: string;
  createdAt: string;
  author: string;
}

const CONFIG = {
  MAX_POSTS: 3,
  MS_PER_DAY: 1000 * 60 * 60 * 24,
  BLUESKY_PROFILE: 'https://bsky.app/profile/jarrodmedrano.bsky.social',
  API_ENDPOINT: '/api/bluesky',
} as const;

export default function RecentThoughts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(CONFIG.API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts.slice(0, CONFIG.MAX_POSTS));
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / CONFIG.MS_PER_DAY);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getBlueSkyUrl = (uri: string) => {
    // Convert at:// URI to web URL
    const parts = uri.replace('at://', '').split('/');
    return `https://bsky.app/profile/${parts[0]}/post/${parts[2]}`;
  };

  return (
    <section id="thoughts" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Recent Thoughts
          </h2>
          <div className="w-full h-px bg-black" aria-hidden="true" />
        </div>

        {loading && (
          <p className="text-gray-600 text-center">Loading posts...</p>
        )}

        {error && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Unable to load posts at this time.
            </p>
            <a
              href={CONFIG.BLUESKY_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline hover:text-gray-700"
            >
              Follow me on BlueSky →
            </a>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.a
                key={post.uri}
                href={getBlueSkyUrl(post.uri)}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 p-6 transition-colors hover:border-gray-400 cursor-pointer"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-base text-gray-900 leading-relaxed mb-3">
                  {post.text}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(post.createdAt)}
                  {' '}
                  • View on BlueSky →
                </p>
              </motion.a>
            ))}

            <div className="text-center mt-8">
              <a
                href={CONFIG.BLUESKY_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline hover:text-gray-700"
              >
                Follow me on BlueSky →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
