# 🎨 Elevate Events GmbH — Brand Palette & UI Guide

This document defines the official **color system, typography, and UI usage guidelines** for the Elevate Events GmbH frontend.  
It ensures **consistency across all pages and components**.

---

## 1. Primary Palette (Core Brand Identity)

| Color       | Hex      | Tailwind Class | Usage |
|-------------|----------|----------------|-------|
| **Charcoal** | `#1C1C1C` | `bg-charcoal text-charcoal` | Main background, hero wrappers, page body |
| **Silver**   | `#B0B0B0` | `text-silver` | Secondary text, muted UI, borders |
| **Leather**  | `#7A4C2E` | `bg-leather border-leather` | Accent dividers, footer details, subtle highlights |

---

## 2. Secondary Palette (Luxury Highlights)

| Color       | Hex      | Tailwind Class | Usage |
|-------------|----------|----------------|-------|
| **Gold**     | `#E6A93C` | `bg-gold text-gold` | Primary CTAs, hover highlights, VIP elements |
| **Burgundy** | `#6E2C2C` | `bg-burgundy text-burgundy` | Event cards, premium sections, rich accents |
| **Emerald**  | `#2E5D3A` | `bg-emerald text-emerald` | Success states, eco-friendly branding |

---

## 3. Accent Palette (Mood Enhancers)

| Color         | Hex      | Tailwind Class | Usage |
|---------------|----------|----------------|-------|
| **Purple Glow** | `#5A3F82` | `bg-purple-glow text-purple-glow` | Neon vibes, hover states, nightlife accents |
| **Beige**       | `#D9C9A8` | `bg-beige text-beige` | Default text color on dark backgrounds, elegant backgrounds |

---

## 4. Backgrounds & Gradients

- **Dark Body Background:**  
  `bg-charcoal text-beige`

- **Hero Section Background:**  
  ```css
  bg-hero-pattern
(Defined in tailwind.config.js with overlay on venue image)

Overlay Gradient:
bg-gradient-to-b from-black/70 to-transparent

5. Typography
Headings (Luxury Serif):
font-serif text-gold or text-white
→ For hero titles, section headers, page titles.

Body (Modern Sans):
font-sans text-beige
→ For main body text, navigation, and general UI.

Muted / Secondary Text:
text-silver
→ For captions, metadata, and footer text.

6. Component Styling Guidelines
Header & Navigation
Default link → text-silver hover:text-gold

Active link → text-gold

Primary CTA Button (e.g., “Book Now”)
html
Copy
Edit
class="px-6 py-3 bg-gold text-charcoal font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300"
Secondary CTA Button (e.g., “Learn More”)
html
Copy
Edit
class="px-6 py-3 border border-gold text-gold rounded-lg hover:bg-gold hover:text-charcoal transition-all duration-300"
Membership / VIP Card
html
Copy
Edit
class="bg-burgundy text-beige border-gold rounded-2xl shadow-lg p-8"
Event Highlight
html
Copy
Edit
class="text-purple-glow animate-pulse"
Success State
html
Copy
Edit
class="bg-emerald text-beige px-4 py-2 rounded"
7. Animations
Fade In Animation (Tailwind config):
animate-fadeIn
→ Use for section reveals, forms, and card transitions.

Interactive Motion:

hover:scale-105 on buttons/cards

transition-all duration-300 on interactive elements

8. Example Layout Usage
html
Copy
Edit
<body class="bg-charcoal text-beige font-sans">
  <header class="bg-gradient-to-b from-black/70 to-transparent">
    <!-- Logo + Navigation -->
  </header>

  <main>
    <section class="py-20 text-center">
      <h1 class="font-serif text-5xl text-gold">Experience the Pinnacle of Nightlife</h1>
      <p class="text-silver mt-4">Exclusive events, VIP access, and unforgettable experiences.</p>
      <a href="/booking" class="inline-block mt-8 px-6 py-3 bg-gold text-charcoal rounded-lg hover:bg-yellow-400">
        Book Now
      </a>
    </section>
  </main>

  <footer class="bg-black/50 border-t border-leather text-silver py-12 text-center">
    <p>&copy; 2025 Elevate Events GmbH. All rights reserved.</p>
  </footer>
</body>
