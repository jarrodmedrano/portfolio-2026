# 3D Carousel Design - Selected Work Section

**Date:** 2026-01-28
**Status:** Approved
**Designer:** Claude Sonnet 4.5 + User Collaboration

## Overview

Transform the Selected Work section from a static 2x2 grid into a dynamic 3D carousel with horizontal merry-go-round rotation. The carousel will display 5 items (4 projects + 1 CTA card) with the active item shown as a golden rectangle while inactive items are squares. Auto-rotation with pause-on-interaction creates engagement while maintaining a minimal aesthetic.

## Design Goals

- **Visual Interest:** 3D rotation creates depth without overwhelming minimalism
- **Accessibility:** Full keyboard navigation, screen reader support, motion preferences
- **Mobile-Friendly:** Responsive down to mobile with swipe gestures
- **Conversion:** CTA card encourages engagement
- **Performance:** Smooth 60fps animations

---

## 1. Carousel Architecture & 3D Mechanics

### Card Positioning System

**5 Cards Total:**
- 4 project cards from `projects` data
- 1 special "Let's Work Together" CTA card

**Circular Arrangement:**
- Cards positioned in a circle with 72° spacing (360° / 5)
- Rotation radius: ~600px
- Uses `transform: rotateY()` for 3D positioning

**Position States:**
| Position | Rotation | Scale | Opacity | Description |
|----------|----------|-------|---------|-------------|
| 0 (active) | 0° | 1.0 | 1.0 | Front-center, golden rectangle |
| ±1 (near) | ±72° | 0.7 | 0.7 | Sides, visible squares |
| ±2 (far) | ±144° | 0.5 | 0.4 | Far sides, faded squares |

### 3D Transform Setup

**Container:**
```css
perspective: 1200px;
transform-style: preserve-3d;
```

**Minimal 3D Effect:**
- Subtle depth cues via scale and opacity (not dramatic tilts)
- Slight `translateZ(-200px)` for inactive cards to push back
- Active card at `translateZ(0)`

### Rotation Behavior

**Auto-Rotation:**
- Advances every 5 seconds
- Direction: Right (clockwise around carousel)
- Visual countdown: 1px progress bar grows under active card

**Pause Triggers:**
- Hover over carousel
- Keyboard focus on controls
- Manual navigation (arrows, swipe, dots)
- Clicking pause button

**Manual Controls:**
- Left/Right arrow buttons
- Keyboard: Arrow keys, Spacebar (pause/play)
- Touch: Swipe gestures (mobile)
- Progress dots: Click to jump to card

**Transition Timing:**
- Duration: 800ms
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth deceleration)

---

## 2. Responsive Behavior & Mobile Experience

### Desktop (≥1024px)

**Layout:**
- Full 5-card carousel visible
- Active card: 720px × 445px (golden ratio 1.618:1)
- Inactive cards: 400px × 400px (square)

**Interaction:**
- Arrow buttons on left/right sides (48px × 48px)
- Keyboard navigation enabled
- Hover pauses auto-rotation
- Mouse drag disabled (keyboard/buttons only)

### Tablet (768px - 1023px)

**Layout:**
- Show 3 cards (active + 1 on each side)
- Active card: 600px × 371px (scaled golden ratio)
- Inactive cards: 320px × 320px

**Interaction:**
- Touch swipe enabled
- Arrow buttons visible (44px × 44px - larger touch target)
- Keyboard navigation still available

### Mobile (<768px)

**Layout:**
- Show 1.5 cards (active card + partial peek of next)
- Active card: 90vw × calculated height (maintains golden ratio)
- Inactive cards: 280px × 280px (mostly off-screen)

**Interaction:**
- Primary: Swipe gestures
- Small arrow buttons in bottom corners (40px × 40px)
- Progress dots reduced size or hidden
- Auto-rotation interval increased to 6 seconds (more time on mobile)

### Touch/Swipe Implementation

**Using Framer Motion's Drag API:**
```typescript
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}
  onDragEnd={(e, { offset, velocity }) => {
    if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
      // Snap to next/previous card
      const direction = offset.x > 0 ? 'left' : 'right';
      navigateCarousel(direction);
    }
  }}
/>
```

