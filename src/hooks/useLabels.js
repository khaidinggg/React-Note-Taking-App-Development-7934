import { useState, useEffect } from 'react';

const LABELS_STORAGE_KEY = 'notes-app-labels';

export const useLabels = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const savedLabels = localStorage.getItem(LABELS_STORAGE_KEY);
    if (savedLabels) {
      setLabels(JSON.parse(savedLabels));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LABELS_STORAGE_KEY, JSON.stringify(labels));
  }, [labels]);

  const createLabel = (name) => {
    if (!labels.includes(name)) {
      setLabels(prev => [...prev, name]);
    }
  };

  const deleteLabel = (name) => {
    setLabels(prev => prev.filter(label => label !== name));
  };

  return {
    labels,
    createLabel,
    deleteLabel
  };
};