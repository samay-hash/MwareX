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
  ArrowRight,
  Loader2,
  Check,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { authAPI, getGoogleAuthUrl } from "@/lib/api";
import { setToken, setUserRole, setUserData } from "@/lib/auth";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<"creator" | "editor" | "admin">("creator");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;
      if (userType === "admin") {
        response = await authAPI.adminSignin({ email, password });
      } else {
        response = await authAPI.userSignin({ email, password });
      }
      setToken(response.data.token);
      setUserRole(userType);
      setUserData({ email });

      if (userType === "creator") {
        router.push("/dashboard/creator");
      } else if (userType === "editor") {
        router.push("/dashboard/editor");
      } else if (userType === "admin") {
        router.push("/dashboard/admin");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message ||
        "Invalid credentials. Please check your details."
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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Smooth Apple-ease
        className="w-full max-w-5xl glass-card rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative z-10 min-h-[600px]"
      >

        {/* Left Side: Interactive Visual / Marketing */}
        <div className="hidden md:flex flex-1 relative bg-gradient-to-br from-[#0a0a0a] to-[#111] border-r border-white/5 p-12 flex-col justify-between overflow-hidden group">

          {/* Animated Background Mesh (Local) */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)] animate-pulse" />
          </div>

          {/* Logo Brand */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 w-fit group-hover:scale-105 transition-transform duration-500">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Fut<span className="text-red-500">Tube</span></span>
            </Link>
          </div>

          {/* 3D Visual Concept */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-10">
            <div className="relative w-64 h-80 perspective-1000">
              {/* Floating Card 1 */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full bg-[#1a1a1a] rounded-2xl border border-white/10 p-4 shadow-2xl z-20"
              >
                <div className="w-full h-32 bg-gradient-to-br from-red-900/20 to-black rounded-lg mb-4 flex items-center justify-center">
                  <Play className="w-8 h-8 text-red-500 opacity-50" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-2/3 bg-white/10 rounded" />
                  <div className="h-2 w-1/2 bg-white/10 rounded" />
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="px-2 py-1 rounded bg-green-500/20 text-green-500 text-xs font-bold border border-green-500/20">APPROVED</div>
                </div>
              </motion.div>

              {/* Floating Card 2 (Background) */}
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -3, 0], scale: [0.9, 0.95, 0.9] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-10 -right-8 w-full bg-[#151515] rounded-2xl border border-white/5 p-4 shadow-xl z-10 opacity-60 blur-[1px]"
              >
                <div className="w-full h-32 bg-white/5 rounded-lg mb-4" />
                <div className="h-2 w-3/4 bg-white/5 rounded" />
              </motion.div>
            </div>
          </div>

          {/* Quote / Social Proof */}
          <div className="relative z-10 space-y-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-red-500" />)}
            </div>
            <p className="text-xl font-medium text-white leading-relaxed">
              &quot;The most streamlined workflow for professional content teams.&quot;
            </p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-400">Trusted by 500+ Top Creators</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-black/40 backdrop-blur-xl">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Enter your credentials to access your dashboard.</p>
          </div>

          {/* Custom Tab Switcher */}
          <div className="p-1 bg-white/5 rounded-xl flex mb-8 relative">
            <motion.div
              className="absolute top-1 bottom-1 bg-yellow-500 rounded-lg shadow-sm z-0"
              layoutId="activeTab"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                width: '33.33%',
                left: userType === 'creator' ? '4px' : userType === 'editor' ? '33.33%' : 'calc(66.66% - 4px)'
              }}
            />
            {(['creator', 'editor', 'admin'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                className={`flex-1 relative z-10 py-2.5 text-sm font-bold transition-colors capitalize ${userType === type ? 'text-black' : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm flex items-center gap-2 overflow-hidden"
              >
                <Zap className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 pr-12 bg-white/5 border-white/10 focus:bg-white/10 transition-all hover:border-white/20"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-white/5 accent-red-500" />
                <span>Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary h-12 text-base shadow-lg shadow-red-900/20 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm mb-4">Or continue with</p>
            <button
              onClick={() => window.location.href = getGoogleAuthUrl()}
              className="w-full btn-secondary h-12 flex items-center justify-center gap-3 hover:bg-white/10 text-white/90"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google ID
            </button>
            <p className="mt-6 text-sm text-gray-500">
              Don&apos;t have an account? <Link href="/auth/signup" className="text-white hover:text-red-400 font-medium transition-colors">Create one now</Link>
            </p>
          </div>
        </div>

      </motion.div>
    </main>
  );
}
