import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Contact - Get in Touch with Launchworthy',
  description: 'Have questions about our interview coaching services? Contact us and we\'ll get back to you within 24 hours.',
  path: '/contact',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
