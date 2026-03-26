import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Bookmark {
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
      const { data, error } = await (supabase as any)
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error: any) {
      console.error('Error fetching bookmarks:', error);
      toast.error('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (
    itemType: 'palette' | 'blog' | 'fundamental',
    itemId: string,
    itemData: any
  ) => {
    if (!user) {
      toast.error('Please sign in to bookmark items');
      return false;
    }

    try {
      const { error } = await (supabase as any).from('bookmarks').insert({
        user_id: user.id,
        item_type: itemType,
        item_id: itemId,
        item_data: itemData,
      });

      if (error) throw error;

      toast.success('Bookmarked successfully!');
      await fetchBookmarks();
      return true;
    } catch (error: any) {
      console.error('Error adding bookmark:', error);
      toast.error('Failed to bookmark item');
      return false;
    }
  };

  const removeBookmark = async (itemType: string, itemId: string) => {
    if (!user) return false;

    try {
      const { error } = await (supabase as any)
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId);

      if (error) throw error;

      toast.success('Bookmark removed');
      await fetchBookmarks();
      return true;
    } catch (error: any) {
      console.error('Error removing bookmark:', error);
      toast.error('Failed to remove bookmark');
      return false;
    }
  };

  const isBookmarked = (itemType: string, itemId: string) => {
    return bookmarks.some(
      (b) => b.item_type === itemType && b.item_id === itemId
    );
  };

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
};
