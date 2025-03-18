
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check, CreditCard, Truck, MapPin, Package, ShieldCheck } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const shippingMethods = [
  {
    id: "express",
    title: "Экспресс-доставка",
    description: "Доставка за 1-2 дня",
    price: 500,
    icon: <Truck className="h-5 w-5" />,
  },
  {
    id: "standard",
    title: "Стандартная доставка",
    description: "Доставка за 3-7 дней",
    price: 250,
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "pickup",
    title: "Самовывоз",
    description: "Из магазина в вашем городе",
    price: 0,
    icon: <MapPin className="h-5 w-5" />,
  },
];

const paymentMethods = [
  {
    id: "card",
    title: "Оплата картой при получении",
    description: "Visa, MasterCard, МИР",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "cash",
    title: "Наличными при получении",
    description: "Оплата курьеру при доставке",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "online",
    title: "Онлайн-оплата",
    description: "Картой на сайте",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const OrderConfirmation = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("card");
  
  // Redirect if no form data is available (user directly accessed this page)
  useEffect(() => {
    if (!location.state?.formData) {
      navigate('/checkout');
    }
  }, [location.state, navigate]);
  
  if (!location.state?.formData) {
    return null; // Don't render anything while redirecting
  }
  
  const formData = location.state.formData;
  
  const selectedShippingMethod = shippingMethods.find(
    (method) => method.id === selectedShipping
  );
  
  const subtotal = getTotalPrice();
  const shippingCost = selectedShippingMethod?.price || 0;
  const total = subtotal + shippingCost;
  
  const handleSubmitOrder = () => {
    setIsSubmitting(true);
    
    // Here you would typically send the order data to your backend
    setTimeout(() => {
      toast({
        title: "Заказ успешно оформлен!",
        description: "Вы получите подтверждение на указанный email",
      });
      clearCart();
      navigate("/");
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="bg-background min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2" 
          onClick={() => navigate("/checkout")}
        >
          <ArrowLeft className="h-4 w-4" /> Вернуться к оформлению
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">Подтверждение заказа</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Данные получателя</CardTitle>
                <CardDescription>Проверьте правильность введенных данных</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">ФИО</h3>
                    <p>{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Телефон</h3>
                    <p>{formData.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Адрес</h3>
                    <p>{formData.address}, {formData.city}, {formData.zipCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Способ доставки</CardTitle>
                <CardDescription>Выберите удобный способ доставки</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={selectedShipping} 
                  onValueChange={setSelectedShipping}
                  className="space-y-3"
                >
                  {shippingMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedShipping === method.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedShipping(method.id)}
                    >
                      <RadioGroupItem value={method.id} id={`shipping-${method.id}`} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor={`shipping-${method.id}`}
                            className="text-base font-medium flex items-center gap-2 cursor-pointer"
                          >
                            {method.icon}
                            {method.title}
                          </Label>
                          <span className="font-medium">
                            {method.price > 0 ? `${method.price} ₽` : "Бесплатно"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Способ оплаты</CardTitle>
                <CardDescription>Выберите удобный способ оплаты</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={selectedPayment} 
                  onValueChange={setSelectedPayment}
                  className="space-y-3"
                >
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <RadioGroupItem value={method.id} id={`payment-${method.id}`} className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor={`payment-${method.id}`}
                          className="text-base font-medium flex items-center gap-2 cursor-pointer"
                        >
                          {method.icon}
                          {method.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Button
              onClick={handleSubmitOrder}
              className="w-full md:hidden"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Оформление..." : "Подтвердить и оплатить"}
            </Button>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg border sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Ваш заказ</h2>
              
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 py-3 border-b">
                    <div className="h-16 w-16 rounded bg-secondary flex-shrink-0 overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <span className="text-sm">x{item.quantity}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                      <p className="text-sm font-medium mt-1">
                        {item.product.discount > 0
                          ? Math.round(item.product.price * (1 - item.product.discount / 100)) * item.quantity
                          : item.product.price * item.quantity} ₽
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Сумма</span>
                  <span>{subtotal.toFixed(0)} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{shippingCost > 0 ? `${shippingCost} ₽` : 'Бесплатно'}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span>{total.toFixed(0)} ₽</span>
                </div>
              </div>
              
              <Button 
                onClick={handleSubmitOrder}
                className="w-full mt-6 hidden md:flex"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Оформление..." : "Подтвердить и оплатить"}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Нажимая «Подтвердить и оплатить», вы соглашаетесь с условиями публичной оферты
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
