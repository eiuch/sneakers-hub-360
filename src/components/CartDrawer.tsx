
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    setOpen(false);
    navigate('/checkout');
  };
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
          aria-label="Корзина"
        >
          <ShoppingBag className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="h-[85vh]">
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-semibold">Корзина</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Ваша корзина пуста</p>
              <p className="text-muted-foreground mt-2 text-center">
                Добавьте товары из каталога, чтобы оформить заказ
              </p>
              <Button 
                className="mt-6" 
                onClick={() => setOpen(false)}
              >
                Перейти к каталогу
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 border-b pb-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-secondary">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                          <p className="text-sm">Размер: {item.product.sizes[0]}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.product.id)}
                          className="h-8 w-8 text-muted-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-full">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="font-medium">
                          {item.product.discount > 0 ? (
                            <>
                              <span>{Math.round(item.product.price * (1 - item.product.discount / 100) * item.quantity)} ₽</span>
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                {item.product.price * item.quantity} ₽
                              </span>
                            </>
                          ) : (
                            <span>{item.product.price * item.quantity} ₽</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Итого:</span>
                  <span className="font-bold text-lg">{getTotalPrice().toFixed(0)} ₽</span>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
