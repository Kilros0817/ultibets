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

export const PacksData: Array<TEESDATA> = [
  {
    id: '1',
    name: '1000 UTBETS',
    weight: 1000,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: 'UTBETS Packs 1',
  },
  {
    id: '2',
    name: '2500(+300 Bonus) UTBETS',
    weight: 2500,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: 'UTBETS Packs 1',
  },
  {
    id: '3',
    name: '6000(+1500 Bonus) UTBETS',
    weight: 6000,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: 'UTBETS Packs 1',
  },
  {
    id: '4',
    name: '10000(+3500 Bonus) UTBETS',
    weight: 10000,
    image: '/images/svgs/merch/utbets-pack.svg',
    description: 'UTBETS Packs 1',
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
