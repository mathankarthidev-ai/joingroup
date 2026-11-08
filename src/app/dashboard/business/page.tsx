'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Eye,
  PhoneCall,
  MessageSquare,
  Star,
  PlusCircle,
  Package,
  Wrench,
  Clock,
  MapPin,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Mail,
  Edit3,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Business, Enquiry, Product, Service } from '@/types/local-biz';

export default function BusinessOwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'products' | 'services' | 'settings'>('overview');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // New product form modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [allBusinesses, allEnquiries] = await Promise.all([
          LocalBizStore.getBusinesses({ limit: 10 }),
          LocalBizStore.getEnquiries(),
        ]);

        setBusinesses(allBusinesses);
        if (allBusinesses.length > 0) {
          const firstBiz = allBusinesses[0];
          setSelectedBusiness(firstBiz);
          const [bizProducts, bizServices] = await Promise.all([
            LocalBizStore.getProductsByBusiness(firstBiz.id),
            LocalBizStore.getServicesByBusiness(firstBiz.id),
          ]);
          setProducts(bizProducts);
          setServices(bizServices);
        }
        setEnquiries(allEnquiries);
      } catch (err) {
        console.error('Error loading business dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      business_id: selectedBusiness?.id || 'biz-01',
      name: newProductName,
      slug: newProductName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category_id: newProductCategory || 'cat-general',
      description: 'High quality product offered directly from our verified inventory.',
      price: parseFloat(newProductPrice) || 0,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts([newProd, ...products]);
    setShowProductModal(false);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductCategory('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
        {/* Top Business Switcher & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {selectedBusiness?.name || 'Local Enterprise Listing'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-black flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold uppercase">
                  Pro Plan
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-3">
                <span>{selectedBusiness?.city_name || 'Chennai, Tamil Nadu'}</span>
                <span>•</span>
                <span>Category: {selectedBusiness?.category_name || 'Retail & Services'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href="/pricing"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>Upgrade Plan</span>
            </Link>

            <Link
              href={selectedBusiness ? `/local-biz/businesses/${selectedBusiness.slug}` : '/local-biz'}
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>View Public Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Performance Overview', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'leads', label: `Customer Leads (${enquiries.length})`, icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'products', label: `Products (${products.length})`, icon: <Package className="w-4 h-4" /> },
            { id: 'services', label: `Services (${services.length})`, icon: <Wrench className="w-4 h-4" /> },
            { id: 'settings', label: 'Listing Profile & Hours', icon: <Clock className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">Total Profile Views</span>
                  <Eye className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {selectedBusiness?.views_count || 14820}
                </div>
                <div className="text-[11px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
                  <span>↑ 24% this month</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">WhatsApp Inquiries</span>
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {(selectedBusiness as any)?.whatsapp_clicks || 430}
                </div>
                <div className="text-[11px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
                  <span>Direct customer chats</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">Phone Calls Received</span>
                  <PhoneCall className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {(selectedBusiness as any)?.call_clicks || 295}
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  High intent buyers
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">Customer Rating</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white flex items-baseline gap-1">
                  <span>{selectedBusiness?.rating || 4.8}</span>
                  <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  {selectedBusiness?.reviews_count || 32} verified reviews
                </div>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Recent Inbound Leads</h3>
                  <p className="text-xs text-slate-500">Customers who requested quotation or called via Nammabus</p>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All Leads →
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {enquiries.slice(0, 3).map((enq) => (
                  <div key={enq.id} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white">{enq.customer_name || 'Customer Lead'}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold">
                          {enq.location || 'Verified Lead'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{enq.message}</p>
                      <div className="text-[10px] text-slate-400 flex items-center gap-3">
                        <span>📞 {enq.customer_phone || '+91 98400 12345'}</span>
                        {enq.customer_email && <span>✉️ {enq.customer_email}</span>}
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/91${(enq.customer_phone || '9840012345').replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leads */}
        {activeTab === 'leads' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Customer Inquiries &amp; Quotations</h3>
                <p className="text-xs text-slate-500">Respond quickly to secure customer orders</p>
              </div>
            </div>

            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{enq.customer_name || 'Customer Lead'}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{enq.message}</p>
                    <div className="text-xs text-slate-500 flex items-center gap-4 pt-1">
                      <span>Phone: <strong className="text-slate-800 dark:text-slate-200">{enq.customer_phone || '+91 98400 12345'}</strong></span>
                      {enq.customer_email && <span>Email: {enq.customer_email}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${enq.customer_phone || ''}`}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`https://wa.me/91${(enq.customer_phone || '9840012345').replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Products */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Product Catalog</h3>
                <p className="text-xs text-slate-500">Products visible to shoppers on your Nammabus profile</p>
              </div>
              <button
                onClick={() => setShowProductModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="h-36 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <img
                      src={prod.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{prod.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{prod.description}</p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-base font-black text-blue-600 dark:text-blue-400">
                        ₹{prod.price?.toLocaleString('en-IN') || 'Price on request'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Services */}
        {activeTab === 'services' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Services Offered</h3>
                <p className="text-xs text-slate-500">Service offerings that generate quotation enquiries</p>
              </div>
              <button
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{srv.name}</h4>
                  <p className="text-xs text-slate-500">{srv.description}</p>
                  <div className="pt-2 text-xs font-black text-slate-800 dark:text-slate-200">
                    Starting from ₹{srv.price?.toLocaleString('en-IN') || 'Quote'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Settings / Profile */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Business Listing Information</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-300">Registered Business Name</label>
                  <input
                    type="text"
                    defaultValue={selectedBusiness?.name || 'Local Enterprise Listing'}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-300">Contact Mobile (Direct Call &amp; WhatsApp)</label>
                  <input
                    type="text"
                    defaultValue={selectedBusiness?.phone || '+91 98400 12345'}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600 dark:text-slate-300">Store Address</label>
                  <textarea
                    rows={3}
                    defaultValue={selectedBusiness?.address || '142, GST Road, Guindy, Chennai'}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Product */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Add Product to Catalog</h3>
              <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Industrial Steel Pipe / Silk Saree"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Price (INR) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 1499"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Product Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Electronics, Hardware, Apparel"
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
