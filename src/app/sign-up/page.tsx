'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { setStoredUser } from '@/lib/auth';

type RoleType = 'shopper' | 'business' | 'admin';

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<RoleType>('shopper');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [secondaryValue, setSecondaryValue] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setStoredUser({
        id: `usr_${Date.now()}`,
        email,
        name,
        whatsappNumber: phone,
        role: role === 'business' ? 'premium' : role === 'admin' ? 'admin' : 'normal',
        isVip: role !== 'shopper',
        freeGroupsCountThisWeek: 0,
        allowedGroupsLimit: role === 'business' ? 25 : 10,
        allowedSponsoredLimit: role === 'business' ? 5 : 2,
        submittedGroupIds: [],
        sponsoredGroupIds: [],
      });
      setLoading(false);
      if (role === 'business') {
        router.push('/local-biz/add-business');
      } else {
        router.push('/dashboard/user');
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col justify-between">
      <Header />

      <main className="w-full pt-20 bg-surface flex-grow py-space-xl">
        <div className="relative w-full overflow-hidden bg-surface">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-gutter relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-space-xl">
              <span className="text-label-md text-primary font-bold uppercase tracking-wider mb-space-xs block text-xs">
                Join the Ecosystem
              </span>
              <h1 className="font-headline-xl text-3xl sm:text-4xl font-bold text-on-surface mb-space-xs">
                Create Your Account
              </h1>
              <p className="text-body-lg text-on-surface-variant text-sm sm:text-base">
                Connect with local businesses, discover verified community groups, and grow your network instantly.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300">
              {/* Role Selection */}
              <div className="mb-space-xl">
                <label className="block text-label-md text-xs font-bold text-on-surface mb-space-sm uppercase tracking-wider">
                  Select Your Account Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  {/* Shopper / Member */}
                  <button
                    type="button"
                    onClick={() => setRole('shopper')}
                    className={`text-left p-space-lg rounded-2xl transition-all duration-200 border-2 flex flex-col justify-between cursor-pointer ${
                      role === 'shopper'
                        ? 'bg-surface-container-high border-primary shadow-md'
                        : 'bg-surface-container-low border-transparent hover:border-primary/30'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-space-md">
                      <span className="material-symbols-outlined text-[24px]">person</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm font-bold text-on-surface text-base mb-space-xs">Shopper / Member</h3>
                      <p className="text-body-sm text-on-surface-variant text-xs">
                        Discover local deals, join curated chat groups, and review businesses.
                      </p>
                    </div>
                    <div className="mt-space-md flex items-center gap-space-xs text-primary font-bold text-xs">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: role === 'shopper' ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {role === 'shopper' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>{role === 'shopper' ? 'Selected' : 'Select'}</span>
                    </div>
                  </button>

                  {/* Business Owner */}
                  <button
                    type="button"
                    onClick={() => setRole('business')}
                    className={`text-left p-space-lg rounded-2xl transition-all duration-200 border-2 flex flex-col justify-between cursor-pointer ${
                      role === 'business'
                        ? 'bg-surface-container-high border-primary shadow-md'
                        : 'bg-surface-container-low border-transparent hover:border-primary/30'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 flex items-center justify-center text-secondary mb-space-md">
                      <span className="material-symbols-outlined text-[24px]">storefront</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm font-bold text-on-surface text-base mb-space-xs">Business Owner</h3>
                      <p className="text-body-sm text-on-surface-variant text-xs">
                        Claim your storefront, publish products/services, and capture buyer leads.
                      </p>
                    </div>
                    <div className="mt-space-md flex items-center gap-space-xs text-primary font-bold text-xs">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: role === 'business' ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {role === 'business' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>{role === 'business' ? 'Selected' : 'Select'}</span>
                    </div>
                  </button>

                  {/* Group Admin */}
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`text-left p-space-lg rounded-2xl transition-all duration-200 border-2 flex flex-col justify-between cursor-pointer ${
                      role === 'admin'
                        ? 'bg-surface-container-high border-primary shadow-md'
                        : 'bg-surface-container-low border-transparent hover:border-primary/30'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-space-md">
                      <span className="material-symbols-outlined text-[24px]">groups</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm font-bold text-on-surface text-base mb-space-xs">Group Admin</h3>
                      <p className="text-body-sm text-on-surface-variant text-xs">
                        Manage invite links, moderate members, and expand your community reach.
                      </p>
                    </div>
                    <div className="mt-space-md flex items-center gap-space-xs text-primary font-bold text-xs">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: role === 'admin' ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {role === 'admin' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>{role === 'admin' ? 'Selected' : 'Select'}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Form with Adaptive Fields */}
              <form className="space-y-space-md" onSubmit={handleSignup}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block text-label-md text-xs font-semibold text-on-surface mb-space-xs">
                      {role === 'business' ? 'Business Legal Name' : role === 'admin' ? 'Admin Full Name' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-space-md text-outline">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </span>
                      <input
                        className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                        placeholder={
                          role === 'business'
                            ? 'e.g. Apex Auto Repairs Ltd.'
                            : role === 'admin'
                            ? 'e.g. Ramesh Kumar'
                            : 'e.g. Sarah Jenkins'
                        }
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-label-md text-xs font-semibold text-on-surface mb-space-xs">Email Address</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-space-md text-outline">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                      </span>
                      <input
                        className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                        placeholder="name@example.com"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block text-label-md text-xs font-semibold text-on-surface mb-space-xs">
                      WhatsApp / Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-space-md text-outline">
                        <span className="material-symbols-outlined text-[20px]">phone</span>
                      </span>
                      <input
                        className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                        placeholder="+91 98765 43210"
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-label-md text-xs font-semibold text-on-surface mb-space-xs">
                      {role === 'business'
                        ? 'Business Category'
                        : role === 'admin'
                        ? 'Primary Community Platform'
                        : 'City / Location'}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-space-md text-outline">
                        <span className="material-symbols-outlined text-[20px]">
                          {role === 'business' ? 'category' : role === 'admin' ? 'share' : 'location_on'}
                        </span>
                      </span>

                      {role === 'business' ? (
                        <select
                          className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                          value={secondaryValue}
                          onChange={(e) => setSecondaryValue(e.target.value)}
                        >
                          <option value="Home Services & Electrical">Home Services &amp; Electrical (AC, Wiring, Plumbing)</option>
                          <option value="Events & Wedding Services">Events &amp; Wedding (Photography, Catering, Decor)</option>
                          <option value="Home Bakers & Food Delivery">Home Bakers &amp; Food Delivery (Cakes, Tiffin)</option>
                          <option value="Architects & Spatial Designers">Architects &amp; Spatial Designers</option>
                          <option value="Auto Repair & Mechanics">Auto Repair &amp; Mechanics</option>
                          <option value="Tailors & Boutiques">Tailors &amp; Boutiques</option>
                          <option value="Grocery & Supermarkets">Grocery &amp; Supermarkets</option>
                          <option value="Home Services & Electrical">Home Services &amp; Electrical</option>
                          <option value="Salons & Wellness Spas">Salons &amp; Wellness Spas</option>
                          <option value="Food & Restaurants">Food &amp; Restaurants</option>
                        </select>
                      ) : role === 'admin' ? (
                        <select
                          className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                          value={secondaryValue}
                          onChange={(e) => setSecondaryValue(e.target.value)}
                        >
                          <option value="Arattai (Zoho)">Arattai (by Zoho) - India Priority</option>
                          <option value="WhatsApp">WhatsApp Community</option>
                          <option value="Telegram">Telegram Channel / Supergroup</option>
                          <option value="Instagram">Instagram Broadcast Channel / Page</option>
                          <option value="Discord">Discord Server</option>
                          <option value="Facebook">Facebook Group</option>
                        </select>
                      ) : (
                        <input
                          className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                          placeholder="e.g. Chennai, Bangalore, Mumbai"
                          type="text"
                          value={secondaryValue}
                          onChange={(e) => setSecondaryValue(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block text-label-md text-xs font-semibold text-on-surface mb-space-xs">Password</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-space-md text-outline">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                      </span>
                      <input
                        className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                        placeholder="At least 8 characters"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-label-md text-xs font-semibold text-on-surface mb-space-xs">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-space-md text-outline">
                        <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                      </span>
                      <input
                        className="w-full pl-12 pr-space-md py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                        placeholder="Re-enter password"
                        required
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-space-xs">
                  <label className="flex items-start gap-space-sm cursor-pointer select-none">
                    <input
                      className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      required
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span className="text-body-sm text-on-surface-variant text-xs">
                      I agree to the <Link className="text-primary underline" href="/terms">Terms of Service</Link>,{' '}
                      <Link className="text-primary underline" href="/privacy-policy">Privacy Policy</Link>, and community safety guidelines.
                    </span>
                  </label>
                </div>

                <div className="pt-space-md">
                  <button
                    className="w-full py-4 rounded-xl bg-primary text-on-primary text-label-md hover:bg-primary-container transition-all shadow-lg flex items-center justify-center gap-space-sm cursor-pointer"
                    type="submit"
                    disabled={loading}
                  >
                    <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>

                <div className="text-center pt-space-md border-t border-slate-200 dark:border-slate-800">
                  <p className="text-body-md text-on-surface-variant text-xs">
                    Already have an account?{' '}
                    <Link className="text-primary font-bold hover:underline ml-space-xs" href="/login">
                      Log in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Bottom 3 Trust Pillars */}
            <div className="mt-space-xl grid grid-cols-1 md:grid-cols-3 gap-space-lg text-center">
              <div className="p-space-md">
                <div className="w-10 h-10 mx-auto rounded-full bg-secondary-fixed/30 flex items-center justify-center text-secondary mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <h4 className="font-headline-sm font-bold text-on-surface text-sm mb-space-xs">Verified Businesses</h4>
                <p className="text-body-sm text-outline text-xs">Every local listing is vetted for authenticity and active customer service.</p>
              </div>

              <div className="p-space-md">
                <div className="w-10 h-10 mx-auto rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </div>
                <h4 className="font-headline-sm font-bold text-on-surface text-sm mb-space-xs">Secure Directory</h4>
                <p className="text-body-sm text-outline text-xs">Group invite links are monitored to prevent dead links, spam, and fraud.</p>
              </div>

              <div className="p-space-md">
                <div className="w-10 h-10 mx-auto rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                </div>
                <h4 className="font-headline-sm font-bold text-on-surface text-sm mb-space-xs">Instant Setup</h4>
                <p className="text-body-sm text-outline text-xs">Get your business profile or chat group listed in less than 2 minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
