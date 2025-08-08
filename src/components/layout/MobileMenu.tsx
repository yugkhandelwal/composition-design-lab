import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Settings, MessageSquare, Phone } from 'lucide-react';
import TouchOptimizedButton from '../ui/TouchOptimizedButton';
import { trackNavigation } from '../../lib/analytics';

interface MobileMenuProps {
  logoText?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ logoText = "Composition Design Lab" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or on menu items
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleMenuItemClick = (item: typeof menuItems[0]) => {
    trackNavigation(item.label.toLowerCase());
    setIsOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(item.id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden
          ${isScrolled || isOpen 
            ? 'bg-white shadow-md' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <TouchOptimizedButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`
              font-montserrat font-semibold text-lg transition-colors
              ${isScrolled || isOpen ? 'text-arch-primary' : 'text-white'}
            `}
            aria-label="Go to top"
          >
            {logoText}
          </TouchOptimizedButton>

          {/* Menu Toggle */}
          <TouchOptimizedButton
            onClick={() => setIsOpen(!isOpen)}
            className={`
              p-2 rounded-lg transition-colors
              ${isScrolled || isOpen ? 'text-arch-primary' : 'text-white'}
            `}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </TouchOptimizedButton>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          mobile-menu-container fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 
          transform transition-transform duration-300 ease-out md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-montserrat font-semibold text-xl text-arch-primary">Menu</h2>
          <TouchOptimizedButton
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-arch-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </TouchOptimizedButton>
        </div>

        {/* Menu Items */}
        <nav className="p-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <TouchOptimizedButton
                    onClick={() => handleMenuItemClick(item)}
                    className="
                      flex items-center w-full p-4 rounded-lg text-left
                      hover:bg-arch-lighter transition-colors
                      text-arch-secondary hover:text-arch-primary
                    "
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon size={20} className="mr-4 flex-shrink-0" />
                    <span className="font-montserrat font-medium">{item.label}</span>
                  </TouchOptimizedButton>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact Info in Menu */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <MessageSquare size={16} className="mr-2" />
              <span>info@compositiondesignlab.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
