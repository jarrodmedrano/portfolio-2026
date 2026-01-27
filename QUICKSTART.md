# Quick Start Guide

Get your application running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed and running
- Git installed

## Steps

### 1. Clone and Install

```bash
cd port-new
npm install
```

### 2. Set Up Database

Create a PostgreSQL database:

```bash
createdb port_new
```

Or use a cloud database service like:
- [Neon](https://neon.tech) (free tier available)
- [Supabase](https://supabase.com) (free tier available)
- [Railway](https://railway.app) (free tier available)

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/port_new"
JWT_SECRET="change-this-to-a-random-secret-string"
```

### 4. Initialize Database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test the API

### Health Check

```bash
curl http://localhost:3000/api/health
```

### Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Copy the `token` from the response.

### Get Current User

```bash
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Next Steps

- Explore the codebase starting with `src/app/page.tsx`
- Add new API routes in `src/app/api/`
- Create new components in `src/components/`
- Update the Prisma schema in `prisma/schema.prisma`
- Write tests in `*.test.tsx` files

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error

- Verify PostgreSQL is running: `pg_isready`
- Check your DATABASE_URL in `.env`
- Ensure the database exists: `psql -l`

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### ESLint Errors

```bash
# Run linter to see issues
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)
