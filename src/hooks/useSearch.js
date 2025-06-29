import { useState, useMemo } from 'react';

export const useSearch = (notes) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = useMemo(() => {
    if (!searchTerm.trim()) return notes;

    const term = searchTerm.toLowerCase();
    return notes.filter(note => {
      const titleMatch = note.title.toLowerCase().includes(term);
      const contentMatch = typeof note.content === 'string' 
        ? note.content.toLowerCase().includes(term)
        : note.content.some(item => 
            typeof item === 'string' 
              ? item.toLowerCase().includes(term)
              : item.text?.toLowerCase().includes(term)
          );
      const labelsMatch = note.labels.some(label => 
        label.toLowerCase().includes(term)
      );

      return titleMatch || contentMatch || labelsMatch;
    });
  }, [notes, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredNotes
  };
};