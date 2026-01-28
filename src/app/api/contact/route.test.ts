import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import type { Mock } from 'vitest';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as sendgrid from '@/lib/sendgrid';
import { POST } from './route';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    contactSubmission: {
      count: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// Mock SendGrid
vi.mock('@/lib/sendgrid', () => ({
  sendContactEmail: vi.fn(),
}));

const mockCount = prisma.contactSubmission.count as Mock;
const mockCreate = prisma.contactSubmission.create as Mock;
const mockSendContactEmail = sendgrid.sendContactEmail as Mock;

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    projectType: 'mvp',
    message: 'This is a test message that is long enough.',
  };

  it('returns success for valid submission', async () => {
    mockCount.mockResolvedValue(0);
    mockSendContactEmail.mockResolvedValue(undefined);
    mockCreate.mockResolvedValue({ id: '123' });

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(sendgrid.sendContactEmail).toHaveBeenCalledWith({
      name: validData.name,
      email: validData.email,
      projectType: validData.projectType,
      message: validData.message,
      budget: undefined,
    });
    expect(prisma.contactSubmission.create).toHaveBeenCalledWith({
      data: validData,
    });
  });

  it('rejects honeypot submissions', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validData, website: 'http://spam.com' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: 'Thank you for your message!' });
    expect(prisma.contactSubmission.create).not.toHaveBeenCalled();
  });

  it('enforces rate limiting (3 per hour)', async () => {
    mockCount.mockResolvedValue(3);

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toContain('Too many requests');
  });

  it('returns error when email fails to send', async () => {
    mockCount.mockResolvedValue(0);
    mockSendContactEmail.mockRejectedValue(new Error('SendGrid error'));

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain('Failed to send email notification');
    expect(prisma.contactSubmission.create).not.toHaveBeenCalled();
  });

  it('validates required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'J' }), // Missing fields
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid form data');
  });
});
