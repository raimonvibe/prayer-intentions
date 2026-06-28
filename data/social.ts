export type SocialLink = {
  href: string;
  label: string;
  icon: string;
  className: string;
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://www.raimonvibe.com/",
    label: "Website",
    icon: "fas fa-globe",
    className:
      "bg-brown-800 hover:bg-amber-700 dark:bg-amber-900/90 dark:hover:bg-amber-600",
  },
  {
    href: "https://x.com/raimonvibe/",
    label: "X",
    icon: "fa-brands fa-x-twitter",
    className:
      "bg-brown-800 hover:bg-neutral-900 dark:bg-stone-600 dark:hover:bg-neutral-900",
  },
  {
    href: "https://zaap.bio/raimonvibe",
    label: "Zaap",
    icon: "fas fa-link",
    className:
      "bg-brown-800 hover:bg-violet-600 dark:bg-violet-900/90 dark:hover:bg-violet-500",
  },
  {
    href: "https://www.youtube.com/channel/UCDGDNuYb2b2Ets9CYCNVbuA/videos/",
    label: "YouTube",
    icon: "fab fa-youtube",
    className:
      "bg-brown-800 hover:bg-red-600 dark:bg-red-900/90 dark:hover:bg-red-500",
  },
  {
    href: "https://www.tiktok.com/@raimonvibe/",
    label: "TikTok",
    icon: "fab fa-tiktok",
    className:
      "bg-brown-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-500",
  },
  {
    href: "https://www.instagram.com/raimonvibe/",
    label: "Instagram",
    icon: "fab fa-instagram",
    className:
      "bg-brown-800 hover:bg-pink-600 dark:bg-pink-900/90 dark:hover:bg-pink-500",
  },
  {
    href: "https://medium.com/@raimonvibe/",
    label: "Medium",
    icon: "fab fa-medium",
    className:
      "bg-brown-800 hover:bg-green-600 dark:bg-green-900/90 dark:hover:bg-green-500",
  },
  {
    href: "https://github.com/raimonvibe/",
    label: "GitHub",
    icon: "fab fa-github",
    className:
      "bg-brown-800 hover:bg-neutral-700 dark:bg-neutral-600 dark:hover:bg-neutral-300",
  },
  {
    href: "https://www.linkedin.com/in/raimonvibe/",
    label: "LinkedIn",
    icon: "fab fa-linkedin-in",
    className:
      "bg-brown-800 hover:bg-blue-600 dark:bg-blue-900/90 dark:hover:bg-blue-500",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61563450007849",
    label: "Facebook",
    icon: "fab fa-facebook-f",
    className:
      "bg-brown-800 hover:bg-blue-700 dark:bg-blue-950/90 dark:hover:bg-blue-600",
  },
];
