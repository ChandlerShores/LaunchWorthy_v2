import React from 'react';
import { generatePageMetadata } from '@/lib/metadata';
import Section from '@/components/Section';
import Hero from '@/components/Hero';
import { CTAButton } from '@/components/CTAButton';
import { routes } from '@/lib/routes';

export const metadata = generatePageMetadata({
  title: 'About - Chandler, Career Coach in Lexington',
  description: 'Learn about Chandler\'s practical, peer-level approach to interview coaching. No fluff — just progress for early-career professionals.',
  path: '/about',
});

export default function AboutPage() {
  const values = [
    {
      title: "Clarity",
      description: "Cut through the noise and focus on what actually works in interviews. No fluff, no theory - just practical frameworks you can use immediately.",
    },
    {
      title: "Confidence", 
      description: "Build real confidence through practice and preparation. Not fake confidence, but the kind that comes from knowing you're ready.",
    },
    {
      title: "Momentum",
      description: "Keep you moving forward with actionable steps and accountability. Progress, not perfection, is the goal.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" className="bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                About Chandler
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Practical, peer-level coaching. No fluff — just progress.
              </p>
              <CTAButton href={routes.book}>
                Book a Session
              </CTAButton>
            </div>
            <div className="flex justify-center">
              <img
                src="/chandler_headshot.webp"
                alt="Chandler, Career Coach"
                className="w-80 h-80 rounded-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Origin Story */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            My Story
          </h2>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-xl text-gray-600 mb-6">
              I've helped friends land better jobs and promotions for years. What started as informal advice over coffee turned into a passion for seeing people succeed in their careers.
            </p>
            
            <p className="text-xl text-gray-600 mb-8">
              After watching too many talented professionals get ghosted after interviews, I realized the problem wasn't their skills or experience - it was how they were communicating their value. Now I offer that same practical guidance under Launchworthy.
            </p>
            
            <p className="text-xl text-gray-600">
              Based in Lexington, I work with early-career professionals who are tired of getting ghosted after interviews. Let's fix that.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            My Approach
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-600">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why I Do This */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Why I Do This
          </h2>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-xl text-gray-600 mb-6">
              Too many talented people are getting passed over because they don't know how to communicate their value effectively. That's not right.
            </p>
            
            <p className="text-xl text-gray-600 mb-8">
              Interview skills aren't taught in school, but they should be. Everyone deserves to walk into an interview feeling prepared and confident, not nervous and uncertain.
            </p>
            
            <p className="text-xl text-gray-600">
              My goal is simple: help you go from "decent" to "obvious hire" so you can land the job you actually want, not just the one you think you can get.
            </p>
          </div>
        </div>
      </Section>

      {/* What Makes This Different */}
      <Section className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            What Makes This Different
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Corporate Training</h3>
              <p className="text-gray-600 mb-6">
                This isn't generic corporate training or theoretical advice. It's practical, peer-level coaching from someone who's actually helped people land better jobs.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Practice</h3>
              <p className="text-gray-600">
                We don't just talk about interviews - we practice them. Mock interviews, real feedback, and measurable improvement.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Fluff</h3>
              <p className="text-gray-600 mb-6">
                Skip the motivational speeches and focus on what actually works. Frameworks, examples, and actionable steps you can use immediately.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Peer-Level Support</h3>
              <p className="text-gray-600">
                This isn't a senior executive talking down to you. It's practical guidance from someone who understands your situation and wants to see you succeed.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section padding="xl" className="bg-primary-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's transform your interview skills and get you the job you actually want. No fluff, just progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href={routes.book}
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Book a Session
            </CTAButton>
            <CTAButton
              href={routes.contact}
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-primary-600 bg-transparent"
            >
              Ask Questions
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
