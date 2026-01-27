# New Full-Stack Project

**Trigger**: `/new-fullstack [project-name]`

**Description**: Creates a new full-stack web application with frontend and backend

---

## CRITICAL: Version Compatibility Notes

For **Next.js Full-Stack** projects, dependency versions MUST be exact to avoid conflicts:
- **ESLint**: Use 8.57.0 (NOT v9) - Airbnb config requires ESLint 8
- **@typescript-eslint**: Use v7.18.0 (NOT v8) - airbnb-typescript requires v7
- **eslint-plugin-react-hooks**: Use v4.6.2 (NOT v5) - Airbnb requires v4
- **ESLint config order**: Put 'next/core-web-vitals' LAST to avoid plugin conflicts
- **Required dependencies**: Include @vitejs/plugin-react, tsx, autoprefixer

These versions are tested and work together. Do NOT upgrade or use `latest` tags.

---

When this skill is invoked:

1. Ask the user which full-stack setup they want:
   - Next.js (App Router + API Routes + TypeScript)
   - T3 Stack (Next.js + tRPC + Prisma + Tailwind)
   - MERN (MongoDB + Express + React + Node)
   - Monorepo (React frontend + Express backend + shared types)
   - Solito (Expo + Next.js + shared navigation - Universal app for web + mobile)

2. Extract the project name from args, or ask if not provided

3. **IMPORTANT: Installation Order for Next.js projects**:
   1. Create all config files first (package.json, tsconfig.json, etc.)
   2. Run `npm install` (dependencies will install with correct versions)
   3. Run `npx husky init` to set up git hooks
   4. Update `.husky/pre-commit` to use `npx lint-staged`
   5. Run `npx prisma generate` if using Prisma
   6. Test build with `npm run build`
   7. Test tests with `npm test -- --run`

