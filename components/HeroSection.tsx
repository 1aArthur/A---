'use client';

import React from 'react';
import { AsthexLogo } from './AsthexLogo';
import { BookOpen, Sparkles, Code2, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onScrollToRoadmap: () => void;
  onScrollToSimulator: () => void;
  onScrollToCode: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToRoadmap,
  onScrollToSimulator,
  onScrollToCode,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-20 border-b border-[#272b35]">
      {/* Red Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[#ff243b]/10 blur-[120px]" />
        <div className="absolute top-40 left-1/4 h-64 w-64 rounded-full bg-red-950/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Topline Status Bar */}
        <div className="inline-flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[#9298a6] mb-8 pb-1 border-b border-[#272b35]/80">
          <span className="flex h-2 w-2 rounded-full bg-[#ff243b] shadow-[0_0_10px_#ff243b]" />
          <span>Especificação v0.1</span>
          <span className="text-[#ff243b]">/</span>
          <span>Arquitetura de Compiladores</span>
          <span className="text-[#ff243b]">/</span>
          <strong className="text-white">.astun</strong>
        </div>

        {/* Central Logo Emblem Presentation */}
        <div className="flex flex-col items-center justify-center mb-6">
          <AsthexLogo size={130} />
          
          <div className="mt-4 flex items-center justify-center gap-3 font-mono text-sm tracking-[0.25em] text-[#dfe2e9]">
            <span className="h-px w-12 sm:w-20 bg-[#272b35]" />
            <span>ASTHEX <span className="text-[#ff243b]">.</span>ASTUN</span>
            <span className="h-px w-12 sm:w-20 bg-[#272b35]" />
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight">
          A Linguagem de Sistemas para a{' '}
          <span className="bg-gradient-to-r from-white via-[#ff7888] to-[#ff243b] bg-clip-text text-transparent">
            Física, Concorrência e o Silício
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#9298a6] max-w-3xl mx-auto leading-relaxed">
          Projetada com a segurança afim do Rust sem Garbage Collector, a velocidade direta de C, a resiliência por atores do Elixir, tipagem física dimensional estática (SI: Z^7), reatividade de grão fino e ecossistema de ilhas com metaprogramação segura em Luau.
        </p>

        {/* Key Tenets as Red & Black Unboxed Metadata */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#9298a6] font-mono">
          <span>Zero GC & Arenas O(1)</span>
          <span className="text-[#ff243b]">/</span>
          <span>Tipagem SI Dimensional</span>
          <span className="text-[#ff243b]">/</span>
          <span>Atores M:N Nativos</span>
          <span className="text-[#ff243b]">/</span>
          <span>Kernels GPU & MLIR</span>
          <span className="text-[#ff243b]">/</span>
          <span>Metaprogramação Luau</span>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onScrollToRoadmap}
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#ff243b] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#ff3b50] hover:shadow-[0_0_24px_rgba(255,36,59,0.4)] focus-visible:ring-2 focus-visible:ring-[#ff243b]"
          >
            <BookOpen className="h-4 w-4" />
            <span>Acessar Trilha de Estudos</span>
          </button>

          <button
            onClick={onScrollToSimulator}
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[#272b35] bg-[#101218] px-5 py-3 text-sm font-medium text-[#f5f6fa] transition-all hover:border-[#ff243b]/60 hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b]"
          >
            <Sparkles className="h-4 w-4 text-[#ff243b]" />
            <span>Testar Type Checker Físico</span>
          </button>

          <button
            onClick={onScrollToCode}
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[#272b35]/60 bg-[#08090c] px-4 py-3 text-sm font-medium text-[#9298a6] transition-colors hover:border-[#ff243b]/40 hover:text-white focus-visible:ring-2 focus-visible:ring-[#ff243b]"
          >
            <Code2 className="h-4 w-4" />
            <span>Explorar Sintaxe .astun</span>
          </button>
        </div>

        {/* Stats Row in Red & Black Theme */}
        <div className="mt-14 pt-8 border-t border-[#272b35] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">Z^7</div>
            <div className="text-xs text-[#9298a6]">Dimensões SI no sistema de tipos estático</div>
          </div>
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#ff243b]">Zero GC</div>
            <div className="text-xs text-[#9298a6]">Semântica afim & arenas O(1) por processo</div>
          </div>
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">M:N Actors</div>
            <div className="text-xs text-[#9298a6]">Escalonador work-stealing & supervisores</div>
          </div>
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#ff243b]">MLIR + WASM</div>
            <div className="text-xs text-[#9298a6]">Kernels de GPU e ilhas de interface direta</div>
          </div>
        </div>
      </div>
    </section>
  );
};
