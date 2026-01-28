export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#0a0a0c]">
      <div className="container mx-auto max-w-6xl text-center">
        <p className="text-sm text-gray-400 mb-2">
          Built with
          {' '}
          <span className="text-gray-200">Next.js</span>
          ,
          {' '}
          <span className="text-gray-200">TypeScript</span>
          , and
          {' '}
          <span className="text-gray-200">Tailwind CSS</span>
        </p>
        <p className="text-sm text-gray-500 mb-4">
          © 2026 Jarrod Medrano
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <a
            href="https://github.com/jarrodmedrano"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors underline decoration-gray-700 hover:decoration-white"
          >
            GitHub
          </a>
          <span className="text-gray-700">•</span>
          <a
            href="https://bsky.app/profile/jarrodmedrano.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors underline decoration-gray-700 hover:decoration-white"
          >
            BlueSky
          </a>
          <span className="text-gray-700">•</span>
          <a
            href="https://www.linkedin.com/in/jarrod-medrano-b89b0037"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors underline decoration-gray-700 hover:decoration-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
