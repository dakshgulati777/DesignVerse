import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Palette, Mail, Lock, ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || (authMethod === 'password' && !password)) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);

      if (authMethod === 'otp') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        setOtpSent(true);
        toast({
          title: 'OTP Sent!',
          description: 'Check your email for the login link.',
        });
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        toast({
          title: 'Success!',
          description: 'Account created successfully. You can now sign in.',
        });
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: 'Welcome back!',
          description: 'Successfully signed in.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Authentication Error',
        description: error.message || 'Failed to authenticate',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        toast({
          title: 'Social Sign-In Not Available',
          description: 'Social authentication is not configured. Please use email and password to continue.',
          variant: 'destructive',
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.error('OAuth error:', error);
      toast({
        title: 'Social Sign-In Not Available',
        description: 'Please use email and password to sign in.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-md w-full relative"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center mb-8 mt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center hover-glow">
              <Palette className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isSignUp ? 'Join ' : 'Welcome to '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">DesignVerse</span>
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? 'Create your account to get started' : 'Sign in to access all features'}
          </p>
        </div>

        {/* Auth Method Toggle */}
        {!isSignUp && (
          <div className="flex bg-foreground/5 p-1 mb-6 rounded-lg">
            <button
              onClick={() => setAuthMethod('password')}
              className={`flex-1 py-2 text-xs font-bold tracking-widest transition-all ${authMethod === 'password' ? 'bg-background shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              PASSWORD
            </button>
            <button
              onClick={() => setAuthMethod('otp')}
              className={`flex-1 py-2 text-xs font-bold tracking-widest transition-all ${authMethod === 'otp' ? 'bg-background shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              OTP / MAGIC LINK
            </button>
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 glass-card"
                required
              />
            </div>
          </div>

          {!otpSent && (isSignUp || authMethod === 'password') && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 glass-card"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {otpSent && (
            <div className="p-4 bg-primary/5 border border-primary/20 text-center space-y-2">
              <Sparkles className="w-6 h-6 mx-auto text-primary" />
              <p className="text-sm font-medium">Magic Link Sent!</p>
              <p className="text-xs text-muted-foreground">Click the link in your email to sign in instantly.</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setOtpSent(false)}
                className="text-[10px] tracking-widest uppercase font-bold"
              >
                Resend or use password
              </Button>
            </div>
          )}

          {!otpSent && (
            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : (authMethod === 'otp' ? 'Send Magic Link' : 'Sign In'))}
            </Button>
          )}
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setOtpSent(false);
              setAuthMethod('password');
            }}
            className="text-sm text-primary hover:text-primary-glow transition-colors font-semibold"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </div>

        <div className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
