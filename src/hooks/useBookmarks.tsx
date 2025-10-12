import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Bookmark {
  id: string;
  user_id: string;
  item_type: 'palette' | 'blog' | 'fundamental';
  item_id: string;
  item_data: any;
  created_at: string;
}

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchBookmarks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks((data || []) as Bookmark[]);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (itemType: Bookmark['item_type'], itemId: string, itemData: any) => {
    if (!user) {
      toast.error('Please sign in to bookmark items');
      return false;
    }

    try {
      const { error } = await supabase
        .from('bookmarks')
        .insert({
          user_id: user.id,
          item_type: itemType,
          item_id: itemId,
          item_data: itemData
        });

      if (error) throw error;
      
      await fetchBookmarks();
      toast.success('Bookmarked successfully!');
      return true;
    } catch (error: any) {
      if (error.code === '23505') {
        toast.info('Already bookmarked');
      } else {
        toast.error('Failed to bookmark');
        console.error('Error adding bookmark:', error);
      }
      return false;
    }
  };

  const removeBookmark = async (itemType: Bookmark['item_type'], itemId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId);

      if (error) throw error;
      
      await fetchBookmarks();
      toast.success('Bookmark removed');
      return true;
    } catch (error) {
      toast.error('Failed to remove bookmark');
      console.error('Error removing bookmark:', error);
      return false;
    }
  };

  const isBookmarked = (itemType: Bookmark['item_type'], itemId: string) => {
    return bookmarks.some(b => b.item_type === itemType && b.item_id === itemId);
  };

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    fetchBookmarks
  };
};
