# Development Checklist

Use this checklist to track your setup and development progress.

## Initial Setup

- [ ] Install Node.js 18+
- [ ] Install PostgreSQL
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Update DATABASE_URL in `.env`
- [ ] Update JWT_SECRET in `.env`
- [ ] Run `npm run db:generate`
- [ ] Run `npm run db:push`
- [ ] Run `npm run db:seed` (optional)
- [ ] Run `npm run dev` to verify setup
- [ ] Visit http://localhost:3000
- [ ] Test `/api/health` endpoint
- [ ] Run `npm test` to verify tests

## Before Every Development Session

- [ ] Pull latest changes: `git pull`
- [ ] Install dependencies: `npm install`
- [ ] Generate Prisma client: `npm run db:generate`
- [ ] Start dev server: `npm run dev`

## During Development

### When Adding New Features

- [ ] Create a new branch: `git checkout -b feature/your-feature`
- [ ] Write tests first (TDD approach)
- [ ] Implement the feature
- [ ] Run tests: `npm test`
- [ ] Run linter: `npm run lint`
- [ ] Verify build: `npm run build`

### When Modifying Database

- [ ] Update `prisma/schema.prisma`
- [ ] Run `npm run db:generate`
- [ ] Run `npm run db:push` (or `npm run db:migrate` for production)
- [ ] Update seed file if needed
- [ ] Test database changes
- [ ] Update API types if needed

### When Creating Components

- [ ] Create component in `src/components/`
- [ ] Create test file `ComponentName.test.tsx`
- [ ] Write tests
- [ ] Implement component
- [ ] Verify tests pass
- [ ] Add TypeScript types
- [ ] Document props with JSDoc if complex

### When Adding API Routes

- [ ] Create route in `src/app/api/`
- [ ] Add route handler (GET, POST, etc.)
- [ ] Add authentication if needed
- [ ] Validate input
- [ ] Handle errors properly
- [ ] Add TypeScript types
- [ ] Test with curl or Postman
- [ ] Document endpoint in README

## Before Committing

- [ ] Run tests: `npm test -- --run`
- [ ] Run linter: `npm run lint`
- [ ] Check for TypeScript errors: `npm run build`
- [ ] Review your changes: `git diff`
- [ ] Stage changes: `git add .`
- [ ] Commit with clear message: `git commit -m "feat: add user profile page"`

Note: Husky will automatically run lint-staged before commit.

## Before Merging to Main

- [ ] All tests pass
- [ ] No linting errors
- [ ] Build succeeds
- [ ] Updated README if needed
- [ ] No console.log statements (unless intentional)
- [ ] No commented-out code
- [ ] Environment variables documented in `.env.example`
- [ ] Database migrations created and tested

## Before Deployment

### Staging Deployment

- [ ] Set NODE_ENV=production in environment
- [ ] Test production build locally: `npm run build && npm start`
- [ ] Verify all environment variables are set
- [ ] Run database migrations
- [ ] Test critical user flows
- [ ] Check error logging

### Production Deployment

- [ ] All staging checks passed
- [ ] Backup database
- [ ] Set up monitoring/alerts
- [ ] Configure rate limiting
- [ ] Set up proper error logging
- [ ] Test rollback procedure
- [ ] Document deployment process
- [ ] Notify team of deployment

## Code Quality Checklist

### TypeScript

- [ ] No `any` types (use specific types)
- [ ] All functions have return types
- [ ] Interfaces for complex objects
- [ ] Enums for fixed sets of values

### Testing

- [ ] Unit tests for utilities
- [ ] Component tests for UI
- [ ] Integration tests for API routes
- [ ] Edge cases covered
- [ ] Error cases tested

### Security

- [ ] Passwords hashed (never stored plain text)
- [ ] JWT tokens secured with strong secret
- [ ] Input validation on all endpoints
- [ ] SQL injection prevented (Prisma handles this)
- [ ] XSS prevention (React handles this)
- [ ] CSRF protection if using cookies
- [ ] Rate limiting on authentication endpoints
- [ ] No secrets in code (use environment variables)

### Performance

- [ ] Database queries optimized
- [ ] Proper indexes on database
- [ ] Images optimized
- [ ] Bundle size checked
- [ ] API responses cached when appropriate
- [ ] No N+1 query problems

### Accessibility

- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient
- [ ] Focus states visible

## Troubleshooting Checklist

### App Won't Start

- [ ] Check port 3000 is available
- [ ] Verify Node.js version (18+)
- [ ] Clear `.next` folder: `rm -rf .next`
- [ ] Reinstall dependencies: `rm -rf node_modules && npm install`
- [ ] Check for syntax errors in config files

### Database Issues

- [ ] Verify PostgreSQL is running: `pg_isready`
- [ ] Check DATABASE_URL is correct
- [ ] Verify database exists: `psql -l`
- [ ] Run `npm run db:generate`
- [ ] Run `npm run db:push`

### Test Failures

- [ ] Clear test cache
- [ ] Check test file syntax
- [ ] Verify imports are correct
- [ ] Run single test: `npm test -- Button.test.tsx`
- [ ] Check for async issues

### Build Errors

- [ ] Check TypeScript errors: `npx tsc --noEmit`
- [ ] Verify all imports exist
- [ ] Check for circular dependencies
- [ ] Clear `.next` and rebuild

### Linting Errors

- [ ] Run `npm run lint -- --fix` to auto-fix
- [ ] Check ESLint config is correct
- [ ] Verify file extensions are correct (.tsx for JSX)

## Resources

- [Git Commit Messages Guide](https://www.conventionalcommits.org/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)
