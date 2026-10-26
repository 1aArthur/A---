'use client';

import React, { useState } from 'react';
import { Atom, ShieldCheck, Zap, Cpu, RefreshCw, Moon, CheckCircle2 } from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  sub: string;
  description: string;
  tech: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'source',
    name: 'Código Fonte .astun',
    sub: 'Entrada Textual',
    description: 'Sintaxe expressiva e limpa combinando operadores de pipeline (|>) e anotações dimensionais como Float[kg] e Position3D[m].',
    tech: 'Gramática EBNF / Unicode',
  },
  {
    id: 'frontend',
    name: 'Lexer & Pratt Parser',
    sub: 'Análise Sintática',
    description: 'Transforma o texto em tokens tipados e constrói a Árvore Sintática Abstrata (AST) com precedência de operadores matemáticos e físicos.',
    tech: 'Rust / Enums / Pratt Parser',
  },
  {
    id: 'typechecker',
    name: 'Type Checker Dimensional',
    sub: 'Teoria dos Tipos & Z^7',
    description: 'Resolve a álgebra do grupo abeliano SI (soma de expoentes L, M, T) e aplica semântica de movimento afim sem alocador de lixo.',
    tech: 'Abelian Groups / Affine Types',
  },
  {
    id: 'mlir',
    name: 'Uni-IR (Dialetos MLIR)',
    sub: 'Otimização Poliedral',
    description: 'Representação intermediária multi-nível capaz de desdobrar tensores de IA e cálculos vetoriais antes da geração de máquina.',
    tech: 'MLIR C++ / LLVM Core',
  },
  {
    id: 'backends',
    name: 'Backends Polimórficos',
    sub: 'Hardware Heterogêneo',
    description: 'Gera código nativo x86_64/ARM via LLVM, shaders de computação SPIR-V/Vulkan para GPU e módulos compactos WASM para Web.',
    tech: 'LLVM / SPIR-V / WASM / Luau FFI',
  },
];

