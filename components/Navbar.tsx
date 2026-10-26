'use client';

import React, { useState } from 'react';
import { AsthexLogo } from './AsthexLogo';
import { NotebookPen, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  completedCount: number;
  totalTasks: number;
  onOpenNotes: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ completedCount, totalTasks, onOpenNotes }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#272b35] bg-[#08090c]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand with Official Asthex Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-md"
        >
          <AsthexLogo size={34} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-lg font-extrabold tracking-[0.16em] text-[#f5f6fa]">
                ASTHEX
              </span>
              <span className="text-xs font-mono font-bold text-[#ff243b]">.astun</span>
            </div>
            <div className="text-[10px] text-[#9298a6] tracking-wider uppercase font-mono">
              Física & Silício
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navegação Principal">
          <a
            href="#arquitetura"
            className="text-xs uppercase tracking-wider font-mono text-[#9298a6] transition-colors hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-sm"
          >
            Arquitetura
          </a>
          <a
            href="#codigo"
            className="text-xs uppercase tracking-wider font-mono text-[#9298a6] transition-colors hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-sm"
          >
            Sintaxe
          </a>
          <a
            href="#typechecker"
            className="text-xs uppercase tracking-wider font-mono text-[#9298a6] transition-colors hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-sm"
          >
            Type Checker
          </a>
          <a
            href="#trilha"
            className="text-xs uppercase tracking-wider font-mono text-[#9298a6] transition-colors hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-sm"
          >
            Trilha de Estudos
          </a>
          <a
            href="#recursos"
            className="text-xs uppercase tracking-wider font-mono text-[#9298a6] transition-colors hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-sm"
          >
            Biblioteca
          </a>
          <a
            href="#metodologia"
            className="text-xs uppercase tracking-wider font-mono text-[#9298a6] transition-colors hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b] rounded-sm"
          >
            Metodologia
          </a>
        </nav>

        {/* Right CTA: Progress indicator & Notes Drawer */}
        <div className="flex items-center gap-3">
          {/* Progress preview */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-[#9298a6]">
            <span className="flex h-2 w-2 rounded-full bg-[#ff243b] shadow-[0_0_8px_#ff243b]" />
            <span>
              <strong className="text-white">{completedCount}</strong>/{totalTasks} ({percent}%)
            </span>
          </div>

          <button
            onClick={onOpenNotes}
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[#272b35] bg-[#101218] px-3 py-1.5 text-xs font-mono text-[#f5f6fa] transition-colors hover:border-[#ff243b]/60 hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b]"
            aria-label="Abrir Caderno de Estudos e Anotações"
          >
            <NotebookPen className="h-4 w-4 text-[#ff243b]" />
            <span className="hidden sm:inline">Caderno do Logos</span>
            <span className="sm:hidden">Notas</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="flex md:hidden p-2 rounded-lg border border-[#272b35] text-[#9298a6] hover:text-white hover:bg-[#101218] focus-visible:ring-2 focus-visible:ring-[#ff243b]"
            aria-label="Alternar menu de navegação móvel"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#272b35] bg-[#08090c] px-4 pt-3 pb-5 space-y-2">
          <a
            href="#arquitetura"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#f5f6fa] hover:text-[#ff243b] hover:bg-[#101218] rounded-md font-mono text-xs"
          >
            Arquitetura & Pilares
          </a>
          <a
            href="#codigo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#f5f6fa] hover:text-[#ff243b] hover:bg-[#101218] rounded-md font-mono text-xs"
          >
            Sintaxe & Exemplos .astun
          </a>
          <a
            href="#typechecker"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#f5f6fa] hover:text-[#ff243b] hover:bg-[#101218] rounded-md font-mono text-xs"
          >
            Simulador de Type Checker Físico
          </a>
          <a
            href="#trilha"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#f5f6fa] hover:text-[#ff243b] hover:bg-[#101218] rounded-md font-mono text-xs"
          >
            Trilha de Estudos Completa
          </a>
          <a
            href="#recursos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#f5f6fa] hover:text-[#ff243b] hover:bg-[#101218] rounded-md font-mono text-xs"
          >
            Biblioteca de Livros & Vídeos
          </a>
          <a
            href="#metodologia"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#f5f6fa] hover:text-[#ff243b] hover:bg-[#101218] rounded-md font-mono text-xs"
          >
            Metodologia & Estrutura Rust
          </a>
          <div className="pt-2 border-t border-[#272b35] flex items-center justify-between text-xs text-[#9298a6]">
            <span>Progresso da Trilha</span>
            <span className="font-mono text-[#ff243b]">{percent}% concluído</span>
          </div>
        </div>
      )}
    </header>
  );
};
