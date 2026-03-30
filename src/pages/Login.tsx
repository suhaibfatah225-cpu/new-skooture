import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check (default or from env)
    const CORRECT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem('skooture_admin_session', 'active');
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 font-sans transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-blue-500/5 overflow-hidden">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Admin Portal</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Please enter your password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border ${
                    error ? 'border-red-500 ring-2 ring-red-500/10' : 'border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
                  } outline-none transition-all dark:text-white`}
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 font-medium animate-shake">Incorrect password. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full group flex items-center justify-center gap-2 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-lg"
            >
              Sign In
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-zinc-500 hover:text-blue-500 transition-colors"
            >
              Back to Website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
