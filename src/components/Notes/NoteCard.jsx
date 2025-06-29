import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiMoreVertical, FiStar, FiArchive, FiTrash2, FiClock, 
  FiImage, FiMic, FiList, FiEdit3, FiRotateCcw 
} = FiIcons;

const NoteCard = ({ 
  note, 
  onClick, 
  onDelete, 
  onTogglePin, 
  onArchive, 
  onRestore 
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getColorClasses = (color) => {
    const colorMap = {
      red: 'bg-red-50 border-red-200',
      orange: 'bg-orange-50 border-orange-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      green: 'bg-green-50 border-green-200',
      blue: 'bg-blue-50 border-blue-200',
      purple: 'bg-purple-50 border-purple-200',
      pink: 'bg-pink-50 border-pink-200',
    };
    return colorMap[color] || 'bg-white border-gray-200';
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      text: FiEdit3,
      checklist: FiList,
      image: FiImage,
      voice: FiMic,
    };
    return iconMap[type] || FiEdit3;
  };

  const renderContent = () => {
    if (note.type === 'checklist' && Array.isArray(note.content)) {
      const completedItems = note.content.filter(item => item.completed).length;
      const totalItems = note.content.length;
      
      return (
        <div className="space-y-2">
          {note.content.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded border ${item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`} />
              <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                {typeof item === 'string' ? item : item.text}
              </span>
            </div>
          ))}
          {note.content.length > 3 && (
            <p className="text-xs text-gray-500">
              +{note.content.length - 3} more items
            </p>
          )}
          {totalItems > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              {completedItems}/{totalItems} completed
            </p>
          )}
        </div>
      );
    }

    return (
      <p className="text-gray-700 text-sm line-clamp-4">
        {note.content || 'Empty note'}
      </p>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`
        relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
        hover:shadow-md ${getColorClasses(note.color)}
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <SafeIcon 
            icon={getTypeIcon(note.type)} 
            className="w-4 h-4 text-gray-500" 
          />
          {note.isPinned && (
            <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
          )}
          {note.reminder && (
            <SafeIcon icon={FiClock} className="w-4 h-4 text-blue-500" />
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 rounded hover:bg-gray-200 transition-colors"
          >
            <SafeIcon icon={FiMoreVertical} className="w-4 h-4 text-gray-500" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin();
                  setShowMenu(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <SafeIcon icon={FiStar} className="w-4 h-4 mr-2" />
                {note.isPinned ? 'Unpin' : 'Pin'}
              </button>
              
              {note.isArchived ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRestore();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <SafeIcon icon={FiRotateCcw} className="w-4 h-4 mr-2" />
                  Restore
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive();
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <SafeIcon icon={FiArchive} className="w-4 h-4 mr-2" />
                  Archive
                </button>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <SafeIcon icon={FiTrash2} className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      {note.title && (
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {note.title}
        </h3>
      )}

      {/* Content */}
      <div className="mb-3">
        {renderContent()}
      </div>

      {/* Labels */}
      {note.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.labels.slice(0, 3).map((label) => (
            <span
              key={label}
              className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
            >
              {label}
            </span>
          ))}
          {note.labels.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
              +{note.labels.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-gray-500">
        {format(new Date(note.updatedAt), 'MMM d, yyyy')}
      </div>

      {/* Click away handler for menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        />
      )}
    </motion.div>
  );
};

export default NoteCard;