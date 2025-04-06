"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc = "/videos/nyx.mp4" }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle escape key press to close modal
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add escape key event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Play video when modal opens
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.log('Video play error:', err));
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      // Re-enable scrolling when modal closes
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleEscapeKey]);

  // Close when clicking outside of video content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={handleBackdropClick}
      style={{ 
        animation: isOpen ? 'fadeIn 0.3s ease-in-out' : 'fadeOut 0.3s ease-in-out',
      }}
    >
      <div className="relative w-full max-w-4xl mx-4 overflow-hidden rounded-xl shadow-2xl bg-black">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all duration-300"
          aria-label="Close video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Video */}
        <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full"
            src={videoSrc}
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
} 