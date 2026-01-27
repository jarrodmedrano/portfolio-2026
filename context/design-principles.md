# Design Principles Checklist

## Visual Hierarchy

### Typography
- [ ] Clear heading hierarchy (H1 → H6)
- [ ] Font sizes scale proportionally (type scale: 1.125, 1.25, or 1.5)
- [ ] Line height: 1.5 for body text, 1.2-1.3 for headings
- [ ] Paragraph spacing sufficient for readability
- [ ] Maximum line length: 60-75 characters for optimal readability
- [ ] Font weights used consistently (Regular/400, Medium/500, Semibold/600, Bold/700)

### Color & Contrast
- [ ] WCAG AA minimum: 4.5:1 for normal text, 3:1 for large text
- [ ] WCAG AAA target: 7:1 for normal text, 4.5:1 for large text
- [ ] Color never used as sole indicator of information
- [ ] Links visually distinguishable from regular text
- [ ] Focus states clearly visible (min 3:1 contrast ratio)
- [ ] Error states use color + icon/text

### Spacing & Layout
- [ ] Consistent spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- [ ] Adequate white space around interactive elements
- [ ] Minimum touch target: 44×44px (mobile), 40×40px (desktop)
- [ ] Content grouped logically with proximity
- [ ] Grid system used consistently
- [ ] Alignment consistent throughout interface

## Responsive Design

### Breakpoints
- [ ] Mobile: 320px - 767px
- [ ] Tablet: 768px - 1023px
- [ ] Desktop: 1024px - 1439px
- [ ] Large Desktop: 1440px+
- [ ] Content tested at all breakpoints
- [ ] No horizontal scrolling at any viewport

### Mobile Considerations
- [ ] Touch targets appropriately sized
- [ ] Text readable without zoom (min 16px)
- [ ] Navigation accessible with one hand
- [ ] Forms optimized for mobile input
- [ ] Images optimized for mobile bandwidth

## Accessibility (WCAG 2.1 AA)

### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Logical tab order maintained
- [ ] Focus indicators clearly visible
- [ ] Skip links for main content navigation
- [ ] No keyboard traps
- [ ] Shortcut keys documented

### Screen Readers
- [ ] Semantic HTML used correctly
- [ ] ARIA labels provided where needed
- [ ] Images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Error messages associated with fields
- [ ] Dynamic content changes announced

### Interactive Elements
- [ ] Buttons vs links used semantically
- [ ] Disabled states clearly indicated
- [ ] Loading states communicated
- [ ] Error states descriptive and actionable
- [ ] Success feedback provided

## Performance

### Loading & Rendering
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.8s
- [ ] Images lazy-loaded below the fold
- [ ] Fonts optimized (font-display: swap)

### Perceived Performance
- [ ] Loading skeletons for async content
- [ ] Optimistic UI updates where appropriate
- [ ] Smooth animations (60fps)
- [ ] Debounced search/filter inputs
- [ ] Pagination/virtualization for long lists

## Components

### Buttons
- [ ] Primary, secondary, tertiary variants clearly defined
- [ ] Destructive actions visually distinct
- [ ] Disabled state visually clear
- [ ] Loading state provided
- [ ] Icon + text buttons have proper spacing
- [ ] Button labels action-oriented and clear

### Forms
- [ ] Labels visible and associated with inputs
- [ ] Required fields clearly marked
- [ ] Placeholder text not used as labels
- [ ] Validation inline and real-time where helpful
- [ ] Error messages specific and actionable
- [ ] Success confirmation provided
- [ ] Multi-step forms show progress

### Navigation
- [ ] Current page/section clearly indicated
- [ ] Breadcrumbs for deep hierarchies
- [ ] Mobile navigation accessible
- [ ] Search prominent if site has >20 pages
- [ ] Footer navigation comprehensive

### Data Display
- [ ] Tables responsive (stack, scroll, or cards)
- [ ] Empty states informative and actionable
- [ ] Loading states consistent
- [ ] Pagination controls clear
- [ ] Filters easy to discover and use

## User Experience

### Feedback & Communication
- [ ] Actions provide immediate feedback
- [ ] Success messages affirming
- [ ] Error messages helpful and specific
- [ ] Confirmation for destructive actions
- [ ] Progress indicators for long operations

### Content
- [ ] Microcopy clear and concise
- [ ] Tone consistent with brand
- [ ] Error messages friendly and actionable
- [ ] Empty states guide next steps
- [ ] Help text available where needed

### Interaction Patterns
- [ ] Hover states indicate interactivity
- [ ] Active states show current selection
- [ ] Animations purposeful, not decorative
- [ ] Transitions smooth (<300ms)
- [ ] Scroll behavior natural

## Cross-Browser Compatibility

### Browser Support
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Graceful degradation for older browsers

### Testing
- [ ] Functionality tested in all target browsers
- [ ] Layout consistent across browsers
- [ ] Vendor prefixes included where needed

## Security & Privacy

### User Data
- [ ] Privacy policy linked
- [ ] Data collection purposes clear
- [ ] User consent obtained appropriately
- [ ] Password fields secure (type="password")
- [ ] Sensitive data never in URLs

### Forms
- [ ] CSRF protection implemented
- [ ] Input validation client + server side
- [ ] Rate limiting on submissions
- [ ] Autocomplete attributes set correctly

## Polish

### Visual Design
- [ ] Consistent border radius
- [ ] Consistent shadow depths
- [ ] Icon style consistent
- [ ] Imagery high quality and optimized
- [ ] Dark mode supported (if applicable)

### Micro-interactions
- [ ] Button press feedback
- [ ] Form input focus animations
- [ ] Success/error animations
- [ ] Page transition smoothness
- [ ] Loading state animations

## Pre-launch Checklist

- [ ] All designs match approved mockups
- [ ] Responsive behavior verified at all breakpoints
- [ ] Accessibility audit completed (WAVE, axe)
- [ ] Performance audit completed (Lighthouse)
- [ ] Cross-browser testing completed
- [ ] User testing conducted
- [ ] Content proofread
- [ ] Images optimized
- [ ] Meta tags/SEO implemented
- [ ] Analytics tracking verified
