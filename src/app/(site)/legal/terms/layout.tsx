import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Terms of Service - Launchworthy',
  description: 'Read our terms of service for using Launchworthy coaching services.',
  path: '/legal/terms',
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
