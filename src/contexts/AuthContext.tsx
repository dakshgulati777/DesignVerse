import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const getProfileFromUser = (user: User | null) => {
    if (!user) return null;
    return {
      nickname: user.user_metadata?.nickname || '',
      full_name: user.user_metadata?.full_name || '',
      bio: user.user_metadata?.bio || '',
      avatar_url: user.user_metadata?.avatar_url || '',
    };
  };

  const refreshProfile = async () => {
    const { data: { user: updatedUser } } = await supabase.auth.getUser();
    setUser(updatedUser);
    setProfile(getProfileFromUser(updatedUser));
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const newUser = session?.user ?? null;
        setSession(session);
        setUser(newUser);
        setProfile(getProfileFromUser(newUser));
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const newUser = session?.user ?? null;
      setSession(session);
      setUser(newUser);
      setProfile(getProfileFromUser(newUser));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
