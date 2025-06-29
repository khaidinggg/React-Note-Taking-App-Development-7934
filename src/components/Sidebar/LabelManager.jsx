import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiX, FiCheck } = FiIcons;

const LabelManager = ({ 
  labels, 
  selectedLabels, 
  onLabelsChange, 
  onCreateLabel, 
  onDeleteLabel 
}) => {
  const [newLabel, setNewLabel] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateLabel = () => {
    if (newLabel.trim()) {
      onCreateLabel(newLabel.trim());
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
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-2 p-3 bg-gray-50 rounded-lg"
    >
      <div className="space-y-2">
        {labels.map((label) => (
          <div
            key={label}
            className="flex items-center justify-between group"
          >
            <button
              onClick={() => handleLabelToggle(label)}
              className={`
                flex items-center px-2 py-1 rounded text-sm transition-colors
                ${selectedLabels.includes(label)
                  ? 'bg-primary-100 text-primary-700'
                  : 'hover:bg-gray-200'
                }
              `}
            >
              <SafeIcon 
                icon={selectedLabels.includes(label) ? FiCheck : FiX} 
                className="w-3 h-3 mr-1 opacity-50" 
              />
              {label}
            </button>
            <button
              onClick={() => onDeleteLabel(label)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 hover:text-red-600 rounded transition-all"
            >
              <SafeIcon icon={FiX} className="w-3 h-3" />
            </button>
          </div>
        ))}

        {isCreating ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateLabel()}
              placeholder="Label name"
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              autoFocus
            />
            <button
              onClick={handleCreateLabel}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
            >
              <SafeIcon icon={FiCheck} className="w-3 h-3" />
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewLabel('');
              }}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
            >
              <SafeIcon icon={FiX} className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center px-2 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-3 h-3 mr-1" />
            Create label
          </button>
        )}
      </div>

      {selectedLabels.length > 0 && (
        <button
          onClick={() => onLabelsChange([])}
          className="mt-2 text-xs text-gray-500 hover:text-gray-700"
        >
          Clear filters
        </button>
      )}
    </motion.div>
  );
};

export default LabelManager;