export const ArchitecturePillars: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<PipelineStep>(PIPELINE_STEPS[2]);

  return (
    <section id="arquitetura" className="py-16 md:py-24 border-b border-[#272b35] bg-[#08090c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff243b] mb-2 font-semibold">
            Fundamentos de Engenharia
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f6fa] tracking-tight">
            Os 6 Pilares Arquiteturais do Asthex
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9298a6]">
            Cada aspecto foi projetado a partir de primeiros princípios para unificar a física matemática com o hardware de alta performance.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="rounded-xl border border-[#272b35] bg-[#101218] p-6 transition-all hover:border-[#ff243b]/60 hover:shadow-[0_0_20px_rgba(255,36,59,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/40 border border-[#ff243b]/40 text-[#ff243b]">
                <Atom className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Física no Sistema de Tipos</h3>
                <span className="text-xs text-[#9298a6] font-mono">Grupo Abeliano Z^7</span>
              </div>
            </div>
            <p className="text-sm text-[#9298a6] leading-relaxed">
              Grandezas físicas (massa, comprimento, tempo, corrente) são checadas em tempo de compilação. Operações inválidas como somar metros e segundos são rejeitadas a custo zero de execução.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-xl border border-[#272b35] bg-[#101218] p-6 transition-all hover:border-[#ff243b]/60 hover:shadow-[0_0_20px_rgba(255,36,59,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/40 border border-[#ff243b]/40 text-[#ff243b]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Segurança Afim & Sem GC</h3>
                <span className="text-xs text-[#9298a6] font-mono">Arenas + Linear Types</span>
              </div>
            </div>
            <p className="text-sm text-[#9298a6] leading-relaxed">
              Sem coletor de lixo periódico que congele a CPU. Cada recurso pertence a um proprietário estrito; atores utilizam alocação de memória por Arenas com liberação em bloco O(1).
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-xl border border-[#272b35] bg-[#101218] p-6 transition-all hover:border-[#ff243b]/60 hover:shadow-[0_0_20px_rgba(255,36,59,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/40 border border-[#ff243b]/40 text-[#ff243b]">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Atores M:N & Concorrência</h3>
                <span className="text-xs text-[#9298a6] font-mono">BEAM / Elixir Nativo</span>
              </div>
            </div>
            <p className="text-sm text-[#9298a6] leading-relaxed">
              Milhões de processos ultraleves com caixas de correio tipadas e escalonador work-stealing. Se um processo falha, os supervisores nativos o reiniciam sem derrubar o sistema.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-xl border border-[#272b35] bg-[#101218] p-6 transition-all hover:border-[#ff243b]/60 hover:shadow-[0_0_20px_rgba(255,36,59,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/40 border border-[#ff243b]/40 text-[#ff243b]">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Hardware Heterogêneo & MLIR</h3>
                <span className="text-xs text-[#9298a6] font-mono">CPU + GPU + Vulkan/SPIR-V</span>
              </div>
            </div>
            <p className="text-sm text-[#9298a6] leading-relaxed">
              O compilador não se limita à CPU. Através de dialetos MLIR e anotações como @compile(target = GPU), kernels paralelos de tensores e N-corpos executam nativamente na GPU.
            </p>
          </div>

          {/* Pillar 5 */}
          <div className="rounded-xl border border-[#272b35] bg-[#101218] p-6 transition-all hover:border-[#ff243b]/60 hover:shadow-[0_0_20px_rgba(255,36,59,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/40 border border-[#ff243b]/40 text-[#ff243b]">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Reatividade de Grão Fino</h3>
                <span className="text-xs text-[#9298a6] font-mono">Solid.js sem Virtual DOM</span>
              </div>
            </div>
            <p className="text-sm text-[#9298a6] leading-relaxed">
              Sinais reativos integrados como primitivas da linguagem. Mudanças de estado notificam diretamente os observadores conectados no Grafo Acíclico Dirigido (DAG), sem diff de árvores.
            </p>
          </div>

          {/* Pillar 6 */}
          <div className="rounded-xl border border-[#272b35] bg-[#101218] p-6 transition-all hover:border-[#ff243b]/60 hover:shadow-[0_0_20px_rgba(255,36,59,0.12)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950/40 border border-[#ff243b]/40 text-[#ff243b]">
                <Moon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Ilhas Poliglotas & Luau</h3>
                <span className="text-xs text-[#9298a6] font-mono">Astro-like + Comptime Scripts</span>
              </div>
            </div>
            <p className="text-sm text-[#9298a6] leading-relaxed">
              Separação entre Data Plane (Asthex nativo brutalmente rápido) e Control Plane (scripts seguros Luau com hot-reload e metaprogramação em tempo de compilação).
            </p>
          </div>
        </div>

        {/* Interactive Compiler Pipeline Flow */}
        <div className="mt-16 rounded-xl border border-[#272b35] bg-[#101218] p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#272b35]">
            <div>
              <h3 className="text-lg font-bold text-white">Pipeline de Compilação do astunc</h3>
              <p className="text-xs sm:text-sm text-[#9298a6]">
                Clique em qualquer etapa do fluxo para inspecionar os detalhes técnicos de cada fase do compilador.
              </p>
            </div>
            <div className="text-xs font-mono text-[#ff243b]">
              Etapa Selecionada: {selectedStep.name}
            </div>
          </div>

          {/* Interactive Step Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6" role="tablist" aria-label="Fases do Pipeline de Compilação">
            {PIPELINE_STEPS.map((step, idx) => {
              const isActive = selectedStep.id === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(step)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`text-left p-3.5 rounded-lg border transition-all ${
                    isActive
                      ? 'border-[#ff243b] bg-red-950/30 text-white shadow-[0_0_12px_rgba(255,36,59,0.25)]'
                      : 'border-[#272b35] bg-[#08090c] text-[#9298a6] hover:border-[#ff243b]/40 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#ff243b] mb-1">0{idx + 1}. FASE</div>
                  <div className="text-xs sm:text-sm font-semibold truncate">{step.name}</div>
                  <div className="text-[11px] text-[#9298a6] truncate">{step.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Step Deep Dive Card */}
          <div className="rounded-lg border border-[#272b35] bg-[#08090c] p-5 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-semibold text-white text-base">{selectedStep.name}</span>
              <span className="font-mono text-xs text-[#ff243b] bg-[#101218] border border-[#272b35] px-2.5 py-0.5 rounded">
                Tecnologia: {selectedStep.tech}
              </span>
            </div>
            <p className="text-[#dfe2e9] leading-relaxed mb-4">{selectedStep.description}</p>
            <div className="flex items-center gap-2 text-xs text-[#9298a6] font-mono">
              <span className="text-[#ff243b] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" /> Verificado sem runtime overhead
              </span>
              <span>·</span>
              <span>Garante integridade matemática antes do silício</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
