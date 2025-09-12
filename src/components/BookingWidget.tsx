'use client';

import React, { useState } from 'react';
import { CTAButton } from './CTAButton';
import Icon from './Icon';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  stripeLink: string;
}

const BookingWidget: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  const services: ServiceOption[] = [
    {
      id: 'consult',
      name: '30-min Career Consult',
      description: 'Quick resume, LinkedIn, and interview style review',
      stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_CONSULT || '',
    },
    {
      id: 'resume',
      name: 'Resume + LinkedIn Polish',
      description: 'Comprehensive resume and LinkedIn optimization',
      stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_RESUME || '',
    },
    {
      id: 'accelerator',
      name: 'Stop Getting Ghosted',
      description: 'Full coaching program with mock interviews',
      stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_ACCELERATOR || '',
    },
    {
      id: 'mentorship',
      name: 'Monthly Mentorship',
      description: 'Ongoing coaching and career guidance',
      stripeLink: process.env.NEXT_PUBLIC_STRIPE_LINK_MENTORSHIP || '',
    },
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Book Your Session
        </h2>
        <p className="text-gray-600">
          Choose your service and schedule your session
        </p>
      </div>

      {/* Service Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Service</h3>
        <div className="space-y-3">
          {services.map((service) => (
            <label
              key={service.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedService === service.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="service"
                value={service.id}
                checked={selectedService === service.id}
                onChange={(e) => setSelectedService(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{service.name}</div>
                  <div className="text-sm text-gray-600">{service.description}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedService === service.id
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {selectedService === service.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      {selectedService && selectedServiceData && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Complete Your Booking
          </h3>
          <p className="text-gray-600 mb-4">
            You've selected: <strong>{selectedServiceData.name}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton
              href={selectedServiceData.stripeLink}
              className="flex-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pay with Stripe
            </CTAButton>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            After payment, you'll receive a confirmation email with booking details.
          </p>
        </div>
      )}

      {/* Calendly Embed */}
      {calendlyUrl && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Schedule Your Session
          </h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <iframe
              src={calendlyUrl}
              width="100%"
              height="600"
              frameBorder="0"
              title="Calendly Booking Widget"
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Prep Checklist */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Session Preparation
        </h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <Icon name="check" className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <span>Have your current resume ready</span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <span>Prepare specific questions or areas of focus</span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <span>Test your video/audio setup beforehand</span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <span>Be ready to discuss your career goals</span>
          </li>
        </ul>
      </div>

      {/* Policies */}
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>
          Coaching improves preparation and delivery; it does not guarantee employment outcomes.
        </p>
        <p className="mt-2">
          100% refund available before the first session. See our{' '}
          <a href="/refund" className="text-primary-600 hover:text-primary-700 underline">
            refund policy
          </a>{' '}
          for details.
        </p>
      </div>
    </div>
  );
};

export default BookingWidget;
