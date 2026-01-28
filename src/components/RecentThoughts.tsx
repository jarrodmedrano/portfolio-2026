'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import GoldenGrid from './GoldenGrid';

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
    <section id="thoughts" className="py-32 relative bg-bg-surface">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-text-primary/5" />

      <div className="golden-container">
        <GoldenGrid
          main={(
            <div className="space-y-16">
              <div className="space-y-4">
                <span className="text-accent-gold dark:text-orange-300/60 uppercase tracking-[0.2em] text-xs font-semibold">
                  Journal
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary font-display">
                  Recent
                  {' '}
                  <span className="text-text-secondary">Thoughts</span>
                </h2>
                <div className="w-16 h-1 bg-accent-gold/20 dark:bg-orange-500/20" />
              </div>

              <div className="relative border-l border-text-primary/10 ml-3 md:ml-6 space-y-12 pb-12">
                {loading && (
                <p className="text-text-tertiary pl-8">Accessing stream...</p>
                )}

                {error && (
                <div className="pl-8">
                  <p className="text-text-tertiary mb-2">Connection unstable.</p>
                  <a href={CONFIG.BLUESKY_PROFILE} className="text-accent-gold dark:text-orange-300 underline text-sm">View on BlueSky</a>
                </div>
                )}

                {!loading && !error && posts.map((post, index) => (
                  <motion.div
                    key={post.uri}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="pl-8 relative group"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full bg-text-primary/20 border-2 border-bg-surface group-hover:bg-accent-gold dark:group-hover:bg-orange-400 group-hover:scale-125 transition-all duration-300" />

                    <a
                      href={getBlueSkyUrl(post.uri)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 rounded-lg bg-bg-elevated/50 dark:bg-white/5 border border-text-primary/5 dark:border-white/5 hover:border-accent-gold/30 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1"
                    >
                      <p className="text-lg text-text-secondary leading-relaxed mb-4 group-hover:text-text-primary transition-colors">
                        &ldquo;
                        {post.text}
                        &rdquo;
                      </p>
                      <div className="flex items-center gap-2 text-xs text-text-tertiary font-mono uppercase tracking-wide">
                        <span className="text-accent-gold dark:text-orange-400/80">{formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span className="group-hover:text-accent-gold dark:group-hover:text-orange-300 transition-colors">Read Context →</span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="text-center md:text-left md:pl-14">
                <a
                  href={CONFIG.BLUESKY_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors uppercase tracking-widest font-semibold"
                >
                  Follow on BlueSky
                  {' '}
                  <span className="text-accent-gold dark:text-orange-400">→</span>
                </a>
              </div>
            </div>
              )}
        />
      </div>
    </section>
  );
}
