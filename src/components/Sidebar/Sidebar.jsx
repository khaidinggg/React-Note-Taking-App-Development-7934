import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ColorPicker from './ColorPicker';
import LabelManager from './LabelManager';

const { 
  FiMenu, FiX, FiStickyNote, FiStar, FiArchive, FiBell, 
  FiPalette, FiTag, FiSettings, FiHelpCircle 
} = FiIcons;

const Sidebar = ({
  currentView,
  onViewChange,
  selectedColor,
  onColorChange,
  selectedLabels,
  onLabelsChange,
  labels,
  onCreateLabel,
  onDeleteLabel,
  isMobile
}) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLabelManager, setShowLabelManager] = useState(false);

  const menuItems = [
    { id: 'all', label: 'All Notes', icon: FiStickyNote },
    { id: 'pinned', label: 'Pinned', icon: FiStar },
    { id: 'reminders', label: 'Reminders', icon: FiBell },
    { id: 'archived', label: 'Archive', icon: FiArchive },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleViewChange = (view) => {
    onViewChange(view);
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        >
          <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : isMobile ? -280 : -240,
          width: isOpen ? (isMobile ? 280 : 240) : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          ${isMobile ? 'fixed' : 'relative'} 
          left-0 top-0 h-full bg-white shadow-lg z-40 
          flex flex-col border-r border-gray-200
        `}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">NotesApp</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleViewChange(item.id)}
                  className={`
                    w-full flex items-center px-3 py-2 rounded-lg text-left
                    transition-colors duration-200
                    ${currentView === item.id 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <SafeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4">
            <div>
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <SafeIcon icon={FiPalette} className="w-5 h-5 mr-3" />
                Colors
              </button>
              {showColorPicker && (
                <ColorPicker
                  selectedColor={selectedColor}
                  onColorChange={onColorChange}
                />
              )}
            </div>

            <div>
              <button
                onClick={() => setShowLabelManager(!showLabelManager)}
                className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <SafeIcon icon={FiTag} className="w-5 h-5 mr-3" />
                Labels
              </button>
              {showLabelManager && (
                <LabelManager
                  labels={labels}
                  selectedLabels={selectedLabels}
                  onLabelsChange={onLabelsChange}
                  onCreateLabel={onCreateLabel}
                  onDeleteLabel={onDeleteLabel}
                />
              )}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <SafeIcon icon={FiSettings} className="w-5 h-5 mr-3" />
            Settings
          </button>
          <button className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <SafeIcon icon={FiHelpCircle} className="w-5 h-5 mr-3" />
            Help
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;