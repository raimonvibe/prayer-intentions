![Prayer Intentions social preview](public/social-share.png)

# 🙏 Prayer Intentions

A calm, user-friendly **Next.js** website for exploring who and what to pray for — with storytelling descriptions, sample prayers, and gentle guidance on when to pray.

Built with a simple accordion layout, search, read-aloud speech mode, dark mode, and a soft beige / dark grey design that is easy on the eyes.

---

## ✨ What you can do

- 📖 **Browse 25+ prayer topics** — family, healing, peace, justice, refugees, and more
- 🔍 **Search** by title, keywords, prayers, or descriptions
- 🔊 **Listen** to any topic with built-in speech mode
- 🌙 **Switch themes** — warm beige off-white (light) or dark grey / black (dark)
- 📱 **Add to home screen** on your phone for quick access
- 🔗 **Share links** with a rich preview image on social apps

---

## 🚀 Quick start

### Requirements

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

---

## 🌐 Social sharing & home screen

For link previews and “Add to Home Screen” icons to work correctly in production, set your live site URL:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

See [`.env.example`](.env.example) for a template.

---

## 📁 Project structure

```
app/              # Next.js App Router pages and layout
components/       # UI components (header, search, accordion, footer)
data/             # Prayer topics and social links
lib/              # Search, speech, and site config helpers
public/           # Static assets (favicon, social-share image)
types/            # TypeScript types
```

---

## 🖼️ Static assets (`public/` folder)

In Next.js, files in **`public/`** are served from the site root (`/`). This project uses:

| File | Purpose |
|------|---------|
| `public/favicon.ico` | Browser tab icon |
| `public/social-share.png` | Social link previews, Apple home screen icon, web app manifest |

You do **not** need to move these into `app/` — they are wired up through Next.js metadata in [`app/layout.tsx`](app/layout.tsx) and [`app/manifest.ts`](app/manifest.ts).

> **Note:** Next.js can also auto-detect `app/favicon.ico` or `app/icon.png`, but keeping assets in `public/` is the standard approach for `.ico` files and share images you reference by URL.

---

## ➕ Adding a new prayer topic

Edit [`data/topics.ts`](data/topics.ts) and add an entry:

```typescript
{
  id: "your-topic-slug",
  title: "Your Topic Title",
  teaser: "One line shown when the accordion is collapsed.",
  description: "A warm, storytelling description...",
  samplePrayer: "Your sample prayer or prompt...",
  whereWhen: "When and where this prayer can be offered...",
}
```

---

## 🛠️ Tech stack

- **Next.js** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS**
- **next-themes** (dark mode)
- **Web Speech API** (read-aloud)
- **Font Awesome** (footer social icons)

---

## 📄 License

MIT © [raimonvibe](https://www.raimonvibe.com/)

See [LICENSE](LICENSE) for full details.
