import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nammabus – India\'s Trusted Business & Service Directory',
  description: 'Discover verified local businesses, home technicians, wedding photographers, caterers, tailors, and B2B products across 300+ Indian cities on Nammabus.',
};

export default function LocalBizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
