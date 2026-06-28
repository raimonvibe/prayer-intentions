export const siteImages = {
  hero: "/images/hero.jpg",
  searchEmpty: "/images/categories/inner-journey.jpg",
  categories: {
    "inner-journey": "/images/categories/inner-journey.jpg",
    "people-relationships": "/images/categories/people-relationships.jpg",
    "justice-vulnerable": "/images/categories/justice-vulnerable.jpg",
    "healing-wellness": "/images/categories/healing-wellness.jpg",
    "world-creation": "/images/categories/world-creation.jpg",
  },
} as const;

export function getCategoryImage(categoryId: string): string | undefined {
  return siteImages.categories[
    categoryId as keyof typeof siteImages.categories
  ];
}
