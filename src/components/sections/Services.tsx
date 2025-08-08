
import React from 'react';
import { Home, Briefcase, Image, MapPin, CheckCircle } from 'lucide-react';

// Service interface
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
}

const Services = () => {
  // Services data
  const services: Service[] = [
    {
      id: 1,
      title: 'Architectural Design',
      description: 'Comprehensive architectural services from concept through construction.',
      icon: Home,
      features: [
        'Custom residential and commercial design',
        'Sustainable and green building solutions',
        'Historical preservation and adaptive reuse',
        'Building code compliance and permitting'
      ]
    },
    {
      id: 2,
      title: 'Interior Design',
      description: 'Creating functional, aesthetically pleasing interior spaces tailored to your needs.',
      icon: Image,
      features: [
        'Space planning and layout optimization',
        'Material and finish selection',
        'Furniture and fixture specification',
        'Lighting design and mood creation'
      ]
    },
    {
      id: 3,
      title: 'Urban Planning',
      description: 'Strategic planning for communities, developments, and public spaces.',
      icon: MapPin,
      features: [
        'Master planning and site analysis',
        'Mixed-use development planning',
        'Public space and streetscape design',
        'Sustainable urban design strategies'
      ]
    },
    {
      id: 4,
      title: 'Project Management',
      description: 'End-to-end project oversight ensuring quality, timeliness, and budget adherence.',
      icon: Briefcase,
      features: [
        'Budget development and management',
        'Contractor selection and coordination',
        'Construction administration',
        'Quality control and client advocacy'
      ]
    }
  ];

  return (
    <section id="services" className="section bg-arch-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="mb-4">Our Services</h2>
          <p className="text-lg text-arch-secondary max-w-3xl mx-auto">
            We offer a comprehensive range of architectural and design services
            to bring your vision to life with expertise and precision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            
            return (
              <div 
                key={service.id} 
                className="bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-6">
                  <Icon size={32} className="text-arch-accent" />
                </div>
                
                <h3 className="text-2xl mb-3">{service.title}</h3>
                <p className="text-arch-secondary mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="text-arch-accent mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        
        {/* Approach Section */}
        <div className="bg-white p-10 shadow-sm">
          <h3 className="text-2xl mb-6 text-center">Our Approach</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-arch-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-montserrat text-2xl font-bold">01</span>
              </div>
              <h4 className="text-xl mb-2">Discover</h4>
              <p className="text-arch-secondary">
                We begin by understanding your vision, requirements, and the context of your project.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-arch-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-montserrat text-2xl font-bold">02</span>
              </div>
              <h4 className="text-xl mb-2">Design</h4>
              <p className="text-arch-secondary">
                Our creative team develops innovative solutions tailored to your specific needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-arch-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-montserrat text-2xl font-bold">03</span>
              </div>
              <h4 className="text-xl mb-2">Deliver</h4>
              <p className="text-arch-secondary">
                We execute with precision, ensuring every detail is perfectly realized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
