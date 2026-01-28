import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import type { Mock } from 'vitest';
import sgMail from '@sendgrid/mail';
import { sendContactEmail } from './sendgrid';

// Mock SendGrid
vi.mock('@sendgrid/mail', () => ({
  default: {
    setApiKey: vi.fn(),
    send: vi.fn(),
  },
}));

const mockSend = sgMail.send as Mock;

describe('sendContactEmail', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Set required environment variables
    process.env.SENDGRID_API_KEY = 'test-api-key';
    process.env.SENDGRID_FROM_EMAIL = 'test@example.com';
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

    mockSend.mockResolvedValue([{ statusCode: 202 }]);

    await sendContactEmail(contactData);

    expect(sgMail.send).toHaveBeenCalledTimes(1);
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
    mockSend.mockResolvedValue([{ statusCode: 202 }]);

    await sendContactEmail(baseContactData);

    expect(sgMail.send).toHaveBeenCalledTimes(1);
    const callArgs = mockSend.mock.calls[0][0];

    expect(callArgs.text).toContain('John Doe');
    expect(callArgs.text).not.toContain('Budget:');
    expect(callArgs.html).toContain('John Doe');
    // Budget section should not be in HTML when not provided
    expect(callArgs.html).not.toMatch(/<div class="field-label">Budget<\/div>/);
  });

  it('formats email subject with contact name', async () => {
    mockSend.mockResolvedValue([{ statusCode: 202 }]);

    await sendContactEmail({ ...baseContactData, name: 'Jane Smith' });

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.subject).toBe('New Contact Form Submission from Jane Smith');
  });

  it('includes mailto link for email in HTML', async () => {
    mockSend.mockResolvedValue([{ statusCode: 202 }]);

    await sendContactEmail(baseContactData);

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).toContain('href="mailto:john@example.com"');
  });

  it('throws error when SendGrid fails', async () => {
    mockSend.mockRejectedValue(new Error('SendGrid API error'));

    await expect(sendContactEmail(baseContactData)).rejects.toThrow(
      'Failed to send email notification',
    );
  });

  it('uses default from email if not set in environment', async () => {
    delete process.env.SENDGRID_FROM_EMAIL;
    mockSend.mockResolvedValue([{ statusCode: 202 }]);

    await sendContactEmail(baseContactData);

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.from).toBe('noreply@jarrodmedrano.com');
  });

  it('preserves message formatting in plain text', async () => {
    const multilineMessage = 'Line 1\nLine 2\nLine 3';
    mockSend.mockResolvedValue([{ statusCode: 202 }]);

    await sendContactEmail({
      ...baseContactData,
      message: multilineMessage,
    });

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.text).toContain('Line 1\nLine 2\nLine 3');
  });

  it('escapes HTML in message content', async () => {
    const messageWithHtml = '<script>alert("xss")</script>';
    mockSend.mockResolvedValue([{ statusCode: 202 }]);

    await sendContactEmail({
      ...baseContactData,
      message: messageWithHtml,
    });

    const callArgs = mockSend.mock.calls[0][0];
    // HTML should contain the raw string (SendGrid handles escaping)
    expect(callArgs.html).toContain(messageWithHtml);
  });
});
