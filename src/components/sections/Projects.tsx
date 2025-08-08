
import React, { useState } from 'react';
import { Grid3X3, Images, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeGestures, useDeviceDetection } from '../../hooks/useMobileOptimization';
import TouchOptimizedButton from '../ui/TouchOptimizedButton';

// Project category type
type ProjectCategory = 'all' | 'residential' | 'commercial' | 'interior' | 'landscape';

// Individual project type
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  year: number;
}

const Projects = () => {
  // Active category state
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const { isMobile } = useDeviceDetection();
  
  // Mock projects data
  const projects: Project[] = [
    {
      id: 1,
      title: 'Modern Hillside Residence',
      category: 'residential',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
      description: 'A contemporary home built into a hillside with panoramic city views and sustainable features.',
      location: 'Los Angeles, CA',
      year: 2022
    },
    {
      id: 2,
      title: 'Urban Office Complex',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80',
      description: 'A 15-story office building with an innovative atrium design that maximizes natural light.',
      location: 'Chicago, IL',
      year: 2021
    },
    {
      id: 3,
      title: 'Minimalist Apartment Redesign',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80',
      description: 'Complete interior transformation of a 2,000 sq ft apartment focusing on minimalism and functionality.',
      location: 'New York, NY',
      year: 2022
    },
    {
      id: 4,
      title: 'Urban Park Renewal',
      category: 'landscape',
      image: 'https://images.unsplash.com/photo-1603093427617-6b5aeac2796c?auto=format&fit=crop&q=80',
      description: 'Revitalization of a 5-acre public park with sustainable water features and native plantings.',
      location: 'Portland, OR',
      year: 2023
    },
    {
      id: 5,
      title: 'Glass Lake House',
      category: 'residential',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
      description: 'A transparent modern home designed to blur the boundaries between inside and outside.',
      location: 'Lake Tahoe, NV',
      year: 2021
    },
    {
      id: 6,
      title: 'Boutique Retail Center',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1535025639604-9a804c092faa?auto=format&fit=crop&q=80',
      description: 'A high-end shopping destination featuring locally sourced materials and an open-air concept.',
      location: 'Miami, FL',
      year: 2022
    }
  ];
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // Categories for the filter
  const categories: {id: ProjectCategory, label: string}[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'interior', label: 'Interior' },
    { id: 'landscape', label: 'Landscape' }
  ];

  return (
    <section id="projects" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Grid3X3 size={24} className="mr-2" />
            <h2>Our Projects</h2>
          </div>
          <p className="text-lg text-arch-secondary max-w-3xl mx-auto">
            Explore our diverse portfolio of architectural projects spanning residential, 
            commercial, interior design, and landscape architecture.
          </p>
        </div>
        
        {/* Filter Categories */}
        <div className={`flex ${isMobile ? 'overflow-x-auto pb-2' : 'flex-wrap justify-center'} gap-2 mb-12`}>
          {categories.map((category) => (
            <TouchOptimizedButton
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 font-montserrat text-sm tracking-wide transition-colors duration-300 ${isMobile ? 'whitespace-nowrap flex-shrink-0' : ''}
                ${activeCategory === category.id 
                  ? 'bg-arch-primary text-white' 
                  : 'bg-arch-light text-arch-secondary hover:bg-arch-primary hover:bg-opacity-10'
                }
              `}
            >
              {category.label}
            </TouchOptimizedButton>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'}`}>
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Project Image with Overlay */}
              <div className="relative overflow-hidden mb-4">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${isMobile ? 'h-64' : 'h-80'}`} 
                />
                <div className={`absolute inset-0 bg-black bg-opacity-30 ${isMobile ? 'opacity-20' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300 flex items-center justify-center`}>
                  <span className="text-white border border-white px-4 py-2 uppercase text-sm tracking-wider">
                    View Project
                  </span>
                </div>
              </div>
              
              {/* Project Info */}
              <h4 className="text-xl font-montserrat mb-1 group-hover:text-arch-accent transition-colors duration-300">
                {project.title}
              </h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-arch-secondary uppercase text-xs tracking-wider font-montserrat">
                  {project.category}
                </span>
                <span className="text-arch-secondary text-sm">
                  {project.location}, {project.year}
                </span>
              </div>
              <p className="text-arch-secondary line-clamp-2">{project.description}</p>
            </div>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="mt-12 text-center">
          <TouchOptimizedButton className="btn-secondary">
            View All Projects
          </TouchOptimizedButton>
        </div>
      </div>
    </section>
  );
};

export default Projects;
