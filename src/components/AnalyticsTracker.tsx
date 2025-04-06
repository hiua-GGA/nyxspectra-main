'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '../utils/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [previousPath, setPreviousPath] = useState('');

  useEffect(() => {
    // Skip tracking if we're server rendering or URL hasn't changed
    if (typeof window === 'undefined' || previousPath === pathname) return;

    // Build full URL from path and search params
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Wait for page to load fully
    const timeout = setTimeout(() => {
      trackPageView(url);
      setPreviousPath(pathname);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams, previousPath]);

  // No UI - this is just a tracking component
  return null;
} 