
import React from 'react';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import PWAPrompt from '../ui/PWAPrompt';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MobileMenu />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <PWAPrompt />
    </div>
  );
};

export default Layout;
