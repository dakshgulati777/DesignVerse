import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Save, LogOut, ArrowLeft, Camera, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    nickname: '',
    bio: '',
    full_name: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = () => {
    if (user?.user_metadata) {
      setProfile({
        nickname: user.user_metadata.nickname || '',
        bio: user.user_metadata.bio || '',
        full_name: user.user_metadata.full_name || '',
        avatar_url: user.user_metadata.avatar_url || '',
      });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          nickname: profile.nickname,
          bio: profile.bio,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
        }
      });

      if (error) throw error;

      toast({
        title: 'Profile Updated',
        description: 'Your details have been saved successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-bold tracking-widest uppercase">Go Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="glass-card p-8 text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32 border-4 border-foreground/5 mx-auto">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="text-4xl bg-foreground text-background font-bold">
                    {user.email?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 bg-foreground text-background rounded-full hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">{profile.nickname || 'Design Enthusiast'}</h2>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">{user.email}</p>
              </div>
              <div className="pt-4 border-t border-foreground/5">
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="w-full text-destructive hover:bg-destructive/5 flex items-center justify-center gap-2 font-bold tracking-widest text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  SIGN OUT
                </Button>
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Account Security
              </h3>
              <p className="text-sm text-muted-foreground">
                Your account is protected with DesignVerse military-grade encryption.
              </p>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <div className="glass-card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-foreground/5 rounded-xl">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
                  <p className="text-muted-foreground text-sm">Update your public identity on DesignVerse</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Nickname</Label>
                    <div className="relative">
                      <Input
                        value={profile.nickname}
                        onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                        className="glass-card pl-10 h-12"
                        placeholder="CyberDesigner"
                      />
                      <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Full Name</Label>
                    <div className="relative">
                      <Input
                        value={profile.full_name}
                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        className="glass-card pl-10 h-12"
                        placeholder="John Doe"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Email Address</Label>
                  <div className="relative opacity-50">
                    <Input disabled value={user.email || ''} className="glass-card pl-10 h-12 bg-muted/20" />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-[10px] text-muted-foreground italic">Email changes are restricted for security.</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Creative Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="glass-card min-h-[120px] p-4 resize-none"
                    placeholder="Tell us about your creative journey..."
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full md:w-auto px-10 h-12 btn-primary flex items-center gap-2"
                  >
                    {loading ? 'SAVING...' : (
                      <>
                        <Save className="w-4 h-4" />
                        SAVE CHANGES
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
