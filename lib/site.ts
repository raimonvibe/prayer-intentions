export const siteConfig = {
  name: "Prayer Intentions",
  shortName: "Prayers",
  description:
    "Explore prayer intentions for family, healing, peace, justice, and more — with sample prayers and guidance on when to pray.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
};
