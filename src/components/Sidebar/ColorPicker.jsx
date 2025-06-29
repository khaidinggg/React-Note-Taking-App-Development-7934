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
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-2 p-3 bg-gray-50 rounded-lg"
    >
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              w-8 h-8 rounded-full border-2 transition-all duration-200
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
      {selectedColor && (
        <button
          onClick={() => onColorChange('')}
          className="mt-2 text-xs text-gray-500 hover:text-gray-700"
        >
          Clear filter
        </button>
      )}
    </motion.div>
  );
};

export default ColorPicker;