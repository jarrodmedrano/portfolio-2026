/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  website: z.string().optional(), // Honeypot field
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
  'idle' | 'loading' | 'success' | 'error'
  >('idle');

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
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Let&apos;s Talk</h2>
          <div className="w-full h-px bg-black" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <div className="border-b border-black pb-2 mb-4">
              <h3 className="text-2xl font-semibold text-black">
                Currently Available
              </h3>
            </div>

            <p className="text-base text-gray-700 leading-normal mb-4">
              Taking on new projects starting March 2026.
            </p>

            <div className="space-y-2 text-base text-gray-700 mb-6">
              <p>Response time: Within 24 hours</p>
              <p>Location: Austin, TX (Remote work available)</p>
            </div>

            <div className="space-y-2">
              <a
                href="mailto:jarrod@jarrodmedrano.com"
                className="block text-black underline hover:text-gray-700"
              >
                jarrod@jarrodmedrano.com
              </a>
              <a
                href="https://github.com/jarrodmedrano"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline hover:text-gray-700"
              >
                GitHub →
              </a>
              <a
                href="https://bsky.app/profile/jarrodmedrano.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline hover:text-gray-700"
              >
                BlueSky →
              </a>
              <a
                href="https://www.linkedin.com/in/jarrod-medrano-b89b0037"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-black underline hover:text-gray-700"
              >
                LinkedIn →
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              ...fadeInUp,
              transition: {
                ...fadeInUp.transition,
                delay: 0.1,
              },
            }}
          >
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className={`input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-error-500 font-medium mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs text-error-500 font-medium mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Project Type */}
              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Project Type
                </label>
                <select
                  {...register('projectType')}
                  id="projectType"
                  className={`input ${
                    errors.projectType ? 'input-error' : ''
                  }`}
                >
                  <option value="">Select...</option>
                  <option value="mvp">MVP Development</option>
                  <option value="production">Production App</option>
                  <option value="consulting">Consulting</option>
                  <option value="not-sure">Not Sure</option>
                </select>
                {errors.projectType && (
                  <p className="text-xs text-error-500 font-medium mt-1">
                    {errors.projectType.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  className={`input resize-y ${
                    errors.message ? 'input-error' : ''
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-error-500 font-medium mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Budget Range (Optional)
                </label>
                <select {...register('budget')} id="budget" className="input">
                  <option value="">Select...</option>
                  <option value="<10k">&lt;$10k</option>
                  <option value="10k-25k">$10k-25k</option>
                  <option value="25k-50k">$25k-50k</option>
                  <option value="50k+">$50k+</option>
                  <option value="hourly">Hourly/Retainer</option>
                </select>
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="btn-primary w-full md:w-auto"
              >
                {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <p className="text-sm text-success-500 font-medium">
                  Message sent! I&apos;ll get back to you within 24 hours.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm text-error-500 font-medium">
                  Failed to send message. Please try again or email me directly.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
