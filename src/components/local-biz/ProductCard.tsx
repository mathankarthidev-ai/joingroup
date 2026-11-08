'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, ShieldCheck, MapPin, Building2, Send, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/local-biz';
import { EnquiryModal } from './EnquiryModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between group">
        <div>
          {/* Product Icon & Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 text-3xl flex items-center justify-center border border-slate-200/60 dark:border-slate-700">
              {product.image_url || '📦'}
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                MOQ: {product.min_order_quantity || 1} {product.unit || 'Unit'}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="text-blue-600 dark:text-blue-400 font-black text-lg mb-2">
            {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Get Latest Price'}
            {product.unit && (
              <span className="text-xs font-normal text-slate-400 ml-1">/ {product.unit}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Supplier Info */}
          {product.business && (
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 mb-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {product.business.name}
                  </span>
                  {product.business.verification_status === 'verified' && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {product.business.area ? `${product.business.area}, ` : ''}
                    {product.business.city?.name || 'India'}
                  </span>
                </div>
              </div>
              <Link
                href={`/local-biz/businesses/${product.business.slug}`}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 shrink-0"
              >
                View
              </Link>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setEnquiryOpen(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get Quote</span>
          </button>
          {product.business?.phone ? (
            <a
              href={`tel:${product.business.phone}`}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <span>Contact</span>
            </a>
          ) : (
            <button
              onClick={() => setEnquiryOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Enquire</span>
            </button>
          )}
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        businessId={product.business_id}
        businessName={product.business?.name}
        productName={product.name}
      />
    </>
  );
};
