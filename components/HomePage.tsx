"use client";

import { useMemo, useState } from "react";
import { CategoryBrowser } from "@/components/CategoryBrowser";
import { CategoryNav } from "@/components/CategoryNav";
import { CategoryOverview } from "@/components/CategoryOverview";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SiteImage } from "@/components/SiteImage";
import { SpeechDock } from "@/components/SpeechDock";
import { ALL_CATEGORY_ID, prayerCategories } from "@/data/categories";
import { prayerTopics } from "@/data/topics";
import {
  getCategoryCounts,
  groupTopicsByCategory,
} from "@/lib/categories";
import { siteImages } from "@/lib/images";
import { filterTopics } from "@/lib/search";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY_ID);

  const filteredTopics = useMemo(
    () => filterTopics(prayerTopics, searchQuery),
    [searchQuery]
  );

  const categoryCounts = useMemo(
    () => getCategoryCounts(filteredTopics),
    [filteredTopics]
  );

  const groupedTopics = useMemo(
    () => groupTopicsByCategory(filteredTopics),
    [filteredTopics]
  );

  const showOverview = !searchQuery.trim() && activeCategory === ALL_CATEGORY_ID;

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery("");
    document
      .getElementById(`category-${categoryId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header />

      <section className="relative mb-6 h-40 overflow-hidden sm:mb-8 sm:h-48 md:h-52">
        <SiteImage
          src={siteImages.hero}
          alt="Quiet window overlooking misty hills"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[var(--background)]/75 sm:bg-[var(--background)]/65" />
        <div className="relative mx-auto flex h-full max-w-5xl items-end px-4 pb-5 sm:px-8 sm:pb-8">
          <p className="max-w-xl text-sm leading-6 text-theme-muted sm:text-base sm:leading-7">
            A calm index of prayer intentions — organized by theme, revealed
            only when you need them.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-[max(8rem,env(safe-area-inset-bottom,0px))] sm:px-8 sm:pb-36">
        <section className="mb-8" aria-label="Search topics">
          <SearchBar
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              if (value.trim()) setActiveCategory(ALL_CATEGORY_ID);
            }}
            resultCount={filteredTopics.length}
            totalCount={prayerTopics.length}
          />
        </section>

        {showOverview && (
          <CategoryOverview
            categories={prayerCategories}
            counts={categoryCounts}
            onSelectCategory={handleSelectCategory}
          />
        )}

        <CategoryNav
          activeCategory={activeCategory}
          counts={categoryCounts}
          onChange={setActiveCategory}
        />

        <section aria-label="Prayer topics" className="mt-8">
          <CategoryBrowser
            groups={groupedTopics}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        </section>
      </main>

      <Footer />
      <SpeechDock />
    </>
  );
}
