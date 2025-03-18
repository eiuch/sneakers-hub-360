
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the container
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      // Apply parallax effect to the hero image
      const heroImage = heroRef.current.querySelector('.hero-image') as HTMLElement;
      if (heroImage) {
        heroImage.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(1.05)`;
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)' 
      }}
    >
      {/* Background shapes */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="z-10 animate-slide-up">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase bg-primary/10 text-primary rounded-full">
            Новая коллекция
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
            Откройте мир премиальных кроссовок
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Эксклюзивные модели от ведущих брендов с доставкой по всей России. Качество, стиль и комфорт в каждой паре.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#catalog" className="button-primary">
              Смотреть каталог
            </a>
            <a href="#about" className="button-outline">
              О магазине
            </a>
          </div>
          
          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Моделей</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-muted-foreground">Поддержка</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground">Гарантия</p>
            </div>
          </div>
        </div>
        
        {/* Hero image */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent z-10 rounded-2xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80"
            alt="Premium Sneakers" 
            className="hero-image w-full h-[600px] object-cover rounded-2xl transition-transform duration-200 ease-out shadow-xl"
          />
          {/* Floating product cards */}
          <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl shadow-lg z-20 max-w-[200px] animate-float" style={{ animationDelay: '1s' }}>
            <p className="font-medium">Nike Air Max</p>
            <p className="text-sm text-muted-foreground">Легендарная серия</p>
          </div>
          <div className="absolute top-1/4 -right-6 glass-card p-4 rounded-xl shadow-lg z-20 max-w-[200px] animate-float" style={{ animationDelay: '2s' }}>
            <p className="font-medium">Быстрая доставка</p>
            <p className="text-sm text-muted-foreground">По всей России</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