**Swipe Behavior:**
- Minimum drag distance: 50px
- Velocity threshold: 500px/s for momentum skip
- Visual feedback: Cards follow finger during drag
- Snap animation: Same 800ms timing when released
- Haptic feedback on card snap (if supported)

---

## 3. Card Design & Content Layout

### Active Card (Golden Rectangle)

**Dimensions:**
- Desktop: 720px × 445px (ratio 1.618:1)
- Tablet: 600px × 371px
- Mobile: 90vw × (90vw / 1.618)

**Styling:**
```css
.card--active {
  border: 2px solid black;
  overflow: hidden;
  position: relative;
}

.card--active img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 200ms ease-out;
}

.card--active:hover img {
  transform: scale(1.02);
}
```

### Inactive Cards (Squares)

**Dimensions:**
- Desktop: 400px × 400px
- Tablet: 320px × 320px
- Mobile: 280px × 280px

**Styling:**
```css
.card--inactive {
  border: 1px solid black;
  opacity: var(--card-opacity); /* 0.7 or 0.4 */
}

.card--far {
  filter: saturate(0.7); /* Slight desaturation */
}
```

### Content Below Cards

**Layout Structure:**
```
┌─────────────────────┐
│   [Card Image]      │
└─────────────────────┘
         ↓ 16px gap
Project Title              ← text-xl font-bold text-black
         ↓ 8px gap
Tech • Tech • Tech         ← text-sm text-gray-500 (max 3 tags)
         ↓ 8px gap
View Project →             ← text-sm underline text-black hover:text-gray-600
```

**Tech Stack Display:**
- Maximum 3 tags shown
- Separated by bullet dots (•)
- Truncated with "..." if more than 3
- Example: "Next.js • TypeScript • Tailwind"

**Link Behavior:**
- Underlined by default (consistent with site style)
- Hover: text-gray-600
- Active card link is focusable, inactive cards are not

### 5th Special Card ("Let's Work Together")

