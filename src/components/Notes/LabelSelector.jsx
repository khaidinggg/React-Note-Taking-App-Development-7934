import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiX, FiCheck } = FiIcons;

const LabelSelector = ({ 
  labels, 
  selectedLabels, 
  onLabelsChange, 
  onCreateLabel, 
  onClose 
}) => {
  const [newLabel, setNewLabel] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateLabel = () => {
    if (newLabel.trim()) {
      onCreateLabel(newLabel.trim());
      onLabelsChange([...selectedLabels, newLabel.trim()]);
      setNewLabel('');
      setIsCreating(false);
    }
  };

  const handleLabelToggle = (label) => {
    if (selectedLabels.includes(label)) {
      onLabelsChange(selectedLabels.filter(l => l !== label));
    } else {
      onLabelsChange([...selectedLabels, label]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-64 max-h-80 overflow-auto"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">Labels</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <SafeIcon icon={FiX} className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {labels.map((label) => (
          <button
            key={label}
            onClick={() => handleLabelToggle(label)}
            className={`
              w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors
              ${selectedLabels.includes(label)
                ? 'bg-primary-100 text-primary-700'
                : 'hover:bg-gray-100'
              }
            `}
          >
            <SafeIcon 
              icon={selectedLabels.includes(label) ? FiCheck : FiX} 
              className="w-4 h-4 mr-2 opacity-50" 
            />
            {label}
          </button>
        ))}
      </div>

      {isCreating ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateLabel()}
            placeholder="Label name"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
            autoFocus
          />
          <button
            onClick={handleCreateLabel}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
          >
            <SafeIcon icon={FiCheck} className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsCreating(false);
              setNewLabel('');
            }}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
          >
            <SafeIcon icon={FiX} className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
          Create new label
        </button>
      )}
    </motion.div>
  );
};

export default LabelSelector;