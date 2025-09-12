import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import Icon from './Icon';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, className = '' }) => {
  return (
    <div className={className}>
      <Accordion.Root type="single" collapsible className="space-y-4">
        {items.map((item, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <Accordion.Trigger className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset">
              <span>{item.question}</span>
              <Icon
                name="arrowRight"
                className="w-5 h-5 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-90"
              />
            </Accordion.Trigger>
            <Accordion.Content className="px-6 pb-4 text-gray-700 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <p className="pt-2">{item.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default FAQ;
