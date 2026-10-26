'use client';

import React, { useState } from 'react';
import { X, Plus, Trash2, Download, NotebookPen } from 'lucide-react';

export interface UserNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

const DEFAULT_NOTES: UserNote[] = [
  {
    id: 'note-1',
    title: 'Decisão de Sintaxe para Unidades Físicas',
    content:
      'As grandezas físicas no Asthex devem usar a notação de colchetes e chevron, por exemplo: Float[kg], Position3D[m], Velocity[m/s]. O compilador traduzirá isso para vetores abelianos de 7 dimensões sem nenhum custo de execução (zero-overhead type erasure).',
    createdAt: '2026-10-26',
    category: 'Sintaxe & Tipagem',
  },
  {
    id: 'note-2',
    title: 'Papel Estratégico do Luau',
    content:
      'O Luau será usado em 3 frentes: 1) Arquivo de build astun.build.luau (sem JSON ou YAML), 2) Metaprogramação em tempo de compilação (#comptime luau), 3) Lógica de topo de simulação que suporta hot-reload sem reiniciar o processo C/GPU.',
    createdAt: '2026-10-26',
    category: 'Arquitetura',
  },
];

interface StudyNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const StudyNotesModal: React.FC<StudyNotesModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [notes, setNotes] = useState<UserNote[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('asthex_user_notes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return DEFAULT_NOTES;
  });

  const [isAdding, setIsAdding] = useState<boolean>(() => !!initialTopic);
  const [newTitle, setNewTitle] = useState<string>(() =>
    initialTopic ? `Notas sobre: ${initialTopic}` : ''
  );
  const [newContent, setNewContent] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>(() =>
    initialTopic ? 'Leitura & Pesquisa' : 'Estudos'
  );

  const [prevInitialTopic, setPrevInitialTopic] = useState<string | undefined>(initialTopic);
  if (initialTopic !== prevInitialTopic) {
    setPrevInitialTopic(initialTopic);
    if (initialTopic) {
      setIsAdding(true);
      setNewTitle(`Notas sobre: ${initialTopic}`);
      setNewCategory('Leitura & Pesquisa');
    }
  }

  const saveNotes = (updated: UserNote[]) => {
    setNotes(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('asthex_user_notes', JSON.stringify(updated));
    }
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      category: newCategory.trim() || 'Geral',
    };

    saveNotes([newNote, ...notes]);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const handleDeleteNote = (id: string) => {
    saveNotes(notes.filter((n) => n.id !== id));
  };

  const handleExportMarkdown = () => {
    const mdLines = [
      '# Caderno do Logos — Notas de Engenharia da Linguagem Asthex',
      `*Exportado em: ${new Date().toLocaleString('pt-BR')}*`,
      '',
      ...notes.map(
        (n) => `## ${n.title}\n**Categoria:** ${n.category} | **Data:** ${n.createdAt}\n\n${n.content}\n\n---`
      ),
    ];
    const blob = new Blob([mdLines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asthex-caderno-logos-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notes-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-[#272b35] bg-[#101218] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#272b35] px-6 py-4 bg-[#08090c]">
          <div className="flex items-center gap-2.5">
            <NotebookPen className="h-5 w-5 text-[#ff243b]" />
            <h2 id="notes-modal-title" className="text-base font-bold text-white">
              Caderno do Logos — Anotações & Decisões
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              type="button"
              className="flex items-center gap-1.5 rounded border border-[#272b35] bg-[#101218] px-2.5 py-1 text-xs text-[#dfe2e9] hover:text-[#ff243b] hover:border-[#ff243b]/50"
              title="Exportar anotações em Markdown"
            >
              <Download className="h-3.5 w-3.5 text-[#ff243b]" />
              <span className="hidden sm:inline">Exportar .md</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1 rounded-md text-[#9298a6] hover:text-white hover:bg-[#1e222d] focus-visible:ring-2 focus-visible:ring-[#ff243b]"
              aria-label="Fechar Caderno de Anotações"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Add Note Button / Form */}
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#272b35] p-3 text-xs sm:text-sm font-medium text-[#9298a6] hover:border-[#ff243b] hover:text-[#ff243b] hover:bg-[#08090c] transition-colors"
            >
              <Plus className="h-4 w-4 text-[#ff243b]" />
              <span>Escrever Nova Anotação ou Decisão de Design</span>
            </button>
          ) : (
            <form onSubmit={handleCreateNote} className="rounded-xl border border-[#272b35] bg-[#08090c] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#ff243b] font-bold">Nova Anotação</span>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-[#9298a6] hover:text-white"
                >
                  Cancelar
                </button>
              </div>

              <input
                type="text"
                placeholder="Título do Insight ou Decisão..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-[#272b35] bg-[#101218] px-3 py-2 text-xs sm:text-sm text-white focus:border-[#ff243b] focus:outline-none"
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Categoria (ex: Sintaxe, LLVM, Luau, Memória)..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-lg border border-[#272b35] bg-[#101218] px-3 py-1.5 text-xs text-[#dfe2e9] focus:border-[#ff243b] focus:outline-none"
                />
              </div>

              <textarea
                placeholder="Descreva seu insight, dúvidas resolvidas ou referências de código..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
                rows={4}
                className="w-full rounded-lg border border-[#272b35] bg-[#101218] px-3 py-2 text-xs sm:text-sm text-[#dfe2e9] focus:border-[#ff243b] focus:outline-none"
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-lg px-3 py-1.5 text-xs text-[#9298a6] hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#ff243b] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#ff475b] transition-colors"
                >
                  Salvar no Caderno
                </button>
              </div>
            </form>
          )}

          {/* Notes List */}
          <div className="space-y-3 pt-2">
            {notes.length === 0 ? (
              <div className="text-center py-10 text-xs text-[#9298a6]">
                Nenhuma anotação registrada ainda. Use este caderno para anotar reflexões sobre a física dos tipos, livros e decisões de compilador.
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-[#272b35] bg-[#08090c] p-4 transition-all hover:border-[#ff243b]/40"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{note.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-[#9298a6] font-mono mt-0.5">
                        <span className="text-[#ff243b] font-semibold">{note.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{note.createdAt}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      type="button"
                      className="p-1 rounded text-[#9298a6] hover:text-[#ff243b] transition-colors"
                      aria-label={`Excluir anotação ${note.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#dfe2e9] whitespace-pre-wrap leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
