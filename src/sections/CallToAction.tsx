"use client";

import starImage from "@/assets/star.png";
import mobile from "@/assets/mobile.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/nyxspectra/google_sheets/zgDjvjnCVdreEprt?tabId=Sheet1",
        {
          method: "POST",
          body: JSON.stringify([[formData.name, formData.email, formData.phone, formData.message]]),
          headers: { "Content-Type": "application/json" },
        }
      ); 

      if (response.ok) {
        toast.success("Form submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsFormOpen(false); // Close form
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="help"
      ref={sectionRef}
      className="bg-gradient-to-b from-[#F0F4FF] to-[#D2DCFF] py-24 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#001E80]">
            Transform Healthcare in Your Institution
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mt-5 max-w-2xl mx-auto">
            Discover how our AI-powered platform can revolutionize your healthcare workflows.
          </p>
          <p className="text-lg md:text-xl text-gray-600 mt-2 max-w-2xl mx-auto">
            Let us help you focus on what truly matters—your patients.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-10 justify-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="btn btn-primary px-8 py-4 text-lg font-semibold"
            >
              Schedule a Demo Today
            </button>
          </div>
        </div>

        {/* Floating Images */}
        <motion.img
          src={starImage.src}
          alt="Star decoration"
          className="absolute -left-40 top-0 w-[240px] md:w-[360px]"
          style={{ translateY }}
        />
        <motion.img
          src={mobile.src}
          alt="Mobile decoration"
          className="absolute -right-7 top-20 w-[240px] md:w-[360px]"
          style={{ translateY }}
        />
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Schedule a Demo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="btn btn-secondary px-6 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-6 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </section>
  );
};
