"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../sections/Header';
import FooterSection from '../../sections/Footer';
import { getBlogPosts, updatePostApproval, deleteBlogPost, BlogPost } from '../../utils/blogUtils';
import SEODashboard from '../../components/SEODashboard';

export default function AdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeTab, setActiveTab] = useState<'posts' | 'seo'>('posts');

  // Load blog posts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setPosts(getBlogPosts(true)); // Get all posts including unapproved
    }
  }, [isAuthenticated]);

  // Function to handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in a real app, this would be more secure
    if (password === 'nyxspectraadmin') {
      setIsAuthenticated(true);
      setMessage({ text: 'Login successful!', type: 'success' });
    } else {
      setMessage({ text: 'Invalid password. Please try again.', type: 'error' });
    }
    setPassword('');
  };

  // Function to handle post approval
  const handleApproval = (postId: string, approved: boolean) => {
    const updatedPost = updatePostApproval(postId, approved);
    if (updatedPost) {
      setPosts(getBlogPosts(true));
      setMessage({ 
        text: approved ? 'Post approved successfully!' : 'Post rejected successfully!', 
        type: 'success' 
      });
    } else {
      setMessage({ text: 'Failed to update post approval status.', type: 'error' });
    }
  };

  // Function to handle post deletion
  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      const success = deleteBlogPost(postId);
      if (success) {
        setPosts(getBlogPosts(true));
        setMessage({ text: 'Post deleted successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to delete post.', type: 'error' });
      }
    }
  };

  // Display login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-12 max-w-md">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-[#001E80] mb-6 text-center">Admin Login</h1>
            
            {message.text && (
              <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  // Admin dashboard when authenticated
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8 mt-8 bg-white rounded-lg shadow-sm p-4">
          <h1 className="text-3xl font-bold text-[#001E80]">Admin Panel</h1>
          <div className="flex space-x-3">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              View Blog
            </Link>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6 bg-white rounded-lg shadow-sm">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-3 px-6 text-sm font-medium ${
                activeTab === 'posts'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              Blog Posts
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium ${
                activeTab === 'seo'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('seo')}
            >
              SEO & Analytics
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'posts' ? (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Blog Posts Management</h2>
            
            {posts.length === 0 ? (
              <p className="text-gray-600">No blog posts found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className={!post.approved ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3 relative overflow-hidden rounded">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{post.title}</div>
                              <div className="text-sm text-gray-500">{post.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{post.author.name}</div>
                          <div className="text-sm text-gray-500">{post.author.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {post.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {post.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-blue-600 hover:text-blue-900"
                            target="_blank"
                          >
                            View
                          </Link>
                          {!post.approved && (
                            <button
                              onClick={() => handleApproval(post.id, true)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                          )}
                          {post.approved && (
                            <button
                              onClick={() => handleApproval(post.id, false)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <SEODashboard />
        )}
      </div>
      <FooterSection />
    </div>
  );
} 