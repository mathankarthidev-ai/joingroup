import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ADSENSE_CLIENT_ID } from '@/lib/ad-config';
import { AdSenseAccessWallModal } from '@/components/AdSenseAccessWallModal';
import { LegalSafetyDisclaimerModal } from '@/components/LegalSafetyDisclaimerModal';
import { RightPageScrollLine } from '@/components/common/RightPageScrollLine';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nammabus & GroupHub – Business Directory & Searchable Group Links',
  description: 'India\'s verified business discovery & community directory. Find verified local merchants, home technicians, wedding photographers, caterers, tailors, and active community links on WhatsApp, Telegram & Instagram.',
  keywords: [
    'WhatsApp group links India',
    'Chennai job WhatsApp groups',
    'Tamil Nadu WhatsApp group links',
    'Telegram channels India',
    'Search WhatsApp groups',
  ],
  metadataBase: new URL('https://grouphub.example.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Google Fonts: Plus Jakarta Sans, Inter & Material Symbols */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />

        {/* Inline Theme Init to prevent flash & ensure immediate sync */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('grouphub_theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        {/* Next.js Optimized Google AdSense Script Injection */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} min-h-full antialiased transition-colors duration-200 pb-16 md:pb-0`}>
        {/* First-Visit Legal Disclaimer, User Safety & Fraud Awareness Modal */}
        <LegalSafetyDisclaimerModal />
        {/* 6-Hour Google AdSense Access Gate Modal */}
        <AdSenseAccessWallModal />
        {/* Right Page Loaded Scroll Line & Draggable Progress */}
        <RightPageScrollLine />
        {children}
      </body>
    </html>
  );
}
