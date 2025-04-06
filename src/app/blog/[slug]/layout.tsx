import React from 'react';
import type { Metadata } from "next";

// Function to get blog post data for metadata
function getBlogPostBySlug(slug: string) {
  const blogPosts = [
    {
      id: "how-ai-is-transforming-healthcare-documentation",
      title: "How AI is Transforming Healthcare Documentation",
      excerpt: "Discover how artificial intelligence is revolutionizing clinical documentation, reducing physician burnout, and improving patient care.",
    },
    {
      id: "future-of-hospital-information-systems",
      title: "The Future of Hospital Information Systems",
      excerpt: "Explore the evolution of HIS platforms and how integrations are creating a more connected healthcare ecosystem.",
    },
    {
      id: "future-of-ai-in-healthcare",
      title: "The Future of AI in Healthcare: Transforming Patient Care",
      excerpt: "Explore how artificial intelligence is revolutionizing healthcare delivery, from diagnostics to treatment planning and beyond.",
    }
  ];
  
  return blogPosts.find(post => post.id === slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // In a real app, fetch the blog post data based on the slug
  const post = getBlogPostBySlug(params.slug);
  
  return {
    title: `${post?.title || "Blog Post"} | NyxSpectra`,
    description: post?.excerpt || "Healthcare AI insights from NyxSpectra",
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 