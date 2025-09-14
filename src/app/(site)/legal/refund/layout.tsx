import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Refund Policy - Launchworthy',
  description: 'Learn about our 30-day money-back guarantee and refund policy for coaching services.',
  path: '/legal/refund',
});

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
