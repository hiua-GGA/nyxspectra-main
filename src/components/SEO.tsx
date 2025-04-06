import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCardType?: 'summary' | 'summary_large_image';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  structuredData?: Record<string, any>;
}

interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': string;
    name: string;
  };
  [key: string]: any;
}

export default function SEO({
  title = 'NyxSpectra - AI-Powered Healthcare Solutions',
  description = 'Empowering healthcare professionals with cutting-edge AI tools for improved patient care and operational efficiency',
  canonicalUrl = '',
  ogImage = '/Images/og-image.jpg',
  ogType = 'website',
  twitterCardType = 'summary_large_image',
  article,
  structuredData,
}: SEOProps) {
  // Generate the full URL for canonical and OG URLs
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nyxspectra.com';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const fullOgImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Default structured data for the website
  const defaultStructuredData: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NyxSpectra',
    url: siteUrl,
    logo: `${siteUrl}/Images/logo.png`,
    sameAs: [
      'https://twitter.com/nyxspectra',
      'https://facebook.com/nyxspectra',
      'https://linkedin.com/company/nyxspectra',
    ],
  };

  // Merge with custom structured data if provided
  const finalStructuredData: StructuredData = structuredData as StructuredData || defaultStructuredData;

  // If it's an article, generate article structured data
  if (ogType === 'article' && article) {
    finalStructuredData['@type'] = 'Article';
    if (article.publishedTime) finalStructuredData.datePublished = article.publishedTime;
    if (article.modifiedTime) finalStructuredData.dateModified = article.modifiedTime;
    if (article.author) {
      finalStructuredData.author = {
        '@type': 'Person',
        name: article.author,
      };
    }
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content="NyxSpectra" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:site" content="@nyxspectra" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />

      {/* Article Specific Meta Tags */}
      {ogType === 'article' && article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {ogType === 'article' && article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {ogType === 'article' && article?.tags && 
        article.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))
      }

      {/* Structured Data / JSON-LD */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
      />
    </Head>
  );
} 