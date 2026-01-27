# Portfolio Website Redesign - Design Document

**Date:** January 26, 2026
**Designer:** Jarrod Medrano
**Type:** Single-page portfolio for freelance full-stack development
**Target Audience:** Startups and small-to-medium businesses seeking full-stack development services

## Design Philosophy

### Aesthetic
- **Black and white minimalism** - Pure contrast, no gradients, no decorative color
- **Content-first** - Work and capabilities take priority over design flourishes
- **Professional directness** - No generic landing page tropes or marketing fluff
- **Sharp and clean** - Minimal rounded corners, prefer borders over shadows

### Layout Principles
- Single-page scrolling experience
- Smooth scroll animations (fade-in, slide-up)
- Two-column alternating layouts (avoid 3-card grids)
- Generous whitespace for breathing room
- Fixed navigation with smooth section jumping

## Complete Site Structure

### Page Sections (In Order)
1. Hero - Direct professional statement
2. Selected Work - Project case studies
3. What I Build - Outcome-focused services
4. Technologies - Compact tech stack display
5. Recent Thoughts - BlueSky feed integration
6. Let's Talk - Contact form
7. Footer - Minimal credits

---

## 1. Navigation Bar

### Fixed Top Navigation
**Behavior:**
- Initially transparent background
- Transitions to black background with white text on scroll
- Smooth scroll to sections on click
- Active section indicated with underline

**Layout:**
```
[Left]                                    [Right]
JM                        Work • Capabilities • Tech • Thoughts • Contact
```

**Specifications:**
- Height: 64px
- Horizontal padding: 24px
- Font size: 14px, medium weight
- Background transition: transparent → bg-black (200ms ease)
- Text color: black → white (on scroll)
- Active link: 1px underline

---

## 2. Hero Section

### Purpose
Immediate clarity on who you are, what you do, and availability. No fluff.

### Layout
```
[Centered, full viewport height]

Senior Software Engineer
Full-Stack Development for Startups & Growing Businesses

I build production-ready web applications with Next.js, React,
and modern backend technologies. Based in Austin, TX.
Currently available for projects starting March 2026.

[Black button]           [Outlined button]
View Work ↓              Get in Touch
```

### Specifications
**Headline:**
- Font size: 60px (text-6xl)
- Font weight: Bold
- Color: Black
- Line height: Tight (1.25)

**Subheading:**
- Font size: 20px (text-xl)
- Color: gray-600
- Line height: Relaxed (1.625)
- Max width: 700px

**CTAs:**
- "View Work" - btn-primary (black background, white text)
- "Get in Touch" - btn-secondary (outlined, black border)
- Positioned side-by-side with 12px gap

**Styling:**
- Background: Pure white
- No hero image or background pattern
- Vertically and horizontally centered content

---

## 3. Selected Work Section

### Purpose
Showcase 4-6 key projects demonstrating full-stack capabilities, AI integration, and production quality.

### Layout Pattern
Alternating two-column layout:
- Project 1: Image Left (60%) | Content Right (40%)
- Project 2: Content Left (40%) | Image Right (60%)
- Project 3: Image Left (60%) | Content Right (40%)
- And so on...

### Project Card Structure
```
[PROJECT IMAGE/SCREENSHOT]
- 60% width
- Sharp corners (rounded-none)
- 1px black border
- Hover: scale(1.02), border darkens

[CONTENT BLOCK]
- 40% width

[Client/Type]
Startup MVP

[Project Title]
Portuguese Verb Quiz

[Description]
Next.js application with OpenAI integration for language learning.
Built custom quiz engine, integrated Stripe payments, deployed on Vercel.

[Tech Stack Pills]
Next.js  TypeScript  OpenAI  Tailwind  Vercel

[Links]
View Live → | View Code →
```

### Specifications
**Section Header:**
- Title: "Selected Work"
- 1px black divider line (full width)
- Margin bottom: 64px

**Project Image:**
- Aspect ratio: 16:9 or 4:3
- Border: 1px solid black
- Hover animation: transform scale(1.02), 200ms ease-out

**Client/Type Label:**
- Font size: 12px (text-xs)
- Text transform: uppercase
- Color: gray-500
- Letter spacing: 0.05em

**Project Title:**
- Font size: 32px (text-3xl)
- Font weight: Bold
- Color: Black
- Margin bottom: 16px

**Description:**
- Font size: 16px (text-base)
- Color: gray-700
- Line height: 1.5
- 2-3 sentences maximum

