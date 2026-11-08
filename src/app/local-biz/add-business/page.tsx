'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { LocalBizStore } from '@/lib/local-biz/store';
import { SEED_CATEGORIES, SEED_CITIES } from '@/lib/local-biz/seed-data';
import { STATES, getDistrictsForState } from '@/lib/india';
import { getStoredUser, setStoredUser } from '@/lib/auth';

export default function AddBusinessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
      <AddBusinessContent />
    </Suspense>
  );
}

function AddBusinessContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'online' | 'google-form'>('online');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [createdSlug, setCreatedSlug] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(SEED_CATEGORIES[0]?.id || 'cat-1');
  const [businessType, setBusinessType] = useState('Service Provider');
  const [yearEstablished, setYearEstablished] = useState('2024');
  const [gstNumber, setGstNumber] = useState('');

  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  const districts = getDistrictsForState(selectedState);

  // Auto-fill logged-in seller info if available
  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      if (user.name) setContactPerson(user.name);
      if (user.email) setEmail(user.email);
      if (user.whatsappNumber) {
        setWhatsapp(user.whatsappNumber);
        setPhone(user.whatsappNumber);
      }
      if (user.businessName) setName(user.businessName);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your Business Name.');
      return;
    }
    if (!selectedCity.trim() || !area.trim() || !pincode.trim()) {
      setError('Please fill in complete location details (City, Area, Pincode).');
      return;
    }
    if (!phone.trim() && !whatsapp.trim()) {
      setError('Please provide a WhatsApp or phone number so customers can reach you.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const categoryObj = SEED_CATEGORIES.find((c) => c.id === categoryId);
      const cityObj = SEED_CITIES.find(
        (c) => c.name.toLowerCase() === selectedCity.toLowerCase()
      );

      const created = await LocalBizStore.createBusiness({
        name: name.trim(),
        category_id: categoryId,
        category_name: categoryObj?.name || 'Local Services',
        business_type: businessType,
        year_established: parseInt(yearEstablished, 10) || 2024,
        gst_number: gstNumber.trim().toUpperCase(),
        state: selectedState,
        city_name: selectedCity,
        city_id: cityObj?.id || 'city-1',
        area: area.trim(),
        pincode: pincode.trim(),
        address: address.trim() || `${area}, ${selectedCity}, ${selectedState} - ${pincode}`,
        phone: (phone || whatsapp).trim(),
        whatsapp: (whatsapp || phone).trim(),
        email: email.trim() || 'contact@localbiz.in',
        website: website.trim(),
        description: description.trim() || `${name} offers top quality ${categoryObj?.name || 'services'} in ${area}, ${selectedCity}.`,
        status: 'approved',
        verification_status: 'verified',
      });

      // Update stored session to seller if not already
      const currentUser = getStoredUser();
      if (currentUser) {
        setStoredUser({
          ...currentUser,
          role: 'seller',
          accountType: 'seller',
          businessName: name.trim(),
        });
      }

      setCreatedSlug(created.slug);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit business registration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <LocalBizHeader />

      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/local-biz" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">List Your Business</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            List Your Business on Nammabus India
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Reach thousands of buyers, customers, and clients looking for your products and services. 100% Free Forever with Zero Broker Fees.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* REGISTRATION METHOD SWITCHER: Direct Online Form vs Official Google Form */}
        <div className="p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('online')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'online'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Direct Online Registration (Instant)</span>
            <span className="hidden sm:inline text-[9px] px-2 py-0.5 rounded-full bg-blue-700 text-blue-100 font-black">
              LIVE
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('google-form')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'google-form'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md ring-2 ring-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Official Google Form (₹0)</span>
            <span className="hidden sm:inline text-[9px] px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black">
              FREE
            </span>
          </button>
        </div>

        {/* TAB 1: DIRECT ONLINE REGISTRATION FORM */}
        {activeTab === 'online' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            {submitted ? (
              <div className="p-8 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Business Successfully Registered!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Your business profile is now active on Nammabus Directory across India. You can now receive customer calls, WhatsApp leads, and quote inquiries.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={`/local-biz/businesses/${createdSlug}`}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition-colors"
                  >
                    View Live Profile →
                  </Link>
                  <Link
                    href="/dashboard/business"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Merchant Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                    {error}
                  </div>
                )}

                {/* Section 1: Basic Information */}
                <div>
                  <h3 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>1. Basic Information</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Business / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Apex Engineering Works / Chennai Silk House"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Category *
                      </label>
                      <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {SEED_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Business Type
                      </label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="Service Provider">Service Provider</option>
                        <option value="Retailer / Shop">Retailer / Shop</option>
                        <option value="Wholesaler / Distributor">Wholesaler / Distributor</option>
                        <option value="Manufacturer / Factory">Manufacturer / Factory</option>
                        <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Year Established
                        </label>
                        <input
                          type="number"
                          value={yearEstablished}
                          onChange={(e) => setYearEstablished(e.target.value)}
                          placeholder="2024"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          GSTIN (Optional)
                        </label>
                        <input
                          type="text"
                          value={gstNumber}
                          onChange={(e) => setGstNumber(e.target.value)}
                          placeholder="e.g. 33AAAAA0000A1Z5"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Location & Address */}
                <div>
                  <h3 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>2. Location &amp; Address</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        State *
                      </label>
                      <select
                        value={selectedState}
                        onChange={(e) => {
                          const nextState = e.target.value;
                          setSelectedState(nextState);
                          const newDistricts = getDistrictsForState(nextState);
                          if (newDistricts.length > 0) {
                            setSelectedCity(newDistricts[0]);
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {STATES.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        District / City *
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {districts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Area / Locality *
                      </label>
                      <input
                        type="text"
                        required
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. T. Nagar, Anna Nagar, HSR Layout"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 600017"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Street Address (Optional)
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 45/A, North Usman Road"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Contact & Direct Customer Leads */}
                <div>
                  <h3 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>3. Contact &amp; Direct Customer Leads</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        WhatsApp Number * (For Direct Leads)
                      </label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Calling Mobile / Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Business Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@business.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Website or Catalog Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://yourbusiness.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Services &amp; Offerings Overview *
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your products, specialty services, timings, or customer offers..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95 disabled:opacity-70"
                  >
                    <span>{submitting ? 'Registering Your Business...' : '🚀 Submit & Publish Business Profile (100% Free ₹0)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    🔒 Zero broker commissions. Direct customer calls and WhatsApp inquiries forwarded straight to you.
                  </p>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: OFFICIAL GOOGLE FORM OPTION */}
        {activeTab === 'google-form' && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-600/20 space-y-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
                <span>✨ OFFICIAL REGISTRATION FORM (100% FREE ₹0)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                Register Your Business via Official Google Form
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
                Submit your business name, contact info, area, and service details directly to our directory team. Zero commission, direct customer calls &amp; WhatsApp leads.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://forms.gle/FVQVofUVejQ2ebiA7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Click Here to Open Google Form</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* EMBEDDED GOOGLE FORM IFRAME */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm overflow-hidden space-y-4">
              <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Fill Business Details Online
                  </h3>
                </div>
                <a
                  href="https://forms.gle/FVQVofUVejQ2ebiA7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Open in New Tab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950 flex justify-center">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdss74aRQE4ee65YfpPs7sGYH-UKdAxSp-q-556dJnhXwIl8w/viewform?embedded=true"
                  width="100%"
                  height="950"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="w-full border-0 min-h-[850px]"
                  title="Official Business Registration Google Form"
                >
                  Loading Google Form…
                </iframe>
              </div>
            </div>
          </div>
        )}
      </main>

      <LocalBizFooter />
    </div>
  );
}
