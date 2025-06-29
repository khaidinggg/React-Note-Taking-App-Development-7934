import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEdit3, FiList, FiImage, FiMic, FiPlus, FiStar, FiArchive, FiBell } = FiIcons;

const EmptyState = ({ currentView, onCreateNote }) => {
  const getEmptyStateContent = () => {
    switch (currentView) {
      case 'pinned':
        return {
          icon: FiStar,
          title: 'No pinned notes',
          description: 'Pin your important notes to keep them at the top',
        };
      case 'archived':
        return {
          icon: FiArchive,
          title: 'No archived notes',
          description: 'Archived notes will appear here',
        };
      case 'reminders':
        return {
          icon: FiBell,
          title: 'No reminders set',
          description: 'Set reminders on your notes to never forget important tasks',
        };
      default:
        return {
          icon: FiEdit3,
          title: 'No notes yet',
          description: 'Create your first note to get started',
        };
    }
  };

  const { icon, title, description } = getEmptyStateContent();

  const noteTypes = [
    { type: 'text', icon: FiEdit3, label: 'Text Note', color: 'bg-blue-500' },
    { type: 'checklist', icon: FiList, label: 'Checklist', color: 'bg-green-500' },
    { type: 'image', icon: FiImage, label: 'Image Note', color: 'bg-purple-500' },
    { type: 'voice', icon: FiMic, label: 'Voice Memo', color: 'bg-red-500' },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <SafeIcon icon={icon} className="w-12 h-12 text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-8">{description}</p>

        {currentView === 'all' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">Choose a note type to get started:</p>
            <div className="grid grid-cols-2 gap-3">
              {noteTypes.map((noteType) => (
                <motion.button
                  key={noteType.type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCreateNote(noteType.type)}
                  className={`
                    flex flex-col items-center p-4 rounded-lg border-2 border-dashed 
                    border-gray-300 hover:border-gray-400 transition-all duration-200
                    hover:bg-gray-50
                  `}
                >
                  <div className={`w-12 h-12 ${noteType.color} rounded-full flex items-center justify-center mb-2`}>
                    <SafeIcon icon={noteType.icon} className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{noteType.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EmptyState;