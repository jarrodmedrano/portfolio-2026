# SendGrid Contact Form Integration

**Date:** 2026-01-28
**Status:** Approved

## Objective

Send email notification to jarrod@jarrodmedrano.com when contact form is submitted, with strict error handling that prevents successful submission if email delivery fails.

## Architecture

### Flow

1. User submits contact form → API route receives request
2. Validate form data (existing validation)
3. Check honeypot and rate limiting (existing)
4. **Send SendGrid email first** (new)
5. Save to database only after email succeeds
6. Return success response

### Key Decision

Email-first approach ensures no submissions are missed. If SendGrid fails, user sees error and database isn't polluted with un-notified submissions.

## Implementation Details

### Email Module (`src/lib/sendgrid.ts`)

- Wrapper around @sendgrid/mail
- Single responsibility: send formatted contact emails
- Uses environment variable `SENDGRID_API_KEY`
- Professional HTML email template with form data
- Throws errors for proper error handling upstream

### Email Content

- From: noreply@jarrodmedrano.com (or verified sender)
- To: jarrod@jarrodmedrano.com
- Subject: "New Contact Form Submission from [Name]"
- HTML body with styled formatting showing all form fields
- Plain text fallback

### API Route Modifications

**Updated flow in `/src/app/api/contact/route.ts`:**

1. Existing validation and honeypot check stays
2. Existing rate limiting check stays
3. **NEW:** Send SendGrid email before database save
4. If email succeeds → save to database → return success
5. If email fails → throw error → return 500 to user (no database save)

### Error Handling

- SendGrid errors: Return 500 with message "Failed to send email notification"
- Database errors: Return 500 with generic message (email already sent)
- Validation errors: Existing 400 responses remain

**Trade-off:** If email succeeds but database save fails, user gets error but you receive the email. This is acceptable since notification is the primary goal.

## Environment Variables

```bash
# SendGrid
SENDGRID_API_KEY="SG.your-api-key-here"
SENDGRID_FROM_EMAIL="noreply@jarrodmedrano.com"
```

## Security

- API key stored in environment variables only
- Never committed to git (already in .gitignore)
- Server-side only - never exposed to client
- Zod validation prevents email injection
- SendGrid library handles header injection protection
- Existing rate limiting (3/hour) prevents abuse
- Honeypot field catches basic bots

## Testing Strategy

**Unit tests for email module:**
- Test email formatting with all fields
- Test email formatting with optional fields missing
- Mock SendGrid to test error handling

**Integration test for API route:**
- Mock SendGrid send function
- Test successful email + database flow
- Test email failure prevents database save
- Test database failure after email success

## Implementation Checklist

- [ ] Create email utility module with SendGrid integration
- [ ] Update API route to send email before database save
- [ ] Add environment variables to .env.example
- [ ] Update existing route test to mock SendGrid
- [ ] Add unit tests for email module
- [ ] Manual testing with real SendGrid API
