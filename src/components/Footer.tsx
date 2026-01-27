export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-200 bg-white">
      <div className="container mx-auto max-w-6xl text-center">
        <p className="text-sm text-gray-500 mb-2">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
        <p className="text-sm text-gray-500 mb-4">
          © 2026 Jarrod Medrano
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <a
            href="https://github.com/jarrodmedrano"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black underline"
          >
            GitHub
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://bsky.app/profile/jarrodmedrano.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black underline"
          >
            BlueSky
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://www.linkedin.com/in/jarrod-medrano-b89b0037"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
