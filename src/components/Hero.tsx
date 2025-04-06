"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import VideoModal from './VideoModal';
import mobilehImage from '../assets/mobileh.png';
import mobileImage from '../assets/mobile.png';
import cogImage from '../assets/cog.png';
import starImage from '../assets/star.png';
import springImage from '../assets/spring.png';
import noodleImage from '../assets/noodle.png';
import pyramidImage from '../assets/pyramid.png';
import cylinderImage from '../assets/cylinder.png';
import tubeImage from '../assets/tube.png';

export default function Hero() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('animate-fade-in');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el: HTMLElement | null) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        elementsRef.current.forEach((el: HTMLElement | null) => {
          if (el) observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section 
      id="about"
      className="pt-16 sm:pt-20 md:pt-28 pb-16 sm:pb-20 md:pb-28 overflow-hidden relative"
      style={{
        background: "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)"
      }}
    >
      {/* 3D Objects - Hidden on smallest screens for better performance */}
      <div className="absolute -top-20 right-[10%] w-16 sm:w-24 h-16 sm:h-24 opacity-40 animate-float-slow hidden sm:block">
        <Image src={starImage} alt="Star" fill className="object-contain" />
      </div>
      <div className="absolute top-40 left-[5%] w-16 sm:w-20 h-16 sm:h-20 opacity-30 animate-float hidden sm:block">
        <Image src={pyramidImage} alt="Pyramid" fill className="object-contain" />
      </div>
      <div className="absolute bottom-20 right-[15%] w-24 sm:w-32 h-24 sm:h-32 opacity-20 animate-float-slow hidden sm:block">
        <Image src={cogImage} alt="Cog" fill className="object-contain" />
      </div>
      <div className="absolute bottom-40 left-[20%] w-12 sm:w-16 h-12 sm:h-16 opacity-30 animate-float hidden sm:block">
        <Image src={springImage} alt="Spring" fill className="object-contain" />
      </div>
      <div className="absolute top-60 right-[25%] w-20 sm:w-24 h-20 sm:h-24 opacity-20 animate-float-slow hidden sm:block">
        <Image src={cylinderImage} alt="Cylinder" fill className="object-contain" />
      </div>
      <div className="absolute -bottom-10 right-[30%] w-16 sm:w-20 h-16 sm:h-20 opacity-30 animate-float hidden sm:block">
        <Image src={tubeImage} alt="Tube" fill className="object-contain" />
      </div>
      <div className="absolute top-32 left-[40%] w-20 sm:w-28 h-20 sm:h-28 opacity-20 animate-float-slow hidden sm:block">
        <Image src={noodleImage} alt="Noodle" fill className="object-contain" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="md:flex items-center md:gap-8">
          <div className="md:w-1/2 lg:w-[478px] z-10" ref={addToRefs}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Plug-and-Play AI for Any Hospital System
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#010D3E] tracking-tight mt-4 sm:mt-6">
              NyxSpectra is a universal operational intelligence layer that seamlessly integrates with any Hospital Information System (HIS), regardless of vendor, size, or infrastructure.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center mt-6 sm:mt-[30px]">
              <a href="#contact">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Get Started
                </button>
              </a>
              <button 
                className="flex gap-2 items-center transform transition-all hover:translate-x-1 text-sm sm:text-base"
                onClick={() => setShowVideoModal(true)}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-700 font-medium">Watch Demo</span>
              </button>
            </div>
            
            <div className="hidden md:flex mt-8 gap-4">
              <div className="flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm shadow-lg">
                <div className="flex -space-x-2">
                  <Image 
                    src="/images/defaultimg.jpg" 
                    width={36} 
                    height={36} 
                    alt="Customer avatar" 
                    className="rounded-full border-2 border-white"
                  />
                  <Image 
                    src="/images/AI-diagnostic.jpeg" 
                    width={36} 
                    height={36} 
                    alt="Customer avatar" 
                    className="rounded-full border-2 border-white"
                  />
                  <Image 
                    src="/images/AI-Powered.jpeg" 
                    width={36} 
                    height={36} 
                    alt="Customer avatar" 
                    className="rounded-full border-2 border-white"
                  />
                </div>
                <span className="ml-2 text-sm text-[#001E80] font-medium">"Game-changing for our hospital workflows"</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-10 md:mt-0 md:w-1/2 lg:flex-1 md:h-[550px] relative" ref={addToRefs}>
            <div className="hidden md:block">
              <Image 
                src={mobilehImage}
                alt="NyxSpectra Dashboard" 
                width={800} 
                height={688} 
                className="md:absolute md:h-[550px] md:w-auto md:max-w-none right-0 object-contain animate-float"
                priority
              />
            </div>
            <div className="md:hidden">
              <Image 
                src={mobileImage}
                alt="NyxSpectra Mobile Dashboard" 
                width={320} 
                height={600} 
                className="mx-auto animate-float"
                priority
              />
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <button 
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-600 bg-opacity-80 rounded-full flex items-center justify-center text-white hover:bg-opacity-100 transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-xl"
                onClick={() => setShowVideoModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)} 
        videoSrc="/videos/nyx.mp4"
      />
      
      {/* Add styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
} 