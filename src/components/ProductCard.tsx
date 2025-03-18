
import React from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group relative rounded-xl overflow-hidden bg-white border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Sale badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
          -{product.discount}%
        </div>
      )}
      
      {/* Wishlist button */}
      <button className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary hover:text-primary-foreground">
        <Heart size={16} />
      </button>
      
      {/* Product image with hover effect */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="button-outline flex items-center space-x-2 bg-white/80 backdrop-blur-sm">
            <Eye size={16} />
            <span>Быстрый просмотр</span>
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground">{product.brand}</span>
          {product.isNew && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Новинка</span>
          )}
        </div>
        
        <h3 className="font-medium">{product.name}</h3>
        
        <div className="mt-2 flex items-center gap-2">
          {product.discount > 0 ? (
            <>
              <span className="font-bold">{Math.round(product.price * (1 - product.discount / 100))} ₽</span>
              <span className="text-sm text-muted-foreground line-through">{product.price} ₽</span>
            </>
          ) : (
            <span className="font-bold">{product.price} ₽</span>
          )}
        </div>
        
        {/* Size chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {product.sizes.map((size) => (
            <span key={size} className="text-xs border rounded-full px-2 py-0.5 bg-secondary text-secondary-foreground">
              {size}
            </span>
          ))}
        </div>
        
        {/* Add to cart button */}
        <button 
          className="mt-4 w-full button-primary flex items-center justify-center gap-2"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={16} />
          <span>В корзину</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
