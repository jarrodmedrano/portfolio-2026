/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import GoldenGrid from './GoldenGrid';
import LiquidButton from './LiquidButton';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Valid email is required'),
  projectType: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  website: z.string().optional(), // Honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
  'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const isSubmitting = submitStatus === 'loading';
  const isSuccess = submitStatus === 'success';
  const isError = submitStatus === 'error';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-bg-deep overflow-hidden">
      {/* Decorative glowing orb */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="golden-container relative z-10">
        <GoldenGrid
          main={(
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-accent-primary uppercase tracking-[0.2em] text-xs font-semibold">
                  Get in Touch
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary font-display">
                  Start a
                  {' '}
                  <span className="text-text-secondary">Conversation</span>
                </h2>
                <div className="w-16 h-1 bg-accent-primary/20" />
              </div>

              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="space-y-8 max-w-2xl"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      placeholder=" "
                      className={`peer w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder-transparent focus:outline-none focus:border-accent-primary/80 transition-colors ${errors.name ? 'border-red-500' : ''}`}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-3 text-text-tertiary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-tertiary cursor-text"
                    >
                      Name
                    </label>
                    {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
                  </div>

                  <div className="relative group">
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      placeholder=" "
                      className={`peer w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder-transparent focus:outline-none focus:border-accent-primary/80 transition-colors ${errors.email ? 'border-red-500' : ''}`}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-3 text-text-tertiary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-tertiary cursor-text"
                    >
                      Email
                    </label>
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <select
                      {...register('projectType')}
                      id="projectType"
                      className="peer w-full bg-transparent border-b border-border-subtle py-3 text-text-primary focus:outline-none focus:border-accent-primary/80 transition-colors appearance-none"
                    >
                      <option value="" className="bg-bg-elevated text-text-tertiary">Select Type</option>
                      <option value="mvp" className="bg-bg-elevated">MVP Development</option>
                      <option value="production" className="bg-bg-elevated">Production App</option>
                      <option value="consulting" className="bg-bg-elevated">Consulting</option>
                      <option value="not-sure" className="bg-bg-elevated">Not Sure</option>
                    </select>
                    <label htmlFor="projectType" className="absolute left-0 -top-4 text-xs text-text-tertiary">Interest</label>
                    {errors.projectType && <span className="text-xs text-red-500 mt-1 block">{errors.projectType.message}</span>}
                  </div>

                  <div className="relative group">
                    <select
                      {...register('budget')}
                      id="budget"
                      className="peer w-full bg-transparent border-b border-border-subtle py-3 text-text-primary focus:outline-none focus:border-accent-primary/80 transition-colors appearance-none"
                    >
                      <option value="" className="bg-bg-elevated text-text-tertiary">Select Range</option>
                      <option value="<10k" className="bg-bg-elevated">&lt;$10k</option>
                      <option value="10k-25k" className="bg-bg-elevated">$10k-25k</option>
                      <option value="25k-50k" className="bg-bg-elevated">$25k-50k</option>
                      <option value="50k+" className="bg-bg-elevated">$50k+</option>
                      <option value="hourly" className="bg-bg-elevated">Hourly/Retainer</option>
                    </select>
                    <label htmlFor="budget" className="absolute left-0 -top-4 text-xs text-text-tertiary">Budget</label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={4}
                    placeholder=" "
                    className={`peer w-full bg-transparent border-b border-border-subtle py-3 text-text-primary placeholder-transparent focus:outline-none focus:border-accent-primary/80 transition-colors resize-none ${errors.message ? 'border-red-500' : ''}`}
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-3 text-text-tertiary text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-primary peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-tertiary cursor-text"
                  >
                    Tell me about your project...
                  </label>
                  {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message.message}</span>}
                </div>

                {/* Honeypot */}
                <input
                  {...register('website')}
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <LiquidButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-text-primary border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Transmission'
                  )}
                </LiquidButton>

                {/* Status Messages */}
                {isSuccess && (
                <p className="text-sm text-green-400 font-medium animate-pulse">
                  Message received. Stand by for response.
                </p>
                )}
                {isError && (
                <p className="text-sm text-red-400 font-medium">
                  Transmission failed. Please attempt direct contact.
                </p>
                )}
              </motion.form>
            </div>
              )}
          sidebar={(
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="mt-16 lg:mt-32 space-y-12"
            >
              <div>
                <h3 className="text-sm uppercase tracking-widest text-text-tertiary mb-6 font-semibold">
                  Coordinates
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-text-primary text-lg">Austin, TX</p>
                    <p className="text-text-secondary text-sm">Remote Capable</p>
                  </div>
                  <div>
                    <p className="text-text-primary text-lg">Response Time</p>
                    <p className="text-text-secondary text-sm">Within 24 Hours</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-widest text-text-tertiary mb-6 font-semibold">
                  Connect
                </h3>
                <div className="flex flex-col gap-4 items-start">
                  <a
                    href="mailto:jarrod@jarrodmedrano.com"
                    className="text-text-secondary hover:text-text-primary transition-colors hover:translate-x-1 duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-accent-primary rounded-full" />
                    jarrod@jarrodmedrano.com
                  </a>
                  <a
                    href="https://github.com/jarrodmedrano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors hover:translate-x-1 duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-accent-primary rounded-full" />
                    GitHub
                  </a>
                  <a
                    href="https://bsky.app/profile/jarrodmedrano.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors hover:translate-x-1 duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-accent-primary rounded-full" />
                    BlueSky
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jarrod-medrano-b89b0037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-text-primary transition-colors hover:translate-x-1 duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-accent-primary rounded-full" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
              )}
        />
      </div>
    </section>
  );
}
