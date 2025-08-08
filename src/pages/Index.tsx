import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { useAnalytics, usePageTracking } from '../hooks/useAnalytics';

const Index = () => {
  // Track analytics for this page
  useAnalytics();
  usePageTracking('Home - Composition Design Lab');

  return (
    <>
      <SEO 
        title="Composition Design Lab - Architecture & Design Studio"
        description="Composition Design Lab is a forward-thinking architecture studio specializing in innovative design, sustainable building, and urban planning. We create spaces that inspire, endure, and transform."
        keywords="architecture, design, building, construction, interior design, urban planning, sustainable architecture, commercial design, residential design, architectural firm"
        type="website"
      />
      <StructuredData type="organization" />
      <StructuredData type="localBusiness" />
      <StructuredData type="service" />
      
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </Layout>
    </>
  );
};

export default Index;
