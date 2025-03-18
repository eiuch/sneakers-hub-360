
import React, { useEffect, useRef } from 'react';
import { CheckCircle, Truck, CreditCard, RefreshCw } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    const fadeElements = sectionRef.current?.querySelectorAll('.fade-in-section');
    fadeElements?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      fadeElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <section id="about" ref={sectionRef} className="section-container bg-secondary/50">
      <div className="text-center mb-16">
        <h2 className="section-title">О нашем магазине</h2>
        <p className="section-subtitle mx-auto">
          "Кроссы и точка" — это больше, чем просто магазин. Это пространство для тех, кто ценит качество, комфорт и стиль.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* About text */}
        <div className="fade-in-section">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-primary mt-1" size={24} />
              <div>
                <h3 className="text-lg font-medium">Оригинальная продукция</h3>
                <p className="text-muted-foreground">
                  Мы работаем напрямую с брендами и официальными поставщиками, гарантируя 100% подлинность каждой пары.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Truck className="text-primary mt-1" size={24} />
              <div>
                <h3 className="text-lg font-medium">Быстрая доставка</h3>
                <p className="text-muted-foreground">
                  Доставляем по всей России. В Москве и Санкт-Петербурге возможна доставка в день заказа.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <CreditCard className="text-primary mt-1" size={24} />
              <div>
                <h3 className="text-lg font-medium">Удобная оплата</h3>
                <p className="text-muted-foreground">
                  Принимаем все виды карт, электронные платежи и наличные при получении.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <RefreshCw className="text-primary mt-1" size={24} />
              <div>
                <h3 className="text-lg font-medium">Гарантия возврата</h3>
                <p className="text-muted-foreground">
                  Не подошёл размер? Вернём деньги или обменяем на другую модель в течение 14 дней.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="fade-in-section h-64 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
                alt="Store interior" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="fade-in-section h-40 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
                alt="Sneakers collection" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="fade-in-section h-40 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1600181516264-3ea807ff44b9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
                alt="Premium sneakers" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="fade-in-section h-64 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
                alt="Sneakers detail" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="mt-24">
        <h3 className="text-2xl font-bold text-center mb-12">Что говорят наши клиенты</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Александр К.",
              text: "Отличный магазин! Заказал кроссовки Nike Air Max, доставили на следующий день. Качество на высоте, буду заказывать ещё.",
              rating: 5
            },
            {
              name: "Екатерина М.",
              text: "Очень довольна покупкой. Долго искала редкую модель Adidas, нашла только здесь. Приятно удивил сервис и скорость доставки.",
              rating: 5
            },
            {
              name: "Дмитрий В.",
              text: "Сначала сомневался, но решил заказать. Кроссовки пришли оригинальные, всё как на картинке. Отдельное спасибо за подарок!",
              rating: 4
            }
          ].map((testimonial, index) => (
            <div key={index} className="fade-in-section glass-card p-6 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-0.5 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4">{testimonial.text}</p>
              <p className="font-medium">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
