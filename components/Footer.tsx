'use client';

import React from 'react';
import { AsthexLogo } from './AsthexLogo';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#272b35] bg-[#08090c] py-12 text-[#9298a6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#272b35]/80">
          <div className="flex items-center gap-3">
            <AsthexLogo size={32} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-[0.16em]">
                  ASTHEX
                </span>
                <span className="font-mono text-xs font-bold text-[#ff243b]">.astun</span>
              </div>
              <div className="text-xs text-[#9298a6]">Laboratório & Arquitetura de Linguagens</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono font-medium text-[#dfe2e9]">
            <a href="#arquitetura" className="hover:text-[#ff243b] transition-colors">
              Arquitetura
            </a>
            <a href="#codigo" className="hover:text-[#ff243b] transition-colors">
              Sintaxe .astun
            </a>
            <a href="#typechecker" className="hover:text-[#ff243b] transition-colors">
              Type Checker
            </a>
            <a href="#trilha" className="hover:text-[#ff243b] transition-colors">
              Trilha de Estudos
            </a>
            <a href="#recursos" className="hover:text-[#ff243b] transition-colors">
              Biblioteca
            </a>
            <a href="#metodologia" className="hover:text-[#ff243b] transition-colors">
              Metodologia
            </a>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-[#272b35] bg-[#101218] px-3 py-1.5 text-xs text-[#dfe2e9] hover:text-[#ff243b] hover:border-[#ff243b]/50 transition-colors"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#ff243b]" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9298a6]">
          <p className="italic text-center sm:text-left text-[#9298a6]">
            &ldquo;O código é a formalização matemática de como a matéria processa a informação através do tempo.&rdquo;
          </p>
          <div className="font-mono text-[#9298a6]">
            Asthex Specification v0.1 · 2026
          </div>
        </div>
      </div>
    </footer>
  );
};
