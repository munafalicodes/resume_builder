import React from 'react';
import { Sparkles } from 'lucide-react';

const MagicButton = ({ onClick, loading, label = "AI Rewrite", isOptimized = false }) => {
    if (isOptimized) {
        return (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-green-700 bg-green-100 border border-green-200 shadow-sm cursor-default">
                <Sparkles size={12} className="text-green-600" />
                Optimized
            </span>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white
                bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600
                shadow-sm transition-all transform hover:scale-105 active:scale-95
                ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
            `}
            title="Rewrite using AI to improve ATS score"
        >
            <Sparkles size={12} className={loading ? "animate-spin" : ""} />
            {loading ? 'Magic...' : label}
        </button>
    );
};

export default MagicButton;
