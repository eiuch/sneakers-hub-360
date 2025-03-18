
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  discount: number;
  image: string;
  sizes: string[];
  isNew: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Air Max 270",
    brand: "Nike",
    category: "Мужские",
    price: 12990,
    discount: 15,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["40", "41", "42", "43", "44", "45"],
    isNew: true,
    description: "Nike Air Max 270 привносит культовый вид серии Air Max в новую модель для современной повседневной жизни. Эластичный верх и большое окошко Air обеспечивают комфорт, который чувствуется с каждым шагом."
  },
  {
    id: 2,
    name: "Ozweego",
    brand: "Adidas",
    category: "Мужские",
    price: 10990,
    discount: 0,
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23be620?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["39", "40", "41", "42", "43", "44"],
    isNew: false,
    description: "Adidas Ozweego предлагают футуристичный дизайн, вдохновленный 90-ми, с технологией амортизации Adiprene, обеспечивающей комфорт на весь день."
  },
  {
    id: 3,
    name: "Classic Leather",
    brand: "Reebok",
    category: "Унисекс",
    price: 8990,
    discount: 20,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    isNew: false,
    description: "Reebok Classic Leather — это вневременные кроссовки с мягким кожаным верхом, обеспечивающим комфорт и поддержку. Идеально подходят для повседневной носки."
  },
  {
    id: 4,
    name: "RS-X³",
    brand: "Puma",
    category: "Мужские",
    price: 11990,
    discount: 0,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["40", "41", "42", "43", "44", "45"],
    isNew: true,
    description: "Puma RS-X³ представляют собой массивные кроссовки, которые переосмысливают ретро-дизайн с футуристическим подходом. Они созданы для того, чтобы выделяться."
  },
  {
    id: 5,
    name: "Old Skool",
    brand: "Vans",
    category: "Унисекс",
    price: 6990,
    discount: 0,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    isNew: false,
    description: "Vans Old Skool — это классические скейтерские кроссовки с характерной боковой полосой. Они идеально подходят для скейтбординга и повседневной носки."
  },
  {
    id: 6,
    name: "Air Force 1",
    brand: "Nike",
    category: "Женские",
    price: 10990,
    discount: 0,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["36", "37", "38", "39", "40", "41"],
    isNew: false,
    description: "Nike Air Force 1 — это вневременная классика, которая известна своим минималистичным дизайном и легко узнаваемым силуэтом."
  },
  {
    id: 7,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    category: "Унисекс",
    price: 5990,
    discount: 10,
    image: "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    isNew: false,
    description: "Converse Chuck Taylor All Star — это вечная классика с высоким верхом из канваса и культовой резиновой накладкой на носке."
  },
  {
    id: 8,
    name: "Gel-Lyte III",
    brand: "ASICS",
    category: "Мужские",
    price: 12490,
    discount: 0,
    image: "https://images.unsplash.com/photo-1604868189278-e362ca3076c2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["40", "41", "42", "43", "44", "45"],
    isNew: true,
    description: "ASICS Gel-Lyte III — это культовые кроссовки, известные своей уникальной конструкцией с 'раздвоенным' языком и амортизацией GEL."
  },
  {
    id: 9,
    name: "Superstar",
    brand: "Adidas",
    category: "Женские",
    price: 8990,
    discount: 5,
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["36", "37", "38", "39", "40", "41"],
    isNew: false,
    description: "Adidas Superstar — это культовая модель с узнаваемым резиновым носком в форме ракушки, которая уже несколько десятилетий остается символом уличной моды."
  },
  {
    id: 10,
    name: "574",
    brand: "New Balance",
    category: "Унисекс",
    price: 9990,
    discount: 0,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    isNew: false,
    description: "New Balance 574 — это классические кроссовки, которые сочетают в себе винтажный стиль и современный комфорт благодаря технологии ENCAP."
  },
  {
    id: 11,
    name: "Disruptor II",
    brand: "Fila",
    category: "Женские",
    price: 7990,
    discount: 15,
    image: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["36", "37", "38", "39", "40", "41"],
    isNew: false,
    description: "Fila Disruptor II — это массивные кроссовки с характерной зубчатой подошвой и фирменным логотипом F, которые стали иконой стиля 'dad shoe'."
  },
  {
    id: 12,
    name: "Classic Nylon",
    brand: "Reebok",
    category: "Мужские",
    price: 6990,
    discount: 0,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    sizes: ["40", "41", "42", "43", "44", "45"],
    isNew: false,
    description: "Reebok Classic Nylon — это легкие и комфортные кроссовки в ретро-стиле, выполненные из сочетания нейлона и замши."
  }
];
