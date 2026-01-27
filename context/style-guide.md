# Brand Style Guide

## Brand Identity

### Mission Statement
[Define your application's purpose and value proposition]

### Brand Personality
**Minimalist • Professional • Clean • Elegant • Modern**

Core aesthetic: Sophisticated black and white design with strategic, minimal use of color for emphasis and semantic meaning only.

## Minimalist Design Principles

### The Black & White Philosophy

**Foundation:**
- Pure black (`#000000`) and pure white (`#ffffff`) form the foundation
- Grayscale spectrum provides all necessary variation
- Color is the exception, not the rule

**When to use color (sparingly):**
1. **Critical user feedback** - Validation errors, success confirmations
2. **Destructive actions** - Delete, remove, irreversible operations
3. **High-priority CTAs** - When black is insufficient (rare)

**When NOT to use color:**
- Decoration or theming
- General information or tips (use gray + icons)
- Secondary navigation
- Borders, backgrounds, dividers
- Standard interactive elements (buttons, links in black/white work)

### Hierarchy Without Color

Achieve visual hierarchy using:
1. **Size** - Larger elements command attention
2. **Weight** - Bold vs. regular vs. light typography
3. **Contrast** - Black on white vs. gray on white
4. **Space** - Generous whitespace around important elements
5. **Position** - Top/center placement signals importance
6. **Borders** - Black borders for emphasis, gray for separation

### Visual Restraint Checklist

Before adding any element, ask:
- [ ] Can this be black, white, or gray instead of colored?
- [ ] Can borders replace shadows?
- [ ] Can sharp corners replace rounded ones?
- [ ] Can typography hierarchy replace color-coding?
- [ ] Can whitespace replace dividers?
- [ ] Can icons replace decorative graphics?
- [ ] Is this element absolutely necessary?

## Color Palette

### Design Philosophy
This design uses a **monochromatic black and white foundation** with restrained pops of color reserved exclusively for:
- Critical interactive elements (primary CTAs)
- Essential semantic feedback (success, error, warning states)
- Strategic focus and emphasis

**Rule:** If it can be black, white, or gray—it should be. Color is a tool of last resort.

### Primary Colors (Black)
```css
--primary-50: #fafafa;   /* Near white */
--primary-100: #f5f5f5;  /* Lightest gray */
--primary-200: #e5e5e5;  /* Light gray */
--primary-300: #d4d4d4;  /* Medium-light gray */
--primary-400: #a3a3a3;  /* Medium gray */
--primary-500: #000000;  /* Pure black - base primary */
--primary-600: #000000;  /* Pure black */
--primary-700: #000000;  /* Pure black */
--primary-800: #000000;  /* Pure black */
--primary-900: #000000;  /* Pure black */
```

**Usage:**
- Primary CTAs: Black background, white text
- Primary headings: Black text
- High-contrast UI elements
- Inverted sections (black backgrounds)

### Neutral Colors (Grayscale)
```css
--white: #ffffff;        /* Pure white */
--gray-50: #fafafa;      /* Subtle backgrounds */
--gray-100: #f5f5f5;     /* Light backgrounds */
--gray-200: #e5e5e5;     /* Borders, dividers */
--gray-300: #d4d4d4;     /* Disabled states */
--gray-400: #a3a3a3;     /* Muted text */
--gray-500: #737373;     /* Secondary text */
--gray-600: #525252;     /* Body text */
--gray-700: #404040;     /* Emphasis text */
--gray-800: #262626;     /* Strong headings */
--gray-900: #171717;     /* Darkest text */
--black: #000000;        /* Pure black */
```

**Primary Palette:** Use these 13 values (white + 11 grays + black) for 95% of the interface.

### Accent Color (Minimal Use)
```css
/* Strategic accent - use sparingly */
--accent-50: #fafafa;
--accent-100: #f5f5f5;
--accent-500: #000000;   /* Default to black unless color truly needed */
--accent-600: #000000;
--accent-900: #000000;
```

**Usage (極 minimal):**
- **ONLY** when black/white insufficient for critical interactions
- Consider using black first, always
- If color needed: One accent color sitewide (define specific hue when needed: blue, green, red)

### Semantic Colors (Reserved for Feedback Only)
```css
/* Success - Minimal green, prefer gray-scale icons + text */
--success-50: #fafafa;      /* Use gray instead of green tint */
--success-100: #f5f5f5;
--success-500: #16a34a;     /* Green - use only for explicit success states */
--success-700: #15803d;
--success-900: #14532d;

/* Warning - Minimal amber */
--warning-50: #fafafa;      /* Use gray instead of amber tint */
--warning-100: #f5f5f5;
--warning-500: #ea580c;     /* Orange - use only for warnings */
--warning-700: #c2410c;
--warning-900: #7c2d12;

/* Error - Minimal red */
--error-50: #fafafa;        /* Use gray instead of red tint */
--error-100: #f5f5f5;
--error-500: #dc2626;       /* Red - use only for errors/destructive actions */
--error-700: #b91c1c;
--error-900: #7f1d1d;

/* Info - Avoid color, use gray */
--info-50: #fafafa;
--info-100: #f5f5f5;
--info-500: #737373;        /* Gray - info doesn't need color */
--info-700: #404040;
--info-900: #171717;
```

**Semantic Color Rules:**
1. **Prefer grayscale + iconography** over color (✓ checkmark icon in gray > green background)
2. Use semantic color **only when critical** (form validation, destructive actions)
3. Never use semantic color for decoration or theming
4. Always pair color with text/icon (accessibility + minimal aesthetic)

## Typography

### Font Families
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-serif: 'Georgia', 'Times New Roman', serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Type Scale
```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;      /* Headings */
--leading-snug: 1.375;      /* Subheadings */
--leading-normal: 1.5;      /* Body text */
--leading-relaxed: 1.625;   /* Long-form content */
--leading-loose: 2;         /* Spacious layouts */
```

### Typography Usage

#### Headings
- **H1**: text-4xl (mobile) / text-5xl (desktop), font-bold, leading-tight
- **H2**: text-3xl (mobile) / text-4xl (desktop), font-bold, leading-tight
- **H3**: text-2xl / text-3xl, font-semibold, leading-snug
- **H4**: text-xl / text-2xl, font-semibold, leading-snug
- **H5**: text-lg / text-xl, font-medium, leading-normal
- **H6**: text-base / text-lg, font-medium, leading-normal

#### Body Text
- **Large body**: text-lg, font-normal, leading-relaxed
- **Default body**: text-base, font-normal, leading-normal
- **Small body**: text-sm, font-normal, leading-normal
- **Caption**: text-xs, font-normal, leading-normal

#### UI Text
- **Button text**: text-sm / text-base, font-medium
- **Input labels**: text-sm, font-medium
- **Helper text**: text-xs / text-sm, font-normal
- **Navigation**: text-sm, font-medium

## Spacing

### Spacing Scale
```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

### Usage Guidelines
- **Tight spacing** (1-2): Icons, badges, pills
- **Default spacing** (3-4): Form elements, card padding
- **Comfortable spacing** (6-8): Section padding, component margins
- **Spacious layout** (12-16): Hero sections, major sections
- **Dramatic spacing** (20-24): Page sections, landing pages

## Border Radius

```css
--radius-none: 0;         /* Preferred - sharp, clean edges */
--radius-sm: 0.125rem;    /* 2px - minimal rounding */
--radius-md: 0.25rem;     /* 4px - subtle (use sparingly) */
--radius-lg: 0.375rem;    /* 6px - reserved for special elements */
--radius-xl: 0.5rem;      /* 8px - rare use */
--radius-2xl: 0.75rem;    /* 12px - avoid unless necessary */
--radius-full: 9999px;    /* Pills, avatars only */
```

**Minimalist preference:** Default to `--radius-none` (sharp corners). Use minimal rounding (`--radius-sm` or `--radius-md`) only for softer touch targets like buttons and inputs. Sharp edges reinforce the clean, precise aesthetic.

## Shadows

```css
/* Subtle shadows - prefer borders over shadows */
--shadow-none: none;                                        /* Default - use borders instead */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.03);                /* Barely visible */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);                /* Subtle depth */
--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.08);                /* Modest elevation */
--shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.10);                /* Prominent (modals) */
--shadow-xl: 0 8px 16px rgba(0, 0, 0, 0.12);               /* Maximum (use rarely) */
--shadow-2xl: 0 12px 24px rgba(0, 0, 0, 0.15);             /* Avoid unless critical */
```

**Minimalist preference:**
- **Default:** Use `1px solid` borders (`var(--gray-200)`) instead of shadows
- Shadows only for floating elements that need clear separation (dropdowns, modals, tooltips)
- Keep shadows very subtle—black and white designs rely on borders, not depth

## Component Specifications

### Buttons

#### Primary Button (Black)
```css
background: var(--black);
color: var(--white);
padding: 0.5rem 1.5rem;
border: 1px solid var(--black);
border-radius: var(--radius-sm);      /* Minimal rounding or --radius-none */
font-weight: var(--font-medium);
transition: all var(--duration-fast) var(--ease-out);

