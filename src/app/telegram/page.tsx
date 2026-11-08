import React from 'react';
import { Metadata } from 'next';
import DynamicGeoGroupPage from '../groups/[country]/[[...params]]/page';

export const metadata: Metadata = {
  title: 'Telegram Group Links & Channel Directory (2026) – Verified Links',
  description: 'Discover active Telegram group links and channels in India, USA, UK, UAE for startups, study notes, and deals.',
};

export default function TelegramPage() {
  return <DynamicGeoGroupPage params={Promise.resolve({ country: 'india', params: ['business'] })} />;
}
