'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Building2 } from 'lucide-react';

interface ProductSwitcherProps {
  variant?: 'navbar' | 'compact' | 'mobile';
  activeProduct?: 'local-biz' | 'groups';
}

export const ProductSwitcher: React.FC<ProductSwitcherProps> = ({ variant = 'navbar', activeProduct }) => {
  const pathname = usePathname();

  // Determine active product based on prop or pathname
  const isLocalBizz = activeProduct
    ? activeProduct === 'local-biz'
    : (pathname.startsWith('/local-bizz') ||
       pathname.startsWith('/local-biz') ||
       pathname.startsWith('/local-business') ||
       pathname.startsWith('/bizconnect') ||
       pathname.startsWith('/bizzconnect') ||
       pathname.startsWith('/businesses') ||
       pathname.startsWith('/products') ||
       pathname.startsWith('/services') ||
       pathname.startsWith('/categories') ||
       pathname.startsWith('/cities') ||
       pathname.startsWith('/enquiry') ||
       pathname.startsWith('/dashboard/business'));

  const isGroupLinks = !isLocalBizz;

  if (variant === 'mobile') {
    return (
      <div className="w-full p-1 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center gap-1 shadow-inner">
        <Link
          href="/local-biz"
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
            isLocalBizz
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>NAMMABUS</span>
          {isLocalBizz && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse" />
          )}
        </Link>

        <Link
          href="/groups"
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
            isGroupLinks
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>GROUP LINKS</span>
          {isGroupLinks && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
          )}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm"
      title="Switch between Nammabus and Group Links platforms"
    >
      <Link
        href="/local-biz"
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wide transition-all ${
          isLocalBizz
            ? 'bg-white dark:bg-blue-950 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-500/20'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Building2 className={`w-3.5 h-3.5 ${isLocalBizz ? 'text-blue-600 dark:text-blue-400' : ''}`} />
        <span>NAMMABUS</span>
        {isLocalBizz && (
          <span className="text-[9px] px-1 py-0.2 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-extrabold ml-0.5">
            ACTIVE
          </span>
        )}
      </Link>

      <span className="text-slate-300 dark:text-slate-700 px-0.5 font-light">|</span>

      <Link
        href="/groups"
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wide transition-all ${
          isGroupLinks
            ? 'bg-white dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shadow-sm border border-emerald-500/20'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Users className={`w-3.5 h-3.5 ${isGroupLinks ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
        <span>GROUP LINKS</span>
        {isGroupLinks && (
          <span className="text-[9px] px-1 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-extrabold ml-0.5">
            ACTIVE
          </span>
        )}
      </Link>
    </div>
  );
};
