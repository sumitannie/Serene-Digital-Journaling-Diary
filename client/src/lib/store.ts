import { useState, useEffect } from "react";

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  date: string;
  fontFamily?: string;
  textColor?: string;
  images?: string[];
  tags?: string[];
}

const STORAGE_KEY = "serene_diary_entries";

export const useDiaryStore = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setEntries(JSON.parse(saved).sort((a: DiaryEntry, b: DiaryEntry) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
      } catch (e) {
        console.error("Failed to parse diary entries", e);
      }
    }
    setIsLoading(false);
  }, []);

  const saveToStorage = (newEntries: DiaryEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
  };

  const addEntry = (entry: Omit<DiaryEntry, "id" | "date">) => {
    const newEntry: DiaryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      fontFamily: entry.fontFamily || "font-sans",
      textColor: entry.textColor || "text-foreground",
      images: entry.images || [],
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveToStorage(updated);
  };

  const updateEntry = (id: string, updates: Partial<Omit<DiaryEntry, "id" | "date">>) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, ...updates } : entry
    );
    setEntries(updated);
    saveToStorage(updated);
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    saveToStorage(updated);
  };

  const getEntry = (id: string) => entries.find((e) => e.id === id);

  return {
    entries,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntry,
  };
};
