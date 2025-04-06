import React, { useState } from 'react';

interface NewsletterSubscribeProps {
  className?: string;
  buttonText?: string;
  placeholderText?: string;
  titleText?: string;
  descriptionText?: string;
}

export default function NewsletterSubscribe({
  className = '',
  buttonText = 'Subscribe',
  placeholderText = 'Enter your email',
  titleText = 'Subscribe to our newsletter',
  descriptionText = 'Get the latest insights on healthcare technology delivered to your inbox',
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }
    
    setStatus('loading');
    
    try {
      // This would connect to your newsletter service
      // For demo purposes, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <div className={`bg-blue-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-bold text-[#001E80] mb-2">{titleText}</h3>
      <p className="text-gray-600 mb-4">{descriptionText}</p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderText}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === 'loading' || status === 'success'}
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`px-6 py-2 font-medium rounded-md text-white transition-colors ${
              status === 'loading' 
                ? 'bg-blue-400 cursor-not-allowed' 
                : status === 'success'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {status === 'loading' 
              ? 'Subscribing...' 
              : status === 'success' 
                ? '✓ Subscribed' 
                : buttonText
            }
          </button>
        </div>
        
        {message && (
          <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
        
        <p className="text-xs text-gray-500 mt-3">
          By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-blue-600">Privacy Policy</a> and 
          consent to receive marketing communications from NyxSpectra.
        </p>
      </form>
    </div>
  );
} 