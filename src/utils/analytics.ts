// Simple analytics tracking utility

// These would be replaced with actual analytics service like Google Analytics
const ANALYTICS_ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || '';

// Track page view
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Simulate sending to analytics service
    if (ANALYTICS_ENDPOINT) {
      // In a real scenario, you would use fetch or an analytics SDK
      console.log(`[Analytics] Page view: ${url}`);
    }
    
    // Store page view in localStorage for demonstration
    const pageViews = JSON.parse(localStorage.getItem('nyxspectra_page_views') || '[]');
    pageViews.push({
      url,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('nyxspectra_page_views', JSON.stringify(pageViews.slice(-20)));
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track event (like button click, form submission, etc.)
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Simulate sending to analytics service
    if (ANALYTICS_ENDPOINT) {
      // In a real scenario, you would use fetch or an analytics SDK
      console.log(`[Analytics] Event: ${category} - ${action} - ${label || ''} - ${value || ''}`);
    }
    
    // Store event in localStorage for demonstration
    const events = JSON.parse(localStorage.getItem('nyxspectra_events') || '[]');
    events.push({
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('nyxspectra_events', JSON.stringify(events.slice(-50)));
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Get stored analytics data (for admin dashboard)
export const getAnalyticsData = () => {
  if (typeof window === 'undefined') {
    return { pageViews: [], events: [] };
  }
  
  try {
    const pageViews = JSON.parse(localStorage.getItem('nyxspectra_page_views') || '[]');
    const events = JSON.parse(localStorage.getItem('nyxspectra_events') || '[]');
    
    return { pageViews, events };
  } catch (error) {
    console.error('Error getting analytics data:', error);
    return { pageViews: [], events: [] };
  }
};

// Clear analytics data
export const clearAnalyticsData = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('nyxspectra_page_views');
    localStorage.removeItem('nyxspectra_events');
  } catch (error) {
    console.error('Error clearing analytics data:', error);
  }
}; 