import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp business number
    const phoneNumber = '201021832589';
    const message = 'مرحباً! أود معرفة المزيد عن منتجاتكم.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.button>
  );
}