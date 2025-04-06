"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would normally send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-t from-[#0A1435] to-[#132045] text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-0 top-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 md:w-96 md:h-96 rounded-full bg-indigo-400 opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-300"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Get in Touch
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
            ref={addToRefs}
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Interested in transforming your healthcare operations with AI?
          </p>
        </div>
        
        <div 
          className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
          ref={addToRefs}
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          {/* Contact form */}
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-lg rounded-2xl p-5 sm:p-8 border border-white/10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200/60"
                    placeholder="Your name" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200/60"
                    placeholder="you@company.com" 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-blue-100 mb-1">Company / Organization</label>
                <input 
                  type="text" 
                  id="organization" 
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200/60"
                  placeholder="Your company name" 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-blue-100 mb-1">Subject</label>
                <select 
                  id="subject" 
                  name="subject"
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white appearance-none"
                >
                  <option value="" className="bg-[#132045]">Select a subject</option>
                  <option value="demo" className="bg-[#132045]">Request a Demo</option>
                  <option value="pricing" className="bg-[#132045]">Pricing Information</option>
                  <option value="technical" className="bg-[#132045]">Technical Questions</option>
                  <option value="partnership" className="bg-[#132045]">Partnership Opportunities</option>
                  <option value="other" className="bg-[#132045]">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-200/60"
                  placeholder="How can we help you?" 
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <span>Send Message</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-200">Contact Information</h3>
                <div className="space-y-3.5">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-300 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-blue-100">
                      123 AI Avenue<br />
                      Innovation District<br />
                      New York, NY 10001
                    </p>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-blue-100">info@nyxspectra.ai</p>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-blue-100">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-200">Office Hours</h3>
                <div className="space-y-2">
                  <p className="text-blue-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-blue-100">Saturday: 10:00 AM - 2:00 PM</p>
                  <p className="text-blue-100">Sunday: Closed</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-200">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-blue-200 hover:bg-blue-600 hover:text-white transition-all duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-blue-200 hover:bg-blue-600 hover:text-white transition-all duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-blue-200 hover:bg-blue-600 hover:text-white transition-all duration-200">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 