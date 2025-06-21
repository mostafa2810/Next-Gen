import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import WhatsAppButton from './components/WhatsAppButton';
import StarField from './components/StarField';
import Logo from './components/Logo';
import { phones } from './data/phones';

function App() {
  const [currentPhoneIndex, setCurrentPhoneIndex] = useState(0);
  const [currentColors, setCurrentColors] = useState<{ [key: string]: string }>({});

  const currentPhone = phones[currentPhoneIndex];
  const currentColor = currentColors[currentPhone.id] || currentPhone.colors[0].value;

  useEffect(() => {
    // Initialize colors for all phones
    const initialColors: { [key: string]: string } = {};
    phones.forEach(phone => {
      initialColors[phone.id] = phone.colors[0].value;
    });
    setCurrentColors(initialColors);
  }, []);

  const handleColorChange = (color: string) => {
    setCurrentColors(prev => ({
      ...prev,
      [currentPhone.id]: color
    }));
  };

  const handleNavigate = (index: number) => {
    setCurrentPhoneIndex(index);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Optimized Galaxy Background with Stars */}
      <StarField />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-4 md:py-8 min-h-screen flex flex-col">
          {/* Logo */}
          <div className="flex justify-center mb-4 md:mb-8">
            <Logo />
          </div>
          
          {/* Header */}
          <motion.header
            className="text-center py-2 md:py-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              تعرف على منتجاتنا
            </h1>
            <p className="text-blue-400 font-semibold text-shadow-glow">أعلى نسخ كوبى فى السوق المصرى وارد الخارج</p>
          </motion.header>

          {/* Main Content */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 items-center">
            {/* Product Image */}
            <motion.div
              className="h-64 md:h-96 lg:h-full min-h-[300px] md:min-h-[500px] relative"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <ProductImage phone={currentPhone} currentColor={currentColor} />
            </motion.div>

            {/* Product Information with Color Selector Above Key Features */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhone.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6 }}
                >
                  <ProductInfo 
                    phone={currentPhone}
                    currentColor={currentColor}
                    colors={currentPhone.colors}
                    onColorChange={handleColorChange}
                    phones={phones}
                    currentIndex={currentPhoneIndex}
                    onNavigate={handleNavigate}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;