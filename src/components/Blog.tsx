"use client";

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts, BlogPost } from '../utils/blogUtils';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Fetch blog posts
    setBlogPosts(getBlogPosts());
    
    // Set loaded state to true
    setIsLoaded(true);

    // Animation observer
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Force elements to be visible after a delay if intersection observer fails
    const timer = setTimeout(() => {
      elementsRef.current.forEach((el: HTMLElement | null) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 500);

    elementsRef.current.forEach((el: HTMLElement | null) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      clearTimeout(timer);
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
      // Apply immediate visibility for already mounted elements
      if (isLoaded) {
        setTimeout(() => {
          if (el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        }, 50);
      }
    }
  };

  // Get featured post (first post)
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  // Get remaining posts
  const remainingPosts = blogPosts.slice(1);

  // No posts message
  if (blogPosts.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50 relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001E80] mb-3 sm:mb-4">
              No Blog Posts Yet
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Be the first to create a blog post about healthcare technology
            </p>
            <Link 
              href="/blog/create" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Create New Post
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Regular blog display
  return (
    <section id="blog" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50 relative">
      {/* Background Elements */}
      <div className="absolute right-0 top-1/4 -mr-20 w-60 h-60 md:w-80 md:h-80 rounded-full bg-blue-100/50 blur-3xl"></div>
      <div className="absolute left-0 bottom-1/4 -ml-20 w-60 h-60 md:w-80 md:h-80 rounded-full bg-indigo-100/50 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001E80] mb-3 sm:mb-4"
            ref={addToRefs}
            style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Latest Insights
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
            ref={addToRefs}
            style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            Stay informed with the latest trends and developments in healthcare technology
          </p>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-12 sm:mb-16">
            <Link href={`/blog/${featuredPost.id}`} className="group">
              <article 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
                ref={addToRefs}
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
                  transition: 'opacity 0.6s ease, transform 0.6s ease'
                }}
              >
                <div className="relative h-72 md:w-1/2 md:h-auto overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent md:hidden"></div>
                </div>
                
                <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-center">
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-200">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 relative rounded-full overflow-hidden mr-3">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="block text-sm sm:text-base font-medium text-gray-800">{featuredPost.author.name}</span>
                        <span className="text-xs text-gray-500">{featuredPost.date} · {featuredPost.readTime}</span>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-blue-600 group-hover:text-blue-800 font-medium transition-colors flex items-center text-sm">
                        Read more
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {remainingPosts.slice(0, 6).map((post, index) => (
            <Link 
              href={`/blog/${post.id}`}
              key={post.id}
              className="group"
            >
              <article 
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                ref={addToRefs}
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
                  transition: 'opacity 0.6s ease, transform 0.6s ease', 
                  transitionDelay: `${Math.min(index * 0.1, 0.5)}s` 
                }}
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-6 flex-grow flex flex-col">
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 relative rounded-full overflow-hidden mr-3">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-800">{post.author.name}</span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <span className="ml-auto text-xs text-gray-500">{post.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Show more posts button */}
        {blogPosts.length > 7 && (
          <div className="mt-10 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
} 