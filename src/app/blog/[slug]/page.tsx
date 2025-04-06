"use client";

import React, { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import BlogPostClient from "../../../components/BlogPostClient";
import { getBlogPostBySlug, getRelatedPosts } from "../../../utils/blogUtils";

export default function BlogPostPage() {
  const params = useParams();
  const pathname = usePathname();
  const slug = params.slug as string;
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if user is navigating from admin panel
    if (typeof window !== 'undefined') {
      setIsAdmin(pathname.includes('/admin') || window.location.pathname.includes('/admin'));
    }
  }, [pathname]);
  
  // Include unapproved posts if viewing from admin context
  const post = getBlogPostBySlug(slug, isAdmin);
  const relatedPosts = getRelatedPosts(slug);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
} 