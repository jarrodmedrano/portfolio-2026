export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Welcome to Port New
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A modern full-stack application built with Next.js
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              Fast Refresh
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Edit files and see changes instantly with Next.js Fast Refresh
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              Type Safety
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Full TypeScript support with strict type checking
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              Database Ready
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Prisma ORM configured with PostgreSQL
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              API Routes
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Built-in API routes with authentication examples
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <a
            href="/api/health"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test API
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
