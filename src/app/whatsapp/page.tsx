import React from 'react';
import { Metadata } from 'next';
import DynamicGeoGroupPage from '../groups/[country]/[[...params]]/page';

export const metadata: Metadata = {
  title: 'WhatsApp Group Links Directory (2026) – Active & Verified Groups',
  description: 'Find active WhatsApp group links in India, USA, UK, UAE for jobs, education, technology, and business.',
};

export default function WhatsAppPage() {
  return <DynamicGeoGroupPage params={Promise.resolve({ country: 'india', params: ['jobs'] })} />;
}
