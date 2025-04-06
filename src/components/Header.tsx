"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoSaas from '../assets/logosaas.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header appearance when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-md py-2' 
        : 'bg-transparent backdrop-blur-sm py-3 sm:py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
            <Image 
              src={logoSaas}
              alt="NyxSpectra Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className={`text-xl sm:text-2xl font-bold ${isScrolled ? 'text-[#001E80]' : 'text-white'}`}>NyxSpectra</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link href="#about" className={`hover:text-blue-500 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            About
          </Link>
          <Link href="#features" className={`hover:text-blue-500 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Features
          </Link>
          <Link href="#benefits" className={`hover:text-blue-500 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Benefits
          </Link>
          <Link href="#testimonials" className={`hover:text-blue-500 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Testimonials
          </Link>
          <Link href="/blog" className={`hover:text-blue-500 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Blog
          </Link>
          <Link 
            href="#contact" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 duration-200 shadow-sm hover:shadow-md"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden focus:outline-none ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`bg-white/95 backdrop-blur-md h-auto max-h-[90vh] overflow-y-auto w-full transition-transform duration-300 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container py-6 px-6 flex flex-col space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-2">
              <Link 
                href="/" 
                className="flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 relative">
                  <Image 
                    src={logoSaas}
                    alt="NyxSpectra Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-[#001E80]">NyxSpectra</span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <Link 
              href="#about" 
              className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#features" 
              className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#benefits" 
              className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link 
              href="#testimonials" 
              className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="#contact" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center w-full text-lg shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 