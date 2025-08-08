
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackNavigation } from '../../lib/analytics';

interface NavbarProps {
  logoText?: string;
}

const Navbar = ({ logoText = "Composition Design Lab" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-95 shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div>
          <a 
            href="#hero" 
            className="font-montserrat font-semibold text-lg md:text-xl text-arch-primary"
          >
            {logoText}
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            {['home', 'about', 'projects', 'services', 'testimonials', 'contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item === 'home' ? 'hero' : item}`}
                  className="font-montserrat text-sm tracking-wider uppercase text-arch-secondary hover:text-arch-primary transition-colors duration-300"
                  onClick={() => trackNavigation(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-arch-primary p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md animate-fade-in">
            <ul className="flex flex-col py-4">
              {['home', 'about', 'projects', 'services', 'testimonials', 'contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="font-montserrat text-sm tracking-wider uppercase text-arch-secondary hover:text-arch-primary transition-colors duration-300 block py-3 px-6"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
