import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar/Sidebar';
import NotesGrid from './components/Notes/NotesGrid';
import NoteEditor from './components/Notes/NoteEditor';
import SearchBar from './components/Search/SearchBar';
import { useNotes } from './hooks/useNotes';
import { useSearch } from './hooks/useSearch';
import { useLabels } from './hooks/useLabels';
import { NotificationProvider } from './context/NotificationContext';
import NotificationContainer from './components/Notifications/NotificationContainer';

function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentView, setCurrentView] = useState('all');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { 
    notes, 
    createNote, 
    updateNote, 
    deleteNote, 
    togglePin, 
    archiveNote,
    restoreNote 
  } = useNotes();

  const { labels, createLabel, deleteLabel } = useLabels();
  const { searchTerm, setSearchTerm, filteredNotes } = useSearch(notes);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateNote = (type = 'text') => {
    const newNote = createNote(type);
    setSelectedNote(newNote);
    setIsEditorOpen(true);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  const getFilteredNotes = () => {
    let filtered = filteredNotes;

    // Filter by view
    switch (currentView) {
      case 'pinned':
        filtered = filtered.filter(note => note.isPinned && !note.isArchived);
        break;
      case 'archived':
        filtered = filtered.filter(note => note.isArchived);
        break;
      case 'reminders':
        filtered = filtered.filter(note => note.reminder && !note.isArchived);
        break;
      default:
        filtered = filtered.filter(note => !note.isArchived);
    }

    // Filter by color
    if (selectedColor) {
      filtered = filtered.filter(note => note.color === selectedColor);
    }

    // Filter by labels
    if (selectedLabels.length > 0) {
      filtered = filtered.filter(note => 
        selectedLabels.every(label => note.labels.includes(label))
      );
    }

    return filtered;
  };

  return (
    <NotificationProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar 
            currentView={currentView}
            onViewChange={setCurrentView}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            selectedLabels={selectedLabels}
            onLabelsChange={setSelectedLabels}
            labels={labels}
            onCreateLabel={createLabel}
            onDeleteLabel={deleteLabel}
            isMobile={isMobile}
          />

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-white shadow-sm border-b border-gray-200 p-4">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onCreateNote={handleCreateNote}
              />
            </div>

            <main className="flex-1 overflow-auto">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <NotesGrid
                      notes={getFilteredNotes()}
                      onNoteClick={handleNoteClick}
                      onCreateNote={handleCreateNote}
                      onDeleteNote={deleteNote}
                      onTogglePin={togglePin}
                      onArchiveNote={archiveNote}
                      onRestoreNote={restoreNote}
                      currentView={currentView}
                    />
                  } 
                />
              </Routes>
            </main>
          </div>

          <AnimatePresence>
            {isEditorOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-2/5 bg-white shadow-2xl z-50"
              >
                <NoteEditor
                  note={selectedNote}
                  onClose={handleCloseEditor}
                  onSave={updateNote}
                  onDelete={deleteNote}
                  labels={labels}
                  onCreateLabel={createLabel}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <NotificationContainer />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;