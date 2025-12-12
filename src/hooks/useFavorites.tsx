import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface FavoriteItem {
  id: string;
  type: 'font' | 'texture' | 'pairing';
  data: any;
  addedAt: number;
}

const STORAGE_KEY = 'designverse_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing favorites:', e);
      }
    }
  }, []);

  const saveFavorites = useCallback((items: FavoriteItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setFavorites(items);
  }, []);

  const addFavorite = useCallback((type: FavoriteItem['type'], id: string, data: any) => {
    const existing = favorites.find(f => f.id === id && f.type === type);
    if (existing) {
      toast.info('Already in favorites');
      return false;
    }

    const newFavorite: FavoriteItem = {
      id,
      type,
      data,
      addedAt: Date.now(),
    };

    const updated = [newFavorite, ...favorites];
    saveFavorites(updated);
    toast.success('Added to favorites!');
    return true;
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((type: FavoriteItem['type'], id: string) => {
    const updated = favorites.filter(f => !(f.id === id && f.type === type));
    saveFavorites(updated);
    toast.success('Removed from favorites');
    return true;
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((type: FavoriteItem['type'], id: string) => {
    return favorites.some(f => f.id === id && f.type === type);
  }, [favorites]);

  const getFavoritesByType = useCallback((type: FavoriteItem['type']) => {
    return favorites.filter(f => f.type === type);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFavorites([]);
    toast.success('All favorites cleared');
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoritesByType,
    clearFavorites,
  };
};
