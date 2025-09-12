# Launchworthy - Interview Coaching Website

A clean, high-conversion marketing site for interview coaching services built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **High-conversion design** with mobile-first approach
- **Multiple service offerings** with clear pricing and CTAs
- **Integrated booking system** with Calendly and Stripe Checkout
- **Dynamic payment processing** with real-time checkout sessions
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
- **Payments**: Stripe Checkout (dynamic sessions)
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
cp .env.local.example .env.local
```

4. Update `.env.local` with your actual values:
```env
# Stripe Configuration (Required for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=launchworthy.co

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/book

# Formspree
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
│   │   ├── create-checkout-session/ # Stripe Checkout API
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
│   ├── stripe.ts          # Stripe configuration
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

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ Yes | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ Yes | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ⚠️ Optional | `whsec_...` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics domain | ⚠️ Optional | `launchworthy.co` |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly booking URL | ⚠️ Optional | `https://calendly.com/username/book` |
| `NEXT_PUBLIC_CONTACT_FORMSPREE_URL` | Formspree contact form URL | ⚠️ Optional | `https://formspree.io/f/...` |

## Payment Integration

This site uses **Stripe Checkout** for secure payment processing:

- **Dynamic checkout sessions** created via API routes
- **Real-time pricing** based on service selection
- **Email pre-filling** for better UX
- **Success/cancel handling** with proper redirects
- **Test mode ready** for development

### Stripe Setup Required

1. **Create Stripe account** at [stripe.com](https://stripe.com)
2. **Get API keys** from Stripe Dashboard → Developers → API keys
3. **Add keys to environment variables** (see above)
4. **Test payments** in Stripe test mode first

## Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
2. **Connect repository** to Vercel
3. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (optional)
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)
   - `NEXT_PUBLIC_CALENDLY_URL` (optional)
   - `NEXT_PUBLIC_CONTACT_FORMSPREE_URL` (optional)
4. **Deploy automatically** on push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting provider
3. Ensure all environment variables are set
4. **Configure webhooks** in Stripe (optional)

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

## Troubleshooting

### Payment Issues

**"Something went wrong" error:**
- Check that `.env.local` exists (not `env.local`)
- Verify Stripe API keys are correct
- Restart dev server after adding environment variables
- Check browser console for detailed error messages

**Stripe Checkout not redirecting:**
- Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Verify API route is accessible at `/api/create-checkout-session`
- Check that service prices are in cents (e.g., 5000 for $50.00)

### Build Issues

**"Stripe not configured" error:**
- Add `STRIPE_SECRET_KEY` to environment variables
- Restart development server
- Check that `.env.local` file exists and is properly formatted

**Environment variables not loading:**
- Ensure file is named `.env.local` (with dot prefix)
- Restart Next.js development server
- Check file is in project root directory

### Contact Form Issues

**Form submission fails:**
- Set up Formspree account at [formspree.io](https://formspree.io)
- Add form ID to `NEXT_PUBLIC_CONTACT_FORMSPREE_URL`
- Test with valid email addresses

## Support

For questions or support, contact hello@launchworthy.co
