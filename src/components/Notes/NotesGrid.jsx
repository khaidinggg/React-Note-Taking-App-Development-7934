import React from 'react';
import { motion } from 'framer-motion';
import NoteCard from './NoteCard';
import EmptyState from './EmptyState';

const NotesGrid = ({
  notes,
  onNoteClick,
  onCreateNote,
  onDeleteNote,
  onTogglePin,
  onArchiveNote,
  onRestoreNote,
  currentView
}) => {
  if (notes.length === 0) {
    return (
      <EmptyState 
        currentView={currentView}
        onCreateNote={onCreateNote}
      />
    );
  }

  // Separate pinned and unpinned notes
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  return (
    <div className="p-6">
      {pinnedNotes.length > 0 && currentView !== 'pinned' && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Pinned
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pinnedNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NoteCard
                  note={note}
                  onClick={() => onNoteClick(note)}
                  onDelete={() => onDeleteNote(note.id)}
                  onTogglePin={() => onTogglePin(note.id)}
                  onArchive={() => onArchiveNote(note.id)}
                  onRestore={() => onRestoreNote(note.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && currentView !== 'pinned' && (
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Others
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {unpinnedNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (pinnedNotes.length + index) * 0.1 }}
              >
                <NoteCard
                  note={note}
                  onClick={() => onNoteClick(note)}
                  onDelete={() => onDeleteNote(note.id)}
                  onTogglePin={() => onTogglePin(note.id)}
                  onArchive={() => onArchiveNote(note.id)}
                  onRestore={() => onRestoreNote(note.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesGrid;