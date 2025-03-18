
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }
    
    // Form submission would go here in a real application
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <section id="contact" className="section-container">
      <div className="text-center mb-16">
        <h2 className="section-title">Связаться с нами</h2>
        <p className="section-subtitle mx-auto">
          Остались вопросы или нужна помощь с выбором? Наши специалисты всегда готовы помочь вам.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact info */}
        <div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border h-full">
            <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Адрес</h4>
                  <p className="text-muted-foreground">г. Москва, ул. Тверская, 1</p>
                  <p className="text-muted-foreground">10:00 – 22:00, без выходных</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Телефон</h4>
                  <p className="text-muted-foreground">8 (800) 123-45-67</p>
                  <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">info@krossy.ru</p>
                  <p className="text-muted-foreground">Время ответа: до 24 часов</p>
                </div>
              </div>
            </div>
            
            {/* Map placeholder */}
            <div className="mt-8 h-64 bg-secondary rounded-lg overflow-hidden">
              <div className="w-full h-full bg-[url('https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3Adb0c2e8d898a2c179913c5de0a7fe5c8a0a74a01e219d823e75bd4c9ab8d3c3f&amp;width=500&amp;height=400&amp;lang=ru_RU')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
        
        {/* Contact form */}
        <div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
            <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field w-full"
                    placeholder="Введите ваше имя"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field w-full"
                    placeholder="Введите ваш email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="input-field w-full resize-none"
                    placeholder="Напишите ваше сообщение..."
                  />
                </div>
                
                <button type="submit" className="button-primary w-full flex items-center justify-center gap-2">
                  <Send size={16} />
                  <span>Отправить сообщение</span>
                </button>
              </div>
            </form>
            
            {/* Newsletter subscription */}
            <div className="mt-8 pt-8 border-t">
              <h4 className="font-medium mb-4">Подпишитесь на новости и акции</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  className="input-field flex-1"
                  placeholder="Ваш email"
                />
                <button className="button-primary whitespace-nowrap">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
