"use client";

import { useState } from "react";
import { Shield, Lock, EyeOff, X, Database, Brain, Server } from "lucide-react";

export function PrivacyBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="mb-6">
      {/* Collapsed View */}
      <div 
        className="privacy-badge cursor-pointer hover:scale-105 transition-transform"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Shield size={16} />
        <span>100% Private & Secure - Zero Data Collection</span>
        <span className="text-xs opacity-70">
          {isExpanded ? "(click to collapse)" : "(click to learn more)"}
        </span>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="mt-4 glass rounded-xl p-6 border-l-4 border-green-500">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Lock className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Your Privacy is Guaranteed</h3>
                <p className="text-sm opacity-80">
                  We take your privacy seriously. Here&apos;s exactly what we do (and don&apos;t do) with your data:
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="p-1 rounded-full hover:bg-[var(--border)] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <PrivacyItem
              icon={<EyeOff size={18} />}
              title="We Never See Your Content"
              description="All processing happens directly in your browser. Your content never leaves your device."
            />
            <PrivacyItem
              icon={<Database size={18} />}
              title="Zero Data Storage"
              description="We don't store, log, or retain any of your content. Everything is temporary."
            />
            <PrivacyItem
              icon={<Brain size={18} />}
              title="No AI Training"
              description="Your content is NEVER used to train AI models. We don't use your data for any purpose."
            />
            <PrivacyItem
              icon={<Server size={18} />}
              title="No Server Processing"
              description="100% client-side processing. Our servers never touch your content."
            />
          </div>

          <div className="text-sm bg-[var(--card)] rounded-lg p-4">
            <p className="font-medium mb-2">Our Privacy Promise:</p>
            <p className="opacity-80 leading-relaxed">
              Whatever you write, paste, or convert on this page is your own private and personal information. 
              <strong> We will not train on it, we will not use it for AI training, we will not utilize it, 
              it&apos;s none of our business, and we will never touch it, retain it, or save it.</strong>
            </p>
          </div>

          <p className="text-xs opacity-60 mt-4 text-center">
            This tool is open source (GPL-3.0). You can verify these claims by reviewing the code.
          </p>
        </div>
      )}
    </div>
  );
}

function PrivacyItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 text-green-600 dark:text-green-400">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs opacity-70">{description}</p>
      </div>
    </div>
  );
}
