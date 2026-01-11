"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    Youtube,
    Save,
    Bell,
    Check,
    AlertCircle,
    LogOut,
    User,
    Shield,
    Loader2
} from "lucide-react";
import { getUserData, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { videoAPI } from "@/lib/api"; // You might need to add a method to check connection status

export default function SettingsPage() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [isYoutubeConnected, setIsYoutubeConnected] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const data = getUserData();
        if (data) {
            setUserData(data);
            // In a real app, you would verify this with an API call
            // For now, we assume if they have a token, they might be connected, 
            // but ideally we check a specific endpoint.
            // Let's assume false and ask them to connect if unsure.
        }
    }, []);

    const handleConnectYouTube = () => {
        // Redirect to backend Google Auth
        window.location.href = "http://localhost:5000/auth/google";
    };

    const handleLogout = () => {
        logout();
        router.push("/auth/signin");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] p-6 lg:p-12">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Settings className="w-8 h-8 text-gray-400" />
                        Settings
                    </h1>
                    <p className="text-gray-400">Manage your account preferences and integrations.</p>
                </header>

                <div className="space-y-6">

                    {/* Profile Section */}
                    <section className="glass p-8 rounded-3xl border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-400" />
                            Profile Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={userData?.name || ""}
                                    readOnly
                                    className="input-field opacity-60 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={userData?.email || ""}
                                    readOnly
                                    className="input-field opacity-60 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Integrations Section */}
                    <section className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Youtube className="w-5 h-5 text-red-500" />
                            Integrations
                        </h2>

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl bg-white/5 border border-white/5">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">YouTube Channel</h3>
                                <p className="text-sm text-gray-400 max-w-md">
                                    Connect your YouTube channel to enable automatic uploads upon approval.
                                    This grants permission to upload videos directly.
                                </p>
                            </div>

                            {isYoutubeConnected ? (
                                <button disabled className="btn-secondary text-green-400 border-green-500/30 bg-green-500/10 cursor-default">
                                    <Check className="w-4 h-4 mr-2" />
                                    Channel Connected
                                </button>
                            ) : (
                                <button
                                    onClick={handleConnectYouTube}
                                    className="btn-primary bg-[#FF0000] hover:bg-[#D40000] text-white shadow-lg shadow-red-900/20"
                                >
                                    <Youtube className="w-4 h-4 mr-2" />
                                    Connect Channel
                                </button>
                            )}
                        </div>

                        <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
                            <AlertCircle className="w-4 h-4 text-gray-500 shrink-0" />
                            <p>Note: You must authorize the app to manage your YouTube videos. We only upload videos you explicitly approve.</p>
                        </div>
                    </section>

                    {/* Account Actions */}
                    <section className="glass p-8 rounded-3xl border border-white/5">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-gray-400" />
                            Account Actions
                        </h2>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium px-4 py-2 hover:bg-red-500/10 rounded-lg w-fit"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </section>

                </div>
            </div>
        </div>
    );
}
