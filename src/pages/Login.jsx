import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, Sparkles, AlertCircle, KeyRound, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Button } from '../components/common/Button';
import { AshramLogo } from '../components/common/AshramLogo';

export const Login = ({ initialRegistering = false }) => {
  const [isRegistering, setIsRegistering] = useState(initialRegistering);

  useEffect(() => {
    setIsRegistering(initialRegistering);
  }, [initialRegistering]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/gallery';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isRegistering) {
        if (!name.trim() || !email.trim() || !password) {
          setError('Please fill in all required registration fields.');
          return;
        }
        const authData = await authService.register(name.trim(), email.trim(), password);
        login(authData);
        navigate(from, { replace: true });
      } else {
        if (!email.trim() || !password) {
          setError('Please enter your sanctuary email and password.');
          return;
        }
        const authData = await authService.login(email.trim(), password);
        login(authData);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@srichakrayoga.org');
    setPassword('Password123!');
    setIsRegistering(false);
    setError('');
  };

  const fillDemoMember = () => {
    setEmail('member@srichakrayoga.org');
    setPassword('Password123!');
    setIsRegistering(false);
    setError('');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col justify-center items-center bg-paper-grain relative overflow-hidden font-sans">
      {/* Background Subtle Geometry Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-500/10 pointer-events-none opacity-40" />

      <div className="w-full max-w-md bg-white rounded-xl shadow-warm-lg border border-terracotta-500/20 overflow-hidden relative z-10 animate-fade-in">
        {/* Header */}
        <div className="bg-dusk-gradient p-8 text-white text-center space-y-4 border-b border-terracotta-500/20">
          <div className="flex justify-center">
            <AshramLogo variant="light" />
          </div>
          <div className="pt-2">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-white">
              {isRegistering ? 'Student Archive Enrollment' : 'Sanctuary Member Sign In'}
            </h2>
            <p className="text-xs text-gray-300 font-normal mt-1">
              {isRegistering
                ? 'Create a student profile to access high-resolution photographic and video archives.'
                : 'Enter your credentials to unlock unlisted discourse streams and full high-definition gallery records.'}
            </p>
          </div>
        </div>

        {/* Demo Credentials Helper Box — ONLY rendered when VITE_SEED_DEMO_DATA=true in local/dev environment */}
        {import.meta.env.VITE_SEED_DEMO_DATA === 'true' && (
          <div className="p-4 bg-[#F8F7F4] border-b border-gray-200 text-royal-950 text-xs">
            <div className="font-bold uppercase tracking-wider flex items-center space-x-1.5 text-royal-950 mb-2">
              <KeyRound className="w-3.5 h-3.5 text-gold-600" />
              <span>Local Testing Demo Accounts (VITE_SEED_DEMO_DATA=true):</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-royal-900 text-left transition-all font-mono text-[11px] shadow-sm"
              >
                <div className="font-bold text-royal-950">Acharya (Admin)</div>
                <div className="text-gray-500 truncate">admin@srichakrayoga.org</div>
              </button>

              <button
                type="button"
                onClick={fillDemoMember}
                className="p-2.5 rounded-xl bg-white border border-gray-200 hover:border-royal-900 text-left transition-all font-mono text-[11px] shadow-sm"
              >
                <div className="font-bold text-royal-950">Student (Member)</div>
                <div className="text-gray-500 truncate">member@srichakrayoga.org</div>
              </button>
            </div>
            <div className="text-[10px] text-gray-500 text-center mt-2 font-light">
              Password for both: <span className="font-mono font-bold text-royal-950">Password123!</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {isRegistering && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Siddharth Sharma"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F7F4] border border-gray-200 text-royal-950 text-sm focus:outline-none focus:border-royal-900 focus:bg-white transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@srichakrayoga.org"
              className="w-full px-4 py-3 rounded-xl bg-[#F8F7F4] border border-gray-200 text-royal-950 text-sm focus:outline-none focus:border-royal-900 focus:bg-white transition-all font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#F8F7F4] border border-gray-200 text-royal-950 text-sm focus:outline-none focus:border-royal-900 focus:bg-white transition-all font-mono"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-royal-900 text-white hover:bg-royal-800 py-3.5 px-6 text-sm font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isRegistering ? <UserCheck className="w-4 h-4 text-gold-400" /> : <LogIn className="w-4 h-4 text-gold-400" />}
              <span>{submitting ? 'Authenticating...' : isRegistering ? 'Create Sanctuary Profile' : 'Sign In to Archive'}</span>
            </button>
          </div>
        </form>

        {/* Footer Toggle */}
        <div className="px-8 pb-8 text-center border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="text-xs text-gray-600 hover:text-royal-900 font-semibold transition-colors"
          >
            {isRegistering
              ? 'Already enrolled? Sign in with existing credentials'
              : 'New student or practitioner? Request a sanctuary profile →'}
          </button>
        </div>
      </div>
    </div>
  );
};
