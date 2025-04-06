import React, { useState, useEffect } from 'react';
import { getAnalyticsData, clearAnalyticsData } from '../utils/analytics';

interface AnalyticsData {
  pageViews: Array<{
    url: string;
    timestamp: string;
  }>;
  events: Array<{
    category: string;
    action: string;
    label?: string;
    value?: number;
    timestamp: string;
  }>;
}

export default function SEODashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({ pageViews: [], events: [] });
  const [activeTab, setActiveTab] = useState<'pageViews' | 'events'>('pageViews');

  useEffect(() => {
    // Load analytics data from localStorage
    const data = getAnalyticsData();
    setAnalyticsData(data);
  }, []);

  // Calculate page view counts by URL
  const pageViewCounts = analyticsData.pageViews.reduce<Record<string, number>>((acc, view) => {
    const url = view.url;
    acc[url] = (acc[url] || 0) + 1;
    return acc;
  }, {});

  // Sort URLs by page view count
  const sortedUrls = Object.entries(pageViewCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([url, count]) => ({ url, count }));

  // Calculate event counts by category and action
  const eventCounts = analyticsData.events.reduce<Record<string, number>>((acc, event) => {
    const key = `${event.category} - ${event.action}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Sort events by count
  const sortedEvents = Object.entries(eventCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([key, count]) => ({ key, count }));

  const handleClearAnalytics = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      clearAnalyticsData();
      setAnalyticsData({ pageViews: [], events: [] });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Analytics Dashboard</h2>
        <button
          onClick={handleClearAnalytics}
          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
        >
          Clear Data
        </button>
      </div>
      
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#001E80] mb-1">Page Views</h3>
          <p className="text-3xl font-bold">{analyticsData.pageViews.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-700 mb-1">Unique Pages</h3>
          <p className="text-3xl font-bold">{Object.keys(pageViewCounts).length}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-700 mb-1">Events</h3>
          <p className="text-3xl font-bold">{analyticsData.events.length}</p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 'pageViews'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('pageViews')}
          >
            Page Views
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === 'events'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'pageViews' ? (
        <div>
          <h3 className="text-lg font-semibold mb-3">Top Pages</h3>
          {sortedUrls.length > 0 ? (
            <div className="overflow-x-auto rounded border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedUrls.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-sm text-gray-900">{item.url}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No page view data available</p>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-3">Top Events</h3>
          {sortedEvents.length > 0 ? (
            <div className="overflow-x-auto rounded border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedEvents.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-sm text-gray-900">{item.key}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No event data available</p>
          )}
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Note: This is a simplified demo analytics dashboard using localStorage. In a production environment, you would use a proper analytics service.</p>
      </div>
    </div>
  );
} 