hover: background var(--gray-800);
active: background var(--gray-900), transform: scale(0.98);
disabled: background var(--gray-300), color var(--gray-500), border var(--gray-300);
```

#### Secondary Button (Outlined)
```css
background: var(--white);
color: var(--black);
border: 1px solid var(--black);
padding: 0.5rem 1.5rem;
border-radius: var(--radius-sm);
font-weight: var(--font-medium);

hover: background var(--black), color var(--white);
active: background var(--gray-900);
disabled: border var(--gray-300), color var(--gray-400);
```

#### Tertiary Button (Ghost)
```css
background: transparent;
color: var(--black);
border: none;
padding: 0.5rem 1rem;
border-radius: var(--radius-sm);
font-weight: var(--font-medium);

hover: background var(--gray-100);
active: background var(--gray-200);
disabled: color var(--gray-400);
```

#### Destructive Button
```css
background: var(--white);
color: var(--error-500);
border: 1px solid var(--error-500);
padding: 0.5rem 1.5rem;
border-radius: var(--radius-sm);
font-weight: var(--font-medium);

hover: background var(--error-500), color var(--white);
active: background var(--error-700);
```

#### Button Sizes
- **Small**: padding 0.375rem 1rem, text-sm
- **Medium** (default): padding 0.5rem 1.5rem, text-base
- **Large**: padding 0.75rem 2rem, text-lg

### Form Inputs

```css
background: var(--white);
border: 1px solid var(--gray-300);
border-radius: var(--radius-sm);      /* Minimal or none */
padding: 0.625rem 0.875rem;
font-size: var(--text-base);
color: var(--black);
transition: border var(--duration-fast) var(--ease-out);

