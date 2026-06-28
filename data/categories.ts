import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Globe2,
  HeartPulse,
  Scale,
  Users,
} from "lucide-react";

export type PrayerCategory = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  topicIds: string[];
  icon: LucideIcon;
};

export const prayerCategories: PrayerCategory[] = [
  {
    id: "inner-journey",
    title: "Inner Journey",
    shortTitle: "Inner",
    summary: "Peace, guidance, grief, and the quiet work within.",
    icon: Compass,
    topicIds: [
      "peace-in-your-heart",
      "guidance-in-decisions",
      "forgiveness",
      "strength-in-hardship",
      "those-grieving",
      "mental-health",
      "discerning-vocation",
      "gratitude-for-blessings",
    ],
  },
  {
    id: "people-relationships",
    title: "People & Relationships",
    shortTitle: "People",
    summary: "Family, community, and bonds across difference.",
    icon: Users,
    topicIds: [
      "family",
      "elderly-and-lonely",
      "reconciliation",
      "teachers-and-students",
      "unity-across-faiths",
    ],
  },
  {
    id: "justice-vulnerable",
    title: "Justice & the Vulnerable",
    shortTitle: "Justice",
    summary: "Those harmed, displaced, forgotten, or caught in systems.",
    icon: Scale,
    topicIds: [
      "poor-and-homeless",
      "people-in-war",
      "refugees-and-displaced",
      "victims-of-injustice",
      "victims-of-trafficking",
      "those-imprisoned",
      "criminals",
    ],
  },
  {
    id: "healing-wellness",
    title: "Healing & Wellness",
    shortTitle: "Healing",
    summary: "Body, recovery, and those who tend to the sick.",
    icon: HeartPulse,
    topicIds: [
      "healing-for-the-sick",
      "healthcare-workers",
      "addiction-recovery",
    ],
  },
  {
    id: "world-creation",
    title: "World & Creation",
    shortTitle: "World",
    summary: "The earth we share and those who lead it.",
    icon: Globe2,
    topicIds: ["creation-and-environment", "leaders-and-governments"],
  },
];

export const ALL_CATEGORY_ID = "all";
