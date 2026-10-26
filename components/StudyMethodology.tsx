'use client';

import React, { useState } from 'react';
import { STUDY_METHODOLOGY_STEPS } from '../lib/study-roadmap';
import { Check, Copy } from 'lucide-react';

const REPO_TREE = `asthex/
├── astun.build.luau          # Manifesto de build tipado em Luau
├── Cargo.toml                # Workspace Rust do compilador astunc
├── crates/
│   ├── astun-lexer/          # Scanner com suporte a unidades dimensionais <m/s>
│   ├── astun-parser/         # Pratt Parser para precedência e pipeline |>
│   ├── astun-ast/            # Nós e enums da Árvore Sintática Abstrata
│   ├── astun-typechecker/    # Álgebra dimensional (Z^7) e tipos afins
│   ├── astun-mlir/           # Dialetos intermediários e kernels paralelos
│   ├── astun-runtime/        # Escalonador M:N de atores e reatividade
│   └── astunc/               # CLI principal (astunc build / astunc run)
└── examples/
    ├── nbody_gravity.astun   # Simulação astrofísica em GPU
    └── reactive_island.astun # Ilha WASM reativa estilo Solid + Astro`;

export const StudyMethodology: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyTree = async () => {
    try {
      await navigator.clipboard.writeText(REPO_TREE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="metodologia" className="py-16 md:py-24 border-b border-[#272b35] bg-[#08090c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff243b] mb-2 font-semibold">
            Metodologia de Aprendizado
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f6fa] tracking-tight">
            Como Estudar e Construir a Linguagem com Sucesso
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9298a6]">
            Criar uma linguagem é um projeto de alta complexidade conceitual. Seguir um método rigoroso é a diferença entre uma ideia abandonada e um compilador funcional.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {STUDY_METHODOLOGY_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#272b35] bg-[#101218] p-6 transition-all hover:border-[#ff243b]/50 hover:shadow-[0_0_16px_rgba(255,36,59,0.1)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-950/50 border border-[#ff243b]/50 font-mono text-xs font-bold text-[#ff243b]">
                  0{item.step}
                </div>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#dfe2e9] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Recommended Project Architecture Workspace */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#272b35] bg-[#101218] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#272b35]">
            <div>
              <div className="text-sm font-semibold text-white">
                Estrutura de Repositório Recomendada para o Asthex
              </div>
              <div className="text-xs text-[#9298a6]">
                Workspace modular em Rust para desacoplar as camadas do compilador astunc
              </div>
            </div>

            <button
              onClick={handleCopyTree}
              type="button"
              className="flex items-center gap-1.5 rounded border border-[#272b35] bg-[#08090c] px-3 py-1.5 text-xs font-mono text-[#dfe2e9] hover:text-[#ff243b] hover:border-[#ff243b]/50 focus-visible:ring-2 focus-visible:ring-[#ff243b] self-start sm:self-auto"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Estrutura Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#ff243b]" />
                  <span>Copiar Estrutura</span>
                </>
              )}
            </button>
          </div>

          <pre className="overflow-x-auto rounded-lg bg-[#06070a] p-4 font-mono text-xs text-[#dfe2e9] leading-relaxed border border-[#272b35]">
            <code>{REPO_TREE}</code>
          </pre>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#9298a6] font-mono">
            <span>Dica de Inicialização:</span>
            <code className="text-[#ff243b] bg-[#08090c] px-2 py-0.5 rounded border border-[#272b35]">
              cargo new --lib crates/astun-lexer
            </code>
            <span>·</span>
            <code className="text-white bg-[#08090c] px-2 py-0.5 rounded border border-[#272b35]">
              cargo test --all
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};