placeholder: color var(--gray-400);
focus: border var(--black), outline 2px solid var(--black), outline-offset 0;
error: border var(--error-500), outline 2px solid var(--error-500);
disabled: background var(--gray-50), color var(--gray-500), border var(--gray-200);
```

**Labels:**
```css
color: var(--gray-900);
font-size: var(--text-sm);
font-weight: var(--font-medium);
margin-bottom: var(--spacing-2);
```

**Helper text:**
```css
color: var(--gray-600);
font-size: var(--text-xs);
```

**Error text:**
```css
color: var(--error-500);
font-size: var(--text-xs);
font-weight: var(--font-medium);
```

### Cards

```css
background: var(--white);
border: 1px solid var(--gray-200);
border-radius: var(--radius-none);    /* Sharp edges preferred */
padding: var(--spacing-6);
box-shadow: none;                      /* No shadow, border only */
transition: border var(--duration-fast) var(--ease-out);

hover: border var(--gray-400);         /* Subtle border darkening on hover */
active: border var(--black);
```

**Alternative card (elevated):**
```css
/* Use only when card must float above surface */
background: var(--white);
border: none;
border-radius: var(--radius-sm);
padding: var(--spacing-6);
box-shadow: var(--shadow-sm);

hover: box-shadow var(--shadow-md);
```

### Modals

```css
background: var(--white);
border: 1px solid var(--black);       /* Strong border for focus */
border-radius: var(--radius-none);    /* Sharp corners */
padding: var(--spacing-8);
box-shadow: var(--shadow-lg);
max-width: 32rem;

backdrop: rgba(0, 0, 0, 0.75);        /* Strong black overlay */
```

**Modal header:**
```css
border-bottom: 1px solid var(--gray-200);
padding-bottom: var(--spacing-4);
margin-bottom: var(--spacing-6);
```

**Modal footer:**
```css
border-top: 1px solid var(--gray-200);
padding-top: var(--spacing-4);
margin-top: var(--spacing-6);
display: flex;
justify-content: flex-end;
gap: var(--spacing-3);
```

## Animation & Transitions

### Durations
```css
--duration-fast: 150ms;      /* Hover effects */
--duration-base: 200ms;      /* Standard transitions */
--duration-slow: 300ms;      /* Modals, drawers */
--duration-slower: 500ms;    /* Page transitions */
```

### Easing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Usage
```css
/* Hover states */
transition: all var(--duration-fast) var(--ease-out);

/* State changes */
transition: all var(--duration-base) var(--ease-in-out);

