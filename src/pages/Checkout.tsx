import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, CreditCard, Truck, MapPin, ArrowLeft, ShieldCheck, Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  lastName: z.string().min(2, { message: "Фамилия должна содержать не менее 2 символов" }),
  email: z.string().email({ message: "Введите корректный email" }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
  address: z.string().min(5, { message: "Введите корректный адрес" }),
  city: z.string().min(2, { message: "Введите название города" }),
  zipCode: z.string().min(6, { message: "Введите корректный почтовый индекс" }),
  shippingMethod: z.enum(["express", "standard", "pickup"]),
  paymentMethod: z.enum(["card", "cash", "online"]),
});

type FormValues = z.infer<typeof formSchema>;

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

const Checkout = () => {
  const { cartItems, getTotalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      shippingMethod: "standard",
      paymentMethod: "card",
    },
  });
  
  const selectedShippingMethod = shippingMethods.find(
    (method) => method.id === form.watch("shippingMethod")
  );
  
  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      navigate("/order-confirmation", { state: { formData: values } });
      setIsSubmitting(false);
    }, 500);
  };
  
  const subtotal = getTotalPrice();
  const shippingCost = selectedShippingMethod?.price || 0;
  const total = subtotal + shippingCost;
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-6">Ваша корзина пуста</h1>
        <p className="mb-6">Добавьте товары в корзину, чтобы оформить заказ</p>
        <Button onClick={() => navigate("/")}>Вернуться в магазин</Button>
      </div>
    );
  }
  
  return (
    <div className="bg-background min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" /> Вернуться в магазин
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Контактные данные</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                              <Input placeholder="Имя" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Фамилия</FormLabel>
                            <FormControl>
                              <Input placeholder="Фамилия" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="example@mail.ru" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                              <Input placeholder="+7 (___) ___-__-__" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Адрес</FormLabel>
                            <FormControl>
                              <Input placeholder="Улица, дом, квартира" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Город</FormLabel>
                              <FormControl>
                                <Input placeholder="Город" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Индекс</FormLabel>
                              <FormControl>
                                <Input placeholder="Почтовый индекс" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Способ доставки</h2>
                    <FormField
                      control={form.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="space-y-3"
                            >
                              {shippingMethods.map((method) => (
                                <div
                                  key={method.id}
                                  className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                                    field.value === method.id
                                      ? "border-primary bg-primary/5"
                                      : "hover:bg-muted/50"
                                  }`}
                                  onClick={() => field.onChange(method.id)}
                                >
                                  <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <Label
                                        htmlFor={method.id}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Способ оплаты</h2>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="space-y-3"
                            >
                              {paymentMethods.map((method) => (
                                <div
                                  key={method.id}
                                  className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                                    field.value === method.id
                                      ? "border-primary bg-primary/5"
                                      : "hover:bg-muted/50"
                                  }`}
                                  onClick={() => field.onChange(method.id)}
                                >
                                  <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                                  <div className="flex-1">
                                    <Label
                                      htmlFor={method.id}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:hidden" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Оформление..." : "Оформить заказ"}
                </Button>
              </form>
            </Form>
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
              
              <div className="space-y-3 pt-4 mt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Сумма</span>
                  <span>{subtotal.toFixed(0)} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{shippingCost > 0 ? `${shippingCost} ₽` : 'Бесплатно'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Итого</span>
                  <span>{total.toFixed(0)} ₽</span>
                </div>
              </div>
              
              <Button 
                onClick={form.handleSubmit(handleSubmit)} 
                className="w-full mt-6 hidden md:flex"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Оформление..." : "Оформить заказ"}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Нажимая «Оформить заказ», вы соглашаетесь с условиями публичной оферты
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
