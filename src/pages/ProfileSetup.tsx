import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Wand2, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProfileSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');

  const handleFinishSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname) {
      toast({ title: 'Error', description: 'Please choose a nickname' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { nickname }
      });

      if (error) throw error;

      toast({
        title: 'Welcome to the Verse! 🚀',
        description: `Your profile has been set up as ${nickname}.`,
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Setup Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-lg w-full p-8 md:p-12 text-center space-y-8"
      >
        <div className="w-20 h-20 mx-auto bg-foreground rounded-3xl flex items-center justify-center">
          <Wand2 className="w-10 h-10 text-background" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Final Step! ✨</h1>
          <p className="text-muted-foreground">Let's personalize your DesignVerse experience.</p>
        </div>

        <form onSubmit={handleFinishSetup} className="space-y-6 text-left">
          <div className="space-y-3">
            <Label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground ml-1">Choose your Nickname</Label>
            <div className="relative">
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. DesignMaverick101"
                className="glass-card h-14 pl-12 text-lg"
                autoFocus
              />
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <Button 
            disabled={loading}
            className="w-full h-14 btn-primary text-sm font-bold tracking-widest flex items-center justify-center gap-3"
          >
            {loading ? 'SETTING UP...' : (
              <>
                ENTER THE DESIGNVERSE
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
