import { Knex } from 'knex';

const TABLE_NAME = 'product_stock';

export const seed = async (knex: Knex): Promise<void> => {
  // Inserts seed entries
  await knex(TABLE_NAME)
    .insert([
      {
        id: 'He8TQzkwE2etrjx',
        name: 'Minimal Sofa',
        price: 180,
        img: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg',
        description: 'A simple yet comfortable sofa for your living room.',
        stock: 10,
        altdesc: 'A minimalistic sofa',
      },
      {
        id: 'AwqUtscTrqTUsnh',
        name: 'Black Mate Sofa',
        price: 280,
        img: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
        description:
          'A modern dark sofa with clean lines, flexible cushions, and slim metal legs.',
        stock: 8,
        altdesc: 'Black mate sofa',
      },
      {
        id: 'VuchJbp0Ptwmbgt',
        name: 'Gray towels',
        price: 40,
        img: 'https://rileyhome.com/wp-content/uploads/2023/10/Lifestyle-2-8.png',
        description:
          'Set of soft, absorbent grey towels, perfect for adding a modern touch to your bathroom.',
        stock: 25,
        altdesc: 'Gray towel set',
      },
      {
        id: 'n6fZCZsgFX2Oo78',
        name: 'Black Chair',
        price: 100,
        img: 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg',
        description:
          'A sleek, modern black chair with a unique, sculptural backrest design.',
        stock: 15,
        altdesc: 'A Black chair',
      },
      {
        id: 'W7Yxy7J4YRdcwCm',
        name: 'Wooden Table',
        price: 200,
        img: 'https://cdn11.bigcommerce.com/s-3zraqrbbb6/products/5530/images/389903/Salcombe-Walnut-Round-Dining-Table-1__24220.1700655611.386.513.jpg',
        description:
          'A stylish wooden coffee table with a smooth, rounded top and sturdy geometric legs.',
        stock: 7,
        altdesc: 'Wooden Table',
      },
      {
        id: 'eQUd56rKR_j0Yuh',
        name: 'Gray Sofa',
        price: 90,
        img: 'https://images.pexels.com/photos/133919/pexels-photo-133919.jpeg',
        description:
          'This stylish light gray sofa comes with a set of blue, gray, and red cushions.',
        stock: 11,
        altdesc: 'Gray Sofa',
      },
      {
        id: 'zxlkf5_7J33jFkT',
        name: 'Modern Upholstered Bed',
        price: 200,
        img: 'https://images.pexels.com/photos/6899433/pexels-photo-6899433.jpeg',
        description:
          'An elegant bed that features a sleek, contemporary design.',
        stock: 20,
        altdesc: 'Modern Bed',
      },
      {
        id: 'mFAX-HX9V-7ihxm',
        name: 'Tranquil Harmony Bed',
        price: 180,
        img: 'https://images.pexels.com/photos/6588582/pexels-photo-6588582.jpeg',
        description:
          'A bed that has a perfect blend of elegance and versatility.',
        stock: 29,
        altdesc: 'Harmony Bed',
      },
      {
        id: 'wPQH8oAWA6WgOqm',
        name: 'Basic Pillow Set',
        price: 30,
        img: 'https://www.riverpineoutlet.com/cdn/shop/products/certified-organic-cotton-sleep-pillow-stack.-2.jpg',
        description:
          'Experience unparalleled comfort and elegance with the Pure Bliss White Pillow Set.',
        stock: 14,
        altdesc: 'Basic WHite pillow set',
      },
      {
        id: '-jED1ytR33d_soN',
        name: 'Serenity Chair',
        price: 125,
        img: 'https://m.media-amazon.com/images/I/419yBXRv9mL.jpg',
        description:
          'Embrace ultimate relaxation with the Serenity chair that combines beauty and a great comfort.',
        stock: 22,
        altdesc: 'Serenity chair',
      },
    ])
    .onConflict('id')
    .merge();
};
