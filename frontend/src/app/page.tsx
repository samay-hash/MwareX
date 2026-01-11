"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  Play,
  Upload,
  CheckCircle,
  Youtube,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Video,
  Bell,
  Lock,
  Star,
  Globe,
  Layout,
  Smartphone,
  Cpu
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX / innerWidth;
    const y = clientY / innerHeight;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen overflow-x-hidden bg-grid selection:bg-red-500/30"
      onMouseMove={handleMouseMove}
    >
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-32 px-6 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">

        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
          <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side: Content */}
          <div className="text-left flex flex-col items-start">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">v2.0 Live</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
            >
              Streamline Your <br />
              <span className="gradient-text-primary">Video Workflow</span>
            </motion.h1>

            {/* Subheading (The requested text) */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl font-light text-white/90 mb-4"
            >
              Create without Chaos.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed"
            >
              The production-ready approval workflow for professional YouTubers.
              Upload, Review, Publish. All in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-row items-center gap-4"
            >
              <Link href="/auth/signup" className="btn-primary group text-base px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/20">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="#demo" className="btn-secondary group text-base px-8 py-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10">
                Watch Demo
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Solar System Animation */}
          <div className="relative h-[500px] w-full flex items-center justify-center perspective-[1200px]">
            <SolarSystem />
          </div>

        </div>
      </section>

      {/* --- FEATURES GRID (BENTO) --- */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Everything you need to <span className="gradient-text-primary">scale</span>.
              </h2>
              <p className="text-xl text-gray-400">
                Stop using WhatsApp, Google Drive, and disjointed emails. Switch to a workflow designed for high-performance channels.
              </p>
            </div>
            <div className="flex gap-4">
              {/* Decorative elements or navigation arrows could go here */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            {/* Large Card */}
            <BentoCard
              className="md:col-span-2 md:row-span-2"
              title="Seamless Upload Pipeline"
              desc="Editors upload directly to a specialized queue. No more file limits or expiration dates."
              icon={Upload}
              graphic={<MockupUpload />}
            />

            {/* Tall Card */}
            <BentoCard
              className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-red-900/10 to-transparent"
              title="Mobile Ready"
              desc="Approve videos on the go from your phone."
              icon={Smartphone}
              graphic={<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-80 bg-black border border-white/10 rounded-t-3xl shadow-2xl skew-x-[-10deg] opacity-50" />}
            />

            {/* Standard Cards */}
            <BentoCard
              title="YouTube API Integration"
              desc="One-click publish directly to your channel."
              icon={Youtube}
            />
            <BentoCard
              title="Role-Based Access"
              desc="Secure dashboards for Editors and Managers."
              icon={Lock}
            />
            <BentoCard
              title="Global CDN"
              desc="Lightning fast playback anywhere in the world."
              icon={Globe}
            />
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Videos Processed", value: "10K+" },
            { label: "Active Creators", value: "500+" },
            { label: "Storage Used", value: "50TB" },
            { label: "Time Saved", value: "1000h+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-[3rem] p-16 md:p-24 border border-red-500/20 shadow-2xl shadow-red-900/20"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              Ready to go <span className="gradient-text-primary">Pro</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Join the top 1% of creators who treat their channel like a media company.
            </p>
            <Link href="/auth/signup" className="btn-primary text-xl px-12 py-5 shadow-xl shadow-red-600/20">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// --- SUB COMPONENTS ---

function HeroVisual({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  return (
    <div className="relative w-full max-w-5xl aspect-video mx-auto perspective-1000 mt-10 hidden md:block">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {/* Main Interface Window */}
        <div className="absolute inset-0 bg-[#0f0f0f] rounded-2xl border border-white/10 shadow-2xl overflow-hidden glass-card">
          <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="p-8 flex gap-8 h-full">
            {/* Fake Sidebar */}
            <div className="w-64 h-[80%] bg-white/5 rounded-xl animate-pulse" />
            {/* Fake Content */}
            <div className="flex-1 space-y-4">
              <div className="h-40 w-full bg-gradient-to-r from-white/5 to-white/10 rounded-xl" />
              <div className="flex gap-4">
                <div className="h-32 w-1/2 bg-white/5 rounded-xl" />
                <div className="h-32 w-1/2 bg-white/5 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements (Parallax) */}
        <motion.div
          className="absolute -right-10 top-20 bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-2xl"
          style={{ z: 50 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="text-green-500 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Video Approved</div>
              <div className="text-xs text-gray-500">Just now</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -left-10 bottom-20 bg-[#1a1a1a] p-4 rounded-xl border border-white/10 shadow-2xl"
          style={{ z: 40 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <Youtube className="text-red-500 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Upload Complete</div>
              <div className="text-xs text-gray-500">Ready to publish</div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

function BentoCard({ className = "", title, desc, icon: Icon, graphic }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-colors ${className}`}
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-gray-300 group-hover:text-red-500 transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed max-w-sm">{desc}</p>

        {graphic && <div className="mt-auto pt-8">{graphic}</div>}
      </div>

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

function MockupUpload() {
  return (
    <div className="relative w-full h-48 bg-[#0a0a0a] rounded-t-xl border-t border-x border-white/10 overflow-hidden shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <div className="flex items-center gap-4 p-4 border-b border-white/5">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-2/3 animate-pulse" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded bg-white/10" />
            <div className="h-2 w-24 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- SOLAR SYSTEM COMPONENT ---
function SolarSystem() {
  return (
    <div className="relative w-full h-full flex items-center justify-center transform style-3d rotate-x-[20deg]">

      {/* Central Star (FutTube Logo/Core) */}
      <motion.div
        animate={{
          boxShadow: ["0 0 40px rgba(220, 38, 38, 0.4)", "0 0 80px rgba(220, 38, 38, 0.6)", "0 0 40px rgba(220, 38, 38, 0.4)"],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute z-20 w-32 h-32 rounded-full bg-gradient-to-br from-neutral-900 to-black border border-red-500/30 flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl" />
        <Play className="w-12 h-12 text-red-500 fill-red-500" />
      </motion.div>

      {/* Orbit 1: Creator */}
      <div className="absolute w-[280px] h-[280px] rounded-full border border-white/5 border-dashed animate-spin-slow" style={{ animationDuration: '30s' }}>
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center shadow-2xl glass-card">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-400 whitespace-nowrap">Creator</span>
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Video className="w-4 h-4 text-blue-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Orbit 2: YouTube */}
      <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 border-dashed animate-reverse-spin" style={{ animationDuration: '45s' }}>
        <motion.div
          className="absolute top-1/2 -right-8 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-20 h-20 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center shadow-2xl glass-card relative">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-400 whitespace-nowrap">Distribution</span>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Youtube className="w-5 h-5 text-red-600" />
            </div>
            {/* Connecting Beam */}
            <div className="absolute top-1/2 right-full w-20 h-[1px] bg-gradient-to-l from-red-500/50 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Orbit 3: Audience */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 border-dashed animate-spin-slow" style={{ animationDuration: '60s' }}>
        <motion.div
          className="absolute bottom-20 left-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shadow-2xl glass-card">
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-400 whitespace-nowrap">Audience</span>
            <Globe className="w-6 h-6 text-green-400" />
          </div>
        </motion.div>
      </div>

    </div>
  );
}
