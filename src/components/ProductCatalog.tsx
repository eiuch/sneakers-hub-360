
import React, { useState, useEffect } from 'react';
import { Sliders, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import { products, Product } from '../data/products';

const ProductCatalog = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Extract unique brands and categories
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  
  // Get min and max price
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by brand
    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand === selectedBrand);
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Filter by price
    result = result.filter(p => {
      const effectivePrice = p.discount > 0 
        ? p.price * (1 - p.discount / 100) 
        : p.price;
      return effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
    });
    
    setFilteredProducts(result);
  }, [selectedBrand, selectedCategory, priceRange]);
  
  return (
    <section id="catalog" className="section-container">
      <div className="text-center mb-10">
        <h2 className="section-title">Каталог кроссовок</h2>
        <p className="section-subtitle mx-auto">
          Выберите из нашей эксклюзивной коллекции кроссовок от ведущих мировых брендов
        </p>
      </div>
      
      {/* Filter button for mobile */}
      <div className="lg:hidden mb-6">
        <button 
          className="w-full flex items-center justify-between p-3 border rounded-lg"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <div className="flex items-center gap-2">
            <Sliders size={16} />
            <span>Фильтры</span>
          </div>
          <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
          <div className="sticky top-24 space-y-8">
            {/* Brand filter */}
            <div>
              <h3 className="font-medium mb-3">Бренд</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map(brand => (
                  <button
                    key={brand}
                    className={`filter-chip ${selectedBrand === brand ? 'active' : 'inactive'}`}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand === 'all' ? 'Все' : brand}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Category filter */}
            <div>
              <h3 className="font-medium mb-3">Категория</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-chip ${selectedCategory === category ? 'active' : 'inactive'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'Все' : category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price range filter */}
            <div>
              <h3 className="font-medium mb-3">Цена</h3>
              <div className="px-2">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{priceRange[0]} ₽</span>
                  <span>{priceRange[1]} ₽</span>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Нет товаров, соответствующих выбранным фильтрам</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
