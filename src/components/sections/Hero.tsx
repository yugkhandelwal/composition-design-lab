
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the hero image for better performance
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1920';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center relative bg-cover bg-center bg-gray-900"
      style={{ 
        backgroundImage: imageLoaded 
          ? `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1920')` 
          : 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white pt-20">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="font-montserrat font-light mb-4">
            <span className="block">Design that</span>
            <span className="font-semibold">Shapes Experience</span>
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-8">
            We create extraordinary spaces that inspire, engage, and endure.
            Our architectural solutions blend innovation with purpose.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              className="btn-primary flex items-center"
            >
              Explore Our Work <ArrowRight className="ml-2" size={18} />
            </a>
            
            <a 
              href="#contact" 
              className="btn-secondary"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-1 h-12 border-l border-white"></div>
        <ArrowRight className="rotate-90 text-white mt-2" />
      </div>
    </section>
  );
};

export default Hero;
