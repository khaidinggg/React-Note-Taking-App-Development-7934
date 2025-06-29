import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiX, FiCheck, FiSquare } = FiIcons;

const ChecklistEditor = ({ items = [], onChange }) => {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...items, { text: newItem.trim(), completed: false }];
      onChange(updatedItems);
      setNewItem('');
    }
  };

  const updateItem = (index, updates) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    );
    onChange(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onChange(updatedItems);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-3 group"
          >
            <button
              onClick={() => updateItem(index, { completed: !item.completed })}
              className={`
                flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200
                ${item.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 hover:border-green-400'
                }
              `}
            >
              {item.completed && <SafeIcon icon={FiCheck} className="w-3 h-3" />}
            </button>

            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItem(index, { text: e.target.value })}
              className={`
                flex-1 bg-transparent border-none outline-none
                ${item.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-700'
                }
              `}
            />

            <button
              onClick={() => removeItem(index)}
              className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-100 rounded transition-all duration-200"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex items-center space-x-3">
        <SafeIcon icon={FiSquare} className="w-5 h-5 text-gray-300" />
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new item..."
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-400"
        />
        {newItem.trim() && (
          <button
            onClick={addItem}
            className="p-1 text-green-500 hover:bg-green-100 rounded transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChecklistEditor;