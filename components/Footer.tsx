import { socialLinks } from "@/data/social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-stone-300/50 bg-[#f0ebe3]/80 dark:border-stone-700/50 dark:bg-[#141414]/80">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-center font-serif text-stone-700 dark:text-stone-300">
          &copy; {year} Prayer Intentions
        </p>
        <p className="mt-1 text-center text-sm text-stone-600 dark:text-stone-400">
          Holding the world in quiet prayer
        </p>

        <nav
          aria-label="Social links"
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white transition ${link.className}`}
            >
              <i className={link.icon} aria-hidden="true" />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
