
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCatalog from '../components/ProductCatalog';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { CartProvider } from '../contexts/CartContext';

const Index = () => {
  // Add fade-in animation functionality
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      fadeElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Scroll to section when clicking on navigation links
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const sectionId = target.getAttribute('href')?.substring(1);
        const section = document.getElementById(sectionId || '');
        
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80, // Offset for the navbar
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);
  
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <Hero />
          <ProductCatalog />
          <AboutSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
