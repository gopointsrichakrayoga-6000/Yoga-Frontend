# Pranav Dhyan Yoga Ashram — Frontend Application

The official web portal and visual digital archive for **Sri Chakra Yoga (`Pranav Dhyan Parampara`)**. Built with modern React and Vite, featuring a photography-first aesthetic inspired by traditional South Indian ashram architecture, stone courtyards, sacred banyan groves, and classical Hatha / Pranayama practices.

## 🛠 Technology Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + Custom Vanilla CSS Design System (`index.css`)
- **Icons:** Lucide React
- **Routing:** React Router v6
- **HTTP Client:** Axios with automated JWT Bearer interceptors

---

## 🚀 Getting Started & Local Setup

### 1. Prerequisites
- Node.js (`v18.x` or higher recommended)
- npm (`v9.x` or higher)

### 2. Environment Configuration
Copy the sample environment template:
```bash
cp .env.example .env
```

#### Key Environment Variables
| Variable | Description | Default Value |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the Spring Boot Backend API | `http://localhost:8081/api` |
| `VITE_SEED_DEMO_DATA` | Enable quick-fill demo login buttons (`true`/`false`) | `false` (`true` recommended for local dev) |

> [!IMPORTANT]
> All environment variables exposed to the Vite client bundle must be prefixed with `VITE_`. Never store secret private keys or server passwords in frontend `.env` files.

### 3. Installation & Running Locally

Install all dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The application will start on **`http://localhost:5173`** (or `5174` depending on port availability) and automatically proxy requests to your local Spring Boot API on `http://localhost:8081`.

---

## 🎨 Design System Highlights

- **Photography-First Cards:** Standard rectangular cards (`rounded-xl` / `rounded-lg`) featuring crystal clear `1000px` HD thumbnails and full `1920px` Lightbox expansion.
- **Harmonious Palette:** Terracotta accents (`#C85A32`), Royal Navy (`#1A2B4C`), Warm Sand / Cream background tones (`#FDFBF7`), and Gold highlights (`#D4AF37`).
- **Responsive Masonry Grid:** Dynamic multi-column gallery layout optimized for desktop (`1440px`), tablet (`768px`), and mobile (`375px`).

---

## 📦 Build for Production

To create a production-ready minified bundle inside the `dist/` directory:
```bash
npm run build
```

To preview the built production bundle locally:
```bash
npm run preview
```