**Tech Stack Pills:**
- Inline display
- Background: gray-100
- Padding: 4px 12px
- Border radius: 2px (rounded-sm)
- Font size: 14px (text-sm)
- Gap: 8px between pills

**Links:**
- Font size: 16px
- Color: Black
- Underlined
- Hover: color changes to gray-700
- Arrow indicator: →

**Animation:**
- Fade in + slide up 20px on scroll into view
- Stagger: Image first, then content 100ms later
- Trigger: 10% viewport intersection

### Featured Projects
1. **Portuguese Verbs** - AI integration, production app
2. **Jarrod Starter** - Tooling/DX focus, developer experience
3. **Story Bible** - Full-stack GraphQL/Prisma
4. Additional client work or polished personal projects

---

## 4. What I Build Section

### Purpose
Communicate value through outcomes, not technologies. Help clients self-identify their needs.

### Layout
Two-column grid, then full-width third option.

### Structure
```
What I Build
─────────────────────

[Left Column]              [Right Column]
MVP Development            Production Applications

[Full Width Below]
Technical Consulting
```

### Content

**MVP Development (Left Column):**
```
MVP Development
─────────────────────
Ship your idea in weeks, not months.

I build functional prototypes and minimum viable products
for startups validating ideas. Fast iteration, clean code,
production-ready from day one.

• 0-to-1 product development
• User authentication & payments
• Third-party API integrations
• Deployment & hosting setup
• Foundation for future scaling

Built with: Next.js, TypeScript, Prisma, PostgreSQL
```

**Production Applications (Right Column):**
```
Production Applications
─────────────────────
Robust systems built to scale.

Full-featured web applications for growing businesses.
Database design, API architecture, testing, monitoring,
and ongoing maintenance.

• Complex business logic & workflows
• Multi-user systems with role-based access
• Performance optimization
• Data migration & modernization
• Security best practices

Built with: React, Node.js, GraphQL, AWS, Docker
```

**Technical Consulting (Full Width):**
```
Technical Consulting
─────────────────────
Expert guidance when you need it.

Code reviews, architecture planning, technical debt assessment,
performance audits, and team mentorship.

• Architecture & system design reviews
• Performance & security audits
• Technology selection & migration planning
• Code quality assessment
• Team training & best practices

Engagement types: Hourly, project-based, or retainer
```

### Specifications
**Service Title:**
- Font size: 24px (text-2xl)
- Font weight: Semibold
- Color: Black
- Border bottom: 1px solid black
- Padding bottom: 8px
- Margin bottom: 16px

**Tagline:**
- Font size: 18px (text-lg)
- Font weight: Medium
- Color: Black
- Margin bottom: 16px

**Description:**
- Font size: 16px (text-base)
- Color: gray-700
- Line height: 1.5
- Margin bottom: 16px

**Bullet Points:**
- Simple • (U+2022) bullet
- Font size: 16px
- Color: gray-700
- Line height: 1.625
- Margin left: 16px

**Tech Stack Note:**
- Font size: 14px (text-sm)
- Color: gray-600
- Margin top: 16px
- Italic

**Animation:**
- Left column fades in first
- Right column fades in 100ms after
- Bottom section fades in 200ms after

---

## 5. Technologies Section

### Purpose
Quick reference of technical expertise without clutter.

### Layout
Compact inline format, category-based.

### Content
```
Technologies
─────────────────────

Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Vitest, React Testing Library

Backend & Data: Node.js, PostgreSQL, Prisma, GraphQL, tRPC, JWT Authentication, REST APIs

DevOps & Infrastructure: Vercel, AWS, Docker, Terraform, GitHub Actions, Monitoring & Analytics

Currently Learning: Rust, Advanced Terraform patterns, Distributed systems
```

### Specifications
**Section Header:**
- Title: "Technologies"
- 1px black divider line
- Margin bottom: 32px

**Category Labels:**
- Font size: 16px (text-base)
- Font weight: Semibold
- Color: Black
- Display: inline

**Technology List:**
- Font size: 16px (text-base)
- Color: gray-700
- Display: inline
- Separated by commas
- Hover: individual tech name underlined

**Spacing:**
- Gap between categories: 16px vertical
- Single column layout

---

## 6. Recent Thoughts Section (BlueSky Feed)

### Purpose
Show active engagement in tech community and thought leadership.

