import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ColorPicker from './ColorPicker';
import LabelSelector from './LabelSelector';
import ChecklistEditor from './ChecklistEditor';
import ReminderPicker from './ReminderPicker';
import { useNotification } from '../../context/NotificationContext';

const { 
  FiX, FiSave, FiTrash2, FiStar, FiArchive, FiClock, 
  FiTag, FiPalette, FiImage, FiMic, FiRotateCcw 
} = FiIcons;

const NoteEditor = ({ 
  note, 
  onClose, 
  onSave, 
  onDelete, 
  labels, 
  onCreateLabel 
}) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [color, setColor] = useState(note?.color || '');
  const [noteLabels, setNoteLabels] = useState(note?.labels || []);
  const [reminder, setReminder] = useState(note?.reminder || null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLabelSelector, setShowLabelSelector] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  const { addNotification } = useNotification();

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setColor(note.color || '');
      setNoteLabels(note.labels || []);
      setReminder(note.reminder || null);
    }
  }, [note]);

  const handleSave = () => {
    if (!note) return;

    const updates = {
      title: title.trim(),
      content,
      color,
      labels: noteLabels,
      reminder
    };

    onSave(note.id, updates);
    addNotification('Note saved successfully');
    onClose();
  };

  const handleDelete = () => {
    if (!note) return;
    
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
      addNotification('Note deleted', 'error');
      onClose();
    }
  };

  const getColorClasses = (selectedColor) => {
    const colorMap = {
      red: 'bg-red-50',
      orange: 'bg-orange-50',
      yellow: 'bg-yellow-50',
      green: 'bg-green-50',
      blue: 'bg-blue-50',
      purple: 'bg-purple-50',
      pink: 'bg-pink-50',
    };
    return colorMap[selectedColor] || 'bg-white';
  };

  if (!note) return null;

  return (
    <div className={`h-full flex flex-col ${getColorClasses(color)}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {note.type === 'checklist' ? 'Checklist' : 'Note'}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowReminderPicker(!showReminderPicker)}
            className={`p-2 rounded-lg transition-colors ${
              reminder ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            title="Set reminder"
          >
            <SafeIcon icon={FiClock} className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Change color"
          >
            <SafeIcon icon={FiPalette} className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowLabelSelector(!showLabelSelector)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Add labels"
          >
            <SafeIcon icon={FiTag} className="w-5 h-5" />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
            title="Delete note"
          >
            <SafeIcon icon={FiTrash2} className="w-5 h-5" />
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
            Save
          </button>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="relative">
        {showColorPicker && (
          <div className="absolute top-2 right-4 z-20">
            <ColorPicker
              selectedColor={color}
              onColorChange={(newColor) => {
                setColor(newColor);
                setShowColorPicker(false);
              }}
            />
          </div>
        )}

        {showLabelSelector && (
          <div className="absolute top-2 right-4 z-20">
            <LabelSelector
              labels={labels}
              selectedLabels={noteLabels}
              onLabelsChange={setNoteLabels}
              onCreateLabel={onCreateLabel}
              onClose={() => setShowLabelSelector(false)}
            />
          </div>
        )}

        {showReminderPicker && (
          <div className="absolute top-2 right-4 z-20">
            <ReminderPicker
              reminder={reminder}
              onReminderChange={(newReminder) => {
                setReminder(newReminder);
                setShowReminderPicker(false);
              }}
              onClose={() => setShowReminderPicker(false)}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full text-xl font-semibold bg-transparent border-none outline-none placeholder-gray-400 mb-4"
        />

        {note.type === 'checklist' ? (
          <ChecklistEditor
            items={content}
            onChange={setContent}
          />
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing..."
            className="w-full h-full bg-transparent border-none outline-none resize-none placeholder-gray-400 text-gray-700"
          />
        )}

        {/* Labels Display */}
        {noteLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {noteLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700"
              >
                {label}
                <button
                  onClick={() => setNoteLabels(noteLabels.filter(l => l !== label))}
                  className="ml-2 hover:text-red-600"
                >
                  <SafeIcon icon={FiX} className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Reminder Display */}
        {reminder && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-blue-700">
                <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Reminder: {new Date(reminder).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setReminder(null)}
                className="text-blue-600 hover:text-blue-800"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click away handlers */}
      {(showColorPicker || showLabelSelector || showReminderPicker) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowColorPicker(false);
            setShowLabelSelector(false);
            setShowReminderPicker(false);
          }}
        />
      )}
    </div>
  );
};

export default NoteEditor;