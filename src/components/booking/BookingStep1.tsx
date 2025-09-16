'use client';

import React from 'react';
import { ServiceId, servicePrices } from '@/lib/stripe';
import { ContactInfo } from '@/hooks/useBookingFlow';
import { CTAButton } from '../CTAButton';

interface BookingStep1Props {
  contactInfo: ContactInfo;
  selectedService: ServiceId | null;
  errors: Record<string, string>;
  onContactInfoChange: (updates: Partial<ContactInfo>) => void;
  onServiceSelect: (serviceId: ServiceId | null) => void;
  onNext: () => void;
  checkStep1Valid: () => boolean;
}

const BookingStep1: React.FC<BookingStep1Props> = ({
  contactInfo,
  selectedService,
  errors,
  onContactInfoChange,
  onServiceSelect,
  onNext,
  checkStep1Valid,
}) => {
  const services = Object.entries(servicePrices).map(([id, data]) => ({
    id: id as ServiceId,
    ...data,
  }));

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    onContactInfoChange({ [field]: value });
  };

  const handleServiceSelect = (serviceId: ServiceId) => {
    onServiceSelect(serviceId === selectedService ? null : serviceId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-navy-900 mb-4">
          Let's Get Started
        </h2>
        <p className="text-gray-600">
          Tell us about yourself and choose your service
        </p>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-navy-200 p-6">
        <h3 className="text-xl font-semibold text-navy-900 mb-6">
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={contactInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                errors.name ? 'border-error-300' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={contactInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              autoComplete="email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                errors.email ? 'border-error-300' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={contactInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              autoComplete="tel"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                errors.phone ? 'border-error-300' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-error-600">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="bg-white rounded-lg border border-navy-200 p-6">
        <h3 className="text-xl font-semibold text-navy-900 mb-6">
          Choose Your Service *
        </h3>
        
        <div className="space-y-4">
          {services.map((service) => (
            <label
              key={service.id}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedService === service.id
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-navy-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="service"
                value={service.id}
                checked={selectedService === service.id}
                onChange={() => handleServiceSelect(service.id)}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-navy-900 text-lg">
                    {service.name}
                  </div>
                  <div className="text-gray-600 mt-1">
                    {service.description}
                  </div>
                  <div className="text-primary-600 font-bold text-xl mt-2">
                    ${(service.price / 100).toFixed(2)}
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedService === service.id
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {selectedService === service.id && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
        
        {errors.service && (
          <p className="mt-3 text-sm text-error-600">{errors.service}</p>
        )}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <CTAButton
          onClick={onNext}
          disabled={!checkStep1Valid()}
          className="px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Payment
        </CTAButton>
      </div>

      {/* Security Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-sky-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h4 className="font-semibold text-sky-900">Your Information is Secure</h4>
            <p className="text-sky-800 text-sm mt-1">
              We use industry-standard encryption to protect your personal information. 
              Your data is never shared with third parties without your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStep1;
