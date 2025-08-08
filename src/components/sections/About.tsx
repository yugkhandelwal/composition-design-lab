
import React from 'react';
import { Users } from 'lucide-react';

const About = () => {
  // Team members data
  const team = [
    {
      name: 'Jane Doe',
      role: 'Principal Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
      bio: '15+ years of experience in commercial and residential design.'
    },
    {
      name: 'John Smith',
      role: 'Design Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256',
      bio: 'Award-winning designer specializing in sustainable architecture.'
    },
    {
      name: 'Emma Wilson',
      role: 'Interior Architect',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=256',
      bio: 'Creates harmonious spaces focused on user experience and functionality.'
    },
    {
      name: 'Michael Brown',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
      bio: 'Ensures projects are delivered on time and within budget.'
    }
  ];

  return (
    <section id="about" className="section bg-arch-lighter">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="mb-4">About Our Firm</h2>
          <p className="text-lg text-arch-secondary">
            Founded in 2010, Composition Design Lab is a forward-thinking architecture studio dedicated to 
            creating meaningful spaces that enrich lives and communities.
          </p>
        </div>

        {/* Mission and Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-10 shadow-sm">
            <h3 className="text-2xl mb-4">Our Mission</h3>
            <p className="mb-4">
              To create architecture that enriches human experience through innovative design, 
              sustainable practices, and thoughtful integration with the environment.
            </p>
            <p>
              We believe in the power of design to transform how people live, work, and interact
              with the world around them.
            </p>
          </div>

          <div className="bg-white p-10 shadow-sm">
            <h3 className="text-2xl mb-4">Our Values</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Innovation:</span>
                <span>Embracing new ideas and technologies to push architectural boundaries.</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Sustainability:</span>
                <span>Creating environmentally responsible designs that stand the test of time.</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Collaboration:</span>
                <span>Working together with clients and communities to achieve shared visions.</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Excellence:</span>
                <span>Committing to the highest quality in every aspect of our work.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="flex items-center justify-center mb-10">
            <Users className="mr-2" size={24} />
            <h3 className="text-2xl">Our Team</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="overflow-hidden mb-4">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h4 className="text-xl font-montserrat mb-1">{member.name}</h4>
                <p className="text-arch-accent font-montserrat uppercase text-sm tracking-wider mb-2">{member.role}</p>
                <p className="text-arch-secondary">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
