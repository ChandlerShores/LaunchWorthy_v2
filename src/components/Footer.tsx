import React from 'react';
import Link from 'next/link';
import { routes } from '@/lib/routes';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={routes.home} className="text-2xl font-bold text-white mb-4 block">
              Launchworthy
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Practical coaching for early-career professionals. Stop getting ghosted after interviews.
            </p>
            
            {/* Email capture */}
            <div className="mb-6">
              <label htmlFor="footer-email" className="block text-sm font-medium text-gray-300 mb-2">
                Stay updated
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  id="footer-email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href={routes.services} className="text-gray-300 hover:text-white transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href={routes.results} className="text-gray-300 hover:text-white transition-colors duration-200">
                  Results
                </Link>
              </li>
              <li>
                <Link href={routes.about} className="text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href={routes.faq} className="text-gray-300 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={routes.book} className="text-gray-300 hover:text-white transition-colors duration-200">
                  Book Session
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link href={routes.contact} className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:hello@launchworthy.co" 
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  hello@launchworthy.co
                </a>
              </li>
              <li className="text-gray-300">
                Lexington, KY
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p className="mb-2">
                Coaching improves preparation and delivery; it does not guarantee employment outcomes.
              </p>
              <p>
                © {new Date().getFullYear()} Launchworthy. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-gray-400 hover:text-white transition-colors duration-200">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
