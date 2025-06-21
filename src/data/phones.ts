import { Phone } from '../types';

export const phones: Phone[] = [
  {
    id: 'phone-1',
    name: 'Aura',
    fullName: 'iPhone 16 Pro Max',
    colors: [
      { name: 'White Titanium', value: 'white', hex: '#F8F8FF', imagePath: '/images/iphone16promax-white.png' },
      { name: 'Silver Titanium', value: 'silver', hex: '#C0C0C0', imagePath: '/images/iphone16promax-silver.png' },
      { name: 'Desert Titanium', value: 'desert', hex: '#D2B48C', imagePath: '/images/iphone16promax-desert.png' },
      { name: 'Black Titanium', value: 'black', hex: '#36454F', imagePath: '/images/iphone16promax-black.png' }
    ],
    description: 'أحدث آيفون بتصميم التيتانيوم وشرائح A18 Pro وأكثر أنظمة الكاميرا تطوراً',
    price: 6700,
    specs: {
      display: '6.7-inch Super Retina XDR',
      processor: 'A18 Pro chip',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: 'Up to 33 hours video playback',
      storage: ['512GB', '1TB']
    }
  },
  {
    id: 'phone-2',
    name: 'Nova',
    fullName: 'Galaxy S24 Ultra',
    colors: [
      { name: 'Grey Titanium', value: 'grey', hex: '#8C8C8C', imagePath: '/images/s24ultra-grey.png' },
      { name: 'Black Titanium', value: 'black', hex: '#2C2C2C', imagePath: '/images/s24ultra-black.png' },
      { name: 'Gold Titanium', value: 'gold', hex: '#FFD700', imagePath: '/images/s24ultra-gold.png' },
      { name: 'Purple Titanium', value: 'purple', hex: '#8B5CF6', imagePath: '/images/s24ultra-purple.png' }
    ],
    description: 'أقوى جالاكسي مع قلم S وكاميرا 200 ميجابكسل وميزات مدعومة بالذكاء الاصطناعي',
    price: 6500,
    specs: {
      display: '6.8-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      camera: '200MP Main + 12MP Ultra Wide + 50MP Telephoto + 10MP Telephoto',
      battery: '5000mAh with 45W charging',
      storage: ['512GB', '1TB']
    }
  },
  {
    id: 'phone-3',
    name: 'Pulsar',
    fullName: 'Galaxy S25 Ultra',
    colors: [
      { name: 'White Titanium', value: 'white', hex: '#F8F8FF', imagePath: '/images/s25ultra-white.png' },
      { name: 'Black Titanium', value: 'black', hex: '#1C1C1C', imagePath: '/images/s25ultra-black.png' },
      { name: 'Gold Titanium', value: 'gold', hex: '#FFD700', imagePath: '/images/s25ultra-gold.png' },
      { name: 'Blue Titanium', value: 'blue', hex: '#4A90E2', imagePath: '/images/s25ultra-blue.png' }
    ],
    description: 'التطور القادم لجالاكسي مع ذكاء اصطناعي محسن وكاميرا محسنة وتصميم فاخر',
    price: 7000,
    specs: {
      display: '6.8-inch Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 4',
      camera: '200MP Main + 12MP Ultra Wide + 50MP Telephoto + 10MP Telephoto',
      battery: '5300mAh with 50W charging',
      storage: ['512GB', '1TB', '2TB']
    }
  }
];