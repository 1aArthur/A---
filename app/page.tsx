'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ArchitecturePillars } from '../components/ArchitecturePillars';
import { CodeExplorer } from '../components/CodeExplorer';
import { DimensionalTypeSimulator } from '../components/DimensionalTypeSimulator';
import { StudyRoadmapSection } from '../components/StudyRoadmapSection';
import { CanonicalLibrarySection } from '../components/CanonicalLibrarySection';
import { StudyMethodology } from '../components/StudyMethodology';
import { StudyNotesModal } from '../components/StudyNotesModal';
import { Footer } from '../components/Footer';
import { STUDY_PHASES } from '../lib/study-roadmap';

export default function Home() {
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('asthex_study_tasks');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return new Set(parsed);
          }
        } catch {
          // ignore
        }
      }
    }
    return new Set();
  });
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [notePreloadedTopic, setNotePreloadedTopic] = useState<string | undefined>(undefined);

  const handleToggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('asthex_study_tasks', JSON.stringify(Array.from(next)));
      }
      return next;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Tem certeza de que deseja reiniciar seu progresso de estudos no Asthex?')) {
      setCompletedTaskIds(new Set());
      if (typeof window !== 'undefined') {
        localStorage.removeItem('asthex_study_tasks');
      }
    }
  };

  const handleOpenNotesWithTopic = (topic?: string) => {
    setNotePreloadedTopic(topic);
    setIsNotesOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalTasks = STUDY_PHASES.reduce((acc, phase) => acc + phase.tasks.length, 0);

  return (
    <div className="min-h-screen bg-[#08090c] text-[#f5f6fa] flex flex-col selection:bg-[#ff243b]/40 selection:text-white asthex-bg">
      {/* Top Navigation */}
      <Navbar
        completedCount={completedTaskIds.size}
        totalTasks={totalTasks}
        onOpenNotes={() => handleOpenNotesWithTopic()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onScrollToRoadmap={() => scrollToSection('trilha')}
          onScrollToSimulator={() => scrollToSection('typechecker')}
          onScrollToCode={() => scrollToSection('codigo')}
        />

        <ArchitecturePillars />

        <CodeExplorer />

        <DimensionalTypeSimulator />

        <StudyRoadmapSection
          completedTaskIds={completedTaskIds}
          onToggleTask={handleToggleTask}
          onResetProgress={handleResetProgress}
        />

        <CanonicalLibrarySection
          onAddNoteForResource={(title) => handleOpenNotesWithTopic(title)}
        />

        <StudyMethodology />
      </main>

      {/* Footer */}
      <Footer />

      {/* Personal Study Notebook Drawer / Modal */}
      <StudyNotesModal
        isOpen={isNotesOpen}
        onClose={() => {
          setIsNotesOpen(false);
          setNotePreloadedTopic(undefined);
        }}
        initialTopic={notePreloadedTopic}
      />
    </div>
  );
}
