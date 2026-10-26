'use client';

import React, { useState } from 'react';
import { ASTHEX_CODE_SAMPLES } from '../lib/study-roadmap';
import { Check, Copy, FileCode2 } from 'lucide-react';

export const CodeExplorer: React.FC = () => {
  const [activeSampleId, setActiveSampleId] = useState<string>('nbody');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSample =
    ASTHEX_CODE_SAMPLES.find((s) => s.id === activeSampleId) || ASTHEX_CODE_SAMPLES[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const renderFormattedLine = (line: string) => {
    if (line.trim().startsWith('//') || line.trim().startsWith('--')) {
      return <span className="text-[#697184] italic">{line}</span>;
    }

    const keywords = [
      'module',
      'use',
      'struct',
      'const',
      'fn',
      'return',
      'let',
      'mut',
      'for',
      'in',
      'if',
      'else',
      'actor',
      'state',
      'signal',
      'component',
      'input',
      'watch',
      'match',
      'local',
      'true',
      'false',
      'pub',
      'enum',
      'impl',
      'self',
      'Self',
    ];

    const types = [
      'Float',
      'Vector3D',
      'Vector',
      'CelestialBody',
      'Body',
      'Signal',
      'ActorRef',
      'Message',
      'u64',
      'f32',
      'f64',
      'String',
      'AsthexBuildConfig',
      'Dimensions',
      'Token',
    ];

    return (
      <span>
        {line.split(/([A-Za-z0-9_]+|<[^>]+>|@\w+|\|>|->|=>)/g).map((token, i) => {
          if (!token) return null;

          if (token.startsWith('@')) {
            return (
              <span key={i} className="text-[#ff6b4a] font-semibold">
                {token}
              </span>
            );
          }

          if (token.startsWith('<') && token.endsWith('>')) {
            return (
              <span
                key={i}
                className="text-[#ff243b] font-bold bg-[#ff243b]/10 border border-[#ff243b]/30 px-1 py-0.2 rounded"
              >
                {token}
              </span>
            );
          }

          if (token === '|>' || token === '->' || token === '=>') {
            return (
              <span key={i} className="text-[#ff243b] font-extrabold">
                {token}
              </span>
            );
          }

          if (keywords.includes(token)) {
            return (
              <span key={i} className="text-[#ff475b] font-medium">
                {token}
              </span>
            );
          }

          if (types.includes(token)) {
            return (
              <span key={i} className="text-[#f5f6fa] font-medium">
                {token}
              </span>
            );
          }

          return <span key={i}>{token}</span>;
        })}
      </span>
    );
  };

  const lines = activeSample.code.split('\n');

  return (
    <section id="codigo" className="py-16 md:py-24 border-b border-[#272b35] bg-[#08090c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff243b] mb-2 font-semibold">
            Sintaxe Canônica
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f6fa] tracking-tight">
            Especificação & Exemplos de Código
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9298a6]">
            Veja como a sintaxe funde a ergonomia do Python, a tipagem dimensional com grupos abelianos, atores do Elixir e o modelo de build seguro com Luau.
          </p>
        </div>

        {/* Code Showcase Window */}
        <div className="mx-auto max-w-5xl rounded-xl border border-[#272b35] bg-[#101218] shadow-2xl overflow-hidden">
          {/* Header Bar with Tabs & Copy Button */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#272b35] bg-[#08090c] px-4 py-2.5 gap-2">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Exemplos de Código Asthex">
              {ASTHEX_CODE_SAMPLES.map((sample) => {
                const isActive = sample.id === activeSample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => setActiveSampleId(sample.id)}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-[#181b24] text-[#ff243b] font-bold shadow-sm border border-[#ff243b]/50'
                        : 'text-[#9298a6] hover:bg-[#12141c] hover:text-[#f5f6fa]'
                    }`}
                  >
                    <FileCode2 className="h-3.5 w-3.5" />
                    <span>{sample.filename}</span>
                  </button>
                );
              })}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              type="button"
              className="flex items-center gap-1.5 rounded border border-[#272b35] bg-[#101218] px-3 py-1 text-xs font-mono text-[#dfe2e9] transition-colors hover:border-[#ff243b]/60 hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b]"
              aria-label={`Copiar código de ${activeSample.filename}`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>

          {/* Sample Description & Highlights Header */}
          <div className="border-b border-[#272b35] bg-[#101218]/90 px-5 py-3.5">
            <div className="text-sm font-semibold text-white">{activeSample.title}</div>
            <p className="mt-1 text-xs text-[#9298a6]">{activeSample.description}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs font-mono text-[#dfe2e9]">
              <span className="text-[#9298a6]">Tokens Chave:</span>
              {activeSample.highlights.map((hl, i) => (
                <span
                  key={i}
                  className="rounded bg-[#08090c] px-2 py-0.5 text-[#ff243b] border border-[#272b35] text-[11px] font-semibold"
                >
                  {hl}
                </span>
              ))}
            </div>
          </div>

          {/* Code Body in Deep Pitch Black */}
          <div className="overflow-x-auto p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed bg-[#06070a]">
            <pre className="text-[#dfe2e9]">
              <code>
                {lines.map((line, index) => (
                  <div key={index} className="table-row">
                    <span className="table-cell select-none pr-4 sm:pr-6 text-right text-[#484f60] text-xs">
                      {index + 1}
                    </span>
                    <span className="table-cell">{renderFormattedLine(line)}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
