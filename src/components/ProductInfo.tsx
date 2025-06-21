import { motion } from 'framer-motion';
import { Phone } from '../types';
import { Smartphone, Cpu, Camera, Battery, HardDrive } from 'lucide-react';
import Navigation from './Navigation';
import OrderDialog from './OrderDialog';
import { useState } from 'react';

interface ProductInfoProps {
  phone: Phone;
  currentColor: string;
  colors: any[];
  onColorChange: (color: string) => void;
  phones: Phone[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function ProductInfo({ phone, currentColor, colors, onColorChange, phones, currentIndex, onNavigate }: ProductInfoProps) {
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const handleLearnMore = () => {
    const message = 'مرحباً! أود معرفة المزيد عن منتجاتكم.';
    const whatsappUrl = `https://wa.me/201021832589?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const specs = [
    { icon: Smartphone, label: 'الشاشة', value: phone.specs.display },
    { icon: Cpu, label: 'المعالج', value: phone.specs.processor },
    { icon: Camera, label: 'الكاميرا', value: phone.specs.camera },
    { icon: Battery, label: 'البطارية', value: phone.specs.battery },
    { icon: HardDrive, label: 'التخزين', value: phone.specs.storage.join(', ') }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {phone.fullName}
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-300 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {phone.description}
        </motion.p>
        <motion.div 
          className="text-3xl font-bold text-blue-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          يبدأ من {phone.price} ج.م
        </motion.div>
      </div>

      {/* Navigation Slider */}
      <motion.div
        className="pt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Navigation
          phones={phones}
          currentIndex={currentIndex}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* Color Selector - Moved Above Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col items-center space-y-4"
      >
        <h3 className="text-lg font-semibold text-white">اختر اللون</h3>
        <div className="flex space-x-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                currentColor === color.value 
                  ? 'border-white shadow-lg shadow-white/30' 
                  : 'border-gray-600 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
        <p className="text-sm text-gray-300">
          {colors.find(c => c.value === currentColor)?.name}
        </p>
      </motion.div>

      {/* Key Features */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white text-center">المميزات الرئيسية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm"
            >
              <spec.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">{spec.label}</p>
                <p className="text-white font-medium">{spec.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
      >
        <button 
          onClick={() => setIsOrderDialogOpen(true)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          اشتر الآن
        </button>
        <button 
          onClick={handleLearnMore}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
        >
          اعرف المزيد
        </button>
      </motion.div>

      {/* Order Dialog */}
      <OrderDialog
        isOpen={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
        currentPhone={phone}
        currentColor={currentColor}
        phones={phones}
      />
    </motion.div>
  );
}