"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

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

  // Automatically rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prevFeature) => (prevFeature + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const features = [
    {
      title: "AI-Powered Clinical Documentation",
      description: "Convert real-time speech into structured medical notes, discharge summaries, and referral letters.",
      image: "/images/AI-Powered.jpeg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      )
    },
    {
      title: "End-to-End Integration",
      description: "Seamlessly integrates with any HIS system through FHIR/HL7 standards, regardless of vendor or infrastructure.",
      image: "/images/End-to-End.jpg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      )
    },
    {
      title: "Auto-Scrubbing Compliance",
      description: "Automatically flags missing mandatory fields, ensures documentation compliance, and streamlines workflows.",
      image: "/images/Auto-Scrubbing.webp",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      )
    },
    {
      title: "AI Diagnostic Assistant",
      description: "Provides decision support, suggests potential diagnoses, and highlights relevant clinical insights.",
      image: "/images/AI-diagnostic.jpeg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
        </svg>
      )
    },
    {
      title: "Predictive Analytics",
      description: "Optimize resource allocation, patient flow, and operational efficiency with AI-powered predictive insights.",
      image: "/images/predictive-analytics.jpeg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      )
    },
    {
      title: "Multi-System Integration",
      description: "Connect various hospital systems for a unified operational intelligence layer across your healthcare organization.",
      image: "/images/integration.webp",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
      <div className="absolute left-0 bottom-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001E80] mb-3 sm:mb-4"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Key Features
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Our comprehensive AI solution enhances every aspect of hospital operations
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Left Column - Feature List */}
          <div className="lg:col-span-5 space-y-3 md:space-y-4 lg:space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-4 sm:p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeFeature === index 
                    ? 'bg-gradient-to-r from-blue-50 to-white shadow-md border-l-4 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setActiveFeature(index)}
                ref={addToRefs}
                style={{ 
                  opacity: 0, 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.6s ease, transform 0.6s ease', 
                  transitionDelay: `${index * 0.1}s` 
                }}
              >
                <div className="flex items-start">
                  <div className={`p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0 ${
                    activeFeature === index ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Column - Feature Image and Details */}
          <div 
            className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl h-full"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
          >
            <div className="relative h-full min-h-[500px] lg:min-h-[650px]">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${activeFeature === index ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">{feature.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/90">{feature.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="flex space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                        activeFeature === index ? 'bg-blue-500 w-4 sm:w-6' : 'bg-white/50 hover:bg-white/80'
                      }`}
                      onClick={() => setActiveFeature(index)}
                      aria-label={`View feature ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tablet and Mobile Layout */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full"
              ref={addToRefs}
              style={{ 
                opacity: 0, 
                transform: 'translateY(20px)', 
                transition: 'opacity 0.6s ease, transform 0.6s ease', 
                transitionDelay: `${index * 0.1}s` 
              }}
            >
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-blue-600 p-2 sm:p-3 rounded-lg text-white">
                  {feature.icon}
                </div>
              </div>
              <div className="p-4 sm:p-6 flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 