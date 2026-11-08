'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile, UserRole } from '@/lib/types';
import { storeUser } from '@/lib/auth';
import { SAFE_COUNTRIES, INDIAN_STATES, INDIAN_UNION_TERRITORIES } from '@/lib/data';
import {
  X,
  Mail,
  ShieldCheck,
  CheckCircle,
  Zap,
  ArrowRight,
  Lock,
  User,
  Store,
  Users,
  Phone,
  MapPin,
  UserPlus,
  KeyRound,
  Info,
} from 'lucide-react';

export type LoginModalRole = 'user' | 'seller' | 'group_admin';

interface LoginModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: UserProfile) => void;
  initialRole?: LoginModalRole;
}

interface ModalRoleDetails {
  id: LoginModalRole;
  label: string;
  badge: string;
  title: string;
  sub: string;
  defaultEmail: string;
  defaultName: string;
  redirectUrl: string;
  tabActiveClass: string;
  btnGradClass: string;
  badgeColorClass: string;
}

const MODAL_ROLES: Record<LoginModalRole, ModalRoleDetails> = {
  user: {
    id: 'user',
    label: 'User',
    badge: 'MEMBER',
    title: 'User Login',
    sub: 'Browse directory, saved items & PlayZone games',
    defaultEmail: 'arun.user@example.com',
    defaultName: 'Arun Kumar',
    redirectUrl: '/dashboard/user',
    tabActiveClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500/30',
    btnGradClass: 'from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-black',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  },
  seller: {
    id: 'seller',
    label: 'Seller',
    badge: 'MERCHANT',
    title: 'Seller & Business Login',
    sub: 'Manage merchant listing, customer calls & leads',
    defaultEmail: 'rajesh.sharma@localbiz.in',
    defaultName: 'Rajesh Sharma (Apex Works)',
    redirectUrl: '/dashboard/business',
    tabActiveClass: 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-500/30',
    btnGradClass: 'from-blue-500 via-indigo-500 to-blue-600 text-white font-black',
    badgeColorClass: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  },
  group_admin: {
    id: 'group_admin',
    label: 'Group Admin',
    badge: 'COMMUNITY',
    title: 'Group Admin Login',
    sub: 'Promote WhatsApp, Telegram & Arattai group links',
    defaultEmail: 'creator@grouphub.com',
    defaultName: 'Priya Sundaram (Admin)',
    redirectUrl: '/dashboard',
    tabActiveClass: 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-500/30',
    btnGradClass: 'from-purple-500 via-indigo-500 to-purple-600 text-white font-black',
    badgeColorClass: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  },
};

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen = true,
  onClose,
  onLoginSuccess,
  initialRole = 'user',
}) => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<LoginModalRole>(initialRole);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Tamil Nadu');
  const [city, setCity] = useState('Chennai');

  if (!isOpen) return null;

  const currentRoleCfg = MODAL_ROLES[selectedRole];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const isAdmin =
      email.trim().toLowerCase() === 'admin@grouphub.com' || password.trim() === 'admin123';

    let userRole: UserRole = 'normal';
    if (isAdmin) {
      userRole = 'admin';
      if (typeof window !== 'undefined') {
        localStorage.setItem('grouphub_admin_authenticated', 'true');
      }
    } else if (selectedRole === 'seller') {
      userRole = 'seller';
    } else if (selectedRole === 'group_admin') {
      userRole = 'group_admin';
    } else {
      userRole = 'normal';
    }

    const registeredUser: UserProfile = {
      id: isAdmin ? 'usr_admin' : `usr_${selectedRole}_${Date.now()}`,
      email: email.trim(),
      name: isAdmin ? 'Super Admin' : (name.trim() || email.split('@')[0] || currentRoleCfg.defaultName),
      whatsappNumber: whatsappNumber.trim() || '+91 98765 43210',
      country: country || 'India',
      state: state || 'Tamil Nadu',
      city: city || 'Chennai',
      role: userRole,
      accountType: selectedRole,
      businessName: selectedRole === 'seller' ? (name.trim() || 'My Business') : undefined,
      isVip: true,
      vipExpiresAt: '19 August 2027',
      freeGroupsCountThisWeek: 0,
      allowedGroupsLimit: 100,
      allowedSponsoredLimit: 10,
      submittedGroupIds: [],
      sponsoredGroupIds: [],
    };

    storeUser(registeredUser);
    if (onLoginSuccess) onLoginSuccess(registeredUser);
    onClose();

    if (isAdmin) {
      router.push('/admin');
    } else {
      router.push(currentRoleCfg.redirectUrl);
    }
  };

  const handleQuickDemoLogin = (roleKey: LoginModalRole) => {
    const cfg = MODAL_ROLES[roleKey];
    const demoUser: UserProfile = {
      id: `usr_demo_${roleKey}_${Date.now()}`,
      email: cfg.defaultEmail,
      name: cfg.defaultName,
      whatsappNumber: '+91 98765 43210',
      country: 'India',
      state: 'Tamil Nadu',
      city: 'Chennai',
      role: roleKey === 'seller' ? 'seller' : roleKey === 'group_admin' ? 'group_admin' : 'normal',
      accountType: roleKey,
      businessName: roleKey === 'seller' ? 'Apex Engineering Works' : undefined,
      isVip: true,
      vipExpiresAt: '19 August 2027',
      freeGroupsCountThisWeek: 0,
      allowedGroupsLimit: 100,
      allowedSponsoredLimit: 10,
      submittedGroupIds: [],
      sponsoredGroupIds: [],
    };

    storeUser(demoUser);
    if (onLoginSuccess) onLoginSuccess(demoUser);
    onClose();
    router.push(cfg.redirectUrl);
  };

  return (
    <div className="fixed inset-0 z-[300] bg-slate-950/90 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full max-w-lg my-auto rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl space-y-4 text-slate-100 shrink-0">
        
        {/* CLOSE BUTTON AT TOP RIGHT */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer border border-slate-700"
          title="Close Form"
        >
          <span>Close</span>
          <X className="w-4 h-4" />
        </button>

        {/* 1. ROLE SWITCHER TABS: USER | SELLER | GROUP ADMIN */}
        <div className="space-y-1.5 pt-1 pr-14 sm:pr-0">
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
            <span>Select Your Login Role:</span>
            <span className="text-amber-400 font-bold">Switch anytime</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
            {(['user', 'seller', 'group_admin'] as LoginModalRole[]).map((r) => {
              const cfg = MODAL_ROLES[r];
              const isActive = selectedRole === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setSelectedRole(r);
                    setEmail('');
                    setPassword('');
                  }}
                  className={`py-2 px-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isActive ? cfg.tabActiveClass : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {r === 'user' && <User className="w-3.5 h-3.5" />}
                  {r === 'seller' && <Store className="w-3.5 h-3.5" />}
                  {r === 'group_admin' && <Users className="w-3.5 h-3.5" />}
                  <span>{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. MODE SWITCHER: LOGIN vs REGISTER */}
        <div className="flex items-center justify-between gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`w-1/2 py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'login'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Login with Password</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('register')}
            className={`w-1/2 py-2 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'register'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Registration</span>
          </button>
        </div>

        {/* 3. DYNAMIC ROLE HEADER NOTICE */}
        <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-2 ${currentRoleCfg.badgeColorClass}`}>
          <div className="flex items-center gap-2">
            {selectedRole === 'user' && <User className="w-4 h-4 shrink-0 text-emerald-400" />}
            {selectedRole === 'seller' && <Store className="w-4 h-4 shrink-0 text-blue-400" />}
            {selectedRole === 'group_admin' && <Users className="w-4 h-4 shrink-0 text-purple-400" />}
            <div>
              <span className="font-black block">{currentRoleCfg.title}</span>
              <span className="text-[11px] opacity-80">{currentRoleCfg.sub}</span>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 shrink-0">
            {currentRoleCfg.badge}
          </span>
        </div>

        {/* 4. FORM CONTENT */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 block">
                {selectedRole === 'seller' ? 'Business Email or Phone *' : selectedRole === 'group_admin' ? 'Admin Email or WhatsApp *' : 'Email Address *'}
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={currentRoleCfg.defaultEmail}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 block">
                Account Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 block">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300 block">
                    Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full text-[11px] p-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    {SAFE_COUNTRIES.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300 block">
                    State / UT *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-[11px] p-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer"
                  >
                    <optgroup label="States of India (28)">
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Union Territories of India (8)">
                      {INDIAN_UNION_TERRITORIES.map((ut) => (
                        <option key={ut} value={ut}>
                          {ut}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300 block">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Chennai"
                    className="w-full text-[11px] p-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 block">
                  {selectedRole === 'seller' ? 'Business / Company Name (Optional)' : 'Full Name (Optional)'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={selectedRole === 'seller' ? 'e.g. Apex Works' : 'e.g. Arun Kumar'}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-xl text-xs font-black bg-gradient-to-r ${currentRoleCfg.btnGradClass} shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 hover:scale-[1.01] active:scale-95`}
          >
            <span>{mode === 'login' ? `LOG IN AS ${currentRoleCfg.label.toUpperCase()} →` : `REGISTER AS ${currentRoleCfg.label.toUpperCase()} →`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 5. 1-CLICK INSTANT DEMO LOGIN */}
        <div className="pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin(selectedRole)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>⚡ 1-Click {currentRoleCfg.label} Test Login ({currentRoleCfg.defaultEmail})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
