
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`navbar transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl md:text-2xl font-display font-bold tracking-tight">
          Кроссы и точка
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#catalog" className="text-sm font-medium hover:text-primary/70 transition-colors">
            Каталог
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary/70 transition-colors">
            О нас
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary/70 transition-colors">
            Контакты
          </a>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-primary/5 transition-colors">
            <Search size={20} />
          </button>
          
          <button className="p-2 rounded-full hover:bg-primary/5 transition-colors relative">
            <ShoppingBag size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="p-2 rounded-full hover:bg-primary/5 transition-colors md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-slide-down">
          <div className="container py-4 flex flex-col space-y-4">
            <a 
              href="#catalog" 
              className="text-sm font-medium p-2 hover:bg-primary/5 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Каталог
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium p-2 hover:bg-primary/5 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              О нас
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium p-2 hover:bg-primary/5 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
