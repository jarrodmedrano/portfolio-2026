import { Resend } from 'resend';

interface ContactEmailData {
  name: string;
  email: string;
  projectType: string;
  message: string;
  budget?: string;
}

/**
 * Sends a contact form notification email to jarrod@jarrodmedrano.com
 * @throws Error if email fails to send or if API key is not configured
 */
export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@jarrodmedrano.com';
  const toEmail = 'jarrod@jarrodmedrano.com';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px -20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
          }
          .field {
            margin-bottom: 20px;
          }
          .field-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
          }
          .field-value {
            font-size: 16px;
            color: #111827;
          }
          .message-box {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #f97316;
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>

        <div class="content">
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${data.name}</div>
          </div>

          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">
              <a href="mailto:${data.email}" style="color: #f97316; text-decoration: none;">
                ${data.email}
              </a>
            </div>
          </div>

          <div class="field">
            <div class="field-label">Project Type</div>
            <div class="field-value">${data.projectType}</div>
          </div>

          ${data.budget ? `
          <div class="field">
            <div class="field-label">Budget</div>
            <div class="field-value">${data.budget}</div>
          </div>
          ` : ''}

          <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">${data.message}</div>
          </div>
        </div>

        <div class="footer">
          Submitted from jarrodmedrano.com contact form
        </div>
      </body>
    </html>
  `;

  const textContent = `
NEW CONTACT FORM SUBMISSION

Name: ${data.name}
Email: ${data.email}
Project Type: ${data.projectType}
${data.budget ? `Budget: ${data.budget}` : ''}

Message:
${data.message}

---
Submitted from jarrodmedrano.com contact form
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Resend error:', error);
    throw new Error('Failed to send email notification');
  }
}
