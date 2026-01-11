"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Play,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  TrendingUp,
  Globe,
  Zap,
} from "lucide-react";
import { authAPI, getGoogleAuthUrl } from "@/lib/api";
import { setToken, setUserRole, setUserData } from "@/lib/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<"creator" | "editor">("creator");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      if (userType === "creator") {
        const response = await authAPI.userSignup({ email, password, name });
        const signinResponse = await authAPI.userSignin({ email, password });
        setToken(signinResponse.data.token);
        setUserRole("creator");
        setUserData({ email, name, id: response.data.user?._id });
        router.push("/dashboard/creator");
      } else {
        const response = await authAPI.editorSignup({ email, password });
        const signinResponse = await authAPI.userSignin({ email, password });
        setToken(signinResponse.data.token);
        setUserRole("editor");
        setUserData({ email, id: response.data.user?._id });
        router.push("/dashboard/editor");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message ||
        "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      {/* Centered Floating Card Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl glass-card rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10 min-h-[700px]"
      >

        {/* Left Side: Interactive Visual / Marketing */}
        <div className="hidden md:flex flex-1 relative bg-gradient-to-br from-[#0a0a0a] to-[#111] border-r border-white/5 p-12 flex-col justify-between overflow-hidden group">

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(0,255,100,0.1),transparent_70%)] animate-pulse" />
          </div>

          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 w-fit group-hover:scale-105 transition-transform duration-500">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Fut<span className="text-red-500">Tube</span></span>
            </Link>
          </div>

          {/* 3D Visual Concept - Global Network */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-10 perspective-1000">
            <div className="relative w-full max-w-xs aspect-square">
              {/* Central Hub */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(255,0,0,0.2)", "0 0 40px rgba(255,0,0,0.4)", "0 0 20px rgba(255,0,0,0.2)"] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center z-20 shadow-2xl"
              >
                <Globe className="w-10 h-10 text-white opacity-80" />
              </motion.div>

              {/* Orbiting Satellite 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#222] border border-white/10 rounded-xl flex items-center justify-center shadow-xl">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
              </motion.div>

              {/* Orbiting Satellite 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 left-10 w-[calc(100%-80px)] h-[calc(100%-80px)]"
              >
                <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-10 h-10 bg-[#222] border border-white/10 rounded-xl flex items-center justify-center shadow-xl">
                  <Play className="w-4 h-4 text-green-400 fill-current" />
                </div>
              </motion.div>

              {/* Connecting Lines (SVG overlay could be better but CSS borders work for simple orbits) */}
              <div className="absolute inset-0 rounded-full border border-white/5 border-dashed animate-spin-slow" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-10 rounded-full border border-white/5 border-dashed animate-reverse-spin" style={{ animationDuration: '20s' }} />

            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex gap-1">
              <div className="h-1 w-12 rounded-full bg-red-500" />
              <div className="h-1 w-4 rounded-full bg-white/20" />
            </div>
            <p className="text-xl font-medium text-white leading-relaxed">
              &quot;Scale your channel operations with enterprise-grade tools.&quot;
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-400">Join the fastest growing creator network</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-black/40 backdrop-blur-xl">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join efficiently as a Creator or Editor.</p>
          </div>

          {/* Custom Tab Switcher */}
          <div className="p-1 bg-white/5 rounded-xl flex mb-8 relative">
            <motion.div
              className="absolute top-1 bottom-1 bg-yellow-500 rounded-lg shadow-sm z-0"
              layoutId="activeTab"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                width: '50%',
                left: userType === 'creator' ? '4px' : 'calc(50% - 4px)'
              }}
            />
            <button
              onClick={() => setUserType('creator')}
              className={`flex-1 relative z-10 py-2.5 text-sm font-bold transition-colors ${userType === 'creator' ? 'text-black' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Creator
            </button>
            <button
              onClick={() => setUserType('editor')}
              className={`flex-1 relative z-10 py-2.5 text-sm font-bold transition-colors ${userType === 'editor' ? 'text-black' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Editor
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', marginBottom: 24 }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {userType === "creator" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-1.5 overflow-hidden">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pl-12 bg-white/5 border-white/10 focus:bg-white/10 transition-all hover:border-white/20"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12 bg-white/5 border-white/10 focus:bg-white/10 transition-all hover:border-white/20"
                  placeholder="name@work.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10 pr-8 bg-white/5 border-white/10 focus:bg-white/10 transition-all hover:border-white/20 text-sm"
                    placeholder="••••••"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field pl-10 pr-8 bg-white/5 border-white/10 focus:bg-white/10 transition-all hover:border-white/20 text-sm"
                    placeholder="••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-white/5 accent-red-500 mt-1" required />
              <span className="text-sm text-gray-400 leading-tight">
                I agree to the <Link href="/terms" className="text-white hover:underline">Terms</Link> and <Link href="/privacy" className="text-white hover:underline">Privacy Policy</Link>.
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary h-12 text-base shadow-lg shadow-red-900/20 group relative overflow-hidden mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <button
              onClick={() => window.location.href = getGoogleAuthUrl()}
              className="w-full btn-secondary h-12 flex items-center justify-center gap-3 hover:bg-white/10 text-white/90 mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Sign up with Google
            </button>
            <p className="text-sm text-gray-500">
              Already have an account? <Link href="/auth/signin" className="text-white hover:text-red-400 font-medium transition-colors">Sign in</Link>
            </p>
          </div>
        </div>

      </motion.div>
    </main>
  );
}