/* Modals/overlays */
transition: all var(--duration-slow) var(--ease-in-out);
```

## Iconography

### Icon Library
**Recommended:** Heroicons (outline), Lucide, or Feather Icons

**Style preference:** Outline/stroke icons in black align with minimalist aesthetic. Avoid filled/solid icons unless needed for active states.

### Icon Sizes
```css
--icon-xs: 1rem;      /* 16px */
--icon-sm: 1.25rem;   /* 20px */
--icon-md: 1.5rem;    /* 24px */
--icon-lg: 2rem;      /* 32px */
--icon-xl: 2.5rem;    /* 40px */
```

### Icon Usage
- **Default color:** Black (`var(--black)`)
- **Secondary icons:** Gray-600 (`var(--gray-600)`)
- **Disabled icons:** Gray-300 (`var(--gray-300)`)
- Use outline/stroke style for consistency with minimal aesthetic
- Use filled style only for selected/active states (nav, toggles)
- Ensure 1:1 aspect ratio, crisp at all sizes
- Align with text baseline when paired with text
- **Semantic icons:** Use color only when critical (✓ success, ✕ error, ⚠ warning)
- Prefer black icons + descriptive text over relying on color alone

### Icon + Text Pairing
```css
gap: var(--spacing-2);               /* 8px between icon and text */
align-items: center;
color: inherit;                      /* Icon inherits text color */
```

## Grid & Layout

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Grid Columns
- Mobile: 4 columns
- Tablet: 8 columns
- Desktop: 12 columns

### Gutter Width
- Mobile: 16px (var(--spacing-4))
- Tablet: 24px (var(--spacing-6))
- Desktop: 32px (var(--spacing-8))

## Voice & Tone

### Writing Principles
1. **Clear**: Use simple, direct language
2. **Concise**: Respect user's time
3. **Consistent**: Use same terms for same concepts
4. **Conversational**: Write like a human, not a robot
5. **Helpful**: Guide users to success

### Button Labels
- Use action verbs: "Save Changes", "Create Account", "Download Report"
- Avoid generic labels: "Submit", "OK", "Click Here"

### Error Messages
- Explain what went wrong
- Suggest how to fix it
- Be empathetic, not accusatory

**Good**: "Email address is required. Please enter your email to continue."
**Bad**: "Error: Invalid input."

### Success Messages
- Confirm the action completed
- Provide next steps if relevant

**Good**: "Account created! Check your email to verify your address."
**Bad**: "Success."

## Accessibility Standards

### Required Attributes
- All images: `alt` attribute
- All form inputs: associated `label`
- All buttons: descriptive text or `aria-label`
- All interactive elements: keyboard accessible
- All color-coded info: text/icon alternative

### Focus Management
- Visible focus indicators (min 3:1 contrast)
- Logical tab order
- Skip links for main content
- Focus trapping in modals

### ARIA Usage
- Use semantic HTML first
- Add ARIA when semantic HTML insufficient
- Test with screen readers

## Testing Requirements

### Visual Testing
- [ ] Design matches mockups
- [ ] Spacing consistent with style guide
- [ ] Colors match brand palette
- [ ] Typography follows type scale
- [ ] Responsive at all breakpoints

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible
- [ ] Forms properly labeled

### Performance Testing
- [ ] Lighthouse score >90
- [ ] Images optimized
- [ ] Fonts loaded efficiently
- [ ] No layout shift
- [ ] Fast Time to Interactive

## Resources

### Design Tools
- Figma/Sketch files: [Link]
- Component library: [Link]
- Icon set: Heroicons (outline), Lucide Icons, or Feather Icons

### Code Resources
- Component documentation: [Link]
- Tailwind config: `tailwind.config.ts`
- CSS variables: `src/app/globals.css`

### Minimalist Design Inspiration

**Black & White Exemplars:**
- **Linear** (linear.app) - Clean, modern SaaS with excellent black/white UI
- **Stripe** (stripe.com) - Minimal color usage, strong typography
- **Apple** (apple.com) - Whitespace, clean product photography, restrained palette
- **Dieter Rams** - Industrial design philosophy: "Less, but better"
- **Muji** (muji.com) - Japanese minimalism, no-brand quality
- **The Outline** - Editorial design with stark black/white contrast

**Design Principles to Study:**
- Swiss Design / International Typographic Style
- Bauhaus movement
- Japanese minimalism (Muji, UNIQLO)
- Brutalist web design (when executed well)

**What to avoid:**
- Excessive gradients
- Unnecessary animations/micro-interactions
- Decorative color for its own sake
- Heavy shadows and depth
- Overly rounded corners (unless brand-appropriate)