**When Inactive (Square - 400px × 400px):**
```
┌─────────────────────┐
│                     │
│   Let's Work        │
│   Together          │
│                     │
│   Start a Project → │
│                     │
└─────────────────────┘
```
- Background: solid black (#000000)
- Text: white, centered
- Title: text-2xl font-bold
- Link: text-base underline

**When Active (Golden Rectangle - 720px × 445px):**
- Same layout, larger typography
- Title: text-4xl font-bold
- Link: text-lg underline
- More generous padding

**Link Target:**
- Points to contact form: `#contact` or `/contact`
- Opens in same page (smooth scroll if anchor)

---

## 4. Navigation Controls & Accessibility

### Visual Controls

**Arrow Buttons:**

*Desktop:*
```css
.carousel-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid black;
  background: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-arrow--left { left: -80px; }
.carousel-arrow--right { right: -80px; }

.carousel-arrow:hover {
  background: black;
  color: white;
}
```

*Mobile:*
- Positioned at bottom corners (not overlaying cards)
- Size: 40px × 40px
- Fixed positioning relative to viewport

**Progress Indicators (Dots):**
```
● ○ ○ ○ ○
```
- Position: Centered below carousel, 24px gap from cards
- Active dot: 8px filled circle, black
- Inactive dots: 6px outlined circles, gray-400
- Spacing: 12px between dots
- Clickable to jump to specific card
- Hover: slight scale(1.2)

**Pause/Play Button:**
- Icon: ⏸ (pause) or ▶ (play)
- Size: 32px × 32px
- Position: Next to progress dots (right side)
- Keyboard shortcut: Spacebar
- Visual state change on toggle

### Keyboard Accessibility

**Keyboard Shortcuts:**
| Key | Action |
|-----|--------|
| Left Arrow | Previous card |
| Right Arrow | Next card |
| Spacebar | Pause/Play auto-rotation |
| Tab | Focus through controls and active card link |
| Enter | Activate focused link/button |
| Home | Jump to first card |
| End | Jump to last card |

**Focus Management:**
- Focus order: Left arrow → Active card link → Right arrow → Pause/Play → Dots
- Focus indicator: 2px solid black outline, 2px offset
- Active card link is focusable, inactive card links are `tabindex="-1"`
- Focus trap when paused (optional for accessibility)

### Screen Reader Support

**Semantic HTML:**
```html
<section
  role="region"
  aria-label="Featured Projects Carousel"
  aria-roledescription="carousel"
>
  <div aria-live="polite" aria-atomic="true">
    <article aria-label="Project: Portuguese Verb Conjugator, 1 of 5">
      <!-- Card content -->
    </article>
  </div>

  <button aria-label="Previous project">‹</button>
  <button aria-label="Next project">›</button>
  <button aria-label="Pause auto-rotation" aria-pressed="false">⏸</button>

  <div role="tablist" aria-label="Carousel navigation">
    <button role="tab" aria-selected="true" aria-label="Project 1">•</button>
    <button role="tab" aria-selected="false" aria-label="Project 2">○</button>
  </div>
</section>
```

**Live Region Announcements:**
- On card change: "Now showing: [Project Title]"
- On pause: "Carousel paused"
- On play: "Carousel auto-playing"
- Announcement delay: 500ms (prevent spam during rapid navigation)

**ARIA Attributes:**
- `aria-label` on all interactive controls
- `aria-live="polite"` for non-intrusive announcements
- `aria-pressed` for pause/play toggle state
- `aria-current="true"` for active progress dot

### Motion Preferences

**Respecting `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  .carousel-card {
    transition-duration: 100ms !important; /* Instant feel */
  }
}
```

**When Reduced Motion Enabled:**
- Auto-rotation disabled by default
- Transitions reduced to 100ms (snappy cuts)
- 3D transforms remain (static positioning)
- Scale/opacity changes still occur (helps orientation)
- User can manually enable auto-rotation via Pause/Play button

---

## 5. Animation System & Timing

### Card Transition Animation (800ms)

**Simultaneous Animations:**
```typescript
const cardAnimation = {
  rotateY: [currentRotation, targetRotation], // e.g., 0° → 72°
  scale: [currentScale, targetScale],         // e.g., 1.0 → 0.7
  opacity: [currentOpacity, targetOpacity],   // e.g., 1.0 → 0.7
  zIndex: targetZIndex,                       // Immediate, no transition
};

const transition = {
  duration: 0.8,
  ease: [0.4, 0, 0.2, 1], // cubic-bezier
};
```

**All 5 Cards Animate Together:**
- Creates natural "rotating carousel" perception
- No stagger between cards (simultaneous = smoother)
- Each card has different start/end values but same timing

### Golden Rectangle Morph

**Aspect Ratio Transition:**
```typescript
// Square (inactive) → Golden Rectangle (active)
const morphAnimation = {
  width: [400, 720],
  height: [400, 445],
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
};
```

**Image Handling:**
- `object-fit: cover` prevents stretching
- Image remains centered during morph
- Smooth crop adjustment as aspect changes

### Auto-Rotation Timing

**Interval Logic:**
```typescript
useEffect(() => {
  if (!isAutoPlaying) return;

  const interval = setInterval(() => {
    navigateNext();
  }, 5000); // 5 seconds per card

  return () => clearInterval(interval);
}, [isAutoPlaying, activeIndex]);
```

**Progress Bar Animation:**
```css
.progress-bar {
  width: 0%;
  height: 1px;
  background: black;
  animation: grow 5s linear;
}

@keyframes grow {
  from { width: 0%; }
  to { width: 100%; }
}
```
- Positioned directly under active card
- Resets on manual navigation
- Pauses when auto-rotation paused

### Hover Interactions

**Card Hover (Active Only):**
```css
.card--active:hover .card__image {
  transform: scale(1.02);
  transition: transform 200ms ease-out;
}
```

**Button Hover:**
```css
.carousel-button:hover {
  background: black;
  color: white;
  transition: all 150ms ease-out;
}
```

**Cursor States:**
- Pointer on: buttons, dots, active card link
- Grab on: carousel during drag (mobile)
- Default on: inactive areas

### Loading States

**Initial Load:**
```typescript
const staggerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
};
```
- Cards fade in sequentially with 100ms stagger
- Total load animation: 500ms (5 cards × 100ms)

**Image Loading:**
```html
<div class="skeleton-loader" aria-busy="true">
  <!-- Gray gradient shimmer -->
</div>
<img
  src={imageUrl}
  loading="lazy"
  onLoad={() => setLoaded(true)}
/>
```
- Skeleton shows while image loads
- Smooth crossfade (300ms) when image ready
- Prevents layout shift

---

## 6. Component Architecture & Data Flow

### Component Hierarchy

```
SelectedWork/
├── SelectedWork.tsx (parent wrapper)
└── Carousel3D/
    ├── Carousel3D.tsx (main logic & state)
    ├── CarouselCard.tsx (individual card)
    ├── ProjectImage.tsx (image with loading)
    ├── CarouselControls.tsx (arrows, pause/play)
    ├── CarouselIndicators.tsx (progress dots)
    └── CardContent.tsx (text below card)
```

### State Management

**In Carousel3D.tsx:**
```typescript
interface Carousel3DProps {
  items: CarouselItem[];
  autoPlayInterval?: number; // default 5000ms
}

const Carousel3D = ({ items, autoPlayInterval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation effect
  useEffect(() => { /* ... */ }, [isAutoPlaying, activeIndex]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Navigation functions
  const navigateNext = () => { /* ... */ };
  const navigatePrev = () => { /* ... */ };
  const navigateToIndex = (index: number) => { /* ... */ };
};
```

### Data Structure

**CarouselItem Type:**
```typescript
type CarouselItem = {
  id: string;
  type: 'project' | 'cta';
  // For projects:
  title?: string;
  imageUrl?: string;
  techStack?: string[]; // Full array, display logic handles max 3
  projectUrl?: string;
  // For CTA:
  ctaTitle?: string;
  ctaLink?: string;
  ctaText?: string;
};
```

**Data Preparation (in SelectedWork.tsx):**
```typescript
const carouselItems: CarouselItem[] = [
  ...projects.map(p => ({
    type: 'project' as const,
    id: p.id,
    title: p.title,
    imageUrl: p.imageUrl,
    techStack: p.techStack,
    projectUrl: p.liveUrl || p.codeUrl
  })),
  {
    type: 'cta' as const,
    id: 'cta-work-together',
    ctaTitle: "Let's Work Together",
    ctaText: 'Start a Project →',
    ctaLink: '#contact'
  }
];
```

### Card Position Calculation

**Core Algorithm:**
```typescript
const getCardTransform = (cardIndex: number, activeIndex: number) => {
  // Calculate relative position (-2, -1, 0, 1, 2)
  let diff = cardIndex - activeIndex;

  // Handle wrapping (carousel is circular)
  if (diff > 2) diff -= 5;
  if (diff < -2) diff += 5;

  const rotation = diff * 72; // 72° per position
  const isActive = diff === 0;
  const isNear = Math.abs(diff) === 1;
  const isFar = Math.abs(diff) === 2;

  return {
    rotateY: rotation,
    scale: isActive ? 1 : isNear ? 0.7 : 0.5,
    opacity: isActive ? 1 : isNear ? 0.7 : 0.4,
    zIndex: 5 - Math.abs(diff),
    translateZ: isActive ? 0 : -200,
    // Aspect ratio (for width/height animation)
    isGoldenRect: isActive,
  };
};
```

**Usage in Render:**
```typescript
{carouselItems.map((item, index) => {
  const transform = getCardTransform(index, activeIndex);
  return (
    <CarouselCard
      key={item.id}
      item={item}
      transform={transform}
      isActive={transform.isGoldenRect}
    />
  );
})}
```

### Props Flow

**Carousel3D → CarouselCard:**
```typescript
interface CarouselCardProps {
  item: CarouselItem;
  transform: CardTransform;
  isActive: boolean;
}
```

**Carousel3D → CarouselControls:**
```typescript
interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onToggleAutoPlay: () => void;
  isAutoPlaying: boolean;
}
```

**Carousel3D → CarouselIndicators:**
```typescript
interface CarouselIndicatorsProps {
  totalItems: number;
  activeIndex: number;
  onNavigate: (index: number) => void;
}
```

---

## 7. Technical Implementation Details

### CSS 3D Setup

**Container:**
```css
.carousel-3d {
  perspective: 1200px;
  perspective-origin: 50% 50%;
  position: relative;
  width: 100%;
  height: 600px; /* Adjust based on card size */
  overflow: visible; /* Allow cards to extend outside */
}

.carousel-3d__stage {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
```

**Card Positioning:**
```css
.carousel-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  /* Framer Motion handles transform */
}
```

### Framer Motion Implementation

**Card Animation:**
```typescript
<motion.div
  className="carousel-card"
  animate={{
    rotateY: transform.rotateY,
    scale: transform.scale,
    opacity: transform.opacity,
    translateZ: transform.translateZ,
    width: transform.isGoldenRect ? 720 : 400,
    height: transform.isGoldenRect ? 445 : 400,
  }}
  transition={{
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1],
  }}
  style={{
    zIndex: transform.zIndex,
  }}
>
  {/* Card content */}
</motion.div>
```

**Drag Implementation (Mobile):**
```typescript
const [dragOffset, setDragOffset] = useState(0);

<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}
  onDrag={(e, info) => {
    setDragOffset(info.offset.x);
  }}
  onDragEnd={(e, { offset, velocity }) => {
    const threshold = 50;
    const velocityThreshold = 500;

    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > velocityThreshold) {
      const direction = offset.x > 0 ? 'left' : 'right';
      navigate(direction);
    }

    setDragOffset(0);
  }}
/>
```

### Performance Optimizations

**GPU Acceleration:**
```css
.carousel-card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}
```

**Image Optimization:**
- Use Next.js `<Image>` component
- Lazy load inactive card images
- Preload next/prev card images
- Serve WebP/AVIF formats

**Animation Performance:**
- Animate only `transform` and `opacity` (GPU properties)
- Avoid animating `width`/`height` if possible (layout thrashing)
- Use `transform: scale()` for size changes when acceptable
- Limit to 60fps, use `requestAnimationFrame` for custom animations

**React Optimization:**
```typescript
// Memoize card components
const CarouselCard = memo(({ item, transform, isActive }) => {
  // ...
});

// Memoize transform calculations
const cardTransforms = useMemo(
  () => carouselItems.map((_, i) => getCardTransform(i, activeIndex)),
  [activeIndex, carouselItems.length]
);
```

---

## 8. Edge Cases & Error Handling

### Empty/Missing Data

**No Projects:**
```typescript
if (carouselItems.length === 0) {
  return <EmptyState message="No projects yet" />;
}
```

**Missing Images:**
- Show placeholder image (1px gray border rectangle)
- Alt text: "Project image unavailable"
- Don't block carousel functionality

**Missing Tech Stack:**
- Show empty space (no crash)
- Or display fallback: "View Project →" only

### Browser Compatibility

**3D Transform Support:**
```typescript
const supports3D = () => {
  const el = document.createElement('div');
  return 'perspective' in el.style;
};

// Fallback: 2D carousel if no 3D support
if (!supports3D()) {
  return <Carousel2DFallback items={carouselItems} />;
}
```

**Reduced Motion:**
- Detect `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Apply 100ms transitions
- Disable auto-rotation by default

### Touch Device Detection

```typescript
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Enable swipe only on touch devices
const dragEnabled = isTouchDevice();
```

### Keyboard Navigation Edge Cases

- **Rapid Key Presses:** Debounce navigation to prevent animation queue buildup
- **Focus Loss:** Return focus to last control after card navigation
- **Screen Reader + Keyboard:** Ensure announcements don't block keyboard shortcuts

---

## 9. Testing Strategy

### Visual Regression Testing

**Key Screenshots:**
- Desktop: Active card (golden), near cards, far cards
- Tablet: 3-card view
- Mobile: 1.5-card view
- All states: default, hover, focus

**Using Playwright:**
```typescript
test('carousel displays in 3D layout', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.carousel-3d');
  await expect(page).toHaveScreenshot('carousel-desktop.png');
});
```

### Accessibility Testing

**Automated:**
- Axe-core for WCAG violations
- Pa11y for screen reader compatibility
- Lighthouse accessibility score > 95

**Manual:**
- Test with VoiceOver (macOS) and NVDA (Windows)
- Keyboard-only navigation
- High contrast mode
- 200% zoom level

### Animation Performance

**Chrome DevTools:**
- Record performance during transitions
- Target: 60fps (16ms per frame)
- Check for layout thrashing
- Monitor memory usage

**Metrics:**
```typescript
test('carousel transitions smoothly', async ({ page }) => {
  const metrics = await page.evaluate(() => {
    let frameCount = 0;
    let totalTime = 0;

    requestAnimationFrame(function measure(time) {
      frameCount++;
      totalTime = time;
      if (frameCount < 100) requestAnimationFrame(measure);
    });

    return { fps: frameCount / (totalTime / 1000) };
  });

  expect(metrics.fps).toBeGreaterThan(55); // Close to 60fps
});
```

### Cross-Browser Testing

**Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest, macOS + iOS)
- Edge (latest)

**Devices:**
- Desktop: 1920×1080, 1440×900
- Tablet: iPad (1024×768)
- Mobile: iPhone 14 (390×844), Pixel 7 (412×915)

---

## 10. Implementation Checklist

### Phase 1: Core Carousel Structure
- [ ] Create component files (Carousel3D, CarouselCard, etc.)
- [ ] Set up data structure (CarouselItem type)
- [ ] Implement card position calculation
- [ ] Add CSS 3D perspective container
- [ ] Test with static cards (no animation)

### Phase 2: Animation System
- [ ] Integrate Framer Motion
- [ ] Implement card transition animations
- [ ] Add golden rectangle morph
- [ ] Test smooth 800ms transitions
- [ ] Verify 60fps performance

### Phase 3: Navigation Controls
- [ ] Add arrow buttons (left/right)
- [ ] Implement progress dots
- [ ] Add pause/play button
- [ ] Connect keyboard shortcuts
- [ ] Test all navigation methods

### Phase 4: Auto-Rotation
- [ ] Implement auto-play interval
- [ ] Add pause-on-hover logic
- [ ] Create progress bar animation
- [ ] Test resume after manual navigation
- [ ] Verify memory cleanup (no leaks)

### Phase 5: Mobile/Touch
- [ ] Add swipe gesture support
- [ ] Implement responsive breakpoints
- [ ] Adjust layout for mobile (1.5 cards)
- [ ] Test on real devices
- [ ] Verify touch targets (44×44px min)

### Phase 6: Accessibility
- [ ] Add ARIA labels and roles
- [ ] Implement live region announcements
- [ ] Test keyboard navigation
- [ ] Screen reader testing
- [ ] Add reduced motion support

### Phase 7: Polish & Edge Cases
- [ ] Image loading states (skeleton)
- [ ] Error handling (missing images)
- [ ] Browser compatibility checks
- [ ] Performance optimizations
- [ ] Cross-device testing

### Phase 8: Documentation & Deployment
- [ ] Update component documentation
- [ ] Write usage examples
- [ ] Performance metrics
- [ ] Deploy to staging
- [ ] Final QA and launch

---

## Success Criteria

✅ **Visual Design:**
- Active card clearly emphasized (golden rectangle)
- Smooth 3D rotation effect
- Minimal aesthetic maintained

✅ **Performance:**
- 60fps animations
- < 100ms input latency
- Images load without blocking

✅ **Accessibility:**
- WCAG 2.1 AA compliant
- Full keyboard navigation
- Screen reader compatible
- Respects motion preferences

✅ **Mobile Experience:**
- Smooth swipe gestures
- Responsive down to 375px
- Touch targets ≥ 44×44px

✅ **Conversion:**
- CTA card increases contact form submissions by 15%+
- Average time on page increases by 30%+

---

## Future Enhancements (Out of Scope)

- **Vertical Carousel Mode:** Toggle between horizontal/vertical rotation
- **Thumbnail Strip:** Small thumbnails below for direct navigation
- **Video Support:** Play video in active card
- **Deep Linking:** URL hash for specific card (#work/project-1)
- **Analytics:** Track which projects get the most views/clicks
- **Infinite Scroll:** Add more projects dynamically on demand

---

**End of Design Document**
