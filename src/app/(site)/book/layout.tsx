import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Book a Session - Schedule Your Interview Coaching',
  description: 'Book your interview coaching session with Chandler. Choose from career consults, resume optimization, or comprehensive coaching programs.',
  path: '/book',
});

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
