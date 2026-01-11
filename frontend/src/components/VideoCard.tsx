"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  Clock,
  CheckCircle,
  XCircle,
  Youtube,
  MoreVertical,
  X,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
  video: {
    _id: string;
    title: string;
    description: string;
    fileUrl: string;
    status: "pending" | "approved" | "rejected" | "uploaded";
    creatorId?: string;
    editorId?: string;
    youtubeId?: string;
  };
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
  isLoading?: boolean;
}

export default function VideoCard({
  video,
  onApprove,
  onReject,
  showActions = false,
  isLoading = false,
}: VideoCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const getStatusIcon = () => {
    switch (video.status) {
      case "pending": return <Clock className="w-3.5 h-3.5" />;
      case "approved": return <CheckCircle className="w-3.5 h-3.5" />;
      case "rejected": return <XCircle className="w-3.5 h-3.5" />;
      case "uploaded": return <Youtube className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const getStatusBadgeClass = () => {
    switch (video.status) {
      case "pending": return "badge-pending";
      case "approved": return "badge-approved";
      case "rejected": return "badge-rejected";
      case "uploaded": return "badge-uploaded";
      default: return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="glass-card rounded-2xl overflow-hidden card-hover group flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-video bg-neutral-900 overflow-hidden cursor-pointer"
        onClick={() => {
          if (video.status === "uploaded" && video.youtubeId) {
            window.open(`https://youtube.com/watch?v=${video.youtubeId}`, "_blank");
          } else {
            setIsVideoModalOpen(true);
          }
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-red-600 transition-colors shadow-2xl"
          >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </motion.div>
        </div>

        {/* Dynamic Image Placeholder if no thumbnail (could integrate thumbnail generator here) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50 group-hover:scale-105 transition-transform duration-700 ease-out" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`badge ${getStatusBadgeClass()} shadow-lg backdrop-blur-md`}>
            {getStatusIcon()}
            {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
          </span>
        </div>

        {/* Menu Button */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-white mb-1 line-clamp-1 group-hover:text-red-500 transition-colors">
          {video.title || "Untitled Video"}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {video.description || "No description provided"}
        </p>

        <div className="mt-auto">
          {/* Actions */}
          {showActions && video.status === "pending" && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => onApprove?.(video._id)}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors text-sm font-medium border border-green-500/20 disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => onReject?.(video._id)}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium border border-red-500/20 disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          )}

          {/* YouTube Link */}
          {video.status === "uploaded" && video.youtubeId && (
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={() => window.open(`https://youtube.com/watch?v=${video.youtubeId}`, "_blank")}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000]/20 transition-colors text-sm font-medium border border-[#FF0000]/20"
              >
                <Youtube className="w-4 h-4" />
                Watch on YouTube
                <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <video
                controls
                autoPlay
                className="w-full aspect-video bg-black"
                src={`http://localhost:5000/${video.fileUrl}`}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
