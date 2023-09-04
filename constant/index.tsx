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
    price: 0.0000099,
    bonus: 1,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '2',
    name: 'Basic Pack',
    price: 0.0000499,
    bonus: 2,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '3',
    name: 'Advanced Pack',
    price: 0.0000999,
    bonus: 3,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '4',
    name: 'Expert  Pack',
    price: 0.0001999,
    bonus: 4,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '5',
    name: 'Expert  Pack',
    price: 0.0004999,
    bonus: 5,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Starting Packs",
    description1: "Start your adventure on UltiBets today! Our UTBETS Starting Packs are perfect for beginners.",
    description2: "Get a special discount when you buy in bulk and unlock the full potential of UltiBets.",
    description3: "With token utility that lets you dive into our platform's exciting features, you'll be placing predictions and participating in our weekly SBC events in no time."
  },
  {
    id: '6',
    name: 'Prestige Pack',
    price: 0.0009999,
    bonus: 6,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  {
    id: '7',
    name: 'Majestic Pack',
    price: 0.0019999,
    bonus: 7,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  {
    id: '8',
    name: 'Elite Pack',
    price: 0.0029999,
    bonus: 8,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  {
    id: '9',
    name: 'Legendary Pack',
    price: 0.0039999,
    bonus: 9,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: "Pro Packs",
    description1: "Elevate your UltiBets experience with Pro Packs and lead the way! For the seasoned predictors and experts, our UTBETS Pro Packs are a game-changer.",
    description2: "Enjoy exclusive discounts when you purchase in bulk and access token utility that amplifies your presence on the UltiBets platform.",
    description3: "These packs are your key to advanced prediction placement and participation in our thrilling weekly SBC events."
  },
  {
    id: '10',
    name: 'Ultimate Pack',
    price: 0.0049999,
    bonus: 10,
    image: '/images/svgs/merch/utbets-pack.svg',
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
    image: '/images/svgs/merch/man-tee-one.svg',
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
    image: '/images/svgs/merch/man-tee-two.svg',
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
    image: '/images/svgs/merch/man-tee-three.svg',
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
    image: '/images/svgs/merch/woman-tee-one.svg',
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
    image: '/images/svgs/merch/woman-tee-two.svg',
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
    image: '/images/svgs/merch/hoodie-one.svg',
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
    image: '/images/svgs/merch/hoodie-two.svg',
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
    image: '/images/svgs/merch/hoodie-three.svg',
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
    image: '/images/svgs/merch/cap.svg',
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
    image: '/images/svgs/merch/mug.svg',
    description: 'Ultibets Logo Mug',
    code: 'mug',
    material: 'Ceramic',
    size: ' 8.2 x 9.6 cm',
    capacity: '350 ml',
    weight: 100,
    washing_temperature: 'Dish-Washer Compatible',
  },
];
