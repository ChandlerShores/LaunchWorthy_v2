# Launchworthy - Interview Coaching Website

A clean, high-conversion marketing site for interview coaching services built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **High-conversion design** with mobile-first approach
- **Multiple service offerings** with clear pricing and CTAs
- **Integrated booking system** with Calendly and Stripe
- **SEO optimized** with next-seo and JSON-LD schema
- **Analytics ready** with Plausible integration
- **Accessible** with WCAG 2.2 AA compliance
- **Fast performance** with Lighthouse scores ≥90

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **SEO**: next-seo
- **Analytics**: Plausible
- **Booking**: Calendly (iframe)
- **Payments**: Stripe (payment links)
- **Forms**: Formspree
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd launchworthy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.local.example .env.local
```

4. Update `.env.local` with your actual values:
```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=launchworthy.co
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/book
NEXT_PUBLIC_STRIPE_LINK_CONSULT=https://buy.stripe.com/your-consult-link
NEXT_PUBLIC_STRIPE_LINK_RESUME=https://buy.stripe.com/your-resume-link
NEXT_PUBLIC_STRIPE_LINK_ACCELERATOR=https://buy.stripe.com/your-accelerator-link
NEXT_PUBLIC_STRIPE_LINK_MENTORSHIP=https://buy.stripe.com/your-mentorship-link
NEXT_PUBLIC_CONTACT_FORMSPREE_URL=https://formspree.io/f/your-form-id
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (site)/            # Main site routes
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── services/      # Service pages
│   │   ├── results/       # Results page
│   │   ├── about/         # About page
│   │   ├── book/          # Booking page
│   │   ├── faq/           # FAQ page
│   │   └── contact/       # Contact page
│   ├── api/               # API routes
│   │   └── sitemap/       # Sitemap generation
│   ├── robots.txt/        # Robots.txt
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero sections
│   ├── ServiceCard.tsx    # Service cards
│   ├── TestimonialCard.tsx # Testimonial cards
│   ├── FAQ.tsx            # FAQ accordion
│   ├── BookingWidget.tsx  # Booking interface
│   ├── Analytics.tsx      # Analytics script
│   └── Schema.tsx         # JSON-LD schema
├── lib/                   # Utilities
│   ├── routes.ts          # Route definitions
│   ├── metadata.ts        # SEO metadata
│   ├── schema.ts          # Schema.org data
│   └── utils.ts           # Helper functions
└── styles/                # Additional styles
    └── prose.css          # Typography styles
```

## Services

1. **30-min Career Consult** - $50
   - Quick resume, LinkedIn, and interview style review
   - 2-3 actionable fixes

2. **Resume + LinkedIn Polish** - $125
   - Comprehensive optimization and alignment
   - Includes walkthrough call

3. **Stop Getting Ghosted** - $300
   - Baseline mock → coaching → final mock
   - Recordings and detailed notes

4. **Monthly Mentorship** - $150/mo
   - Two 30-min sessions per month
   - Ongoing support and accountability

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics domain | `launchworthy.co` |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly booking URL | `https://calendly.com/username/book` |
| `NEXT_PUBLIC_STRIPE_LINK_CONSULT` | Stripe payment link for consult | `https://buy.stripe.com/...` |
| `NEXT_PUBLIC_STRIPE_LINK_RESUME` | Stripe payment link for resume service | `https://buy.stripe.com/...` |
| `NEXT_PUBLIC_STRIPE_LINK_ACCELERATOR` | Stripe payment link for accelerator | `https://buy.stripe.com/...` |
| `NEXT_PUBLIC_STRIPE_LINK_MENTORSHIP` | Stripe payment link for mentorship | `https://buy.stripe.com/...` |
| `NEXT_PUBLIC_CONTACT_FORMSPREE_URL` | Formspree contact form URL | `https://formspree.io/f/...` |

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting provider
3. Ensure all environment variables are set

## SEO Features

- **Meta tags** optimized for each page
- **Open Graph** tags for social sharing
- **JSON-LD schema** for Organization, LocalBusiness, and FAQ
- **XML sitemap** auto-generated
- **Robots.txt** configured
- **Structured data** for better search visibility

## Performance

- **Lighthouse Score**: 90+ on mobile and desktop
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component
- **Font Loading**: Inter font with display: swap
- **Code Splitting**: Automatic with Next.js

## Accessibility

- **WCAG 2.2 AA** compliant
- **Keyboard navigation** support
- **Screen reader** friendly
- **Focus management** with visible focus rings
- **Alt text** for all images
- **ARIA labels** for interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For questions or support, contact hello@launchworthy.co
