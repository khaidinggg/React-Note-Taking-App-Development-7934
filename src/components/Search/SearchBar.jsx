import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSearch, FiPlus, FiList, FiImage, FiEdit3, FiMic } = FiIcons;

const SearchBar = ({ searchTerm, onSearchChange, onCreateNote }) => {
  const noteTypes = [
    { type: 'text', icon: FiEdit3, label: 'Text Note' },
    { type: 'checklist', icon: FiList, label: 'Checklist' },
    { type: 'image', icon: FiImage, label: 'Image Note' },
    { type: 'voice', icon: FiMic, label: 'Voice Memo' },
  ];

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <SafeIcon 
          icon={FiSearch} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-2">
        {noteTypes.map((noteType) => (
          <button
            key={noteType.type}
            onClick={() => onCreateNote(noteType.type)}
            className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            title={`Create ${noteType.label}`}
          >
            <SafeIcon icon={noteType.icon} className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{noteType.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;