'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { LocalBizStore } from '@/lib/local-biz/store';
import { SEED_CITIES, SEED_CATEGORIES } from '@/lib/local-biz/seed-data';

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category_id: '',
    subject: '',
    quantity: '',
    budget: '',
    location: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message || !formData.subject) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await LocalBizStore.createEnquiry({
        subject: formData.subject,
        message: `${formData.message} (Contact: ${formData.name}, Mobile: ${formData.phone}, Email: ${formData.email})`,
        quantity: formData.quantity,
        budget: formData.budget,
        location: formData.location,
        status: 'pending',
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <LocalBizHeader />



      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/local-biz" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Post Requirement</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Post Your Requirement &amp; Get Quotations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Broadcast your business procurement or service request directly to verified Indian suppliers and service providers.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {submitted ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Requirement Successfully Posted!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Verified suppliers in your area have received your enquiry. You will receive quotation calls and WhatsApp messages shortly.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                href="/local-biz"
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    category_id: '',
                    subject: '',
                    quantity: '',
                    budget: '',
                    location: '',
                    message: '',
                  });
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
              >
                Post Another
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Delivery City / State *
                  </label>
                  <input
                    type="text"
                    list="cities-datalist"
                    required
                    placeholder="e.g. Pune, Lucknow, Coimbatore..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <datalist id="cities-datalist">
                    {SEED_CITIES.map((c) => (
                      <option key={c.id} value={`${c.name}, ${c.state}`} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Requirement Title / Product or Service Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bulk Cotton T-Shirts, Office Network Setup, Commercial Kitchen Equipment"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 Pieces, 5 Sets, Monthly Contract"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Approximate Budget
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000 or Flexible"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Detailed Specifications &amp; Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please specify size, material, delivery timeline, warranty, or any customization needed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Requirement...' : 'Submit Requirement for Instant Quotations'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <LocalBizFooter />
    </div>
  );
}
