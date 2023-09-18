export const sizeData: Array<string> = ['S', 'M', 'L', 'XL', 'XXL'];

export type TEESDATA = {
  id: string;
  name: string;
  price?: number;
  image: string;
  description?: string;
  code?: string;
  material?: string;
  fitting_style?: string;
  washing_temperature?: string;
  weight?: number;
  printing?: string;
  printing_dimension?: string;
  size?: string;
  capacity?: string;
};

export type PACKDATA = {
  id: string;
  name: string;
  price: number;
  bonus: number;
  image: string;
  description?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  weight?: number;
};

// t shirts (men/women): 250g
// hoodies: 500g
// Cap: 100g
// Mug: 250g

// Men Hoodies:
// Material: 50% Cotton / 50% Polyester
// Fitting Style: Ajusted
// Washing Temperature: 30° Max
// Cloth Weight: 280g/m²
// Printing: High-Quality Serigraphy
// Printing Dimension: 28 x 36 cm

// Women T-Shirts:
// Material: 100% Cotton
// Fitting Style: Ajusted
// Washing Temperature: 30° Max
// Cloth Weight: 150g/m²
// Printing: High-Quality Serigraphy
// Printing Dimension: 22 x 36 cm

// Caps:
// Material: 100% Cotton
// Fitting Style: Ajusted
// Washing Temperature: 30° Max
// Cloth Weight: 155 g/m²
// Printing: High-Quality Color Transfer
// Printing Dimension: 8,5 x 5 cm

// Mug:
// Material: Ceramic
// Size: Ø 8,2 x 9,6 cm
// Capacity: 350 ml
// Washing Temperature: Dish-Washer Compatible

export const PacksData: Array<PACKDATA> = [
  {
    id: '1',
    name: 'Starter Pack',
    price: 0.99,
    bonus: 1,
    image: '/images/pngs/packs/pack1.png',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '2',
    name: 'Basic Pack',
    price: 4.99,
    bonus: 2,
    image: '/images/pngs/packs/pack2.png',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '3',
    name: 'Advanced Pack',
    price: 9.99,
    bonus: 3,
    image: '/images/pngs/packs/pack3.png',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '4',
    name: 'Expert Pack',
    price: 19.99,
    bonus: 4,
    image: '/images/pngs/packs/pack4.png',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '5',
    name: 'Master Pack',
    price: 49.99,
    bonus: 5,
    image: '/images/pngs/packs/pack5.png',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '6',
    name: 'Prestige Pack',
    price: 99.99,
    bonus: 6,
    image: '/images/pngs/packs/pack1.png',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  {
    id: '7',
    name: 'Majestic Pack',
    price: 199.99,
    bonus: 7,
    image: '/images/pngs/packs/pack2.png',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  {
    id: '8',
    name: 'Elite Pack',
    price: 299.99,
    bonus: 8,
    image: '/images/pngs/packs/pack3.png',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  {
    id: '9',
    name: 'Legendary Pack',
    price: 399.99,
    bonus: 9,
    image: '/images/pngs/packs/pack4.png',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  {
    id: '10',
    name: 'Ultimate Pack',
    price: 499.99,
    bonus: 10,
    image: '/images/pngs/packs/pack5.png',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  
]

export const TeesData: Array<TEESDATA> = [
  {
    id: '1',
    name: 'Ultibets Men T-Shirt',
    price: 29.99,
    image: '/images/pngs/merch/man-tee-one.png',
    description: 'Ultibets Logo Men T-Shirt',
    code: 'men-tshirt',
    material: ' 100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '2',
    name: 'Ultibets Men T-Shirt',
    price: 29.99,
    image: '/images/pngs/merch/man-tee-two.png',
    description: 'Ultibets Logo Men T-Shirt',
    code: 'men-tshirt',
    material: ' 100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '3',
    name: 'Ultibets Men T-Shirt',
    price: 29.99,
    image: '/images/pngs/merch/man-tee-three.png',
    description: 'Ultibets Logo Men T-Shirt',
    code: 'men-tshirt',
    material: ' 100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '4',
    name: 'Ultibets Women T-Shirt ',
    price: 29.99,
    image: '/images/pngs/merch/woman-tee-one.png',
    description: 'Ultibets Logo Women T-Shirt',
    code: 'women-tshirt',
    material: '100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '22 x 36 cm',
  },
  {
    id: '5',
    name: 'Ultibets Women T-Shirt',
    price: 29.99,
    image: '/images/pngs/merch/woman-tee-two.png',
    description: 'Ultibets Logo Women T-Shirt',
    code: 'women-tshirt',
    material: '100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 250,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '22 x 36 cm',
  },
  {
    id: '6',
    name: 'Ultibets T-Shirt Hoodie',
    price: 59.99,
    image: '/images/pngs/merch/hoodie-one.png',
    description: 'Ultibets Logo Hoodie',
    code: 'hoodie',
    material: '50% Cotton / 50% Polyester',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 500,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '7',
    name: 'Ultibets T-Shirt Hoodie',
    price: 59.99,
    image: '/images/pngs/merch/hoodie-two.png',
    description: 'Ultibets Logo Hoodie',
    code: 'hoodie',
    material: '50% Cotton / 50% Polyester',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 500,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '8',
    name: 'Ultibets T-Shirt Hoodie',
    price: 59.99,
    image: '/images/pngs/merch/hoodie-three.png',
    description: 'Ultibets Logo Hoodie',
    code: 'hoodie',
    material: '50% Cotton / 50% Polyester',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 500,
    printing: 'High-Quality Serigraphy',
    printing_dimension: '28 x 36 cm',
  },
  {
    id: '9',
    name: 'Ultibets Cap',
    price: 19.99,
    image: '/images/pngs/merch/cap.png',
    description: 'Ultibets Logo Cap',
    code: 'cap',
    material: '100% Cotton',
    fitting_style: 'Ajusted',
    washing_temperature: '30° Max',
    weight: 100,
    printing: 'High-Quality Color Transfer',
    printing_dimension: '8,5 x 5 cm',
  },
  {
    id: '10',
    name: 'Ultibets Mug',
    price: 14.49,
    image: '/images/pngs/merch/mug.png',
    description: 'Ultibets Logo Mug',
    code: 'mug',
    material: 'Ceramic',
    size: ' 8.2 x 9.6 cm',
    capacity: '350 ml',
    weight: 100,
    washing_temperature: 'Dish-Washer Compatible',
  },
];
