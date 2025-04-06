'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaRobot, FaClipboardCheck, FaCode, FaChartLine } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const steps = [
  { 
    title: 'Record the Consultation', 
    description: 'Real-time voice transcription during patient interactions.',
    icon: <FaMicrophone size={24} /> 
  },
  { 
    title: 'AI-Powered Analysis', 
    description: 'The platform generates SOAP notes, highlights diagnostic insights, and offers predictive analytics.',
    icon: <FaRobot size={24} /> 
  },
  { 
    title: 'Review and Approve', 
    description: 'Providers review, edit, and approve the notes and recommendations.',
    icon: <FaClipboardCheck size={24} /> 
  },
  { 
    title: 'Auto-Coding and Reporting', 
    description: 'Automatically generate ICD codes and patient summaries for seamless billing and compliance.',
    icon: <FaCode size={24} /> 
  },
  { 
    title: 'Proactive Insights', 
    description: 'Use predictive analytics for resource allocation and patient care optimization.',
    icon: <FaChartLine size={24} /> 
  },
];

const HowItWorks = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="how-it-works py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto text-center px-4">
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <p className="text-lg text-gray-600 mb-12">The Seamless Process Behind Our SaaS Platform</p>
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -100 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className="step-card bg-white p-8 rounded-lg shadow-lg flex-1 max-w-xs"
            >
              <div className="icon-container mb-4 flex justify-center items-center h-16 w-16 bg-blue-600 text-white p-4 rounded-full mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
