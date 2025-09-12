import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Payment Successful - Launchworthy',
  description: 'Your payment has been processed successfully. You\'ll receive a confirmation email shortly.',
  path: '/success',
});

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
