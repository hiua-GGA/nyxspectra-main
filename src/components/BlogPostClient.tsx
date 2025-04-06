"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from "../sections/Header";
import FooterSection from "../sections/Footer";
import { BlogPost } from '../utils/blogUtils';
import SocialShare from './SocialShare';
import NewsletterSubscribe from './NewsletterSubscribe';
import SEO from './SEO';

export default function BlogPostClient({ post, relatedPosts }: { 
  post: BlogPost | undefined, 
  relatedPosts: BlogPost[] 
}) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is on admin panel route
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(window.location.pathname.includes('/admin'));
    }
  }, []);

  // Redirect to blog page if post not found or post is not approved and user is not admin
  if (!post || (!post.approved && !isAdmin)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 max-w-5xl pt-24 pb-16">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {!post ? 'Blog Post Not Found' : 'Post Awaiting Approval'}
            </h1>
            <p className="text-gray-600 mb-8">
              {!post 
                ? 'The blog post you\'re looking for doesn\'t exist or has been removed.' 
                : 'This post is currently being reviewed by our administrators and will be available once approved.'}
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  // Generate SEO metadata
  const seoTitle = `${post.title} | NyxSpectra Blog`;
  const seoDescription = post.excerpt;
  const canonicalUrl = `/blog/${post.id}`;
  const publishedTime = new Date(post.date).toISOString();

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        ogImage={post.image}
        ogType="article"
        article={{
          publishedTime,
          author: post.author.name,
          tags: post.tags
        }}
      />
      
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <Header />
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Admin warning banner for unapproved posts */}
          {isAdmin && !post.approved && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    This post is currently <span className="font-medium">not visible</span> to regular users. Use the admin panel to approve it.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-3">
              <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Blog
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 text-sm">{post.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001E80] mb-4">
              {post.title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">{post.excerpt}</p>
            
            {/* Author and Date Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 relative rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Social Share Buttons */}
              <SocialShare 
                url={`/blog/${post.id}`}
                title={post.title}
                description={post.excerpt}
              />
            </div>
            
            {/* Featured Image */}
            <div className="relative w-full h-72 sm:h-96 md:h-[500px] rounded-xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags && post.tags.map((tag: string, index: number) => (
              <Link 
                key={index} 
                href={`/blog?tag=${tag}`}
                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
          
          {/* Article Content */}
          <article className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-12">
            <div 
              className="prose prose-blue max-w-none prose-headings:text-[#001E80] prose-img:rounded-lg prose-a:text-blue-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Bottom Share Section */}
            <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-gray-700">Did you find this article helpful?</p>
              <SocialShare 
                url={`/blog/${post.id}`}
                title={post.title}
                description={post.excerpt}
                className="justify-end"
              />
            </div>
          </article>
          
          {/* Newsletter Signup */}
          <div className="mb-12">
            <NewsletterSubscribe 
              titleText="Stay updated with the latest in healthcare tech"
              descriptionText="Join our community of healthcare professionals and technology enthusiasts."
            />
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#001E80] mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-shadow hover:shadow-lg">
                      <div className="relative h-48 w-full">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-grow">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                          {relatedPost.category}
                        </span>
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-500">{relatedPost.excerpt.substring(0, 100)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <FooterSection />
      </div>
    </>
  );
} 