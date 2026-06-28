import { socialLinks } from "@/data/social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface bg-surface-elevated/90 pb-24">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-center font-serif text-theme">
          &copy; {year} Prayer Intentions
        </p>
        <p className="mt-1 text-center text-sm text-theme-muted">
          Holding the world in quiet prayer
        </p>

        <nav
          aria-label="Social links"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-base text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-500 dark:focus-visible:ring-offset-stone-900 ${link.className}`}
            >
              <i className={link.icon} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
