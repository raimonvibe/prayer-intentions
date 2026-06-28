"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SpeechDock } from "@/components/SpeechDock";
import { TopicAccordion } from "@/components/TopicAccordion";
import { prayerTopics } from "@/data/topics";
import { filterTopics } from "@/lib/search";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(
    () => filterTopics(prayerTopics, searchQuery),
    [searchQuery]
  );

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 pb-36 sm:px-6 sm:py-12 sm:pb-40">
        <section className="mb-10 text-center sm:mb-12">
          <p className="mx-auto max-w-2xl font-serif text-lg leading-relaxed text-theme-muted sm:text-xl">
            Explore prayer intentions for people and places that need compassion.
            Expand a topic to read its story, a sample prayer, and when to pray.
          </p>
        </section>

        <section className="mb-8" aria-label="Search topics">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={filteredTopics.length}
            totalCount={prayerTopics.length}
          />
        </section>

        <section aria-label="Prayer topics">
          <TopicAccordion topics={filteredTopics} searchQuery={searchQuery} />
        </section>
      </main>

      <Footer />
      <SpeechDock />
    </>
  );
}
