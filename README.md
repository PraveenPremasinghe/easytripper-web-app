# Easy Tripper - Sri Lanka Travel Website

A production-quality, mobile-first travel website for Sri Lanka built with Next.js, TailwindCSS, shadcn/ui, and MagicUI components.

## Features

- 🎨 Modern, responsive design with mobile-first approach
- 🚀 Next.js 16 with App Router and TypeScript
- 🎭 Smooth animations with Framer Motion
- 📱 Fully accessible UI components
- 🔍 SEO optimized with metadata
- ⚡ Server-side rendering (SSR) and Incremental Static Regeneration (ISR)
- 📝 Working inquiry form with server actions
- 🎯 Type-safe with TypeScript

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
  ├── actions/
  │   └── sendInquiry.ts      # Server action for inquiry form
  ├── destinations/
  │   ├── [slug]/
  │   │   └── page.tsx        # Dynamic destination pages
  │   └── page.tsx            # All destinations listing
  ├── stories/
  │   └── page.tsx            # Travel stories gallery
  ├── contact/
  │   └── page.tsx            # Contact page
  ├── layout.tsx              # Root layout
  ├── page.tsx                # Home page
  └── globals.css             # Global styles

components/
  ├── header/
  │   ├── TopBar.tsx          # Top contact bar
  │   └── MainNav.tsx         # Main navigation
  ├── hero/
  │   └── Hero.tsx            # Hero section with animations
  ├── sections/
  │   ├── AboutSriLanka.tsx
  │   ├── AboutMe.tsx
  │   ├── WhyChooseUs.tsx
  │   ├── Destinations.tsx
  │   ├── InquiryForm.tsx
  │   ├── ThingsToDo.tsx
  │   ├── TravelStories.tsx
  │   ├── Testimonials.tsx
  │   ├── FAQ.tsx
  │   └── Footer.tsx
  └── ui/                     # shadcn/ui components

lib/
  ├── data.ts                 # Mock data
  ├── types.ts                # TypeScript types
  ├── seo.ts                  # SEO configuration
  └── utils.ts                # Utility functions

public/
  └── images/                 # Image assets
```

## Adding Images

Place your images in the `public/images/` directory. Required images:

- `hero-sri-lanka.jpg` - Hero section background
- `jagath.jpg` - Guide portrait
- `kandy.jpg`, `ella.jpg`, `sigiriya.jpg`, etc. - Destination images
- `about-1.jpg`, `about-2.jpg`, `about-3.jpg` - About section images
- `story-*.jpg` - Travel story images
- `activity-*.jpg` - Activity images
- `og-image.jpg` - Open Graph image
- `sri-lanka-map.jpg` - Footer map image

## Customization

### Colors

Edit `app/globals.css` to customize the color scheme:

- Primary: `#0EA5E9` (sky-500)
- Primary Deep: `#1E40AF` (blue-800)
- Accent: `#F59E0B` (amber-500)

### Content

Update mock data in `lib/data.ts`:
- Destinations
- Travel stories
- Testimonials
- FAQs
- Things to do

### Contact Information

Update contact details in:
- `components/header/TopBar.tsx`
- `components/sections/Footer.tsx`
- `app/contact/page.tsx`

## Inquiry Form

The inquiry form uses Next.js Server Actions. Currently, it logs submissions to the console. To send emails:

1. Install an email service (e.g., nodemailer, Resend, SendGrid)
2. Update `app/actions/sendInquiry.ts` to send emails
3. Add environment variables for email configuration

## Deployment

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

## License

This project is private and proprietary.

## Contact

For questions or support, contact Jagath Premasinghe at info@easytripper.lk
