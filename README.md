# 🧭 TravelPaglu — Real Indian Travel Itineraries

A travel platform built entirely on first-hand, personal itineraries — not scraped or generic blog content — designed to make budget travel feel achievable to students and first-time travelers across India.

---

## 🏔️ Core Features

- **Interactive 2.5D India Map**: Stylized interactive SVG map with regional contours, ambient lighting, and pulsating destination pins with live hover preview cards.
- **Authentic Travel Diaries**: Written like a trusted friend’s diary — exact bus numbers, verified homestay names, must-try local delicacies, and pro tips.
- **Itemized Student Budgets**: Full cost breakdown into *Travel, Stay, Food, Local Transport, and Misc* with a bold **Grand Total Per Person**.
- **Photo Proof Gallery**: 3x3 photo grid with full-screen lightbox zoom modal.
- **Creator Admin CMS Panel**: Purpose-built content manager with repeatable dynamic field groups for publishing new destinations with auto-calculated grand totals.
- **User Profile & Wishlist**: Bookmark itineraries and customize travel interest vibes.
- **Pre-Seeded Itineraries**: Manali (Himachal Pradesh, ₹4,800) and Banaras (Uttar Pradesh, ₹3,000).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion (Ken Burns hero, scroll reveals, lightbox modals)
- **Icons**: Lucide React
- **Authentication**: NextAuth.js (Role-based access: `user` and `admin`)
- **Database**: MongoDB (via Mongoose) with automatic persistent JSON fallback

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Sample Data
```bash
npm run seed
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

- **Admin CMS**: `admin@travelpaglu.com` / `admin123`
- **Student Account**: `student@travelpaglu.com` / `student123`
- *(Accessible directly via 1-click demo buttons on the `/login` page)*
