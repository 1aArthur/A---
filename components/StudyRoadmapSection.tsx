'use client';

import React, { useState } from 'react';
import { STUDY_PHASES, StudyPhase, TaskItem } from '../lib/study-roadmap';
import {
  CheckCircle2,
  Circle,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Download,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudyRoadmapSectionProps {
  completedTaskIds: Set<string>;
  onToggleTask: (taskId: string) => void;
  onResetProgress: () => void;
}

export const StudyRoadmapSection: React.FC<StudyRoadmapSectionProps> = ({
  completedTaskIds,
  onToggleTask,
  onResetProgress,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    'phase-1': true,
    'phase-2': true,
  });

  const togglePhaseExpand = (phaseId: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  let totalTasks = 0;
  let totalHours = 0;
  let completedHours = 0;

  STUDY_PHASES.forEach((phase) => {
    phase.tasks.forEach((task) => {
      totalTasks++;
      totalHours += task.hoursEstimate;
      if (completedTaskIds.has(task.id)) {
        completedHours += task.hoursEstimate;
      }
    });
  });

  const completedCount = completedTaskIds.size;
  const percent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const handleTaskClick = (task: TaskItem, phase: StudyPhase) => {
    const isNowCompleted = !completedTaskIds.has(task.id);
    onToggleTask(task.id);

    if (isNowCompleted) {
      const phaseTasks = phase.tasks;
      const otherCompleted = phaseTasks
        .filter((t) => t.id !== task.id)
        .every((t) => completedTaskIds.has(t.id));

      if (otherCompleted) {
        try {
          confetti({
            particleCount: 55,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#ff243b', '#ffffff', '#991b1b', '#ff7888'],
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const exportProgressJSON = () => {
    const data = {
      project: 'Asthex Programming Language',
      timestamp: new Date().toISOString(),
      completedTasks: Array.from(completedTaskIds),
      totalTasks,
      percent,
      completedHours,
      totalHours,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asthex-study-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="trilha" className="py-16 md:py-24 border-b border-[#272b35] bg-[#08090c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff243b] mb-2 font-semibold">
            Trilha de Estudos Mestra
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f5f6fa] tracking-tight">
            Laboratório & Roteiro de Aprendizado
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9298a6]">
            Estruturado em 6 fases de engenharia contínua. Marque cada tarefa conforme você estuda, implementa protótipos e avança no seu compilador.
          </p>
        </div>

        {/* Global Progress Dashboard Bar */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#272b35] bg-[#101218] p-6 mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-sm font-semibold text-white">Progresso Geral de Estudos</div>
              <div className="text-xs text-[#9298a6]">
                {completedCount} de {totalTasks} tarefas finalizadas ({completedHours}h de ~{totalHours}h estimadas)
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-bold text-[#ff243b]">{percent}%</span>
              <button
                onClick={exportProgressJSON}
                type="button"
                className="flex items-center gap-1.5 rounded border border-[#272b35] bg-[#08090c] px-3 py-1.5 text-xs text-[#dfe2e9] hover:text-[#ff243b] hover:border-[#ff243b]/50 focus-visible:ring-2 focus-visible:ring-[#ff243b]"
                aria-label="Exportar relatório de progresso em JSON"
              >
                <Download className="h-3.5 w-3.5 text-[#ff243b]" />
                <span className="hidden sm:inline">Exportar JSON</span>
              </button>
              <button
                onClick={onResetProgress}
                type="button"
                className="flex items-center gap-1.5 rounded border border-[#272b35] bg-[#08090c] px-2.5 py-1.5 text-xs text-[#9298a6] hover:text-[#ff243b] hover:border-[#ff243b]/40 focus-visible:ring-2 focus-visible:ring-[#ff243b]"
                aria-label="Reiniciar progresso de estudos"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Progress Track */}
          <div className="h-2.5 w-full rounded-full bg-[#08090c] overflow-hidden border border-[#272b35]">
            <div
              className="h-full bg-gradient-to-r from-[#991b1b] via-[#ff243b] to-[#ff7888] transition-all duration-500 shadow-[0_0_12px_rgba(255,36,59,0.5)]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9298a6]" />
            <input
              type="text"
              placeholder="Buscar tarefas por conceito (ex: lexer, MLIR, arena, luau)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#272b35] bg-[#101218] pl-9 pr-4 py-2 text-xs sm:text-sm text-[#f5f6fa] placeholder-[#9298a6] focus:border-[#ff243b] focus:outline-none focus:ring-1 focus:ring-[#ff243b]"
            />
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#101218] border border-[#272b35] rounded-lg self-start sm:self-auto" role="tablist" aria-label="Filtrar tarefas">
            <button
              onClick={() => setFilterMode('all')}
              type="button"
              role="tab"
              aria-selected={filterMode === 'all'}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                filterMode === 'all'
                  ? 'bg-[#1e222d] text-[#ff243b] shadow-sm font-bold'
                  : 'text-[#9298a6] hover:text-[#f5f6fa]'
              }`}
            >
              Todas ({totalTasks})
            </button>
            <button
              onClick={() => setFilterMode('pending')}
              type="button"
              role="tab"
              aria-selected={filterMode === 'pending'}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                filterMode === 'pending'
                  ? 'bg-[#1e222d] text-[#ff243b] shadow-sm font-bold'
                  : 'text-[#9298a6] hover:text-[#f5f6fa]'
              }`}
            >
              Pendentes ({totalTasks - completedCount})
            </button>
            <button
              onClick={() => setFilterMode('completed')}
              type="button"
              role="tab"
              aria-selected={filterMode === 'completed'}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                filterMode === 'completed'
                  ? 'bg-[#1e222d] text-[#ff243b] shadow-sm font-bold'
                  : 'text-[#9298a6] hover:text-[#f5f6fa]'
              }`}
            >
              Concluídas ({completedCount})
            </button>
          </div>
        </div>

        {/* Phase Cards Container */}
        <div className="mx-auto max-w-5xl space-y-6">
          {STUDY_PHASES.map((phase) => {
            const phaseCompleted = phase.tasks.filter((t) => completedTaskIds.has(t.id)).length;
            const phaseTotal = phase.tasks.length;
            const isPhaseDone = phaseCompleted === phaseTotal && phaseTotal > 0;
            const isExpanded = !!expandedPhases[phase.id];

            const visibleTasks = phase.tasks.filter((task) => {
              const matchesFilter =
                filterMode === 'all'
                  ? true
                  : filterMode === 'completed'
                  ? completedTaskIds.has(task.id)
                  : !completedTaskIds.has(task.id);

              if (!matchesFilter) return false;

              if (!searchQuery.trim()) return true;
              const q = searchQuery.toLowerCase();
              return (
                task.title.toLowerCase().includes(q) ||
                task.description.toLowerCase().includes(q) ||
                task.tags.some((t) => t.toLowerCase().includes(q))
              );
            });

            if (visibleTasks.length === 0 && (searchQuery || filterMode !== 'all')) {
              return null;
            }

            return (
              <div
                key={phase.id}
                className={`rounded-xl border transition-all ${
                  isPhaseDone
                    ? 'border-emerald-900/60 bg-emerald-950/10'
                    : 'border-[#272b35] bg-[#101218]'
                }`}
              >
                {/* Phase Header */}
                <div
                  onClick={() => togglePhaseExpand(phase.id)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 cursor-pointer select-none hover:bg-[#151821] rounded-t-xl transition-colors gap-3"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      togglePhaseExpand(phase.id);
                    }
                  }}
                  aria-expanded={isExpanded}
                  aria-label={`Expandir ou recolher Fase ${phase.number}: ${phase.title}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold ${
                        isPhaseDone
                          ? 'border-emerald-500/50 bg-emerald-950/50 text-emerald-400'
                          : 'border-[#ff243b]/50 bg-[#08090c] text-[#ff243b]'
                      }`}
                    >
                      {phase.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base sm:text-lg">{phase.title}</h3>
                        {isPhaseDone && (
                          <span className="text-xs text-emerald-400 font-mono font-medium flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Fase Completa
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#9298a6] mt-0.5">{phase.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right text-xs font-mono text-[#9298a6]">
                      <span>
                        {phaseCompleted}/{phaseTotal} tarefas
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-[#9298a6]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#9298a6]" />
                    )}
                  </div>
                </div>

                {/* Phase Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-[#272b35]/70">
                    <p className="text-xs sm:text-sm text-[#dfe2e9] mb-2">{phase.description}</p>
                    <div className="text-xs text-[#9298a6] font-mono mb-4">
                      Foco Teórico: <span className="text-white">{phase.conceptFocus}</span>
                    </div>

                    {/* Task List */}
                    <div className="space-y-3 pt-2">
                      {visibleTasks.map((task) => {
                        const isDone = completedTaskIds.has(task.id);
                        return (
                          <div
                            key={task.id}
                            onClick={() => handleTaskClick(task, phase)}
                            className={`flex items-start gap-3.5 p-3.5 rounded-lg border transition-all cursor-pointer ${
                              isDone
                                ? 'border-emerald-900/40 bg-emerald-950/20 text-[#9298a6]'
                                : 'border-[#272b35] bg-[#08090c] hover:border-[#ff243b]/40 hover:bg-[#0c0e14]'
                            }`}
                            role="checkbox"
                            aria-checked={isDone}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault();
                                handleTaskClick(task, phase);
                              }
                            }}
                          >
                            <div className="pt-0.5">
                              {isDone ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                              ) : (
                                <Circle className="h-5 w-5 text-[#9298a6] shrink-0 hover:text-[#ff243b] transition-colors" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span
                                  className={`text-sm font-semibold ${
                                    isDone ? 'line-through text-[#9298a6]' : 'text-white'
                                  }`}
                                >
                                  {task.title}
                                </span>
                                <span className="flex items-center gap-1 text-[11px] font-mono text-[#9298a6] shrink-0">
                                  <Clock className="h-3 w-3" /> ~{task.hoursEstimate}h
                                </span>
                              </div>
                              <p className="text-xs text-[#9298a6] mt-1 leading-relaxed">
                                {task.description}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {task.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] font-mono text-[#ff243b] bg-[#101218] border border-[#272b35] px-2 py-0.5 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
