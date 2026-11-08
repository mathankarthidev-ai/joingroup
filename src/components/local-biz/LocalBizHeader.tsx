'use client';

import React from 'react';
import { Header } from '../Header';

/**
 * Unified Master Header:
 * LocalBizHeader now seamlessly delegates to the unified master Header component,
 * ensuring consistent branding, single-row sleek navigation, city selector,
 * theme toggle, and 1-click business listing across every single page.
 */
export const LocalBizHeader: React.FC = () => {
  return <Header />;
};

export default LocalBizHeader;
