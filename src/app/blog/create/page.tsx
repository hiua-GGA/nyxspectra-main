"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../../sections/Header';
import FooterSection from '../../../sections/Footer';
import { addBlogPost } from '../../../utils/blogUtils';
import BlogEditor from '../../../components/BlogEditor';

export default function CreateBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    tags: '',
    image: '/Images/blog/default-blog-image.jpg', // Default image - Fixed path
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('File must be an image (JPEG, PNG, GIF, or WEBP)');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size exceeds 5MB limit');
      return;
    }

    // Create a preview
    setPreviewImage(URL.createObjectURL(file));

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error uploading image');
      }

      setFormData(prev => ({ ...prev, image: data.filePath }));
      setUploadStatus('Upload successful!');
      setError('');
    } catch (err) {
      setUploadStatus('');
      setError(err instanceof Error ? err.message : 'Error uploading image');
      console.error('Error uploading image:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Format the new blog post
      const newPost = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        author: {
          name: "Guest Author",
          avatar: "/Images/avatars/default-avatar.jpg", // Fixed path
          title: "Community Contributor"
        },
        readTime: Math.max(Math.ceil(formData.content.length / 2000), 2) + " min", // Simple estimation
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        })
      };
      
      // Add to blog posts
      addBlogPost(newPost);
      
      // Show success message and redirect after a delay
      setError('Your blog post has been submitted successfully and is awaiting admin approval. You will be redirected shortly.');
      
      // Redirect to blog listing after successful submission
      setTimeout(() => {
        router.push('/blog');
      }, 3000);
    } catch (err) {
      console.error('Error submitting blog:', err);
      setError('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center mb-6 mt-8 bg-white rounded-lg shadow-sm p-4">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm mr-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-2xl font-bold text-[#001E80]">Create New Blog Post</h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          {error && (
            <div className={`mb-4 ${error.includes('submitted successfully') ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'} px-4 py-3 rounded`}>
              {error}
            </div>
          )}
          
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4">
            <p className="font-medium">Note:</p>
            <p>All blog posts require admin approval before they appear on the site. Please ensure your content follows our community guidelines.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                <option value="AI in Healthcare">AI in Healthcare</option>
                <option value="Healthcare Technology">Healthcare Technology</option>
                <option value="Clinical Workflows">Clinical Workflows</option>
                <option value="Healthcare Innovation">Healthcare Innovation</option>
                <option value="Healthcare Operations">Healthcare Operations</option>
                <option value="Medical Diagnostics">Medical Diagnostics</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">
                Excerpt (Short summary) *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                Content *
              </label>
              <BlogEditor 
                value={formData.content}
                onChange={(newContent) => setFormData(prev => ({ ...prev, content: newContent }))}
              />
              <p className="mt-1 text-xs text-gray-500">
                You can format text and insert images directly in the editor. HTML is supported.
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Featured Image
              </label>
              <div 
                onClick={handleImageClick}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors"
              >
                {previewImage ? (
                  <div className="relative h-48 w-full">
                    <Image 
                      src={previewImage} 
                      alt="Image preview" 
                      fill 
                      className="object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                    <p className="text-xs text-gray-400">JPEG, PNG, GIF or WEBP (max 5MB)</p>
                  </div>
                )}
                
                {uploadStatus && (
                  <p className={`mt-2 text-sm ${uploadStatus === 'Uploading...' ? 'text-blue-500' : 'text-green-500'}`}>
                    {uploadStatus}
                  </p>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={handleImageUpload}
              />
              
              <div className="mt-2 flex items-center">
                <span className="text-sm text-gray-500 mr-2">OR</span>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter an image URL (e.g., https://example.com/image.jpg)"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Default image will be used if left empty</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                Tags (comma separated) *
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. technology, healthcare, AI"
              />
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterSection />
    </div>
  );
} 