'use client';

import React, { useState } from 'react';
import { Group } from '@/lib/types';
import { Business } from '@/types/local-biz';
import { INITIAL_GROUPS } from '@/lib/data';
import { LocalBizStore } from '@/lib/local-biz/store';
import { GroupCard } from './GroupCard';
import { BusinessCard } from '@/components/local-biz/BusinessCard';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  Zap,
  Building2,
  Users,
} from 'lucide-react';

interface SmartSearchChatbotProps {
  onClose?: () => void;
}

export const SmartSearchChatbot: React.FC<SmartSearchChatbotProps> = ({ onClose }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<
    {
      sender: 'bot' | 'user';
      text: string;
      businessResults?: Business[];
      groupResults?: Group[];
    }[]
  >([
    {
      sender: 'bot',
      text: '👋 Hello! I am your AI Business & Group Search Assistant.\n\n💡 Tip: Enter Area Name, Pincode (e.g. 600017) and City to get business search faster in AI.',
    },
  ]);

  const processQuery = async (query: string) => {
    if (!query.trim() || isSearching) return;

    const userText = query.trim();
    const qLower = userText.toLowerCase();
    setIsSearching(true);

    try {
      // 1. Query Local Businesses using enhanced query-based search engine
      const matchedBusinesses = await LocalBizStore.getBusinesses({ q: userText });

      // 2. Query Groups
      const targetPlatforms: string[] = [];
      if (qLower.includes('wa') || qLower.includes('whatsapp')) targetPlatforms.push('whatsapp');
      if (qLower.includes('te') || qLower.includes('telegram')) targetPlatforms.push('telegram');
      if (qLower.includes('fb') || qLower.includes('facebook')) targetPlatforms.push('facebook');
      if (qLower.includes('dc') || qLower.includes('discord')) targetPlatforms.push('discord');
      if (qLower.includes('li') || qLower.includes('linkedin')) targetPlatforms.push('linkedin');
      if (qLower.includes('re') || qLower.includes('reddit')) targetPlatforms.push('reddit');
      if (qLower.includes('arattai')) targetPlatforms.push('arattai');

      const keywords = qLower
        .replace(/wa|te|fb|dc|li|re|group|groups|link|links|business|service|repair|near\s*me/g, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      const matchedGroups = INITIAL_GROUPS.filter((g) => {
        if (targetPlatforms.length > 0 && !targetPlatforms.includes(g.platform)) {
          return false;
        }
        if (keywords.length === 0) return true;
        const target = `${g.name} ${g.description} ${g.category} ${g.city || ''} ${g.area || ''} ${g.state || ''}`.toLowerCase();
        return keywords.some((kw) => target.includes(kw));
      });

      const totalMatches = matchedBusinesses.length + matchedGroups.length;

      let replyText = '';
      if (totalMatches === 0) {
        replyText = `No exact matches found for "${userText}". Try searching with your Area Name (e.g. T. Nagar), 6-Digit Pincode (e.g. 600017) or City (e.g. Chennai).`;
      } else {
        replyText = `Found ${totalMatches} result(s) (${matchedBusinesses.length} business & ${matchedGroups.length} group links):`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: userText },
        {
          sender: 'bot',
          text: replyText,
          businessResults: matchedBusinesses.slice(0, 5),
          groupResults: matchedGroups.slice(0, 5),
        },
      ]);
    } finally {
      setIsSearching(false);
      setInputQuery('');
    }
  };

  const samplePrompts = [
    'AC Service in T Nagar 600017 Chennai',
    'Wedding Photographer 560001 Bangalore',
    'B2B Wholesale Peenya 560058',
    'upsc exam whatsapp group tamil nadu',
    'Caterers & Bakers in Mumbai 400001',
  ];

  return (
    <div className="flex flex-col h-[560px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
      {/* Bot Header */}
      <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-emerald-400 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>AI Business &amp; Group Assistant</span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </h3>
            <p className="text-[10px] text-slate-400">
              Query-based search with Area Name, Pincode &amp; City
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            type="button"
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors text-xs font-bold flex items-center gap-1 border border-slate-700 cursor-pointer"
            title="Close Assistant"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* AI Search Engine Tip Notification Strip */}
      <div className="px-4 py-2 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-emerald-500/10 border-b border-purple-500/20 flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
        <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0 animate-pulse" />
        <span>
          <strong className="text-purple-600 dark:text-purple-400 font-bold">AI Tip:</strong> Enter <strong>Area Name</strong>, <strong>Pincode</strong> (e.g. 600017) and <strong>City</strong> to get business search faster in AI.
        </span>
      </div>

      {/* Messages Chat Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm whitespace-pre-line ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-br-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>
            </div>

            {/* Businesses results */}
            {m.businessResults && m.businessResults.length > 0 && (
              <div className="w-full space-y-2 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Matching Businesses &amp; Services ({m.businessResults.length})</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {m.businessResults.map((biz) => (
                    <BusinessCard key={biz.id} business={biz} viewMode="list" />
                  ))}
                </div>
              </div>
            )}

            {/* Group results */}
            {m.groupResults && m.groupResults.length > 0 && (
              <div className="w-full space-y-2 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5" />
                  <span>Matching Community Groups ({m.groupResults.length})</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {m.groupResults.map((g) => (
                    <GroupCard key={g.id} group={g} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
          Try AI Search:
        </span>
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => processQuery(prompt)}
            className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-purple-500 hover:text-purple-600 font-medium transition-colors text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          processQuery(inputQuery);
        }}
        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Enter area name, pincode or service (e.g. T. Nagar 600017 Dentist)..."
          className="flex-grow text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="p-2.5 rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md font-bold cursor-pointer disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
