"use client";

import React from 'react';
import Link from 'next/link';
import Blog from '../../components/Blog';
import { Header } from '../../sections/Header';
import FooterSection from '../../sections/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8 mt-8 bg-white rounded-lg shadow-sm p-4">
          <h1 className="text-3xl font-bold text-[#001E80]">Blog</h1>
          <Link 
            href="/blog/create" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create New Post
          </Link>
        </div>
        <Blog />
      </div>
      <FooterSection />
    </div>
  );
} 