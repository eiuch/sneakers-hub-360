
import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and social media */}
          <div className="md:col-span-1">
            <a href="#" className="text-2xl font-display font-bold tracking-tight">
              Кроссы и точка
            </a>
            <p className="mt-4 text-primary-foreground/80">
              Магазин оригинальных кроссовок от ведущих мировых брендов
            </p>
            
            <div className="mt-6 flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Категории</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Мужские кроссовки</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Женские кроссовки</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Детские кроссовки</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Новинки</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Распродажа</a></li>
            </ul>
          </div>
          
          {/* Help */}
          <div>
            <h3 className="font-medium text-lg mb-4">Информация</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">О магазине</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Доставка и оплата</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Возврат и обмен</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Программа лояльности</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Контакты</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">г. Москва, ул. Тверская, 1</li>
              <li className="text-primary-foreground/80">10:00 – 22:00, без выходных</li>
              <li><a href="tel:88001234567" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">8 (800) 123-45-67</a></li>
              <li><a href="mailto:info@krossy.ru" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">info@krossy.ru</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/70 text-sm">
            © 2023 Кроссы и точка. Все права защищены.
          </p>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
              Пользовательское соглашение
            </a>
            <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
              Карта сайта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
