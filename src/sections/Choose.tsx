"use client"
import React, { useState, useEffect } from 'react';
import { FaIndustry, FaRobot, FaLanguage, FaShieldAlt, FaGlobeAmericas, FaStethoscope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhyChooseUs = () => {
  const [hasMounted, setHasMounted] = useState(false);  // State to track if the component has mounted

  useEffect(() => {
    setHasMounted(true);  // Set to true once the component is mounted
  }, []);

  const features = [
    { title: 'Built on Lean Manufacturing Principles', description: 'Designed to eliminate waste and improve efficiency.', icon: <FaIndustry className="text-4xl text-primary" /> },
    { title: 'AI-Powered Intelligence', description: 'Proactive insights, predictive analytics, and clinical decision support.', icon: <FaRobot className="text-4xl text-primary" /> },
    { title: 'Real-Time Multilingual Transcription', description: 'Bridging communication gaps across languages.', icon: <FaLanguage className="text-4xl text-primary" /> },
    { title: 'Auto-Scrubbing for Compliance', description: 'Ensures clean, accurate data for seamless operations.', icon: <FaShieldAlt className="text-4xl text-primary" /> },
    { title: 'Global Standards', description: 'FHIR/HL7-compliant for easy integration with existing systems.', icon: <FaGlobeAmericas className="text-4xl text-primary" /> },
    { title: 'Specialty-Specific Modules', description: 'Tailored solutions for various medical fields, from oncology to radiology.', icon: <FaStethoscope className="text-4xl text-primary" /> },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  if (!hasMounted) {
    return null;  // Return nothing until the component is mounted to avoid hydration mismatch
  }

  return (
    <section id="why-us" className="py-16 bg-gray-50 text-black" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us?
        </motion.h2>
        <p className="text-base sm:text-lg mb-12">Our Unique Differentiators</p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white text-gray-800 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4 lg:mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 lg:mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
