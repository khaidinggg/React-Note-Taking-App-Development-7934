import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'notes-app-data';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const createNote = (type = 'text') => {
    const newNote = {
      id: uuidv4(),
      type,
      title: '',
      content: type === 'checklist' ? [] : '',
      color: '',
      labels: [],
      isPinned: false,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reminder: null,
      images: [],
      drawings: [],
      voiceMemos: []
    };

    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id, updates) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isPinned: !note.isPinned }
        : note
    ));
  };

  const archiveNote = (id) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isArchived: true, isPinned: false }
        : note
    ));
  };

  const restoreNote = (id) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, isArchived: false }
        : note
    ));
  };

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    archiveNote,
    restoreNote
  };
};