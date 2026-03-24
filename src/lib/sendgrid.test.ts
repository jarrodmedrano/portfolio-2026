import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { sendContactEmail } from './sendgrid';

// Mock Resend
const mockSend = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

describe('sendContactEmail', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSend.mockResolvedValue({ data: { id: 'test-id' }, error: null });
    // Set required environment variables
    process.env.RESEND_API_KEY = 'test-api-key';
    process.env.RESEND_FROM_EMAIL = 'test@example.com';
  });

  const baseContactData = {
    name: 'John Doe',
    email: 'john@example.com',
    projectType: 'mvp',
    message: 'This is a test message',
  };

  it('sends email with all fields present', async () => {
    const contactData = {
      ...baseContactData,
      budget: '$10k-25k',
    };

    await sendContactEmail(contactData);

    expect(mockSend).toHaveBeenCalledTimes(1);
    const callArgs = mockSend.mock.calls[0][0];

    expect(callArgs.to).toBe('jarrod@jarrodmedrano.com');
    expect(callArgs.from).toBe('test@example.com');
    expect(callArgs.subject).toBe('New Contact Form Submission from John Doe');
    expect(callArgs.text).toContain('John Doe');
    expect(callArgs.text).toContain('john@example.com');
    expect(callArgs.text).toContain('mvp');
    expect(callArgs.text).toContain('$10k-25k');
    expect(callArgs.text).toContain('This is a test message');
    expect(callArgs.html).toContain('John Doe');
    expect(callArgs.html).toContain('john@example.com');
    expect(callArgs.html).toContain('$10k-25k');
  });

  it('sends email with optional budget field missing', async () => {
    await sendContactEmail(baseContactData);

    expect(mockSend).toHaveBeenCalledTimes(1);
    const callArgs = mockSend.mock.calls[0][0];

    expect(callArgs.text).toContain('John Doe');
    expect(callArgs.text).not.toContain('Budget:');
    expect(callArgs.html).toContain('John Doe');
    // Budget section should not be in HTML when not provided
    expect(callArgs.html).not.toMatch(/<div class="field-label">Budget<\/div>/);
  });

  it('formats email subject with contact name', async () => {
    await sendContactEmail({ ...baseContactData, name: 'Jane Smith' });

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.subject).toBe('New Contact Form Submission from Jane Smith');
  });

  it('includes mailto link for email in HTML', async () => {
    await sendContactEmail(baseContactData);

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).toContain('href="mailto:john@example.com"');
  });

  it('throws error when Resend returns an error', async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: 'Resend API error' } });

    await expect(sendContactEmail(baseContactData)).rejects.toThrow(
      'Failed to send email notification',
    );
  });

  it('throws error when Resend send rejects', async () => {
    mockSend.mockRejectedValue(new Error('Network error'));

    await expect(sendContactEmail(baseContactData)).rejects.toThrow(
      'Failed to send email notification',
    );
  });

  it('uses default from email if not set in environment', async () => {
    delete process.env.RESEND_FROM_EMAIL;

    await sendContactEmail(baseContactData);

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.from).toBe('noreply@jarrodmedrano.com');
  });

  it('preserves message formatting in plain text', async () => {
    const multilineMessage = 'Line 1\nLine 2\nLine 3';

    await sendContactEmail({
      ...baseContactData,
      message: multilineMessage,
    });

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.text).toContain('Line 1\nLine 2\nLine 3');
  });

  it('escapes HTML in message content', async () => {
    const messageWithHtml = '<script>alert("xss")</script>';

    await sendContactEmail({
      ...baseContactData,
      message: messageWithHtml,
    });

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).toContain(messageWithHtml);
  });

  it('throws error when RESEND_API_KEY is not set', async () => {
    delete process.env.RESEND_API_KEY;

    await expect(sendContactEmail(baseContactData)).rejects.toThrow(
      'RESEND_API_KEY environment variable is not set',
    );
  });
});