4. Create the project based on choice:

   **Next.js Full-Stack**:
   - Ask for database choice: Prisma + PostgreSQL, Prisma + SQLite, MongoDB + Mongoose, or Skip
   - Create project structure manually (don't use create-next-app to avoid version conflicts)
   - Create `package.json` with EXACT compatible versions:
     ```json
     {
       "name": "project-name",
       "version": "0.1.0",
       "type": "module",
       "private": true,
       "scripts": {
         "dev": "next dev",
         "build": "next build",
         "start": "next start",
         "lint": "next lint",
         "test": "vitest",
         "test:ui": "vitest --ui",
         "test:coverage": "vitest run --coverage",
         "prepare": "husky",
         "db:generate": "prisma generate",
         "db:push": "prisma db push",
         "db:migrate": "prisma migrate dev",
         "db:seed": "tsx prisma/seed.ts",
         "db:studio": "prisma studio"
       },
       "dependencies": {
         "react": "^19",
         "react-dom": "^19",
         "next": "^15",
         "@prisma/client": "^6.2.0",
         "bcryptjs": "^2.4.3",
         "jsonwebtoken": "^9.0.2"
       },
       "devDependencies": {
         "@types/node": "^22",
         "@types/react": "^19",
         "@types/react-dom": "^19",
         "@types/bcryptjs": "^2.4.6",
         "@types/jsonwebtoken": "^9.0.7",
         "typescript": "^5",
         "eslint": "^8.57.0",
         "eslint-config-next": "^15",
         "eslint-config-airbnb": "^19.0.4",
         "eslint-config-airbnb-typescript": "^18.0.0",
         "@typescript-eslint/eslint-plugin": "^7.18.0",
         "@typescript-eslint/parser": "^7.18.0",
         "eslint-plugin-import": "^2.31.0",
         "eslint-plugin-jsx-a11y": "^6.10.2",
         "eslint-plugin-react": "^7.37.2",
         "eslint-plugin-react-hooks": "^4.6.2",
         "husky": "^9.1.7",
         "lint-staged": "^15.2.11",
         "vitest": "^3.0.5",
         "@vitest/ui": "^3.0.5",
         "@vitest/coverage-v8": "^3.0.5",
         "@testing-library/react": "^16.1.0",
         "@testing-library/jest-dom": "^6.6.3",
         "jsdom": "^25.0.1",
         "prisma": "^6.2.0",
         "postcss": "^8",
         "tailwindcss": "^3.4.1",
         "@vitejs/plugin-react": "^4.3.4",
         "tsx": "^4.19.2",
         "autoprefixer": "^10.4.20"
       },
       "lint-staged": {
         "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"]
       },
       "prisma": {
         "seed": "tsx prisma/seed.ts"
       }
     }
     ```
   - **IMPORTANT VERSION NOTES**:
     * Use ESLint 8.57.0 (NOT v9) - Airbnb config requires ESLint 8.x
     * Use @typescript-eslint v7.18.0 (NOT v8.x) - airbnb-typescript requires v7
     * Use eslint-plugin-react-hooks v4.6.2 (NOT v5.x) - Airbnb requires v4.x
     * These versions are tested and compatible - do not upgrade
   - Create directory structure:
     ```bash
     mkdir -p src/app src/components src/lib src/test src/app/api/auth src/app/api/users prisma public
     ```
   - Create Next.js App Router files:
     * `src/app/layout.tsx` - Root layout with metadata
     * `src/app/page.tsx` - Home page
     * `src/app/globals.css` - Global styles with Tailwind
   - Create API routes:
     * `src/app/api/health/route.ts` - Health check endpoint
     * `src/app/api/auth/register/route.ts` - User registration
     * `src/app/api/auth/login/route.ts` - User login
     * `src/app/api/users/me/route.ts` - Protected user endpoint
   - Create utilities:
     * `src/lib/prisma.ts` - Prisma client singleton
     * `src/lib/auth.ts` - JWT and bcrypt utilities
     * `src/lib/middleware.ts` - Auth middleware wrapper
   - Create example component with test:
     * `src/components/Button.tsx` - Reusable button component
     * `src/components/Button.test.tsx` - Component tests
   - Create environment template:
     * `.env.example` with DATABASE_URL, JWT_SECRET, NODE_ENV
   - Set up Prisma schema with User and Post models (see step 14)
   - Create seed script (see step 14)

   **T3 Stack**:
   - `npm create t3-app@latest {project-name}`
   - Follow T3 setup prompts

   **MERN**:
   - Create root directory with client/ and server/ subdirectories
   - Client: React + Vite + TypeScript
   - Server: Express + TypeScript + MongoDB
   - Set up proxy configuration

   **Monorepo**:
   - Create monorepo structure (separate apps from component libraries):
     ```
     {project-name}/
       apps/
         web/              # Application code (React + Vite)
         api/              # Backend application (Express)
       packages/
         ui/               # Shared component library with Storybook
           src/
             components/
             index.ts
           .storybook/
           package.json
         shared/           # Shared TypeScript types and utilities
           src/
           package.json
       package.json        # Workspace config
     ```
   - Set up npm workspaces or pnpm workspace

   **Solito (Universal App)**:
   - Ask follow-up questions:
     * Package manager? (pnpm recommended, yarn, npm)
     * Include NativeWind? (Tailwind for React Native)
     * Include authentication? (Clerk, Supabase, custom, skip)
     * Include API layer? (tRPC, REST, skip)
     * Include UI library? (Tamagui, React Native Paper, custom, skip)

   - Use Solito starter template:
     ```bash
     npx create-solito-app@latest {project-name}
     ```
     Or create manually if custom setup needed

   - Create monorepo structure:
     ```
     {project-name}/
       apps/
         expo/              # React Native mobile app
           app/             # Expo Router file-system routes
           package.json
           app.json
         next/              # Next.js web app
           app/             # Next.js App Router
           public/
           package.json
           next.config.js
       packages/
         app/               # Shared UI and navigation
           features/        # Feature screens
           components/      # Reusable components
           lib/            # Utilities
           provider/       # Navigation provider
           package.json
         api/              # Shared API client (if selected)
           package.json
       package.json        # Root workspace config
       pnpm-workspace.yaml # or yarn/npm workspace
       turbo.json         # Turborepo config
     ```

   - Configure based on selections:
     * **NativeWind**: Set up Tailwind config, Metro config, Babel plugin
     * **Clerk**: Install @clerk/clerk-expo and @clerk/nextjs, configure providers
     * **Supabase**: Install @supabase/supabase-js, set up client
     * **tRPC**: Configure tRPC client, create example router
     * **Tamagui**: Install and configure Tamagui for universal styling

   - Add example screens:
     * Home screen (apps/expo/app/index.tsx and apps/next/app/page.tsx)
     * Profile screen with navigation
     * Demonstrate shared navigation with solito/link

   - Configure Metro bundler to watch monorepo
   - Set up TypeScript path aliases
   - Create .env.example for both platforms (NEXT_PUBLIC_ and EXPO_PUBLIC_)

   - Add development scripts to root package.json:
     ```json
     {
       "scripts": {
         "dev": "turbo run dev",
         "dev:next": "pnpm --filter next-app dev",
         "dev:expo": "pnpm --filter expo-app start",
         "build": "turbo run build",
         "lint": "turbo run lint",
         "typecheck": "turbo run typecheck"
       }
     }
     ```

   - Create README with:
     * Project structure explanation
     * Setup instructions (pnpm install)
     * How to run web app (cd apps/next && pnpm dev)
     * How to run mobile app (cd apps/expo && pnpm start)
     * Shared code location (packages/app)
     * Platform-specific code guidelines
     * Deployment instructions (Vercel for web, EAS for mobile)

4. Set up database and ORM:
   - Create database schema/models
   - Set up migration scripts
   - Add seed data scripts

5. Create authentication setup:
   - JWT or session-based auth
   - Login/register endpoints
   - Protected routes/middleware

6. Add common configuration:
   - Environment variables (.env.example)
   - CORS configuration
   - Error handling
   - Logging setup

7. **Set up ESLint with Airbnb style guide** (MANDATORY):
   - Versions are already specified in package.json above (use those EXACT versions)
   - Create `.eslintrc.cjs` (CommonJS for ESLint config only):
     ```javascript
     module.exports = {
       root: true,
       env: { browser: true, es2022: true, node: true },
       extends: [
         'airbnb',
         'airbnb-typescript',
         'plugin:@typescript-eslint/recommended',
         'next/core-web-vitals',  // MUST be last to avoid plugin conflicts
       ],
       parser: '@typescript-eslint/parser',
       parserOptions: {
         ecmaVersion: 'latest',
         sourceType: 'module',
         project: './tsconfig.json',
       },
       rules: {
         'react/react-in-jsx-scope': 'off',
         'react/function-component-definition': ['error', {
           namedComponents: 'function-declaration',
           unnamedComponents: 'arrow-function',
         }],
         'import/prefer-default-export': 'off',
         'react/jsx-props-no-spreading': 'off',
       },
     };
     ```
   - **IMPORTANT**: 'next/core-web-vitals' MUST be last in extends array to prevent plugin conflicts
   - Do NOT include 'airbnb/hooks' separately - it conflicts with Next.js's hooks config

8. **Set up Husky with pre-commit hook** (MANDATORY):
   - Versions already specified in package.json above
   - Run after npm install completes:
     ```bash
     npx husky init
     ```
   - Husky creates `.husky/pre-commit` with `npm test` - replace contents with:
     ```bash
     npx lint-staged
     ```
   - lint-staged config already included in package.json above:
     ```json
     {
       "lint-staged": {
         "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"]
       }
     }
     ```

9. **Ensure TypeScript uses ES modules** (MANDATORY):
   - Set `"type": "module"` in `package.json`
   - Configure `tsconfig.json`:
     ```json
     {
       "compilerOptions": {
         "module": "ESNext",
         "moduleResolution": "bundler",
         "target": "ES2022",
         "esModuleInterop": true,
         "allowSyntheticDefaultImports": true
       }
     }
     ```
   - Use `.js` extensions in imports for Node.js code, or configure bundler appropriately

10. **Set up Vitest for testing** (MANDATORY):
    - Versions already specified in package.json above (includes @vitejs/plugin-react)
    - Create `vitest.config.ts`:
      ```typescript
      import { defineConfig } from 'vitest/config';
      import react from '@vitejs/plugin-react';
      import path from 'path';

      export default defineConfig({
        plugins: [react()],
        test: {
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test/setup.ts'],
          coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
              'node_modules/',
              'src/test/',
              '**/*.d.ts',
              '**/*.config.*',
              '**/mockData/',
            ],
          },
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
      });
      ```
    - Create `src/test/setup.ts`:
      ```typescript
      import '@testing-library/jest-dom';
      import { cleanup } from '@testing-library/react';
      import { afterEach } from 'vitest';

      afterEach(() => {
        cleanup();
      });
      ```
    - Scripts already included in package.json above
    - Create example component test:
      ```typescript
      // src/components/Button.test.tsx
      import { describe, it, expect, vi } from 'vitest';
      import { render, screen, fireEvent } from '@testing-library/react';
      import Button from './Button';

      describe('Button', () => {
        it('renders children correctly', () => {
          render(<Button>Click me</Button>);
          expect(screen.getByText('Click me')).toBeInTheDocument();
        });

        it('calls onClick when clicked', () => {
          const handleClick = vi.fn();
          render(<Button onClick={handleClick}>Click me</Button>);
          fireEvent.click(screen.getByText('Click me'));
          expect(handleClick).toHaveBeenCalledTimes(1);
        });
      });
      ```
    - **Monorepo note**: Use `--filter` flag to run tests in specific packages:
      ```bash
      npm run test --workspace=packages/ui
      # or with pnpm
      pnpm --filter @project/ui test
      ```

11. **Set up Storybook for component library** (MANDATORY):
    - Install Storybook in the component library package (e.g., `packages/ui`):
      ```bash
      # Navigate to component library first
      cd packages/ui
      npx storybook@latest init --type react
      ```
    - Configure `.storybook/main.ts`:
      ```typescript
      import type { StorybookConfig } from '@storybook/react-vite'

      const config: StorybookConfig = {
        stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
        addons: [
          '@storybook/addon-onboarding',
          '@storybook/addon-essentials',
          '@storybook/addon-interactions',
          '@storybook/addon-a11y',
        ],
        framework: {
          name: '@storybook/react-vite',
          options: {},
        },
      }
      export default config
      ```
    - Create story alongside each component:
      ```
      packages/ui/src/components/
        Button/
          Button.tsx
          Button.styles.ts
          Button.stories.tsx
          Button.test.tsx
          index.ts
      ```
    - Example story template (`Button.stories.tsx`):
      ```typescript
      import type { Meta, StoryObj } from '@storybook/react'
      import { Button } from './Button'

      const meta: Meta<typeof Button> = {
        title: 'Components/Button',
        component: Button,
        tags: ['autodocs'],
      }
      export default meta

      type Story = StoryObj<typeof Button>

      export const Primary: Story = {
        args: { variant: 'primary', children: 'Click me' },
      }
      ```
    - Add scripts to component library `package.json`:
      ```json
      {
        "scripts": {
          "storybook": "storybook dev -p 6006",
          "build-storybook": "storybook build"
        }
      }
      ```

12. **Separate application from component library** (MANDATORY):
    - Component library (`packages/ui`):
      * Contains only reusable, presentational components
      * No business logic or API calls
      * Each component has: `.tsx`, `.styles.ts`, `.stories.tsx`, `.test.tsx`
      * Exports components via barrel file (`index.ts`)
    - Application (`apps/web` or `apps/api`):
      * Contains business logic, routing, API integration
      * Imports components from `@project/ui`
      * Feature-based organization for app-specific code
    - Configure workspace dependencies:
      ```json
      // apps/web/package.json
      {
        "dependencies": {
          "@project/ui": "workspace:*",
          "@project/shared": "workspace:*"
        }
      }
      ```

13. **Create Next.js configuration files** (MANDATORY for Next.js):
    - `next.config.ts`:
      ```typescript
      import type { NextConfig } from 'next';

      const nextConfig: NextConfig = {
        reactStrictMode: true,
      };

      export default nextConfig;
      ```
    - `tailwind.config.ts`:
      ```typescript
      import type { Config } from 'tailwindcss';

      const config: Config = {
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        theme: {
          extend: {
            colors: {
              background: 'var(--background)',
              foreground: 'var(--foreground)',
            },
          },
        },
        plugins: [],
      };

      export default config;
      ```
    - `postcss.config.mjs`:
      ```javascript
      const config = {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      };

      export default config;
      ```
    - `next-env.d.ts`:
      ```typescript
      /// <reference types="next" />
      /// <reference types="next/image-types/global" />
      ```

14. **Create Prisma schema** (if using Prisma):
    - `prisma/schema.prisma`:
      ```prisma
      generator client {
        provider = "prisma-client-js"
      }

      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      model User {
        id        String   @id @default(cuid())
        email     String   @unique
        password  String
        name      String?
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
        posts     Post[]

        @@map("users")
      }

      model Post {
        id        String   @id @default(cuid())
        title     String
        content   String?
        published Boolean  @default(false)
        authorId  String
        author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt

        @@map("posts")
      }
      ```
    - `prisma/seed.ts`:
      ```typescript
      import { PrismaClient } from '@prisma/client';
      import bcrypt from 'bcryptjs';

      const prisma = new PrismaClient();

      async function main() {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = await prisma.user.upsert({
          where: { email: 'test@example.com' },
          update: {},
          create: {
            email: 'test@example.com',
            password: hashedPassword,
            name: 'Test User',
          },
        });
        console.log('Created user:', user);
      }

      main()
        .catch((e) => {
          console.error(e);
          process.exit(1);
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
      ```
    - After npm install, run:
      ```bash
      npx prisma generate
      ```

15. **Update .gitignore** to include Next.js and Prisma:
    ```
    # Dependencies
    node_modules/

    # Build outputs
    .next/
    out/
    dist/
    build/

    # Environment files
    .env
    .env.local
    .env.*.local

    # Testing
    coverage/
    .vitest/

    # Prisma
    prisma/migrations/

    # IDE
    .idea/
    .vscode/

    # OS
    .DS_Store

    # Logs
    *.log

    # TypeScript
    *.tsbuildinfo
    next-env.d.ts
    ```

16. Initialize git repository if not already initialized

17. Create comprehensive documentation:
    - **README.md**: Full documentation with setup, API endpoints, tech stack
    - **QUICKSTART.md**: 5-minute quick start guide
    - **PROJECT_SUMMARY.md**: Feature overview and architecture
    - **DEVELOPMENT_CHECKLIST.md**: Development workflow checklist

**Example usage**:
- `/new-fullstack my-saas-app`
- `/new-fullstack` (will prompt for name)

---

## Troubleshooting

### ESLint Version Conflicts
If you see "ERESOLVE unable to resolve dependency tree" errors:
- Verify package.json uses exact versions specified above
- ESLint must be 8.57.0 (not 9.x)
- @typescript-eslint must be 7.18.0 (not 8.x)
- eslint-plugin-react-hooks must be 4.6.2 (not 5.x)

### ESLint Plugin Conflicts
If build shows "Plugin react-hooks was conflicted":
- Ensure 'next/core-web-vitals' is LAST in .eslintrc.cjs extends array
- Do NOT include 'airbnb/hooks' separately

### Missing Dependencies
If build fails with missing modules:
- Ensure @vitejs/plugin-react is in devDependencies
- Ensure tsx is in devDependencies (for Prisma seed)
- Ensure autoprefixer is in devDependencies (for PostCSS)

### Prisma Issues
If Prisma client not found:
- Run `npm run db:generate` after npm install
- Check DATABASE_URL is set in .env
- Verify prisma.schema uses correct provider

---

**Note**: For Solito projects, automatically invoke the `solito` skill after project creation to provide specialized guidance for cross-platform development, navigation patterns, and best practices.
