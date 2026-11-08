'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Share2,
  Check,
  Send,
  Building,
} from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { EnquiryModal } from '@/components/local-biz/EnquiryModal';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Professional } from '@/types/local-biz';
import { ProfessionalCard } from '@/components/local-biz/ProfessionalCard';

export default function ProfessionalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [professional, setProfessional] = useState<Professional | null>(null);
  const [related, setRelated] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);
      try {
        const prof = await LocalBizStore.getProfessionalBySlug(slug);
        if (prof) {
          setProfessional(prof);
          const all = await LocalBizStore.getProfessionals();
          // Find related by same profession or same city
          const filtered = all
            .filter((p) => p.id !== prof.id && (p.profession === prof.profession || p.city_name === prof.city_name))
            .slice(0, 3);
          setRelated(filtered);
        }
      } catch (err) {
        console.error('Failed to load professional:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
        <LocalBizHeader />
        <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full space-y-6">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
        </main>
        <LocalBizFooter />
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
        <LocalBizHeader />
        <main className="flex-1 max-w-xl mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Professional Not Found</h1>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            The professional profile you are looking for does not exist or may have been updated.
          </p>
          <Link
            href="/local-biz/professionals"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Professionals</span>
          </Link>
        </main>
        <LocalBizFooter />
      </div>
    );
  }

  const cleanPhone = professional.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = professional.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
      <LocalBizHeader />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/local-biz" className="hover:text-blue-600 dark:hover:text-blue-400">
              Nammabus
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/local-biz/professionals" className="hover:text-blue-600 dark:hover:text-blue-400">
              Professionals
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-medium truncate">
              {professional.name}
            </span>
          </div>
        </div>

        {/* Profile Header Banner */}
        <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              {/* Avatar with Verified Ring */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={professional.avatar_url}
                    alt={professional.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {professional.verification_status === 'verified' && (
                  <span
                    title="Credentials verified by Bar / ICAI / Medical Council"
                    className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-600 text-white flex items-center gap-1.5 shadow-md border-2 border-white dark:border-slate-900 text-xs font-bold"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-bold">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{professional.profession}</span>
                  </span>
                  {professional.is_featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Featured Practice</span>
                    </span>
                  )}
                  {professional.is_available && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Accepting Appointments</span>
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {professional.name}
                </h1>

                <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300">
                  {professional.title}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{professional.qualification}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{professional.experience_years}+ Years Experience</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>{professional.area}, {professional.city_name}, {professional.state}</span>
                  </span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{professional.rating.toFixed(2)}</span>
                    <span className="text-slate-400 font-normal">({professional.reviews_count} verified reviews)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Consultation Fee: {professional.consultation_fee}
                  </span>
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="w-full md:w-auto flex flex-row md:flex-col gap-2.5 shrink-0 pt-2 md:pt-0">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20${encodeURIComponent(professional.name)},%20I%20saw%20your%20profile%20on%20Nammabus%20Directory%20and%20would%20like%20to%20consult%20regarding%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>

                <div className="flex gap-2">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Practice</span>
                  </a>

                  <button
                    onClick={handleShare}
                    title="Copy Profile URL"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content Body */}
        <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main 2-Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* About / Bio */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>About {professional.name}</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {professional.about}
              </p>
            </div>

            {/* Core Practice Specializations */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Specializations & Focus Areas</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {professional.specializations.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Services & Consultation Scope</span>
              </h2>
              <ul className="space-y-2.5">
                {professional.services_offered.map((service, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Memberships & Accreditations */}
            {professional.memberships && professional.memberships.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>Professional Registrations & Memberships</span>
                </h2>
                <div className="space-y-2">
                  {professional.memberships.map((membership, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-center gap-3 text-xs font-semibold text-indigo-950 dark:text-indigo-200"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{membership}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Contact, Address, & Related */}
          <div className="space-y-6">
            {/* Consultation Card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                  Direct Consultation
                </span>
                <div className="text-2xl font-black mt-1 text-white">
                  {professional.consultation_fee}
                </div>
                <p className="text-xs text-blue-200 mt-0.5">
                  Direct appointment booking with zero intermediary fee.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Appointment</span>
                </button>

                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20${encodeURIComponent(professional.name)},%20I%20would%20like%20to%20consult%20with%20you.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Practice Address & Hours */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600" />
                <span>Practice Address</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{professional.address}</p>
                    <p>{professional.area}, {professional.city_name} - {professional.pincode}</p>
                    <p>{professional.state}, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="font-medium text-slate-500 dark:text-slate-400">Office Hours:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{professional.office_hours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`tel:${cleanPhone}`} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    {professional.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${professional.email}`} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate">
                    {professional.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Related Verified Professionals */}
            {related.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Other Verified Professionals
                </h3>
                <div className="space-y-4">
                  {related.map((p) => (
                    <ProfessionalCard key={p.id} professional={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <LocalBizFooter />

      {/* Quick Consultation Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        businessId={professional.id}
        businessName={professional.name}
      />
    </div>
  );
}
