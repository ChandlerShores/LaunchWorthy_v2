'use client';

import Link from 'next/link';
import { routes } from '@/lib/routes';

const navigation = [
  { name: 'Services', href: routes.services },
  { name: 'About', href: routes.about },
  { name: 'FAQ', href: routes.faq },
  { name: 'Contact', href: routes.contact },
];

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={routes.home} className="flex items-center space-x-1">
            <img 
              src="/favicon.svg" 
              alt="LaunchWorthy Logo" 
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="text-3xl font-bold">
              <span className="text-navy-900">LAUNCH</span><span className="text-primary-600">WORTHY</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-navy-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href={routes.book}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile CTA */}
          <div className="md:hidden">
            <Link
              href={routes.book}
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
