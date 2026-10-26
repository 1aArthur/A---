'use client';

import React, { useState, useId } from 'react';
import {
  checkPhysicalOperation,
  formatDimensionVector,
  STANDARD_UNITS,
  OperationType,
  TypeCheckResult,
} from '../lib/dimensional-algebra';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface PresetItem {
  label: string;
  left: string;
  op: OperationType;
  right: string;
  note: string;
}

const PRESETS: PresetItem[] = [
  {
    label: '2ª Lei de Newton: F = m · a',
    left: 'kg',
    op: '*',
    right: 'm/s^2',
    note: 'Massa × Aceleração resulta na unidade de Força (Newton: M¹ L¹ T⁻²)',
  },
  {
    label: 'Cinemática: d = v · t',
    left: 'm/s',
    op: '*',
    right: 's',
    note: 'Velocidade × Tempo resulta em Deslocamento (Metro: L¹)',
  },
  {
    label: 'Trabalho / Energia: W = F · d',
    left: 'N',
    op: '*',
    right: 'm',
    note: 'Força × Distância resulta na unidade de Energia (Joule: M¹ L² T⁻²)',
  },
  {
    label: 'Potência: P = E / t',
    left: 'J',
    op: '/',
    right: 's',
    note: 'Energia / Tempo resulta na taxa de Potência (Watt: M¹ L² T⁻³)',
  },
  {
    label: 'Violação Física: v + t',
    left: 'm/s',
    op: '+',
    right: 's',
    note: 'Erro de compilação: Não é possível somar velocidade com tempo!',
  },
  {
    label: 'Soma Homogênea: m + m',
    left: 'm',
    op: '+',
    right: 'm',
    note: 'Válido: Comprimentos somados preservam a dimensão Metro',
  },
];

