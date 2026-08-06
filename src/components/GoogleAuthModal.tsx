import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SocialAuthModalProps {
  provider: 'google' | 'github';
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect?: string;
}

const providerDetails = {
  google: {
    title: 'Google',
    subtitle: 'to continue to UniLink',
    helper: 'Google will share your name, email address, and profile picture with UniLink.',
    actionLabel: 'Continue with Google',
    logo: (
      <svg className="h-10 w-10 mb-3" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    ),
    disclaimer: "Google will share your name, email address, and profile picture with UniLink.",
  },
  github: {
    title: 'GitHub',
    subtitle: 'to authorize UniLink',
    helper: 'GitHub will share your username, email address, and public profile with UniLink.',
    actionLabel: 'Authorize with GitHub',
    logo: (
      <svg className="h-10 w-10 mb-3" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 0.297C5.37 0.297 0 5.667 0 12.297c0 5.293 3.438 9.783 8.205 11.368.6.111.82-.261.82-.58 0-.287-.011-1.045-.017-2.05-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.81 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.31.467-2.38 1.235-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.044.138 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.655 1.653.243 2.873.119 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.625-5.475 5.922.43.372.815 1.102.815 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 22.078 24 17.588 24 12.297 24 5.667 18.63.297 12 .297z" fill="#181717"/>
      </svg>
    ),
    disclaimer: "GitHub will share your username, email address, and public profile with UniLink.",
  },
};

const mockAccounts = {
  google: [
    {
      fullName: "John Doe",
      email: "john.doe.student@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    {
      fullName: "Alex Rivera",
      email: "arivera@stanford.edu",
      avatar: "https://images.unsplash.com/photo-1494790108777-766fd36f7b41?w=100&h=100&fit=crop",
    },
  ],
  github: [
    {
      fullName: "Morgan Lee",
      email: "morgan.lee@github.com",
      username: "morganlee",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    {
      fullName: "Taylor Brooks",
      email: "taylor.brooks@github.com",
      username: "taylorbrooks",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
  ],
};

export const SocialAuthModal: React.FC<SocialAuthModalProps> = ({
  provider,
  isOpen,
  onClose,
  onSuccessRedirect = "/dashboard",
}) => {
  const navigate = useNavigate();
  const [customEmail, setCustomEmail] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const details = providerDetails[provider];
  const accounts = mockAccounts[provider];

  const handleSelectAccount = async (
    email: string,
    name?: string,
    avatarUrl?: string,
    githubUsername?: string
  ) => {
    setIsAuthenticating(true);
    try {
      const payload = {
        email,
        fullName: name || email.split('@')[0],
        avatarUrl: avatarUrl || "",
        githubUsername,
      };

      const res = provider === 'google'
        ? await authApi.googleAuth(payload)
        : await authApi.githubAuth(payload);

      localStorage.setItem('unilink_token', res.token);
      localStorage.setItem('unilink_user', JSON.stringify(res.user));
      window.dispatchEvent(new Event('storage'));

      toast.success(`Signed in as ${email}`, {
        description: `${details.title} authentication completed successfully.`,
      });

      onClose();
      navigate(onSuccessRedirect);
    } catch {
      toast.error(`${details.title} Authentication Failed`);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 z-10 border border-slate-200 overflow-hidden font-inter text-slate-800"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            {details.logo}
            <h3 className="text-xl font-bold text-slate-900">Sign in with {details.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{details.subtitle} <span className="font-semibold text-slate-800">UniLink</span></p>
          </div>

          <div className="space-y-3 mb-6">
            {accounts.map((account, idx) => (
              <button
                key={idx}
                disabled={isAuthenticating}
                onClick={() => handleSelectAccount(
                  account.email,
                  account.fullName,
                  account.avatar,
                  account.username
                )}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 transition-all text-left group"
              >
                <div className="flex items-center gap-3.5">
                  <img src={account.avatar} alt={account.fullName} className="h-10 w-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">{account.fullName}</p>
                    <p className="text-xs text-slate-500">{account.email}</p>
                    {account.username ? (
                      <p className="text-[11px] text-slate-400">@{account.username}</p>
                    ) : null}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}

            {!showCustomInput ? (
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-dashed border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-all justify-center"
              >
                <UserPlus className="h-4 w-4" /> Use another {details.title} account
              </button>
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <p className="text-xs font-bold text-slate-700">Enter {details.title} Account Email</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder={provider === 'google' ? 'user@gmail.com' : 'user@github.com'}
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="h-10 text-xs bg-white border-slate-200 rounded-xl"
                  />
                  <Button
                    size="sm"
                    disabled={!customEmail || isAuthenticating}
                    onClick={() => handleSelectAccount(customEmail)}
                    className="h-10 bg-slate-900 text-white rounded-xl px-4 text-xs font-bold shrink-0"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
            {details.helper} See UniLink's <a href="#" className="text-cyan-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-cyan-600 hover:underline">Terms of Service</a>.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
