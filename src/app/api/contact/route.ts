import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  honeypot: z.string().optional(),
});

// Simple rate limiting using in-memory store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests
const RATE_WINDOW = 60 * 60 * 1000; // per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.ip ?? 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json(
        { message: 'Thank you for your message!' },
        { status: 200 },
      );
    }

    // Validate data
    const validatedData = contactSchema.parse(body);

    // Store in database
    await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        projectType: validatedData.projectType,
        message: validatedData.message,
        budget: validatedData.budget,
      },
    });

    return NextResponse.json(
      { message: 'Thank you for your message! I will get back to you soon.' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 },
      );
    }

    // eslint-disable-next-line no-console
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}
