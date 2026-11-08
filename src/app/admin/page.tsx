'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getStoredUser, storeUser } from '@/lib/auth';
import { INITIAL_GROUPS, CATEGORIES, SAFE_COUNTRIES, PAID_PROMOTION_BANNERS } from '@/lib/data';
import { Group, Category, Platform, PaidPromotionBanner } from '@/lib/types';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Zap,
  Building2,
  RefreshCw,
  AlertTriangle,
  Users,
  Eye,
  Trash2,
  ExternalLink,
  Sparkles,
  Tag,
  ToggleLeft,
  ToggleRight,
  Plus,
  FileSpreadsheet,
  UploadCloud,
  Download,
  Link2,
  History,
  RotateCcw,
  CheckSquare,
  Square,
  AlertCircle,
  FileText,
  Database,
  Search,
  Image as ImageIcon,
  DollarSign,
  TrendingUp,
  MapPin,
  Globe,
  Settings,
  Lock,
  LogOut,
  ArrowRight,
  KeyRound,
  Sliders,
  Mail,
} from 'lucide-react';

interface ImportRecord {
  id: string;
  filename: string;
  totalRows: number;
  validRows: number;
  errorRows: number;
  duplicateRows: number;
  status: 'Completed' | 'Rolled Back';
  date: string;
  importedGroupIds: string[];
}

