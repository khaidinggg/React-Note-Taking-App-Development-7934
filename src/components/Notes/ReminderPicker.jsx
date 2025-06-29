import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiCheck, FiTrash2 } = FiIcons;

const ReminderPicker = ({ reminder, onReminderChange, onClose }) => {
  const [date, setDate] = useState(
    reminder ? new Date(reminder).toISOString().split('T')[0] : ''
  );
  const [time, setTime] = useState(
    reminder ? new Date(reminder).toTimeString().slice(0, 5) : ''
  );

  const quickOptions = [
    { label: 'Later today', hours: 4 },
    { label: 'Tomorrow', hours: 24 },
    { label: 'Next week', hours: 168 },
  ];

  const handleQuickSet = (hours) => {
    const reminderDate = new Date();
    reminderDate.setHours(reminderDate.getHours() + hours);
    onReminderChange(reminderDate.toISOString());
  };

  const handleCustomSet = () => {
    if (date && time) {
      const reminderDate = new Date(`${date}T${time}`);
      onReminderChange(reminderDate.toISOString());
    }
  };

  const handleRemove = () => {
    onReminderChange(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-72"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Set reminder</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <SafeIcon icon={FiX} className="w-4 h-4" />
        </button>
      </div>

      {/* Quick options */}
      <div className="space-y-2 mb-4">
        {quickOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => handleQuickSet(option.hours)}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleCustomSet}
              disabled={!date || !time}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <SafeIcon icon={FiCheck} className="w-4 h-4 mr-2" />
              Set
            </button>

            {reminder && (
              <button
                onClick={handleRemove}
                className="px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReminderPicker;