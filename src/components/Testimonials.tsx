"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "Dr. James Wilson",
      position: "Chief Medical Officer, Memorial Healthcare",
      image: "/images/defaultimg.jpg",
      content: "NyxSpectra has completely transformed how we handle clinical documentation. Our physicians spend 45% less time on administrative tasks, allowing them to focus more on direct patient care."
    },
    {
      id: 2,
      name: "Rachel Torres",
      position: "IT Director, Northwest Medical Center",
      image: "/images/defaultimg.jpg",
      content: "The seamless integration with our existing EHR system was remarkable. NyxSpectra's team had us up and running in less than two weeks with minimal disruption to our operations."
    },
    {
      id: 3,
      name: "Dr. Sarah Chen",
      position: "Head of Cardiology, City General Hospital",
      image: "/images/defaultimg.jpg",
      content: "The AI-powered diagnostic suggestions have been incredibly valuable. In several cases, the system highlighted potential concerns that might have otherwise been overlooked."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-[#001E80] mb-4"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            What Our Clients Say
          </h2>
          <p 
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Hear from healthcare professionals who have transformed their operations with NyxSpectra
          </p>
        </div>

        <div 
          className="relative mx-auto max-w-4xl"
          ref={addToRefs}
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          {/* Testimonial Cards */}
          <div className="relative h-[400px] md:h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 flex flex-col md:flex-row items-center gap-6 ${
                  activeIndex === index 
                    ? 'opacity-100 translate-y-0 z-10' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="md:w-1/4 flex-shrink-0 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-blue-200">
                    <Image 
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 text-center">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 text-center">{testimonial.position}</p>
                </div>
                
                <div className="md:w-3/4">
                  <div className="mb-4 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="opacity-20">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg italic">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          ref={addToRefs}
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <p className="text-gray-700">Customer Satisfaction Rate</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">45%</div>
            <p className="text-gray-700">Reduction in Documentation Time</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
            <p className="text-gray-700">Healthcare Institutions Using NyxSpectra</p>
          </div>
        </div>
      </div>
    </section>
  );
} 