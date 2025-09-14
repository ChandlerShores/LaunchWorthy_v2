import React from 'react';
import Icon from './Icon';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company?: string;
  rating?: number;
  image?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  company,
  rating = 5,
  image,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col h-full ${className}`}>
      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-gray-700 text-lg mb-6 italic flex-grow">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center mt-auto">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
            <Icon name="user" className="w-6 h-6 text-primary-600" />
          </div>
        )}
        
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-gray-600 text-sm">
            {role}
            {company && ` at ${company}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
