/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you for your message!',
        });
        reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          {...register('honeypot')}
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
          }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Name field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 bg-black border ${
              errors.name ? 'border-red-500' : 'border-white/20'
            } text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 bg-black border ${
              errors.email ? 'border-red-500' : 'border-white/20'
            } text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Project Type field */}
        <div>
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-white mb-2"
          >
            Project Type
          </label>
          <select
            id="projectType"
            {...register('projectType')}
            className={`w-full px-4 py-3 bg-black border ${
              errors.projectType ? 'border-red-500' : 'border-white/20'
            } text-white focus:outline-none focus:border-white transition-colors`}
          >
            <option value="">Select a project type</option>
            <option value="web-app">Web Application</option>
            <option value="mobile-app">Mobile App</option>
            <option value="website">Website</option>
            <option value="ecommerce">E-commerce</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
          {errors.projectType && (
            <p className="mt-1 text-sm text-red-500">
              {errors.projectType.message}
            </p>
          )}
        </div>

        {/* Budget field (optional) */}
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-white mb-2"
          >
            Budget (Optional)
          </label>
          <select
            id="budget"
            {...register('budget')}
            className="w-full px-4 py-3 bg-black border border-white/20 text-white focus:outline-none focus:border-white transition-colors"
          >
            <option value="">Select a budget range</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k-50k">$25,000 - $50,000</option>
            <option value="50k-plus">$50,000+</option>
          </select>
        </div>

        {/* Message field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-white mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={6}
            className={`w-full px-4 py-3 bg-black border ${
              errors.message ? 'border-red-500' : 'border-white/20'
            } text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors resize-none`}
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {/* Status messages */}
        {submitStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 border ${
              submitStatus.type === 'success'
                ? 'border-green-500 text-green-500'
                : 'border-red-500 text-red-500'
            }`}
          >
            {submitStatus.message}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
