'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Store,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Mail,
  Zap,
  Sparkles,
  Building2,
  KeyRound,
  Phone,
  UserPlus,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { setStoredUser } from '@/lib/auth';
import { UserRole } from '@/lib/types';

export type LoginRole = 'user' | 'seller' | 'group_admin';
export type AuthMode = 'login' | 'register';

interface RoleConfig {
  id: LoginRole;
  label: string;
  badge: string;
  headline: string;
  tagline: string;
  leftTitle: string;
  leftDescription: string;
  statNumber: string;
  statLabel: string;
  defaultEmail: string;
  defaultName: string;
  roleType: UserRole;
  redirectUrl: string;
  colorScheme: {
    tabActive: string;
    tabInactive: string;
    btnGrad: string;
    badgePill: string;
    accentText: string;
  };
}

const ROLE_CONFIGS: Record<LoginRole, RoleConfig> = {
  user: {
    id: 'user',
    label: 'User',
    badge: 'MEMBER / SHOPPER',
    headline: 'Welcome to Nammabus & Groups',
    tagline: 'Access saved local businesses, join verified groups, and track games & rewards.',
    leftTitle: 'Connect with verified businesses & groups.',
    leftDescription: 'Discover trusted local shops, technicians, verified social groups, and play high-speed brain games.',
    statNumber: '25,000+',
    statLabel: 'Active Groups & Local Shops',
    defaultEmail: 'user@nammabus.in',
    defaultName: 'Arun Kumar',
    roleType: 'normal',
    redirectUrl: '/dashboard/user',
    colorScheme: {
      tabActive: 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-500/30',
      tabInactive: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700',
      btnGrad: 'from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500',
      badgePill: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25',
      accentText: 'text-blue-600 dark:text-blue-400',
    },
  },
  seller: {
    id: 'seller',
    label: 'Seller / Merchant',
    badge: 'BUSINESS / SELLER',
    headline: 'Grow Your Business Across India',
    tagline: 'Manage your local business listing, get direct phone calls & WhatsApp customer leads.',
    leftTitle: 'Direct buyer inquiries with ₹0 broker fees.',
    leftDescription: 'List your shop, service, or company. Connect with nearby customers searching in your city & pincode.',
    statNumber: '10,000+',
    statLabel: 'Daily Business Inquiries',
    defaultEmail: 'rajesh.sharma@localbiz.in',
    defaultName: 'Rajesh Sharma (Apex Works)',
    roleType: 'seller',
    redirectUrl: '/dashboard/business',
    colorScheme: {
      tabActive: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/30',
      tabInactive: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700',
      btnGrad: 'from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500',
      badgePill: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
      accentText: 'text-emerald-600 dark:text-emerald-400',
    },
  },
  group_admin: {
    id: 'group_admin',
    label: 'Group Admin',
    badge: 'COMMUNITY CREATOR',
    headline: 'Supercharge Your Community',
    tagline: 'Promote your WhatsApp, Telegram, or Arattai group links and track member clicks.',
    leftTitle: 'Scale your social media community.',
    leftDescription: 'Gain targeted, engaged group members, submit multiple invite links, pin sponsored banners, and monitor daily traffic.',
    statNumber: '1M+',
    statLabel: 'Monthly Directory Visitors',
    defaultEmail: 'creator@grouphub.com',
    defaultName: 'Priya Sundaram (Admin)',
    roleType: 'group_admin',
    redirectUrl: '/dashboard',
    colorScheme: {
      tabActive: 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-500/30',
      tabInactive: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700',
      btnGrad: 'from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500',
      badgePill: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
      accentText: 'text-purple-600 dark:text-purple-400',
    },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [activeRole, setActiveRole] = useState<LoginRole>('user');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regBusinessName, setRegBusinessName] = useState('');
  const [regGroupName, setRegGroupName] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regPlatform, setRegPlatform] = useState('whatsapp');

  const currentRole = ROLE_CONFIGS[activeRole];

  const handleRoleSwitch = (role: LoginRole) => {
    setActiveRole(role);
    setEmail('');
    setPassword('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const isAdmin = email.toLowerCase().includes('admin') || password.trim() === 'admin123';
      if (isAdmin && typeof window !== 'undefined') {
        localStorage.setItem('grouphub_admin_authenticated', 'true');
      }

      const assignedRole: UserRole = isAdmin ? 'admin' : currentRole.roleType;

      setStoredUser({
        id: isAdmin ? 'usr_admin' : `usr_${activeRole}_${Date.now()}`,
        email: email || currentRole.defaultEmail,
        name: isAdmin ? 'Super Admin' : (email.split('@')[0] || currentRole.defaultName),
        role: assignedRole,
        accountType: activeRole,
        businessName: activeRole === 'seller' ? 'Apex Works & Services' : undefined,
        isVip: true,
        freeGroupsCountThisWeek: 0,
        allowedGroupsLimit: 100,
        allowedSponsoredLimit: 10,
        submittedGroupIds: [],
        sponsoredGroupIds: [],
      });

      setLoading(false);
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push(currentRole.redirectUrl);
      }
    }, 350);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPassword) {
      alert('Please fill in Email and Password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setStoredUser({
        id: `usr_${activeRole}_${Date.now()}`,
        email: regEmail,
        name: regName || currentRole.defaultName,
        whatsappNumber: regPhone,
        role: currentRole.roleType,
        accountType: activeRole,
        businessName: activeRole === 'seller' ? (regBusinessName || 'My Business') : undefined,
        isVip: true,
        freeGroupsCountThisWeek: 0,
        allowedGroupsLimit: 100,
        allowedSponsoredLimit: 10,
        submittedGroupIds: [],
        sponsoredGroupIds: [],
      });

      setLoading(false);
      router.push(currentRole.redirectUrl);
    }, 400);
  };

  const handleQuickDemoLogin = (role: LoginRole) => {
    const config = ROLE_CONFIGS[role];
    setLoading(true);

    setTimeout(() => {
      setStoredUser({
        id: `usr_demo_${role}_${Date.now()}`,
        email: config.defaultEmail,
        name: config.defaultName,
        role: config.roleType,
        accountType: role,
        businessName: role === 'seller' ? 'Apex Engineering & Store' : undefined,
        isVip: true,
        freeGroupsCountThisWeek: 0,
        allowedGroupsLimit: 100,
        allowedSponsoredLimit: 10,
        submittedGroupIds: [],
        sponsoredGroupIds: [],
      });

      setLoading(false);
      router.push(config.redirectUrl);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="w-full pt-20 bg-slate-50 dark:bg-slate-950 flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Main Card Container */}
        <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 border border-slate-200 dark:border-slate-800">
          
          {/* ========================================================
              LEFT VISUAL PANEL (Dynamically reflects selected role)
             ======================================================== */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${currentRole.colorScheme.badgePill}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{currentRole.badge}</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  {authMode === 'login' ? 'Instant Sign In' : 'Free Registration'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  {currentRole.leftTitle}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentRole.leftDescription}
                </p>
              </div>

              {/* Dynamic Benefits Bullet Points */}
              <div className="space-y-2.5 pt-2">
                {activeRole === 'user' && (
                  <>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Browse 15+ City Directories &amp; 40+ Service Categories</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Bookmark Verified WhatsApp &amp; Arattai Communities</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Play 30 Browser Brain Games with Global Leaderboards</span>
                    </div>
                  </>
                )}

                {activeRole === 'seller' && (
                  <>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Free Business Profile across All India Directories</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Direct Customer Phone Calls &amp; WhatsApp Inquiries</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Zero Broker Commissions – 100% Free Forever</span>
                    </div>
                  </>
                )}

                {activeRole === 'group_admin' && (
                  <>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Submit Multiple WhatsApp, Telegram &amp; Arattai Links</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Live Member Click &amp; Impression Analytics</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Sponsored Top Spots &amp; Daily Community Bumps</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Platform Stat Badge */}
            <div className="relative z-10 pt-6 border-t border-slate-800/80 mt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-lg font-black text-white">
                    {currentRole.statNumber}
                  </div>
                  <p className="text-xs text-slate-400">
                    {currentRole.statLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT FORM PANEL (Role Switcher + Sign In / Register Tabs)
             ======================================================== */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
            
            {/* AUTH MODE TOGGLE: Sign In vs Register / Sign Up */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-6">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  authMode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  authMode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <UserPlus className="w-4 h-4 text-emerald-500" />
                <span>Register / Sign Up</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black">
                  FREE
                </span>
              </button>
            </div>

            {/* ROLE SWITCHER TABS (User | Seller | Group Admin) */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Select Account Type:
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  Switch anytime below
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                {(['user', 'seller', 'group_admin'] as LoginRole[]).map((roleKey) => {
                  const cfg = ROLE_CONFIGS[roleKey];
                  const isActive = activeRole === roleKey;
                  return (
                    <button
                      key={roleKey}
                      type="button"
                      onClick={() => handleRoleSwitch(roleKey)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isActive ? cfg.colorScheme.tabActive : cfg.colorScheme.tabInactive
                      }`}
                    >
                      {roleKey === 'user' && <User className="w-3.5 h-3.5" />}
                      {roleKey === 'seller' && <Store className="w-3.5 h-3.5" />}
                      {roleKey === 'group_admin' && <Users className="w-3.5 h-3.5" />}
                      <span>{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Role Header */}
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black border uppercase tracking-wider ${currentRole.colorScheme.badgePill}`}>
                  {currentRole.label} Mode
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  {authMode === 'login' ? '• Sign In' : '• Instant Registration'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {authMode === 'login' ? currentRole.headline : `Create ${currentRole.label} Account`}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentRole.tagline}
              </p>
            </div>

            {/* ========================================================
                MODE 1: SIGN IN FORM
               ======================================================== */}
            {authMode === 'login' ? (
              <>
                <form className="space-y-4" onSubmit={handleLogin}>
                  {/* Email/Phone Input */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="email">
                      {activeRole === 'seller' ? 'Business Email or Phone' : activeRole === 'group_admin' ? 'Admin Email or WhatsApp' : 'Email or Phone Number'}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        id="email"
                        placeholder={currentRole.defaultEmail}
                        required
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="password">
                      Account Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        id="password"
                        placeholder="••••••••"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot Password */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Remember me</span>
                    </label>
                    <a className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors" href="#">
                      Forgot password?
                    </a>
                  </div>

                  {/* Primary Role-Aware Log In Button */}
                  <button
                    className={`w-full py-3.5 px-4 rounded-xl bg-gradient-to-r ${currentRole.colorScheme.btnGrad} text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95`}
                    type="submit"
                    disabled={loading}
                  >
                    <span>{loading ? 'Signing in...' : `Log In as ${currentRole.label}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* QUICK 1-CLICK DEMO LOGIN */}
                <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Instant Testing Mode?</span>
                    <span className="font-mono text-slate-400 truncate max-w-[200px]">
                      {currentRole.defaultEmail}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(activeRole)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>⚡ 1-Click {currentRole.label} Test Login</span>
                  </button>
                </div>
              </>
            ) : (
              /* ========================================================
                  MODE 2: REGISTRATION / SIGN UP FORM
                 ======================================================== */
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Full Name *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Arun Kumar / Rajesh"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      WhatsApp / Mobile *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </span>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Role Specific Additional Fields */}
                {activeRole === 'seller' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        Shop / Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regBusinessName}
                        onChange={(e) => setRegBusinessName(e.target.value)}
                        placeholder="e.g. Apex Engineering Works"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold border border-emerald-300 dark:border-emerald-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        placeholder="e.g. Chennai, Pune, Bangalore"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold border border-emerald-300 dark:border-emerald-700"
                      />
                    </div>
                  </div>
                )}

                {activeRole === 'group_admin' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/50 dark:border-purple-800/40">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-purple-900 dark:text-purple-200">
                        Primary Group / Channel Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regGroupName}
                        onChange={(e) => setRegGroupName(e.target.value)}
                        placeholder="e.g. Tech Founders India"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold border border-purple-300 dark:border-purple-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-purple-900 dark:text-purple-200">
                        Community Platform
                      </label>
                      <select
                        value={regPlatform}
                        onChange={(e) => setRegPlatform(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold border border-purple-300 dark:border-purple-700 cursor-pointer"
                      >
                        <option value="whatsapp">WhatsApp Community</option>
                        <option value="telegram">Telegram Channel</option>
                        <option value="arattai">Arattai (by Zoho)</option>
                        <option value="instagram">Instagram Broadcast</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Create Password *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 px-4 rounded-xl bg-gradient-to-r ${currentRole.colorScheme.btnGrad} text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95 disabled:opacity-70`}
                >
                  <span>{loading ? 'Creating Account...' : `Register & Start as ${currentRole.label} (Free ₹0)`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Toggle Mode Bottom Shortcut */}
            <div className="text-center text-xs mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {authMode === 'login' ? (
                <p className="text-slate-500">
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    Register free now →
                  </button>
                </p>
              ) : (
                <p className="text-slate-500">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                  >
                    Sign in to your account →
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