export const DimensionalTypeSimulator: React.FC = () => {
  const [leftUnit, setLeftUnit] = useState<string>('kg');
  const [operator, setOperator] = useState<OperationType>('*');
  const [rightUnit, setRightUnit] = useState<string>('m/s^2');

  const leftSelectId = useId();
  const operatorSelectId = useId();
  const rightSelectId = useId();

  const result: TypeCheckResult = checkPhysicalOperation(operator, leftUnit, rightUnit);

  const applyPreset = (preset: PresetItem) => {
    setLeftUnit(preset.left);
    setOperator(preset.op);
    setRightUnit(preset.right);
  };

  const unitKeys = Object.keys(STANDARD_UNITS);

  return (
    <section id="typechecker" className="py-16 md:py-24 border-b border-[#272b35] bg-[#08090c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff243b] mb-2 font-semibold">
            Simulador em Tempo Real
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f6fa] tracking-tight">
            Laboratório de Tipagem Dimensional SI (Z^7)
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9298a6]">
            Experimente como o compilador do Asthex avalia expressões físicas em tempo de compilação sem nenhum custo de execução.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[#9298a6] font-mono mr-2">Exemplos Prontos:</span>
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              type="button"
              className="rounded-lg border border-[#272b35] bg-[#101218] px-3 py-1.5 text-xs text-[#dfe2e9] transition-all hover:border-[#ff243b]/60 hover:text-[#ff243b] focus-visible:ring-2 focus-visible:ring-[#ff243b]"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Simulator Box */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#272b35] bg-[#101218] p-6 md:p-8 shadow-2xl">
          {/* Controls: Left, Op, Right */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {/* Left Operand */}
            <div className="md:col-span-3 space-y-2">
              <label htmlFor={leftSelectId} className="block text-xs font-mono text-[#9298a6]">
                Operando Esquerdo (Tipo A)
              </label>
              <select
                id={leftSelectId}
                value={leftUnit}
                onChange={(e) => setLeftUnit(e.target.value)}
                className="w-full rounded-lg border border-[#272b35] bg-[#08090c] px-3 py-2.5 font-mono text-sm text-[#f5f6fa] focus:border-[#ff243b] focus:outline-none focus:ring-1 focus:ring-[#ff243b]"
              >
                {unitKeys.map((key) => (
                  <option key={key} value={key}>
                    {STANDARD_UNITS[key].symbol} — {STANDARD_UNITS[key].name}
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-[#9298a6] font-mono">
                Dimensão: {formatDimensionVector(STANDARD_UNITS[leftUnit]?.vector || STANDARD_UNITS['m'].vector)}
              </div>
            </div>

            {/* Operator */}
            <div className="md:col-span-1 space-y-2 text-center">
              <label htmlFor={operatorSelectId} className="block text-xs font-mono text-[#9298a6]">
                Operador
              </label>
              <select
                id={operatorSelectId}
                value={operator}
                onChange={(e) => setOperator(e.target.value as OperationType)}
                className="w-full text-center rounded-lg border border-[#272b35] bg-[#08090c] px-3 py-2.5 font-mono text-lg font-bold text-[#ff243b] focus:border-[#ff243b] focus:outline-none focus:ring-1 focus:ring-[#ff243b]"
                aria-label="Operador Físico"
              >
                <option value="*">×</option>
                <option value="/">÷</option>
                <option value="+">+</option>
                <option value="-">−</option>
              </select>
            </div>

            {/* Right Operand */}
            <div className="md:col-span-3 space-y-2">
              <label htmlFor={rightSelectId} className="block text-xs font-mono text-[#9298a6]">
                Operando Direito (Tipo B)
              </label>
              <select
                id={rightSelectId}
                value={rightUnit}
                onChange={(e) => setRightUnit(e.target.value)}
                className="w-full rounded-lg border border-[#272b35] bg-[#08090c] px-3 py-2.5 font-mono text-sm text-[#f5f6fa] focus:border-[#ff243b] focus:outline-none focus:ring-1 focus:ring-[#ff243b]"
              >
                {unitKeys.map((key) => (
                  <option key={key} value={key}>
                    {STANDARD_UNITS[key].symbol} — {STANDARD_UNITS[key].name}
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-[#9298a6] font-mono">
                Dimensão: {formatDimensionVector(STANDARD_UNITS[rightUnit]?.vector || STANDARD_UNITS['s'].vector)}
              </div>
            </div>
          </div>

          {/* Evaluation Result Display */}
          <div className="mt-8 pt-6 border-t border-[#272b35]">
            <div
              className={`rounded-xl border p-5 ${
                result.success
                  ? 'border-emerald-800/80 bg-emerald-950/20'
                  : 'border-[#ff243b]/60 bg-red-950/20 shadow-[0_0_20px_rgba(255,36,59,0.1)]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-[#ff243b]" />
                  )}
                  <span className="font-semibold text-white text-base">
                    {result.success
                      ? 'Compilação Aceita: Homogeneidade Dimensional Válida'
                      : 'Erro de Compilação: Violação de Lei Física'}
                  </span>
                </div>

                <div className="font-mono text-xs px-2.5 py-1 rounded bg-[#08090c] border border-[#272b35]">
                  {result.success ? (
                    <span className="text-emerald-400 font-bold">Tipo Resultante: [{result.resultSymbol}]</span>
                  ) : (
                    <span className="text-[#ff243b] font-bold">astunc::E0041</span>
                  )}
                </div>
              </div>

              {/* Rationale */}
              <p className="text-sm text-[#dfe2e9] leading-relaxed mb-4">
                {result.explanation}
              </p>

              {result.error && (
                <div className="rounded bg-[#08090c] p-3 font-mono text-xs text-[#ff6b7b] border border-[#ff243b]/40 mb-3">
                  {result.error}
                </div>
              )}

              {/* Exponent breakdown if success */}
              {result.success && result.resultVector && (
                <div className="mt-3 pt-3 border-t border-emerald-900/30 text-xs font-mono text-[#9298a6]">
                  <div className="mb-2 text-[#dfe2e9] font-medium">
                    Vetor de Expoentes Abelianos SI:
                  </div>
                  <div className="flex flex-wrap gap-2 text-white">
                    <span className="bg-[#08090c] border border-[#272b35] px-2 py-0.5 rounded">
                      Comprimento (L): <strong className="text-[#ff243b]">{result.resultVector.l}</strong>
                    </span>
                    <span className="bg-[#08090c] border border-[#272b35] px-2 py-0.5 rounded">
                      Massa (M): <strong className="text-[#ff243b]">{result.resultVector.m}</strong>
                    </span>
                    <span className="bg-[#08090c] border border-[#272b35] px-2 py-0.5 rounded">
                      Tempo (T): <strong className="text-[#ff243b]">{result.resultVector.t}</strong>
                    </span>
                    <span className="bg-[#08090c] border border-[#272b35] px-2 py-0.5 rounded">
                      Corrente (I): <strong className="text-[#ff243b]">{result.resultVector.i}</strong>
                    </span>
                    <span className="bg-[#08090c] border border-[#272b35] px-2 py-0.5 rounded">
                      Temp (Θ): <strong className="text-[#ff243b]">{result.resultVector.theta}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
