import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy - Launchworthy',
  description: 'Learn how Launchworthy collects, uses, and protects your personal information.',
  path: '/legal/privacy',
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
