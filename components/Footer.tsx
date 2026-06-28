import { socialLinks } from "@/data/social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line pb-[max(6rem,env(safe-area-inset-bottom,0px))] pt-8 sm:pt-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <p className="text-sm text-theme-muted">
          &copy; {year} Prayer Intentions
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-theme-subtle">
          Holding the world in quiet prayer
        </p>

        <nav
          aria-label="Social links"
          className="mt-8 flex flex-wrap gap-2"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm text-white transition focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${link.className}`}
            >
              <i className={link.icon} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
