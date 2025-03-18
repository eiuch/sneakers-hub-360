
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`navbar ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">Кроссы и точка</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="#catalog" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Каталог
              </a>
              <a href="#about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                О нас
              </a>
              <a href="#contact" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Контакты
              </a>
            </div>
          </div>
          
          {/* Mobile menu button and cart */}
          <div className="flex items-center space-x-2">
            <CartDrawer />
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Открыть меню</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          <a
            href="#catalog"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5"
            onClick={() => setIsMenuOpen(false)}
          >
            Каталог
          </a>
          <a
            href="#about"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5"
            onClick={() => setIsMenuOpen(false)}
          >
            О нас
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5"
            onClick={() => setIsMenuOpen(false)}
          >
            Контакты
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
