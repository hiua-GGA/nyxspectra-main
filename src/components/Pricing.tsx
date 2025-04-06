"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type PricingTier = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
};

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: isYearly ? '$499' : '$59',
      description: 'Perfect for small clinics and individual practices',
      features: [
        'AI diagnostic assistance',
        'Image analysis - Up to 100 scans/month',
        'Patient data management',
        'Basic reporting',
        'Email support',
      ],
      isPopular: false,
      cta: 'Get Started'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: isYearly ? '$1,999' : '$199',
      description: 'Designed for medium-sized healthcare facilities',
      features: [
        'Everything in Starter',
        'Image analysis - Up to 500 scans/month',
        'Advanced reporting & analytics',
        'EHR integration',
        'Priority support',
        'Team collaboration tools',
      ],
      isPopular: true,
      cta: 'Start Free Trial'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'For hospitals and large healthcare networks',
      features: [
        'Everything in Professional',
        'Unlimited image analysis',
        'Custom AI model training',
        'Dedicated account manager',
        '24/7 premium support',
        'On-premise deployment options',
        'HIPAA-compliant security features',
      ],
      isPopular: false,
      cta: 'Contact Sales'
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el: HTMLElement | null) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        elementsRef.current.forEach((el: HTMLElement | null) => {
          if (el) observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div className="absolute left-0 bottom-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-100 opacity-50 blur-3xl"></div>
      
      <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 opacity-10">
        <Image
          src="/images/brain-scan.jpeg"
          alt="Brain Scan"
          width={400}
          height={400}
          className="rounded-full"
        />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Simple, Transparent Pricing
          </h2>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Choose the plan that fits your healthcare facility's needs
          </p>
          
          {/* Billing Toggle */}
          <div 
            className="mt-8 inline-flex items-center bg-gray-100 p-1 rounded-full"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            <button
              className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
                !isYearly ? 'bg-white shadow-md text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`py-2 px-6 rounded-full text-sm font-medium transition-colors ${
                isYearly ? 'bg-white shadow-md text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setIsYearly(true)}
            >
              Yearly <span className="text-green-500 font-bold ml-1">Save 15%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div 
              key={tier.id}
              className={`relative rounded-2xl shadow-lg overflow-hidden transition-all ${
                tier.isPopular ? 'md:scale-105 md:-my-4' : ''
              }`}
              ref={addToRefs}
              style={{ 
                opacity: 0, 
                transform: 'translateY(20px)', 
                transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s` 
              }}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-1 rotate-45 origin-bottom-left">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 h-full flex flex-col ${tier.isPopular ? 'bg-gradient-to-b from-blue-50 to-white border-t-4 border-blue-500' : 'bg-white'}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  {tier.price !== 'Custom' && (
                    <span className="text-gray-600 ml-2">{isYearly ? '/year' : '/month'}</span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="#contact"
                  className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-colors ${
                    tier.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className="mt-16 text-center"
          ref={addToRefs}
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <p className="text-gray-600">
            Need a custom solution? <Link href="#contact" className="text-blue-600 font-semibold hover:underline">Contact our sales team</Link>
          </p>
        </div>
      </div>
    </section>
  );
} 