# Deployment Guide

## Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
4. Deploy

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL database (Neon, Supabase, or other provider)
- `NEXT_PUBLIC_APP_URL` - Production URL (https://www.jarrodmedrano.com)

Optional:
- Email service API keys (for contact form notifications)

## Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# (Optional) Seed data
npm run db:seed
```

## Post-Deployment Checklist

- [ ] Verify all sections render correctly
- [ ] Test contact form submission
- [ ] Check BlueSky feed loads
- [ ] Run Lighthouse audit (target: >95)
- [ ] Test on mobile devices
- [ ] Verify sitemap.xml and robots.txt are accessible
- [ ] Test social media preview (Open Graph)
- [ ] Check all project images load correctly

## Monitoring

- Check Vercel Analytics for performance metrics
- Monitor error logs in Vercel dashboard
- Review form submissions in database

## Updating Content

### Project Portfolio
Edit `src/data/projects.ts` to add/update projects

### Technologies
Edit `src/data/technologies.ts` to update tech stack

### Contact Form Options
Edit form select options in `src/components/ContactForm.tsx`
