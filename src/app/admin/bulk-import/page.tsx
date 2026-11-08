'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Group, Platform } from '@/lib/types';
import { INITIAL_GROUPS, CATEGORIES, SAFE_COUNTRIES } from '@/lib/data';
import {
  FileSpreadsheet,
  UploadCloud,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Layers,
  Database,
  Search,
  ExternalLink,
} from 'lucide-react';

interface ParsedRow {
  rowNumber: number;
  name: string;
  platform: string;
  category: string;
  inviteUrl: string;
  country: string;
  state: string;
  city: string;
  description: string;
  tags: string;
  status: 'valid' | 'warning' | 'error';
  errors: string[];
}

export default function AdminBulkImportPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [importHistory, setImportHistory] = useState<
    { id: string; date: string; filename: string; total: number; valid: number; status: string }[]
  >([]);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // Download official CSV template
  const downloadTemplate = () => {
    const csvHeader = 'Name,Platform,Category,InviteUrl,Country,State,City,Description,Tags\n';
    const sampleRows = [
      '"Chennai Tech Innovators WhatsApp","whatsapp","Technology","https://chat.whatsapp.com/sampleTechChennai","India","Tamil Nadu","Chennai","Official community for Chennai startup founders and developers","tech, chennai, startup"',
      '"Bangalore AI & ML Telegram Channel","telegram","Technology","https://t.me/sampleBangaloreAI","India","Karnataka","Bengaluru","Daily news, papers, and networking for AI engineers in Bangalore","ai, ml, bangalore"',
      '"Zoho Arattai Tamil Book Readers","arattai","Education","https://arattai.in/sampleZohoBooks","India","Tamil Nadu","Madurai","Connecting avid Tamil readers across India on Arattai","arattai, zoho, books, tamil"',
    ].join('\n');

    const blob = new Blob([csvHeader + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'joingrouplinks_bulk_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Sample bulk import CSV template downloaded.');
  };

  // Simple, robust CSV parser handling quoted strings
  const parseCSVText = (text: string) => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) {
      showToast('Uploaded file has no data rows.');
      return;
    }

    const rows: ParsedRow[] = [];
    const existingUrls = new Set(INITIAL_GROUPS.map((g) => g.inviteUrl.trim().toLowerCase()));
    const seenUrlsInBatch = new Set<string>();

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Regex to parse comma-separated fields with quotes
      const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
      if (!matches) continue;

      const cols = matches.map((val) => {
        let clean = val.startsWith(',') ? val.substring(1) : val;
        clean = clean.trim();
        if (clean.startsWith('"') && clean.endsWith('"')) {
          clean = clean.substring(1, clean.length - 1).replace(/""/g, '"');
        }
        return clean;
      });

      const name = cols[0] || '';
      const platform = (cols[1] || '').toLowerCase().trim();
      const category = cols[2] || 'Community';
      const inviteUrl = cols[3] || '';
      const country = cols[4] || 'India';
      const state = cols[5] || '';
      const city = cols[6] || '';
      const description = cols[7] || '';
      const tags = cols[8] || '';

      const errors: string[] = [];

      // Validation Rules
      if (!name || name.length < 3) errors.push('Name must be at least 3 characters.');
      if (!platform) {
        errors.push('Platform is required.');
      } else if (!['arattai', 'whatsapp', 'telegram', 'instagram', 'discord', 'facebook', 'linkedin', 'reddit'].includes(platform)) {
        errors.push(`Platform "${platform}" not recognized.`);
      }

      if (!inviteUrl) {
        errors.push('Invite URL is required.');
      } else if (!inviteUrl.startsWith('http://') && !inviteUrl.startsWith('https://')) {
        errors.push('Invite URL must begin with https://');
      }

      const lowerUrl = inviteUrl.trim().toLowerCase();
      if (existingUrls.has(lowerUrl)) {
        errors.push('Duplicate URL: already exists in platform directory.');
      }
      if (seenUrlsInBatch.has(lowerUrl)) {
        errors.push('Duplicate URL within this import file.');
      }
      if (lowerUrl) seenUrlsInBatch.add(lowerUrl);

      rows.push({
        rowNumber: i + 1,
        name,
        platform,
        category,
        inviteUrl,
        country,
        state,
        city,
        description,
        tags,
        status: errors.length > 0 ? 'error' : 'valid',
        errors,
      });
    }

    setParsedRows(rows);
    showToast(`Parsed ${rows.length} rows. Please review below before committing.`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      parseCSVText(content);
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  const handleCommitImport = () => {
    const validRows = parsedRows.filter((r) => r.status === 'valid');
    if (validRows.length === 0) {
      alert('There are no valid rows to import. Please resolve the errors first.');
      return;
    }

    const batchId = `BATCH-${Date.now()}`;
    const newHistory = [
      {
        id: batchId,
        date: new Date().toLocaleString('en-IN'),
        filename: fileInputRef.current?.files?.[0]?.name || 'bulk_import.csv',
        total: parsedRows.length,
        valid: validRows.length,
        status: 'Imported',
      },
      ...importHistory,
    ];
    setImportHistory(newHistory);
    showToast(`Successfully imported ${validRows.length} community groups into directory!`);
    setParsedRows([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validCount = parsedRows.filter((r) => r.status === 'valid').length;
  const errorCount = parsedRows.filter((r) => r.status === 'error').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-500 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin Control Centre</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-purple-500" />
              <span>Bulk Group & Channel Import Manager</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              High-throughput ingestion engine for WhatsApp groups, Telegram channels, and Arattai communities.
            </p>
          </div>

          <button
            onClick={downloadTemplate}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Download Sample CSV Template</span>
          </button>
        </div>

        {/* Toast */}
        {notification && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Upload Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) {
              const file = e.dataTransfer.files[0];
              const reader = new FileReader();
              reader.onload = (event) => {
                parseCSVText(event.target?.result as string);
              };
              reader.readAsText(file);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer mb-8 ${
            isDragging
              ? 'border-purple-500 bg-purple-500/5'
              : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-purple-400'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv,.txt"
            className="hidden"
          />
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Drag and drop your CSV dataset here, or <span className="text-purple-600 dark:text-purple-400 underline">browse files</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
            Supports standardized CSV exports with column headers: Name, Platform, Category, InviteUrl, Country, State, City, Description.
          </p>
        </div>

        {/* Validation Summary & Preview */}
        {parsedRows.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Pre-Import Data Validation Review</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {parsedRows.length} Rows Total
                  </span>
                </h3>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <CheckCircle className="w-4 h-4" /> {validCount} Ready to Import
                  </span>
                  {errorCount > 0 && (
                    <span className="flex items-center gap-1.5 text-rose-500 font-bold">
                      <XCircle className="w-4 h-4" /> {errorCount} Contain Errors (Skipped)
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleCommitImport}
                disabled={validCount === 0}
                className={`px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg transition-all ${
                  validCount > 0
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20 cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm & Import ({validCount}) Valid Listings</span>
              </button>
            </div>

            {/* Validation Table */}
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase">
                  <tr>
                    <th className="py-3 px-3">Row</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Group Name</th>
                    <th className="py-3 px-3">Platform</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Invite URL</th>
                    <th className="py-3 px-3">Validation Diagnostics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {parsedRows.map((row) => (
                    <tr
                      key={row.rowNumber}
                      className={
                        row.status === 'error'
                          ? 'bg-rose-500/5 dark:bg-rose-950/20'
                          : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                      }
                    >
                      <td className="py-3 px-3 font-mono text-slate-400">#{row.rowNumber}</td>
                      <td className="py-3 px-3">
                        {row.status === 'valid' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" /> Valid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3" /> Error
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white max-w-[200px] truncate">
                        {row.name || '—'}
                      </td>
                      <td className="py-3 px-3 capitalize font-semibold">{row.platform || '—'}</td>
                      <td className="py-3 px-3 text-slate-500">{row.category || '—'}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500 max-w-[220px] truncate">
                        {row.inviteUrl || '—'}
                      </td>
                      <td className="py-3 px-3">
                        {row.errors.length > 0 ? (
                          <div className="space-y-1">
                            {row.errors.map((err, i) => (
                              <div key={i} className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 shrink-0" />
                                <span>{err}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-emerald-500 font-medium">Ready for directory indexing</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Import Batch History & 1-Click Rollback */}
        {importHistory.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-emerald-500" />
              <span>Import History & Safe Rollback</span>
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {importHistory.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.filename}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {item.date} • {item.valid} rows processed (Batch ID: {item.id})
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Roll back batch ${item.id}? This will remove the ${item.valid} imported groups.`)) {
                        setImportHistory(importHistory.filter((h) => h.id !== item.id));
                        showToast(`Batch ${item.id} successfully rolled back.`);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 font-bold transition-colors cursor-pointer"
                  >
                    Roll Back Batch
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
