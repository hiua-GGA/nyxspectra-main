"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Benefits() {
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

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const benefits = [
    {
      title: "Enhanced Clinical Documentation",
      description: "Reduce documentation time by up to 70% with AI-powered speech-to-text and automated structured note creation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
      )
    },
    {
      title: "Improved Diagnostic Accuracy",
      description: "Increase diagnostic precision by 35% with AI-assisted clinical decision support and real-time medical insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      )
    },
    {
      title: "Reduced Physician Burnout",
      description: "Cut administrative tasks by 45%, allowing clinicians to focus more on patient care and less on paperwork.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
      )
    },
    {
      title: "Streamlined Workflows",
      description: "Optimize clinical workflows with intelligent automation, reducing operational inefficiencies by 40%.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
        </svg>
      )
    },
    {
      title: "Cost Efficiency",
      description: "Reduce operational costs by up to 25% while improving documentation quality and compliance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      )
    },
    {
      title: "Enhanced Patient Relationships",
      description: "Increase patient satisfaction by 30% with more face-to-face time and personalized care.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      )
    }
  ];

  return (
    <section id="benefits" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-1/4 top-1/3 -ml-20 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
      <div className="absolute right-1/3 bottom-1/4 -mr-20 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-indigo-100 opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001E80] mb-3 sm:mb-4"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Benefits for Healthcare Providers
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Transform your healthcare operations with our AI-powered solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex flex-col h-full"
              ref={addToRefs}
              style={{ 
                opacity: 0, 
                transform: 'translateY(20px)', 
                transition: 'opacity 0.6s ease, transform 0.6s ease', 
                transitionDelay: `${index * 0.1}s` 
              }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{benefit.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 flex-grow">{benefit.description}</p>
              
              {/* Percentage display */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 font-medium">Impact</span>
                  <span className="text-sm text-blue-600 font-bold">
                    {/* Extract percentage from description and display it */}
                    {benefit.description.match(/\d+%/) || "Significant"}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                    style={{ 
                      width: `${parseInt(benefit.description.match(/\d+/)?.[0] || "75")}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className="mt-12 sm:mt-16 text-center max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
          ref={addToRefs}
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Transform Your Healthcare Operations?</h3>
          <p className="text-sm sm:text-base text-blue-100 mb-6">
            Join the growing network of healthcare providers improving clinical outcomes with NyxSpectra.
          </p>
          <a 
            href="#contact" 
            className="inline-block py-2.5 sm:py-3 px-6 sm:px-8 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors duration-200 shadow-md"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
} 