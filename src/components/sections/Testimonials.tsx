
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useSwipeGestures, useDeviceDetection } from '../../hooks/useMobileOptimization';
import TouchOptimizedButton from '../ui/TouchOptimizedButton';

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  image?: string;
}

const Testimonials = () => {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'Modern Living Co.',
      quote: 'Working with Composition Design Lab transformed our vision into reality. Their attention to detail and innovative approach created a space that exceeds our expectations.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=128'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Property Developer',
      company: 'Horizon Properties',
      quote: 'The team at Composition Design Lab brought exceptional creativity and technical expertise to our commercial project. They were responsive, professional, and delivered on time and within budget.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=128'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      role: 'Homeowner',
      company: '',
      quote: 'Our dream home became a reality thanks to Composition Design Lab. They listened carefully to our needs and created a design that perfectly balances functionality and beauty.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=128'
    },
    {
      id: 4,
      name: 'Thomas Wright',
      role: 'Director',
      company: 'Urban Innovations',
      quote: 'The landscape design Composition Design Lab created for our corporate campus has transformed the employee experience. Their sustainable approach and artistic vision sets them apart.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=128'
    }
  ];

  // Current testimonial index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Auto scroll interval ID
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const { isMobile } = useDeviceDetection();

  // Initialize auto-scroll
  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    setIntervalId(id);
    
    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [testimonials.length]);

  // Restart auto-scroll
  const restartAutoScroll = () => {
    if (intervalId) window.clearInterval(intervalId);
    const id = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    setIntervalId(id);
  };

  // Navigate to previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    restartAutoScroll();
  };

  // Navigate to next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    restartAutoScroll();
  };

  // Set specific testimonial
  const setTestimonial = (index: number) => {
    setCurrentIndex(index);
    restartAutoScroll();
  };

  // Swipe gestures for mobile
  const swipeHandlers = useSwipeGestures({
    onSwipeLeft: nextTestimonial,
    onSwipeRight: prevTestimonial,
  });
  
  // Current testimonial
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare size={24} className="mr-2" />
            <h2>Client Testimonials</h2>
          </div>
          <p className="text-lg text-arch-secondary max-w-3xl mx-auto">
            Hear what our clients have to say about their experience working with Composition Design Lab.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div 
            className="bg-arch-lighter p-8 md:p-12 shadow-sm"
            {...(isMobile ? swipeHandlers : {})}
          >
            <div className="mb-6">
              {/* Star Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${i < currentTestimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-light italic mb-6">
                "{currentTestimonial.quote}"
              </blockquote>
            </div>
            
            {/* Client Info */}
            <div className="flex items-center">
              {currentTestimonial.image && (
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
              )}
              <div>
                <div className="font-montserrat font-medium">{currentTestimonial.name}</div>
                <div className="text-arch-secondary text-sm">
                  {currentTestimonial.role}
                  {currentTestimonial.company && `, ${currentTestimonial.company}`}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          {!isMobile && (
            <>
              <TouchOptimizedButton
                onClick={prevTestimonial}
                className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </TouchOptimizedButton>
              
              <TouchOptimizedButton
                onClick={nextTestimonial}
                className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </TouchOptimizedButton>
            </>
          )}
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <TouchOptimizedButton
              key={index}
              onClick={() => setTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-arch-accent' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span className="sr-only">{index + 1}</span>
            </TouchOptimizedButton>
          ))}
        </div>

        {/* Mobile swipe indicator */}
        {isMobile && (
          <div className="text-center mt-4">
            <p className="text-sm text-arch-secondary">
              Swipe left or right to navigate testimonials
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