### Layout
```
Recent Thoughts
─────────────────────

[Post 1]
─────────────────────
Post content text appears here...

2 days ago • View on BlueSky →
─────────────────────

[Post 2]
─────────────────────
Another post...
─────────────────────

[Post 3]
─────────────────────
Another post...
─────────────────────

Follow me on BlueSky →
```

### Specifications
**Post Container:**
- Background: white
- Border: 1px solid gray-200
- Padding: 24px (p-6)
- Margin bottom: 16px
- Hover: border changes to gray-400
- Cursor: pointer
- Click: Opens post on BlueSky (new tab)

**Post Content:**
- Font size: 16px (text-base)
- Color: gray-900
- Line height: 1.625 (leading-relaxed)
- Text only (no media embedding initially)

**Post Metadata:**
- Font size: 14px (text-sm)
- Color: gray-500
- Format: "X days ago • View on BlueSky →"
- Link underlined on hover

**Bottom Link:**
- Font size: 16px
- Color: Black
- Underlined
- Center aligned
- Margin top: 32px

### Technical Implementation
- Fetch latest 3-5 posts via BlueSky API
- Show text-only posts
- Chronological order (newest first)
- Fallback: Static message with link if API fails
- Optional: "Load More" button for additional posts

---

## 7. Let's Talk Section (Contact)

### Purpose
Make it easy for qualified leads to reach out with relevant project information.

### Layout
Two-column: Contact info (left) | Contact form (right)

### Left Column - Contact Info
```
Currently Available
─────────────────────
Taking on new projects starting March 2026.

Response time: Within 24 hours
Location: Austin, TX (Remote work available)

jarrod@example.com
GitHub →
BlueSky →
LinkedIn →
```

### Right Column - Contact Form
```
Name *
[input field]

Email *
[input field]

Project Type
[dropdown: MVP Development / Production App / Consulting / Not Sure]

Message *
[textarea, 4 rows minimum]

Budget Range (Optional)
[dropdown: <$10k / $10k-25k / $25k-50k / $50k+ / Hourly/Retainer]

[Send Message button - btn-primary]
```

### Specifications
**Section Header:**
- Title: "Let's Talk"
- 1px black divider line
- Margin bottom: 48px

**Contact Info Text:**
- Font size: 16px (text-base)
- Color: gray-700
- Line height: 1.5
- Links: Black, underlined on hover

**Form Fields:**
- Use `.input` class from globals.css
- Border: 1px solid gray-300
- Border radius: 2px (rounded-sm)
- Padding: 10px 14px
- Focus: Black border, black outline
- Font size: 16px

**Labels:**
- Font size: 14px (text-sm)
- Font weight: Medium
- Color: gray-900
- Margin bottom: 8px
- Required fields marked with *

**Textarea:**
- Min height: 120px (4 rows)
- Resize: vertical only

**Dropdowns:**
- Same styling as inputs
- Default option: Placeholder text (gray)

**Submit Button:**
- Class: btn-primary
- Full width on mobile
- Fixed width (200px) on desktop
- Text: "Send Message"

**Form Behavior:**
- Validation: Inline on blur
- Error state: Red border (error-500), error text below field
- Success: "Message sent" confirmation, clear form
- Honeypot field (hidden) for spam protection

**Backend:**
- Next.js API route: `/api/contact`
- Sends email notification
- Stores submission in database (optional)
- Rate limiting: 5 submissions per hour per IP

---

## 8. Footer

### Purpose
Minimal credits and social links.

### Layout
```
─────────────────────
Built with Next.js, TypeScript, and Tailwind CSS
© 2026 Jarrod Medrano

GitHub • BlueSky • LinkedIn
─────────────────────
```

### Specifications
**Styling:**
- Background: White (no dark footer)
- Text: gray-500, 14px (text-sm)
- Padding: 48px vertical
- Center aligned
- Links: Underlined on hover
- Divider: 1px solid gray-200 at top

---

## Animation & Interaction Specifications

### Scroll Animations (All Sections)
**Fade + Slide Up:**
- Initial state: opacity 0, translateY(20px)
- Final state: opacity 1, translateY(0)
- Trigger: When section enters 10% of viewport
- Duration: 400ms
- Easing: ease-out
- Library: Framer Motion or Intersection Observer API

**Stagger Patterns:**
- Selected Work: Image → Content (100ms delay)
- What I Build: Left column → Right column → Bottom (100ms each)

### Navigation Scroll Behavior
- Smooth scroll to section
- Duration: 800ms
- Easing: ease-in-out
- Offset: Account for fixed nav height (64px)