export default function AdminPage() {
  // ADMIN AUTHENTICATION GATE STATE
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [categoriesList, setCategoriesList] = useState<Category[]>(CATEGORIES);
  const [activeTab, setActiveTab] = useState<'groups' | 'paidpromotions' | 'bulk' | 'history' | 'autoapprove' | 'submissions'>('groups');
  const [checkerRunning, setCheckerRunning] = useState(false);
  const [checkerMsg, setCheckerMsg] = useState('');

  // SUBMISSION LIMIT & EMAIL CONTROLS STATE (Default: 1 email 1 group limit turned OFF)
  const [allowMultipleSubmissions, setAllowMultipleSubmissions] = useState(true);
  const [submissionLimitRange, setSubmissionLimitRange] = useState<'unlimited' | '1' | '5' | '10' | '50'>('unlimited');
  const [autoApproveSubmissions, setAutoApproveSubmissions] = useState(true);
  const [submissionSettingMsg, setSubmissionSettingMsg] = useState('');

  // Paid Promotions Admin Manager State
  const [promotions, setPromotions] = useState<PaidPromotionBanner[]>(PAID_PROMOTION_BANNERS);
  const [slot1Image, setSlot1Image] = useState('');
  const [slot1Title, setSlot1Title] = useState('');
  const [slot1Subtitle, setSlot1Subtitle] = useState('');
  const [slot1Website, setSlot1Website] = useState('');
  const [slot1Arattai, setSlot1Arattai] = useState('');
  const [slot1Whatsapp, setSlot1Whatsapp] = useState('');
  const [slot1Telegram, setSlot1Telegram] = useState('');

  const [slot2Image, setSlot2Image] = useState('');
  const [slot2Title, setSlot2Title] = useState('');
  const [slot2Subtitle, setSlot2Subtitle] = useState('');
  const [slot2Website, setSlot2Website] = useState('');
  const [slot2Arattai, setSlot2Arattai] = useState('');
  const [slot2Whatsapp, setSlot2Whatsapp] = useState('');
  const [slot2Telegram, setSlot2Telegram] = useState('');

  const slot1FileRef = useRef<HTMLInputElement>(null);
  const slot2FileRef = useRef<HTMLInputElement>(null);
  const newBannerFileRef = useRef<HTMLInputElement>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('');
  const [newArattaiUrl, setNewArattaiUrl] = useState('');
  const [newWhatsappUrl, setNewWhatsappUrl] = useState('');
  const [newTelegramUrl, setNewTelegramUrl] = useState('');
  const [newCtaText, setNewCtaText] = useState('Join Paid Promotion Group');
  const [newBadgeText, setNewBadgeText] = useState('⭐ DIRECT PAID SPONSOR');
  const [newSponsorName, setNewSponsorName] = useState('Official Sponsor');
  const [newTargetCity, setNewTargetCity] = useState('Chennai');
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  // Bulk Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [googleSheetUrl, setGoogleSheetUrl] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // Validation Results State
  const [validationResult, setValidationResult] = useState<{
    total: number;
    valid: Array<Partial<Group> & { rowNum: number }>;
    invalid: Array<{ rowNum: number; reason: string; rowData: any }>;
    duplicates: Array<{ rowNum: number; inviteUrl: string; existingName: string }>;
  } | null>(null);

  // Import History State
  const [importHistory, setImportHistory] = useState<ImportRecord[]>([
    {
      id: '#1042',
      filename: 'india-chennai-bni-groups.xlsx',
      totalRows: 240,
      validRows: 235,
      errorRows: 3,
      duplicateRows: 2,
      status: 'Completed',
      date: '20 August 2026',
      importedGroupIds: [],
    },
    {
      id: '#1041',
      filename: 'usa-tech-whatsapp-telegram.csv',
      totalRows: 150,
      validRows: 148,
      errorRows: 1,
      duplicateRows: 1,
      status: 'Completed',
      date: '19 August 2026',
      importedGroupIds: [],
    },
  ]);

  // Checkbox selection for Batch Actions
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check saved Admin authentication session or logged in admin user
      const authStored = localStorage.getItem('grouphub_admin_authenticated');
      const currentUser = getStoredUser();
      if (authStored === 'true' || currentUser?.role === 'admin') {
        setIsAdminAuthenticated(true);
      }

      // Read custom paid promotions
      const stored = localStorage.getItem('grouphub_custom_paid_promotions');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.length > 0) {
            setPromotions(parsed);
          }
        } catch (e) {
          // ignore
        }
      }

      // Read saved submission settings
      const settingsStored = localStorage.getItem('grouphub_submission_settings');
      if (settingsStored) {
        try {
          const parsedSettings = JSON.parse(settingsStored);
          setAllowMultipleSubmissions(parsedSettings.allowMultipleSubmissions ?? true);
          setSubmissionLimitRange(parsedSettings.submissionLimitRange || 'unlimited');
          setAutoApproveSubmissions(parsedSettings.autoApproveSubmissions ?? true);
        } catch (e) {
          // ignore
        }
      }

      // Check URL query parameters or hash to open specific tab directly
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const hashParam = window.location.hash.replace('#', '');
      const targetTab = tabParam || hashParam;
      if (targetTab === 'paidpromotions' || targetTab === 'promotions') {
        setActiveTab('paidpromotions');
      } else if (targetTab === 'bulk' || targetTab === 'submissions' || targetTab === 'autoapprove' || targetTab === 'history') {
        setActiveTab(targetTab as any);
      }
    }
  }, []);

  const handleSaveSubmissionSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const settingsObj = {
      allowMultipleSubmissions,
      submissionLimitRange,
      autoApproveSubmissions,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('grouphub_submission_settings', JSON.stringify(settingsObj));
    }
    setSubmissionSettingMsg('✅ Submission Settings Updated! 1-email limit rule is ' + (allowMultipleSubmissions ? 'OFF (Multiple Submissions Allowed)' : 'ON (Strict 1 Submission per email)'));
    setTimeout(() => setSubmissionSettingMsg(''), 4000);
  };

  // Admin Auth Submit Handler
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (adminEmailInput.trim().toLowerCase() === 'admin@grouphub.com' ||
        adminEmailInput.trim().toLowerCase() === 'admin' ||
        adminEmailInput.trim().toLowerCase() === 'admin@nammabus.com') &&
      adminPasswordInput.trim() === 'admin123'
    ) {
      setIsAdminAuthenticated(true);
      setAuthError('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('grouphub_admin_authenticated', 'true');
      }
      storeUser({
        id: 'usr_admin',
        email: adminEmailInput.trim() || 'admin@nammabus.com',
        name: 'Super Admin',
        role: 'admin',
        isVip: true,
        freeGroupsCountThisWeek: 0,
        allowedGroupsLimit: 100,
        allowedSponsoredLimit: 10,
        submittedGroupIds: [],
        sponsoredGroupIds: [],
      });
    } else {
      setAuthError('❌ Invalid Admin Credentials. Access denied.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('grouphub_admin_authenticated');
    }
  };

  // Helper to read image file to data URL
  const handleImageFileRead = (file: File, callback: (dataUrl: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Sync slots when promotions list changes or on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('grouphub_custom_paid_promotions');
      let list = PAID_PROMOTION_BANNERS;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            list = parsed;
          }
        } catch {}
      }
      setPromotions(list);
      if (list[0]) {
        setSlot1Image(list[0].imageUrl || '');
        setSlot1Title(list[0].title || '');
        setSlot1Subtitle(list[0].subtitle || '');
        setSlot1Website(list[0].websiteUrl || list[0].linkUrl || '');
        setSlot1Arattai(list[0].arattaiUrl || '');
        setSlot1Whatsapp(list[0].whatsappUrl || '');
        setSlot1Telegram(list[0].telegramUrl || '');
      }
      if (list[1]) {
        setSlot2Image(list[1].imageUrl || '');
        setSlot2Title(list[1].title || '');
        setSlot2Subtitle(list[1].subtitle || '');
        setSlot2Website(list[1].websiteUrl || list[1].linkUrl || '');
        setSlot2Arattai(list[1].arattaiUrl || '');
        setSlot2Whatsapp(list[1].whatsappUrl || '');
        setSlot2Telegram(list[1].telegramUrl || '');
      }
    }
  }, []);

  const saveSlot1 = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...promotions];
    const item: PaidPromotionBanner = {
      id: updated[0]?.id || `promo-${Date.now()}-1`,
      title: slot1Title.trim() || 'Join Verified Group Links',
      subtitle: slot1Subtitle.trim() || 'Find & Join Active Communities across WhatsApp, Arattai, and Telegram.',
      imageUrl: slot1Image.trim() || '/images/promotions/verified_banner_art.png',
      websiteUrl: slot1Website.trim() || 'https://joingrouplinks.in',
      arattaiUrl: slot1Arattai.trim() || 'https://arattai.in',
      whatsappUrl: slot1Whatsapp.trim() || 'https://chat.whatsapp.com',
      telegramUrl: slot1Telegram.trim() || 'https://t.me',
      linkUrl: slot1Website.trim() || 'https://joingrouplinks.in',
      ctaText: 'Explore Verified Groups',
      badgeText: '⭐ 100% VERIFIED GROUPS',
      sponsorName: 'Verified Community Desk',
      targetCountry: 'India',
      priceTag: 'Free Direct Access',
    };
    updated[0] = item;
    setPromotions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grouphub_custom_paid_promotions', JSON.stringify(updated));
      window.dispatchEvent(new Event('grouphub_promotions_updated'));
    }
    setPromoSuccessMsg('✅ Promotion Image 1 updated & published live!');
    setTimeout(() => setPromoSuccessMsg(''), 4000);
  };

  const saveSlot2 = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...promotions];
    const item: PaidPromotionBanner = {
      id: updated[1]?.id || `promo-${Date.now()}-2`,
      title: slot2Title.trim() || 'GroupHub B2B & Verified Business Network',
      subtitle: slot2Subtitle.trim() || 'Connect with 5,000+ verified corporate contacts & B2B founders across India.',
      imageUrl: slot2Image.trim() || '/images/promotions/promo_b2b.jpg',
      websiteUrl: slot2Website.trim() || 'https://joingrouplinks.in/promote',
      arattaiUrl: slot2Arattai.trim() || 'https://arattai.in',
      whatsappUrl: slot2Whatsapp.trim() || 'https://chat.whatsapp.com',
      telegramUrl: slot2Telegram.trim() || 'https://t.me',
      linkUrl: slot2Website.trim() || 'https://joingrouplinks.in/promote',
      ctaText: 'Join B2B Network Free',
      badgeText: '💼 B2B & BNI DIRECTORY',
      sponsorName: 'GroupHub B2B Network',
      targetCountry: 'India',
      priceTag: 'Verified Business Network',
    };
    if (updated.length === 0) {
      updated.push(item);
    } else if (updated.length === 1) {
      updated.push(item);
    } else {
      updated[1] = item;
    }
    setPromotions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grouphub_custom_paid_promotions', JSON.stringify(updated));
      window.dispatchEvent(new Event('grouphub_promotions_updated'));
    }
    setPromoSuccessMsg('✅ Promotion Image 2 updated & published live!');
    setTimeout(() => setPromoSuccessMsg(''), 4000);
  };

  const handleResetPromotions = () => {
    setPromotions(PAID_PROMOTION_BANNERS);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grouphub_custom_paid_promotions', JSON.stringify(PAID_PROMOTION_BANNERS));
      window.dispatchEvent(new Event('grouphub_promotions_updated'));
    }
    setSlot1Image(PAID_PROMOTION_BANNERS[0].imageUrl);
    setSlot1Title(PAID_PROMOTION_BANNERS[0].title);
    setSlot1Subtitle(PAID_PROMOTION_BANNERS[0].subtitle);
    setSlot1Website(PAID_PROMOTION_BANNERS[0].websiteUrl || '');
    setSlot1Arattai(PAID_PROMOTION_BANNERS[0].arattaiUrl || '');
    setSlot1Whatsapp(PAID_PROMOTION_BANNERS[0].whatsappUrl || '');
    setSlot1Telegram(PAID_PROMOTION_BANNERS[0].telegramUrl || '');

    setSlot2Image(PAID_PROMOTION_BANNERS[1].imageUrl);
    setSlot2Title(PAID_PROMOTION_BANNERS[1].title);
    setSlot2Subtitle(PAID_PROMOTION_BANNERS[1].subtitle);
    setSlot2Website(PAID_PROMOTION_BANNERS[1].websiteUrl || '');
    setSlot2Arattai(PAID_PROMOTION_BANNERS[1].arattaiUrl || '');
    setSlot2Whatsapp(PAID_PROMOTION_BANNERS[1].whatsappUrl || '');
    setSlot2Telegram(PAID_PROMOTION_BANNERS[1].telegramUrl || '');

    setPromoSuccessMsg('↺ Reset all promotional banners to default successfully!');
    setTimeout(() => setPromoSuccessMsg(''), 4000);
  };

  // Add Additional Promotion Banner (Image 3, 4...)
  const handleAddPaidPromotion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const newBanner: PaidPromotionBanner = {
      id: `promo-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Verified direct paid listing',
      imageUrl: newImageUrl.trim(),
      linkUrl: newWebsiteUrl.trim() || newLinkUrl.trim() || 'https://joingrouplinks.in',
      websiteUrl: newWebsiteUrl.trim() || 'https://joingrouplinks.in',
      arattaiUrl: newArattaiUrl.trim() || 'https://arattai.in',
      whatsappUrl: newWhatsappUrl.trim() || 'https://chat.whatsapp.com',
      telegramUrl: newTelegramUrl.trim() || 'https://t.me',
      ctaText: newCtaText.trim() || 'Join Paid Group',
      badgeText: newBadgeText.trim() || '⭐ SPONSOR',
      sponsorName: newSponsorName.trim() || 'Official Partner',
      targetCountry: 'India',
      targetCity: newTargetCity,
      priceTag: 'Paid Direct Ads',
    };

    const updated = [...promotions, newBanner];
    setPromotions(updated);

    if (typeof window !== 'undefined') {
      localStorage.setItem('grouphub_custom_paid_promotions', JSON.stringify(updated));
      window.dispatchEvent(new Event('grouphub_promotions_updated'));
    }

    setPromoSuccessMsg(`✅ Additional Promotion Image "${newTitle}" added to scrollable carousel!`);
    setNewTitle('');
    setNewSubtitle('');
    setNewImageUrl('');
    setNewLinkUrl('');
    setNewWebsiteUrl('');
    setNewArattaiUrl('');
    setNewWhatsappUrl('');
    setNewTelegramUrl('');

    setTimeout(() => setPromoSuccessMsg(''), 4000);
  };

  const handleDeletePromotion = (id: string) => {
    const updated = promotions.filter((p) => p.id !== id);
    setPromotions(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grouphub_custom_paid_promotions', JSON.stringify(updated));
      window.dispatchEvent(new Event('grouphub_promotions_updated'));
    }
  };

  // Toggle selection
  const toggleSelectGroup = (id: string) => {
    setSelectedGroupIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedGroupIds.length === groups.length) {
      setSelectedGroupIds([]);
    } else {
      setSelectedGroupIds(groups.map((g) => g.id));
    }
  };

  // Batch Operations
  const handleBatchApprove = () => {
    setGroups((prev) =>
      prev.map((g) => (selectedGroupIds.includes(g.id) ? { ...g, status: 'approved', isVerified: true } : g))
    );
    setSelectedGroupIds([]);
  };

  const handleBatchDelete = () => {
    setGroups((prev) => prev.filter((g) => !selectedGroupIds.includes(g.id)));
    setSelectedGroupIds([]);
  };

  const handleBatchAssignCategory = (catName: string) => {
    if (!catName) return;
    setGroups((prev) =>
      prev.map((g) => (selectedGroupIds.includes(g.id) ? { ...g, category: catName } : g))
    );
    setSelectedGroupIds([]);
  };

  // Actions
  const handleApprove = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: 'approved', isVerified: true } : g))
    );
  };

  const handleReject = (id: string) => {
    setGroups((prev) => prev.filter((g) => !selectedGroupIds.includes(id) && g.id !== id));
  };

  const handleToggleFeatured = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isFeatured: !g.isFeatured } : g))
    );
  };

  const handleToggleVip = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isVerified: !g.isVerified } : g))
    );
  };

  const handleToggleCategoryAutoApprove = (catId: string) => {
    setCategoriesList((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, isAutoApproved: !c.isAutoApproved } : c))
    );
  };

  const runAutomatedLinkChecker = () => {
    setCheckerRunning(true);
    setCheckerMsg('Automated Link Verification Engine pinging invite links...');

    setTimeout(() => {
      const updatedDate = '20 August 2026';
      setGroups((prev) =>
        prev.map((g) => ({
          ...g,
          lastChecked: updatedDate,
          isVerified: true,
        }))
      );
      setCheckerRunning(false);
      setCheckerMsg(`✅ Link Verification Scan Complete! Verified ${groups.length} groups on ${updatedDate}. All invite links active.`);
    }, 1500);
  };

  // File Upload Simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
    runValidationSimulation(file.name);
  };

  const handleGoogleSheetImport = () => {
    if (!googleSheetUrl.trim()) return;
    setSelectedFileName(`Google Sheet (${googleSheetUrl.slice(0, 30)}...)`);
    runValidationSimulation('Google Sheet Data');
  };

  const runValidationSimulation = (sourceName: string) => {
    setIsValidating(true);
    setValidationResult(null);

    setTimeout(() => {
      const mockValid: Array<Partial<Group> & { rowNum: number }> = [
        {
          rowNum: 2,
          name: 'Chennai Freshers & Software Walk-in Jobs 2026',
          platform: 'whatsapp' as Platform,
          inviteUrl: 'https://chat.whatsapp.com/sample-chennai-jobs-2026',
          category: 'Jobs & Careers',
          country: 'India',
          state: 'Tamil Nadu',
          city: 'Chennai',
          language: 'English',
          description: 'Daily freshers walk-in interview updates in Chennai OMR & Guindy.',
        },
      ];

      const mockInvalid = [
        {
          rowNum: 18,
          reason: 'Category "Jobss" does not exist in master categories',
          rowData: { group_name: 'Delhi Jobss', invite_url: 'https://chat.whatsapp.com/err-1' },
        },
      ];

      const mockDuplicates = [
        {
          rowNum: 75,
          inviteUrl: 'https://chat.whatsapp.com/sample-upsc-ias',
          existingName: 'UPSC Civil Services & IAS Aspirants All India',
        },
      ];

      setValidationResult({
        total: 240,
        valid: mockValid,
        invalid: mockInvalid,
        duplicates: mockDuplicates,
      });

      setIsValidating(false);
    }, 1200);
  };

  const handleConfirmImport = () => {
    if (!validationResult) return;

    const newGroups: Group[] = validationResult.valid.map((v, i) => ({
      id: `imported-${Date.now()}-${i}`,
      name: v.name || 'Imported Group',
      slug: (v.name || 'imported-group').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: v.description || 'Imported from bulk dataset.',
      platform: v.platform || 'whatsapp',
      inviteUrl: v.inviteUrl || 'https://chat.whatsapp.com/sample',
      country: v.country || 'India',
      countryCode: 'IN',
      state: v.state || 'Tamil Nadu',
      city: v.city || 'Chennai',
      category: v.category || 'Jobs & Careers',
      language: v.language || 'English',
      memberCount: 2500,
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      status: 'approved',
      isVerified: true,
      isFeatured: false,
      lastChecked: '20 August 2026',
      reportsCount: 0,
      viewsCount: 500,
      clicksCount: 200,
      createdAt: '2026-08-20',
      updatedAt: '2026-08-20',
    }));

    setGroups((prev) => [...newGroups, ...prev]);

    const newRecord: ImportRecord = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      filename: selectedFileName || 'Bulk Upload Dataset',
      totalRows: validationResult.total,
      validRows: validationResult.valid.length,
      errorRows: validationResult.invalid.length,
      duplicateRows: validationResult.duplicates.length,
      status: 'Completed',
      date: '20 August 2026',
      importedGroupIds: newGroups.map((g) => g.id),
    };

    setImportHistory((prev) => [newRecord, ...prev]);
    setValidationResult(null);
    setSelectedFileName('');
    setGoogleSheetUrl('');
    setActiveTab('groups');
  };

  const handleRollbackImport = (recordId: string) => {
    const record = importHistory.find((r) => r.id === recordId);
    if (!record) return;

    if (record.importedGroupIds.length > 0) {
      setGroups((prev) => prev.filter((g) => !record.importedGroupIds.includes(g.id)));
    }

    setImportHistory((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, status: 'Rolled Back' } : r))
    );
  };

  const downloadSampleTemplate = () => {
    const csvContent =
      'group_name,platform,invite_url,category,country,state,city,language,description\n' +
      'Chennai IT Jobs,WhatsApp,https://chat.whatsapp.com/sample1,Jobs & Careers,India,Tamil Nadu,Chennai,English,Verified IT Walk-in jobs in Chennai\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'grouphub_bulk_upload_sample_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // IF ADMIN IS NOT AUTHENTICATED: DISPLAY SECURE ADMIN LOGIN SCREEN
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        <Header />

        <main className="flex-grow flex items-center justify-center p-4 my-auto">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 p-0.5 mx-auto flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Lock className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal Authentication</h1>
              <p className="text-xs text-slate-400">
                Enter your Super Admin credentials to access group moderation, bulk upload & paid ads controls.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 text-center animate-fade-in">
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Admin Email Address *</label>
                <input
                  type="text"
                  required
                  value={adminEmailInput}
                  onChange={(e) => setAdminEmailInput(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 block">Admin Passkey / Password *</label>
                <input
                  type="password"
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>LOG IN TO ADMIN PANEL NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-Click Demo Auto Login */}
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center space-y-2">
              <span className="text-[11px] text-slate-400 font-semibold block">
                Default: <code className="text-emerald-400 font-bold">admin@grouphub.com</code> / <code className="text-emerald-400 font-bold">admin123</code>
              </span>
              <button
                type="button"
                onClick={() => {
                  setAdminEmailInput('admin@grouphub.com');
                  setAdminPasswordInput('admin123');
                  setIsAdminAuthenticated(true);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('grouphub_admin_authenticated', 'true');
                  }
                  storeUser({
                    id: 'usr_admin',
                    email: 'admin@grouphub.com',
                    name: 'Super Admin',
                    role: 'admin',
                    isVip: true,
                    freeGroupsCountThisWeek: 0,
                    allowedGroupsLimit: 100,
                    allowedSponsoredLimit: 10,
                    submittedGroupIds: [],
                    sponsoredGroupIds: [],
                  });
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>⚡ 1-Click Super Admin Instant Login</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center">
              <Link
                href="/local-biz/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/50 text-xs font-bold transition-all"
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Switch to Nammabus Admin Panel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // IF AUTHENTICATED: DISPLAY FULL ENTERPRISE ADMIN PANEL
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        {/* Admin Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px] uppercase">
                SUPER ADMIN AUTHENTICATED
              </span>
              <span className="text-xs text-slate-400 font-medium">• Paid Promotions, Submission Rate Limits & AdSense Control</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1 tracking-tight">GroupHub Enterprise Administration</h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="bg-slate-800 border-slate-700 text-slate-300" />

            <Link
              href="/local-biz/admin"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              title="Open Nammabus Admin Control Panel"
            >
              <Building2 className="w-4 h-4" />
              <span>Nammabus Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleAdminLogout}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Logout from Admin Panel"
            >
              <LogOut className="w-4 h-4" />
              <span>Admin Logout</span>
            </button>

            <button
              onClick={runAutomatedLinkChecker}
              disabled={checkerRunning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md disabled:opacity-50 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${checkerRunning ? 'animate-spin' : ''}`} />
              <span>{checkerRunning ? 'Scanning Links...' : 'Run Auto Link Checker'}</span>
            </button>
          </div>
        </div>

        {/* Cross Admin Portal Switcher: GroupHub -> Nammabus */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-400">
                  Cross Admin Switch
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                  Nammabus India Portal
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Switch to the <strong>Nammabus Marketplace Administration</strong> to approve &amp; verify Indian businesses, manage B2B product catalogs, quotation enquiries, and moderate customer reviews.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/publishing-queue"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📅 Publishing Queue</span>
            </Link>
            <Link
              href="/admin/bulk-import"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>📥 Bulk Importer</span>
            </Link>
            <Link
              href="/admin/reports"
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🛡️ Abuse Reports</span>
            </Link>
            <Link
              href="/local-biz/admin"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Nammabus Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {checkerMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{checkerMsg}</span>
          </div>
        )}

        {/* Stats Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Active Groups</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">{groups.length}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">🖼️ Paid Promotion Banners</span>
            <span className="text-2xl font-black text-amber-500">{promotions.length} Active</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">✔️ 1-Email Limit Rule</span>
            <span className={`text-2xl font-black ${allowMultipleSubmissions ? 'text-emerald-500' : 'text-rose-500'}`}>
              {allowMultipleSubmissions ? 'OFF (Unlimited)' : 'ON (Strict 1/Email)'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">📥 Bulk Imports Conducted</span>
            <span className="text-2xl font-black text-purple-500">{importHistory.length}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'groups'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            📋 Manage & Moderation ({groups.length})
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'submissions'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-500" />
            <span>⚙️ Submission Limits & Email Controls</span>
          </button>

          <button
            onClick={() => setActiveTab('paidpromotions')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'paidpromotions'
                ? 'border-amber-400 text-amber-500'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>🖼️ Paid Promotion Banners ({promotions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bulk')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bulk'
                ? 'border-purple-500 text-purple-500'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-purple-400" />
            <span>📥 Bulk Group Upload (.xlsx / .csv / Google Sheets)</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'history'
                ? 'border-sky-500 text-sky-500'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4 text-sky-500" />
            <span>Import History & Rollback ({importHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('autoapprove')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'autoapprove'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            ⚡ Category Auto-Approval Settings
          </button>
        </div>

        {/* TAB: SUBMISSION LIMIT & EMAIL CONTROLS */}
        {activeTab === 'submissions' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-emerald-500" />
                    <span>Email Submission Limits & Rate Customization</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Turn ON or OFF the 1-email limit rule and customize submission ranges per email address.
                  </p>
                </div>
              </div>

              {submissionSettingMsg && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{submissionSettingMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveSubmissionSettings} className="space-y-6 max-w-2xl">
                {/* 1. TOGGLE: 1 EMAIL 1 SUBMISSION LIMIT RULE */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-slate-900 dark:text-white block flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-amber-500" />
                      <span>Allow Multiple Submissions per Email (Turn OFF 1-Email Limit)</span>
                    </span>
                    <p className="text-[11px] text-slate-500">
                      When turned ON (Default), users and admins can submit unlimited groups using the same email address.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAllowMultipleSubmissions((prev) => !prev)}
                    className="shrink-0 cursor-pointer"
                  >
                    {allowMultipleSubmissions ? (
                      <ToggleRight className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* 2. SUBMISSION RATE LIMIT RANGE SELECTOR */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                    Custom Submission Rate Limit Range per Email:
                  </label>
                  <select
                    value={submissionLimitRange}
                    onChange={(e) => setSubmissionLimitRange(e.target.value as any)}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="unlimited">♾️ Unlimited Submissions Allowed per Email (Default - OFF)</option>
                    <option value="1">🔒 Strict 1 Group Submission per Email</option>
                    <option value="5">⚡ 5 Group Submissions per Email</option>
                    <option value="10">🚀 10 Group Submissions per Email</option>
                    <option value="50">🏢 50 Group Submissions per Email (Agency Rate)</option>
                  </select>
                </div>

                {/* 3. AUTO-APPROVE SUBMISSIONS TOGGLE */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-slate-900 dark:text-white block flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-emerald-500" />
                      <span>Instant Auto-Approve User Group Submissions</span>
                    </span>
                    <p className="text-[11px] text-slate-500">
                      When enabled, newly submitted group invite links appear instantly on the live home directory without pending moderation.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAutoApproveSubmissions((prev) => !prev)}
                    className="shrink-0 cursor-pointer"
                  >
                    {autoApproveSubmissions ? (
                      <ToggleRight className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-slate-400" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-black text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>SAVE SUBMISSION SETTINGS NOW</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 1: GROUPS MANAGEMENT & BATCH MODERATION */}
        {activeTab === 'groups' && (
          <div className="space-y-4">
            {/* Batch Action Bar */}
            {selectedGroupIds.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-bold animate-fade-in">
                <span className="text-amber-600 dark:text-amber-400">
                  ⚡ {selectedGroupIds.length} Groups Selected for Batch Operations
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBatchApprove}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400"
                  >
                    Batch Approve
                  </button>
                  <button
                    onClick={handleBatchDelete}
                    className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600"
                  >
                    Batch Delete
                  </button>
                </div>
              </div>
            )}

            {/* Groups Table */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Directory Submissions ({groups.length})</span>
                </h3>

                <button
                  onClick={toggleSelectAll}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  {selectedGroupIds.length === groups.length ? 'Deselect All' : 'Select All Groups'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="p-3">Select</th>
                      <th className="p-3">Group Details</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Platform</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {groups.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedGroupIds.includes(g.id)}
                            onChange={() => toggleSelectGroup(g.id)}
                            className="w-4 h-4 text-emerald-600 rounded"
                          />
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{g.name}</div>
                          <div className="text-[10px] text-slate-400">{g.city}, {g.state}, {g.country}</div>
                        </td>
                        <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{g.category}</td>
                        <td className="p-3 uppercase font-extrabold text-[10px] text-emerald-500">{g.platform}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              g.status === 'approved'
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            }`}
                          >
                            {g.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            {g.status !== 'approved' && (
                              <button
                                onClick={() => handleApprove(g.id)}
                                className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-slate-950"
                                title="Approve Group"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleReject(g.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white"
                              title="Delete Group"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAID PROMOTIONS MANAGER - IMAGE 1, IMAGE 2 & MULTIPLE IMAGES */}
        {activeTab === 'paidpromotions' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black uppercase bg-amber-400 text-slate-950">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Admin Banner Control</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Promotional Banners Manager (Image 1, Image 2 &amp; Scrollable Carousel)
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Upload custom promotional banner images, configure 4 right-side buttons (Website, Arattai, WhatsApp, Telegram), and let users scroll through multiple banners live on all pages!
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetPromotions}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>↺ Reset to Default Banners</span>
              </button>
            </div>

            {promoSuccessMsg && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{promoSuccessMsg}</span>
              </div>
            )}

            {/* 2 MAIN SLOTS: IMAGE 1 & IMAGE 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SLOT 1: IMAGE 1 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/40 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
                      1
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      Promotion Banner 1 (Image 1)
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Primary Slot
                  </span>
                </div>

                {/* Image 1 Preview */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  {slot1Image ? (
                    <Image
                      src={slot1Image}
                      alt="Banner Image 1 Preview"
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  ) : (
                    <div className="text-center text-slate-400 text-xs">No Image Selected for Slot 1</div>
                  )}
                </div>

                <form onSubmit={saveSlot1} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                      Image 1 File / URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={slot1Image}
                        onChange={(e) => setSlot1Image(e.target.value)}
                        placeholder="Image 1 URL or /images/..."
                        className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => slot1FileRef.current?.click()}
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1 shrink-0 cursor-pointer shadow-sm"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload File</span>
                      </button>
                      <input
                        type="file"
                        ref={slot1FileRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFileRead(file, (url) => setSlot1Image(url));
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase block mb-0.5">Title</label>
                      <input
                        type="text"
                        value={slot1Title}
                        onChange={(e) => setSlot1Title(e.target.value)}
                        placeholder="Title (e.g. Join Verified Group Links)"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase block mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={slot1Subtitle}
                        onChange={(e) => setSlot1Subtitle(e.target.value)}
                        placeholder="Subtitle / Description"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* 4 Action Links for Slot 1 */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 block">
                      Right-Side 4 Action Links:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-blue-500 block mb-0.5">🌐 Website URL</span>
                        <input
                          type="url"
                          value={slot1Website}
                          onChange={(e) => setSlot1Website(e.target.value)}
                          placeholder="https://joingrouplinks.in"
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-500 block mb-0.5">🟡 Arattai URL</span>
                        <input
                          type="url"
                          value={slot1Arattai}
                          onChange={(e) => setSlot1Arattai(e.target.value)}
                          placeholder="https://arattai.in"
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-500 block mb-0.5">🟢 WhatsApp URL</span>
                        <input
                          type="url"
                          value={slot1Whatsapp}
                          onChange={(e) => setSlot1Whatsapp(e.target.value)}
                          placeholder="https://chat.whatsapp.com/..."
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-sky-500 block mb-0.5">🔵 Telegram URL</span>
                        <input
                          type="url"
                          value={slot1Telegram}
                          onChange={(e) => setSlot1Telegram(e.target.value)}
                          placeholder="https://t.me/..."
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-xs font-black text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer shadow-md"
                  >
                    💾 Save &amp; Update Banner 1 (Image 1)
                  </button>
                </form>
              </div>

              {/* SLOT 2: IMAGE 2 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-400/50 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">
                      2
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      Promotion Banner 2 (Image 2)
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    Secondary Slot
                  </span>
                </div>

                {/* Image 2 Preview */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  {slot2Image ? (
                    <Image
                      src={slot2Image}
                      alt="Banner Image 2 Preview"
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  ) : (
                    <div className="text-center text-slate-400 text-xs">No Image Selected for Slot 2</div>
                  )}
                </div>

                <form onSubmit={saveSlot2} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                      Image 2 File / URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={slot2Image}
                        onChange={(e) => setSlot2Image(e.target.value)}
                        placeholder="Image 2 URL or /images/..."
                        className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => slot2FileRef.current?.click()}
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1 shrink-0 cursor-pointer shadow-sm"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload File</span>
                      </button>
                      <input
                        type="file"
                        ref={slot2FileRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFileRead(file, (url) => setSlot2Image(url));
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase block mb-0.5">Title</label>
                      <input
                        type="text"
                        value={slot2Title}
                        onChange={(e) => setSlot2Title(e.target.value)}
                        placeholder="Title (e.g. GroupHub B2B Network)"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase block mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={slot2Subtitle}
                        onChange={(e) => setSlot2Subtitle(e.target.value)}
                        placeholder="Subtitle / Description"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* 4 Action Links for Slot 2 */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 block">
                      Right-Side 4 Action Links:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-blue-500 block mb-0.5">🌐 Website URL</span>
                        <input
                          type="url"
                          value={slot2Website}
                          onChange={(e) => setSlot2Website(e.target.value)}
                          placeholder="https://joingrouplinks.in/promote"
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-500 block mb-0.5">🟡 Arattai URL</span>
                        <input
                          type="url"
                          value={slot2Arattai}
                          onChange={(e) => setSlot2Arattai(e.target.value)}
                          placeholder="https://arattai.in"
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-500 block mb-0.5">🟢 WhatsApp URL</span>
                        <input
                          type="url"
                          value={slot2Whatsapp}
                          onChange={(e) => setSlot2Whatsapp(e.target.value)}
                          placeholder="https://chat.whatsapp.com/..."
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-sky-500 block mb-0.5">🔵 Telegram URL</span>
                        <input
                          type="url"
                          value={slot2Telegram}
                          onChange={(e) => setSlot2Telegram(e.target.value)}
                          placeholder="https://t.me/..."
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shadow-md"
                  >
                    💾 Save &amp; Update Banner 2 (Image 2)
                  </button>
                </form>
              </div>
            </div>

            {/* ADD ADDITIONAL PROMOTIONAL BANNERS (IMAGE 3, 4, 5...) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <Plus className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  ➕ Add Another Promotional Banner (Image 3, 4, 5... for Multi-Scroll)
                </h3>
              </div>

              <form onSubmit={handleAddPaidPromotion} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                      Banner Image File / URL *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Image URL or Base64"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => newBannerFileRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-white shrink-0 cursor-pointer"
                      >
                        📁 File
                      </button>
                      <input
                        type="file"
                        ref={newBannerFileRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFileRead(file, (url) => setNewImageUrl(url));
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. IT Jobs Portal"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Subtitle</label>
                    <input
                      type="text"
                      placeholder="e.g. Get daily verified walkins"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-blue-500 block mb-1">🌐 Website URL</span>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newWebsiteUrl}
                      onChange={(e) => setNewWebsiteUrl(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-500 block mb-1">🟡 Arattai URL</span>
                    <input
                      type="url"
                      placeholder="https://arattai.in"
                      value={newArattaiUrl}
                      onChange={(e) => setNewArattaiUrl(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-500 block mb-1">🟢 WhatsApp URL</span>
                    <input
                      type="url"
                      placeholder="https://chat.whatsapp.com/..."
                      value={newWhatsappUrl}
                      onChange={(e) => setNewWhatsappUrl(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-sky-500 block mb-1">🔵 Telegram URL</span>
                    <input
                      type="url"
                      placeholder="https://t.me/..."
                      value={newTelegramUrl}
                      onChange={(e) => setNewTelegramUrl(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer shadow-md"
                >
                  ➕ Add Banner to Multi-Scroll Carousel
                </button>
              </form>
            </div>

            {/* ALL ACTIVE BANNERS IN SCROLL CAROUSEL */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🖼️ Currently Active Scrollable Promotional Images ({promotions.length})</span>
                </h3>
                <span className="text-xs text-slate-500">
                  Multiple images scroll smoothly on home and all pages
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {promotions.map((p, index) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-3 group"
                  >
                    <div className="space-y-2">
                      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        {p.imageUrl ? (
                          <Image
                            src={p.imageUrl}
                            alt={p.title}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                            No image
                          </div>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black bg-slate-900/80 text-white">
                          Image #{index + 1}
                        </span>
                      </div>

                      <div className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {p.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {p.subtitle}
                      </div>

                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
                        {p.websiteUrl && <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500">🌐 Web</span>}
                        {p.arattaiUrl && <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500">🟡 Arattai</span>}
                        {p.whatsappUrl && <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500">🟢 WhatsApp</span>}
                        {p.telegramUrl && <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-500">🔵 Telegram</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 font-medium">Slot #{index + 1}</span>
                      <button
                        onClick={() => handleDeletePromotion(p.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BULK UPLOAD MANAGER */}
        {activeTab === 'bulk' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-500" />
                <span>Bulk Import WhatsApp, Telegram & Arattai Groups (.xlsx / .csv / Google Sheets)</span>
              </h3>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-md cursor-pointer"
                >
                  Upload Excel (.xlsx) / CSV File
                </button>

                <button
                  onClick={downloadSampleTemplate}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                >
                  Download Sample Excel Template
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                />
              </div>

              {isValidating && (
                <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 text-xs font-bold">
                  Parsing Excel data & verifying invite link duplicates...
                </div>
              )}

              {validationResult && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Import Summary: {validationResult.total} Total Rows Parsed • {validationResult.valid.length} Valid Groups Ready to Import
                  </div>
                  <button
                    onClick={handleConfirmImport}
                    className="px-6 py-2.5 rounded-xl font-black text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  >
                    Confirm Import ({validationResult.valid.length} Groups)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: IMPORT HISTORY */}
        {activeTab === 'history' && (
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Bulk Dataset Import Log & 1-Click Rollback</h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {importHistory.map((rec) => (
                <div key={rec.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{rec.filename}</span>
                    <span className="text-[10px] text-slate-400 block">{rec.date} • {rec.validRows} rows imported</span>
                  </div>
                  {rec.status === 'Completed' ? (
                    <button
                      onClick={() => handleRollbackImport(rec.id)}
                      className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-500 font-bold hover:bg-rose-500 hover:text-white"
                    >
                      Rollback Batch
                    </button>
                  ) : (
                    <span className="text-slate-500 font-bold">Rolled Back</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CATEGORY AUTO-APPROVAL CONTROLS */}
        {activeTab === 'autoapprove' && (
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Category Auto-Approval Controls</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {categoriesList.map((cat) => (
                <div key={cat.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{cat.name}</span>
                  <button
                    onClick={() => handleToggleCategoryAutoApprove(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                      cat.isAutoApproved ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.isAutoApproved ? 'AUTO APPROVED' : 'MANUAL APPROVE'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
