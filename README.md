# Port New - Full-Stack Next.js Application

A modern full-stack web application built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Prisma ORM** with PostgreSQL
- **JWT Authentication** (login/register)
- **API Routes** with middleware
- **Vitest** for testing
- **ESLint** with Airbnb style guide
- **Husky** pre-commit hooks
- **ES Modules** configuration

## Project Structure

```
port-new/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── public/                 # Static files
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # Authentication endpoints
│   │   │   ├── users/     # User endpoints
│   │   │   └── health/    # Health check
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   ├── lib/
│   │   ├── auth.ts        # Authentication utilities
│   │   ├── middleware.ts  # API middleware
│   │   └── prisma.ts      # Prisma client
│   └── test/
│       └── setup.ts       # Test configuration
├── .env.example           # Environment variables template
├── .eslintrc.cjs          # ESLint configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vitest.config.ts       # Vitest configuration
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/port_new"
JWT_SECRET="your-super-secret-jwt-key-change-this"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set Up PostgreSQL Database

Make sure you have PostgreSQL installed and running. Create a database:

```bash
createdb port_new
```

### 4. Initialize Database

Generate Prisma client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

### 5. Seed Database (Optional)

Populate the database with sample data:

```bash
npm run db:seed
```

This creates a test user:
- Email: `test@example.com`
- Password: `password123`

### 6. Initialize Husky

Set up Git hooks:

```bash
npm run prepare
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests in watch mode |
| `npm run test:ui` | Open Vitest UI |
| `npm run test:coverage` | Generate test coverage report |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Create and run migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## API Endpoints

### Authentication

**POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Protected Routes

**GET /api/users/me**
```
Headers:
  Authorization: Bearer <token>
```

### Health Check

**GET /api/health**

Returns server status and timestamp.

## Testing

This project uses Vitest for testing with React Testing Library.

Run tests:
```bash
npm test
```

View test UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run test:coverage
```

Example test file: `src/components/Button.test.tsx`

## Code Quality

### ESLint

The project uses ESLint with Airbnb style guide. Configuration is in `.eslintrc.cjs`.

Run linter:
```bash
npm run lint
```

### Pre-commit Hooks

Husky runs ESLint on staged files before each commit. This ensures code quality standards are maintained.

## Database Management

### Prisma Studio

Open a visual editor for your database:
```bash
npm run db:studio
```

### Migrations

Create a new migration:
```bash
npm run db:migrate
```

Push schema changes without creating a migration:
```bash
npm run db:push
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app | `http://localhost:3000` |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure your platform supports:
- Node.js 18+
- PostgreSQL database
- Environment variables

Build command: `npm run build`
Start command: `npm run start`

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with bcryptjs
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint with Airbnb config
- **Git Hooks**: Husky + lint-staged

## License

MIT
