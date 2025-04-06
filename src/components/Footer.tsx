"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoSaas from '../assets/logosaas.png';

export default function Footer() {
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

  const quickLinks = [
    { title: "Features", href: "#features" },
    { title: "Benefits", href: "#benefits" },
    { title: "Blog", href: "#blog" },
    { title: "Testimonials", href: "#testimonials" },
    { title: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    }
  ];

  return (
    <footer className="bg-[#0A1435] text-white">
      <div 
        className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-8 max-w-7xl"
        ref={addToRefs}
        style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative mr-3">
                <Image
                  src={logoSaas}
                  alt="NyxSpectra"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-500">
                NyxSpectra
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-4 sm:mb-6 max-w-xs">
              Empowering healthcare with intelligent AI solutions for better patient outcomes and streamlined operations.
            </p>
            <div className="space-y-1 text-sm">
              <p className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 AI Avenue, Innovation District, NY 10001</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@nyxspectra.ai</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-blue-300">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-blue-300">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Stay updated with the latest features, case studies, and healthcare AI technology.
            </p>
            <form className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full sm:max-w-xs px-4 py-2.5 bg-[#132045] border border-[#2A3A64] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div>
              <h4 className="text-base font-medium mb-3 text-blue-300">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2A3A64] mt-8 sm:mt-12 pt-6 sm:pt-8 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NyxSpectra. All rights reserved.
          </p>
          <div className="mt-3 sm:mt-0">
            <ul className="flex flex-wrap justify-center sm:justify-start space-x-6 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 