import type { Metadata } from "next";
import { Header } from "../sections/Header";
import { Hero } from "../sections/Hero";
import FeaturesSection from "../sections/Features";
import BenefitsSection from "../sections/Benefits";
import BlogSection from "../sections/Blog";
import TestimonialsSection from "../sections/Testimonials";
import ContactSection from "../sections/Contact";
import FooterSection from "../sections/Footer";

export const metadata: Metadata = {
  title: "NyxSpectra - AI-Powered Healthcare Solutions",
  description: "Empowering healthcare professionals with cutting-edge AI tools for improved patient care and operational efficiency",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div className="main-content">
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </div>
      <FooterSection />
    </main>
  );
}