### Hover States
**Links:**
- Transition: color 150ms ease-out
- Underline appears on hover

**Buttons:**
- Primary: Background darkens to gray-800
- Secondary: Background fills black, text white
- Transform: scale(0.98) on active/click

**Project Images:**
- Transform: scale(1.02)
- Border: gray-300 → black
- Transition: 200ms ease-out

**Post Cards:**
- Border: gray-200 → gray-400
- Transition: 150ms ease-out

---

## Responsive Breakpoints

### Mobile (<768px)
- Single column layouts throughout
- Hero headline: 36px (text-4xl)
- Project cards: Stack image above content
- Navigation: Hamburger menu (optional) or horizontal scroll
- Form: Full width inputs
- Padding: 16px horizontal

### Tablet (768px - 1023px)
- Two-column layouts maintained where possible
- Hero headline: 48px
- Adjusted padding: 24px horizontal

### Desktop (1024px+)
- Full design as specified
- Max container width: 1280px
- Centered content
- Padding: 32px horizontal

---

## Technical Implementation Notes

### Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with custom config from `tailwind.config.ts`)
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **API:** Next.js API routes
- **Database:** PostgreSQL + Prisma (for contact form storage)
- **Deployment:** Vercel

### Key Files
- `/src/app/page.tsx` - Main portfolio page
- `/src/app/api/contact/route.ts` - Contact form handler
- `/src/app/api/bluesky/route.ts` - BlueSky feed proxy
- `/src/components/Hero.tsx` - Hero section
- `/src/components/ProjectCard.tsx` - Project display
- `/src/components/ContactForm.tsx` - Contact form
- `/src/components/BlueSkyFeed.tsx` - BlueSky integration
- `/src/app/globals.css` - Design system CSS

### Performance Targets
- Lighthouse score: >95
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Time to Interactive: <3.5s

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation for all interactive elements
- Focus indicators (2px black outline)
- Semantic HTML
- Alt text for all images
- ARIA labels where needed
- Form validation with screen reader announcements

### SEO Optimization
- Meta tags: Title, description, Open Graph
- Structured data: Person schema
- Sitemap generation
- Semantic HTML structure
- Fast page load times

---

## Content Requirements

### Copy Tone & Voice
- **Direct:** No marketing fluff or generic phrases
- **Professional:** Confident but not arrogant
- **Technical:** Use proper terminology, assume intelligent audience
- **Specific:** Metrics and concrete examples over vague claims
- **Action-oriented:** Clear outcomes and capabilities

### Avoid
- Emojis
- "I'm passionate about..."
- "I love building..."
- Generic buzzwords without context
- Overly casual language
- Unnecessary superlatives

### Photography/Screenshots
- High-quality project screenshots (16:9 or 4:3)
- Desktop and mobile views where relevant
- Clean, uncluttered captures
- Professional headshot (optional, not in hero)
- All images optimized (WebP format)

---

## Next Steps

### Phase 1: Setup & Structure (Week 1)
1. Create component architecture
2. Set up animation library (Framer Motion)
3. Implement responsive layouts
4. Build navigation with scroll behavior

### Phase 2: Content Sections (Week 2)
5. Hero section
6. Selected Work with project data
7. What I Build section
8. Technologies display

### Phase 3: Dynamic Features (Week 3)
9. BlueSky feed integration
10. Contact form with validation
11. API routes for form submission
12. Database schema for contact storage

### Phase 4: Polish & Launch (Week 4)
13. Scroll animations throughout
14. Performance optimization
15. SEO setup (meta tags, sitemap)
16. Accessibility audit
17. Cross-browser testing
18. Deploy to Vercel

---

## Success Metrics

### User Engagement
- Average time on page: >2 minutes
- Scroll depth: >75% of users reach contact form
- Form submission rate: >2% of visitors

### Performance
- Lighthouse score: >95
- Page load time: <2 seconds
- Zero layout shift

### Business Outcomes
- Contact form submissions: 5-10 per month
- Qualified leads: 50%+ conversion from form to initial call
- Project bookings: 1-2 per quarter

---

## Maintenance Plan

### Regular Updates
- Add new projects quarterly
- Update availability status monthly
- Refresh BlueSky feed (automatic)
- Update tech stack as skills evolve

### Monitoring
- Google Analytics for traffic
- Form submission tracking
- Error monitoring (Sentry)
- Performance monitoring (Vercel Analytics)

---

**Document Version:** 1.0
**Last Updated:** January 26, 2026
**Status:** Ready for implementation
