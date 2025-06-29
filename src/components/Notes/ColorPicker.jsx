import React from 'react';
import { motion } from 'framer-motion';

const colors = [
  { name: 'Default', value: '', bg: 'bg-white', border: 'border-gray-300' },
  { name: 'Red', value: 'red', bg: 'bg-red-100', border: 'border-red-200' },
  { name: 'Orange', value: 'orange', bg: 'bg-orange-100', border: 'border-orange-200' },
  { name: 'Yellow', value: 'yellow', bg: 'bg-yellow-100', border: 'border-yellow-200' },
  { name: 'Green', value: 'green', bg: 'bg-green-100', border: 'border-green-200' },
  { name: 'Blue', value: 'blue', bg: 'bg-blue-100', border: 'border-blue-200' },
  { name: 'Purple', value: 'purple', bg: 'bg-purple-100', border: 'border-purple-200' },
  { name: 'Pink', value: 'pink', bg: 'bg-pink-100', border: 'border-pink-200' },
];

const ColorPicker = ({ selectedColor, onColorChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-48"
    >
      <h3 className="text-sm font-medium text-gray-900 mb-3">Choose color</h3>
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              w-10 h-10 rounded-lg border-2 transition-all duration-200
              ${color.bg} ${color.border}
              ${selectedColor === color.value 
                ? 'ring-2 ring-primary-500 ring-offset-1' 
                : 'hover:scale-110'
              }
            `}
            title={color.name}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ColorPicker;