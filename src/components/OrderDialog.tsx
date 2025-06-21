import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Phone } from '../types';

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhone: Phone;
  currentColor: string;
  phones: Phone[];
}

export default function OrderDialog({ isOpen, onClose, currentPhone, currentColor, phones }: OrderDialogProps) {
  const [selectedPhone, setSelectedPhone] = useState(currentPhone);
  const [selectedStorage, setSelectedStorage] = useState(currentPhone.specs.storage[0]);
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  // Update storage and color when phone changes
  const handlePhoneChange = (phoneId: string) => {
    const phone = phones.find(p => p.id === phoneId);
    if (phone) {
      setSelectedPhone(phone);
      setSelectedStorage(phone.specs.storage[0]);
      setSelectedColor(phone.colors[0].value);
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; address?: string } = {};
    
    if (!customerName.trim()) {
      newErrors.name = 'يرجى إدخال اسمك';
    }
    
    if (!customerPhone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم هاتفك';
    }
    
    if (!customerAddress.trim()) {
      newErrors.address = 'يرجى إدخال عنوانك';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const colorInfo = selectedPhone.colors.find(c => c.value === selectedColor);
      
      const message = `مرحباً! أود أن أضع طلباً:

📱 الهاتف: ${selectedPhone.fullName}
🎨 اللون: ${colorInfo?.name}
💾 التخزين: ${selectedStorage}
👤 الاسم: ${customerName}
📞 رقم الهاتف: ${customerPhone}
📍 العنوان: ${customerAddress}

يرجى التواصل معي لإكمال الطلب.`;

      const whatsappUrl = `https://wa.me/201021832589?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      onClose();
    }
  };

  const clearError = (field: string) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-900/95 backdrop-blur-md -mx-6 px-6 py-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">أكمل طلبك</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Phone Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نوع الهاتف
                </label>
                <select
                  value={selectedPhone.id}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="w-full bg-gray-800/50 rounded-lg p-3 border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                >
                  {phones.map((phone) => (
                    <option key={phone.id} value={phone.id}>
                      {phone.fullName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  اللون
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full bg-gray-800/50 rounded-lg p-3 border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                >
                  {selectedPhone.colors.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Storage */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  التخزين
                </label>
                <select
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full bg-gray-800/50 rounded-lg p-3 border border-gray-700 text-white focus:border-blue-500 focus:outline-none"
                >
                  {selectedPhone.specs.storage.map((storage) => (
                    <option key={storage} value={storage}>
                      {storage} - حتى نفاذ الكمية
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  اسمك
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    clearError('name');
                  }}
                  placeholder="أدخل اسمك الكامل"
                  className={`w-full bg-gray-800/50 rounded-lg p-3 border text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  رقم هاتفك
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    clearError('phone');
                  }}
                  placeholder="أدخل رقم هاتفك"
                  className={`w-full bg-gray-800/50 rounded-lg p-3 border text-white placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Customer Address */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  العنوان
                </label>
                <textarea
                  value={customerAddress}
                  onChange={(e) => {
                    setCustomerAddress(e.target.value);
                    clearError('address');
                  }}
                  placeholder="أدخل عنوانك الكامل"
                  rows={3}
                  className={`w-full bg-gray-800/50 rounded-lg p-3 border text-white placeholder-gray-400 focus:outline-none resize-none transition-colors ${
                    errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-blue-500'
                  }`}
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6 sticky bottom-0 bg-gray-900/95 backdrop-blur-md -mx-6 px-6 py-4 border-t border-white/10">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                المتابعة إلى واتساب
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 