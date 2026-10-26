'use client';

import React, { useState } from 'react';
import { CANONICAL_RESOURCES, ResourceItem } from '../lib/study-roadmap';
import { ExternalLink, BookOpen, Video, FileText, Github, Search, PenLine } from 'lucide-react';

interface CanonicalLibrarySectionProps {
  onAddNoteForResource: (resourceTitle: string) => void;
}

export const CanonicalLibrarySection: React.FC<CanonicalLibrarySectionProps> = ({
  onAddNoteForResource,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'book' | 'video' | 'paper' | 'repo'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredResources = CANONICAL_RESOURCES.filter((res) => {
    if (filterType !== 'all' && res.type !== filterType) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      res.title.toLowerCase().includes(q) ||
      res.author.toLowerCase().includes(q) ||
      res.summary.toLowerCase().includes(q) ||
      res.keyTopics.some((t) => t.toLowerCase().includes(q))
    );
  });

  const getIconForType = (type: ResourceItem['type']) => {
    switch (type) {
      case 'book':
        return <BookOpen className="h-4 w-4 text-[#ff243b]" />;
      case 'video':
        return <Video className="h-4 w-4 text-[#ff475b]" />;
      case 'paper':
        return <FileText className="h-4 w-4 text-[#ff7888]" />;
      case 'repo':
        return <Github className="h-4 w-4 text-white" />;
    }
  };

  return (
    <section id="recursos" className="py-16 md:py-24 border-b border-[#272b35] bg-[#08090c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff243b] mb-2 font-semibold">
            Biblioteca do Criador
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f6fa] tracking-tight">
            Livros, Papers, Vídeos & Código Fonte Canônicos
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9298a6]">
            A bibliografia essencial rigorosamente selecionada para construir cada camada do compilador e runtime do Asthex.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9298a6]" />
            <input
              type="text"
              placeholder="Pesquisar por título, autor ou tema (ex: Nystrom, TAPL, LLVM)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#272b35] bg-[#101218] pl-9 pr-4 py-2 text-xs sm:text-sm text-[#f5f6fa] placeholder-[#9298a6] focus:border-[#ff243b] focus:outline-none focus:ring-1 focus:ring-[#ff243b]"
            />
          </div>

          {/* Segmented Filter */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#101218] border border-[#272b35] rounded-lg" role="tablist" aria-label="Filtrar por tipo de mídia">
            <button
              onClick={() => setFilterType('all')}
              type="button"
              role="tab"
              aria-selected={filterType === 'all'}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                filterType === 'all'
                  ? 'bg-[#1e222d] text-[#ff243b] shadow-sm font-bold'
                  : 'text-[#9298a6] hover:text-[#f5f6fa]'
              }`}
            >
              Todos ({CANONICAL_RESOURCES.length})
            </button>
            <button
              onClick={() => setFilterType('book')}
              type="button"
              role="tab"
              aria-selected={filterType === 'book'}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                filterType === 'book'
                  ? 'bg-[#1e222d] text-[#ff243b] shadow-sm font-bold'
                  : 'text-[#9298a6] hover:text-[#f5f6fa]'
              }`}
            >
              Livros
            </button>
            <button
              onClick={() => setFilterType('video')}
              type="button"
              role="tab"
              aria-selected={filterType === 'video'}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                filterType === 'video'
                  ? 'bg-[#1e222d] text-[#ff243b] shadow-sm font-bold'
                  : 'text-[#9298a6] hover:text-[#f5f6fa]'
              }`}
            >
              Vídeos
            </button>
            <button
              onClick={() => setFilterType('paper')}
              type="button"
              role="tab"
              aria-selected={filterType === 'paper'}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                filterType === 'paper'
                  ? 'bg-[#1e222d] text-[#ff243b] shadow-sm font-bold'
                  : 'text-[#9298a6] hover:text-[#f5f6fa]'
              }`}
            >
              Papers
            </button>
            <button
              onClick={() => setFilterType('repo')}
              type="button"
              role="tab"
              aria-selected={filterType === 'repo'}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                filterType === 'repo'
                  ? 'bg-[#1e222d] text-[#ff243b] shadow-sm font-bold'
                  : 'text-[#9298a6] hover:text-[#f5f6fa]'
              }`}
            >
              Código Aberto
            </button>
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="flex flex-col justify-between rounded-xl border border-[#272b35] bg-[#101218] p-6 transition-all hover:border-[#ff243b]/50 hover:shadow-[0_0_20px_rgba(255,36,59,0.12)]"
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center justify-between gap-2 text-xs text-[#9298a6] mb-2 font-mono">
                  <div className="flex items-center gap-1.5">
                    {getIconForType(res.type)}
                    <span className="text-[#ff243b] font-bold">{res.typeLabel}</span>
                  </div>
                  <span className="text-[#9298a6]">{res.author}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-lg tracking-tight mb-2">
                  {res.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#dfe2e9] leading-relaxed mb-4">
                  {res.summary}
                </p>

                {/* Why it matters for Asthex */}
                <div className="rounded-lg bg-[#08090c] p-3.5 border border-[#272b35] mb-4 text-xs">
                  <div className="font-mono text-[#ff243b] font-bold mb-1">
                    Aplicação no Asthex:
                  </div>
                  <div className="text-[#dfe2e9] leading-relaxed">
                    {res.relevanceToAsthex}
                  </div>
                </div>

                {/* Key topics */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {res.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-[#9298a6] bg-[#08090c] border border-[#272b35] px-2 py-0.5 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#272b35] gap-2">
                <button
                  onClick={() => onAddNoteForResource(res.title)}
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-[#9298a6] hover:text-[#ff243b] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-sm font-mono"
                >
                  <PenLine className="h-3.5 w-3.5" />
                  <span>Anotar Insight</span>
                </button>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff243b] hover:text-[#ff475b] transition-colors focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-sm"
                >
                  <span>Acessar Material</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
