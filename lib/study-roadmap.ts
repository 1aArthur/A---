/**
 * Master Study Roadmap, Canonical Resources, and Code Specifications for Asthex (.astun)
 */

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  hoursEstimate: number;
  tags: string[];
}

export interface StudyPhase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  conceptFocus: string;
  tasks: TaskItem[];
}

export interface ResourceItem {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'video' | 'paper' | 'repo';
  typeLabel: string;
  url: string;
  summary: string;
  keyTopics: string[];
  relevanceToAsthex: string;
}

export interface CodeSample {
  id: string;
  filename: string;
  language: string;
  title: string;
  description: string;
  code: string;
  highlights: string[];
}

export const ASTHEX_CODE_SAMPLES: CodeSample[] = [
  {
    id: 'nbody',
    filename: 'nbody_gravity.astun',
    language: 'astun',
    title: 'Simulação N-Corpos com Validação Dimensional',
    description: 'Demonstra a tipagem dimensional estática baseada no grupo abeliano SI (Z^7) e compilação direta para GPU.',
    highlights: ['Float[kg]', 'Position3D[m]', 'Velocity[m/s]', '@compile(target = GPU)', '|> parallel_kernel'],
    code: `// ============================================================================
// Simulação de N-Corpos com Conservação e Álgebra Dimensional
// Linguagem: Asthex (.astun) | Alvo: GPU com Zero-Copy
// ============================================================================

module Cosmos::Physics

use std::physics::units::{m, s, kg, N}
use std::hardware::{GPU, ZeroCopy}
use std::math::{Vector3D}

// 1. Tipagem Dimensional Estática (Verificada em tempo de compilação)
struct CelestialBody:
    id:       u64
    mass:     Float[kg]
    pos:      Vector3D[m]
    vel:      Vector3D[m/s]

// Constante da Gravitação Universal com tipo exato
const G: Float[m^3 / (kg * s^2)] = 6.67430e-11

// 2. Kernel Paralelo de Alto Desempenho (Zero-Overhead)
@compile(target = GPU, memory = ZeroCopy, opt = "fast-math")
fn integrate_nbody(bodies: &[CelestialBody], dt: Float[s]) -> Vector[CelestialBody]:
    return bodies |> parallel_kernel(body =>
        let mut total_force: Vector3D[N] = Vector3D.zero()

        for other in bodies:
            if body.id != other.id:
                let delta = other.pos - body.pos
                let dist = delta.length()
                
                // Evita singularidade de colisão
                if dist > 0.001<m>:
                    let magnitude = (G * body.mass * other.mass) / (dist^2)
                    total_force += delta.unit() * magnitude

        // Segunda Lei de Newton verificada: F = m * a => a = F / m
        let accel: Vector3D[m/s^2] = total_force / body.mass
        let new_vel = body.vel + (accel * dt)
        let new_pos = body.pos + (new_vel * dt)

        CelestialBody(body.id, body.mass, new_pos, new_vel)
    )`,
  },
  {
    id: 'reactive',
    filename: 'reactive_island.astun',
    language: 'astun',
    title: 'Atores Concorrentes & Ilha Reativa (Solid + Astro)',
    description: 'Combina concorrência estilo Elixir com a reatividade de grão fino do Solid.js e compilação para WebAssembly.',
    highlights: ['actor MetricsCollector', 'signal current_fps', '@island(target = "client::wasm")', 'watch node.current_fps'],
    code: `// ============================================================================
// Processo Concorrente & Componente Reativo Isomórfico
// ============================================================================

module Cosmos::Telemetry

use std::reactive::{signal, Signal}
use std::concurrency::{ActorRef, Message}

// 1. Ator Nativo Isolado (Processo leve estilo BEAM/Elixir com Arena própria)
actor MetricsCollector:
    state sample_count: u64 = 0
    signal current_fps: Signal[f32] = signal(60.0)

    fn init():
        self.sample_count = 0

    fn receive(msg: Message):
        match msg:
            FrameTime(dt_seconds) =>
                self.sample_count += 1
                // Atualização atômica do sinal reativo no grafo acíclico (DAG)
                self.current_fps.set(1.0 / dt_seconds)

            GetStatus(reply_chan) =>
                reply_chan.send({ samples: self.sample_count, fps: self.current_fps.value })

// 2. Ilha Reativa de Interface (Compilada para WebAssembly sem Virtual DOM)
@island(target = "client::wasm")
component TelemetryHUD:
    input node: ActorRef[MetricsCollector]

    // Reatividade pontual estilo Solid.js: altera apenas o nó de texto no DOM
    watch node.current_fps:
        DOM::update_text("#fps-monitor", \`FPS: \${node.current_fps.value.to_fixed(1)}\`)
        DOM::set_style("#indicator", "opacity", node.current_fps.value > 30.0 ? "1.0" : "0.4")`,
  },
  {
    id: 'luau_build',
    filename: 'astun.build.luau',
    language: 'luau',
    title: 'Manifesto de Build Tipado e Seguro com Luau',
    description: 'Elimina arquivos estáticos confusos (JSON/YAML) usando scripts Luau com autocompletion e sandbox nativo.',
    highlights: ['AsthexBuildConfig', 'gpu_backend = "Vulkan"', 'strict_dimensional_rules = true', 'islands = { ... }'],
    code: `-- ============================================================================
-- Arquivo: astun.build.luau
-- Manifesto do Sistema de Construção e Otimização do Asthex
-- ============================================================================

local config: AsthexBuildConfig = {
    project_name = "CosmosSimulation",
    target_triple = "x86_64-unknown-linux-gnu",
    gpu_backend = "Vulkan",
    optimization_level = 3,

    -- Passagens de Compilação MLIR
    mlir = {
        affine_loop_unroll = true,
        tensor_vectorization = true,
        strict_dimensional_rules = true,
        zero_cost_borrow_checker = true,
    },

    -- Definição de Ilhas Poliglotas (Modelo Astro)
    islands = {
        web_telemetry = {
            entry = "src/telemetry.astun",
            target = "wasm32-unknown-unknown",
            minify = true,
        },
        dynamic_rules = {
            runtime = "embedded_luau",
            hot_reload = true,
        }
    }
}

return config`,
  },
  {
    id: 'bootstrap_rust',
    filename: 'lexer_ast_prototype.rs',
    language: 'rust',
    title: 'Protótipo Inicial em Rust (Lexer & AST)',
    description: 'Código pronto para você começar a programar o compilador astunc hoje no seu terminal.',
    highlights: ['enum Token', 'struct Dimensions', 'fn typecheck_op', 'enum AstNode'],
    code: `// ============================================================================
// astunc - O Compilador de Asthex (Protótipo Zero em Rust)
// ============================================================================

#[derive(Debug, PartialEq, Clone)]
pub enum Token {
    Keyword(String),    // "actor", "signal", "fn", "struct"
    Ident(String),      // "integrate_motion"
    Number(f64),        // 6.67430e-11
    Dimension(String),  // "<m/s>", "<kg>", "<m^3/(kg*s^2)>"
    Pipe,               // |>
    Arrow,              // ->
    FatArrow,           // =>
    Plus, Minus, Star, Slash,
    Eof,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Dimensions {
    pub length: i8, // L (m)
    pub mass:   i8, // M (kg)
    pub time:   i8, // T (s)
}

impl Dimensions {
    pub fn multiply(a: Self, b: Self) -> Self {
        Self {
            length: a.length + b.length,
            mass:   a.mass + b.mass,
            time:   a.time + b.time,
        }
    }

    pub fn divide(a: Self, b: Self) -> Self {
        Self {
            length: a.length - b.length,
            mass:   a.mass - b.mass,
            time:   a.time - b.time,
        }
    }
}

fn main() {
    println!("Asthex Toolchain Bootstrap v0.1 inicializado.");
}`,
  },
];

export const STUDY_PHASES: StudyPhase[] = [
  {
    id: 'phase-1',
    number: '01',
    title: 'Fundamentos de Compiladores: Lexer, Parser & AST',
    subtitle: 'Do texto bruto à Árvore Sintática Abstrata',
    description: 'Compreenda como transformar o código fonte em tokens, lidar com indentação limpa (Python-style) e operadores de pipeline (|>) usando Pratt Parsing.',
    conceptFocus: 'Análise léxica, Autômatos Finitos Determinísticos (DFA), Gramáticas Livres de Contexto (CFG), Abstract Syntax Tree (AST).',
    tasks: [
      {
        id: 't-1-1',
        title: 'Criar o Lexer com suporte a sufixos dimensionais',
        description: 'Construir um scanner capaz de identificar números com dimensões embutidas como 10<m/s>, 9.8<m/s^2> e 100<kg>.',
        hoursEstimate: 14,
        tags: ['Lexer', 'Tokens', 'Rust'],
      },
      {
        id: 't-1-2',
        title: 'Implementar Pratt Parsing para expressões e pipelines |>',
        description: 'Dominar a técnica de Top-Down Operator Precedence para gerenciar operadores matemáticos e a cadeia funcional |>.',
        hoursEstimate: 18,
        tags: ['Parser', 'Pratt Parsing', 'AST'],
      },
      {
        id: 't-1-3',
        title: 'Modelar nós de AST em Rust com Enums ricos',
        description: 'Estruturar nós de Expressões, Declarações de Atores, Sinais e Structs físicas com informações de span e linha para erros.',
        hoursEstimate: 12,
        tags: ['AST', 'Data Structures', 'Error Handling'],
      },
    ],
  },
  {
    id: 'phase-2',
    number: '02',
    title: 'Teoria dos Tipos, Álgebra Dimensional & Semântica Afim',
    subtitle: 'Segurança absoluta de memória e coerência física',
    description: 'Implementar a verificação de dimensões físicas em tempo de compilação sem custo de runtime, somando e subtraindo expoentes em grupos abelianos.',
    conceptFocus: 'Álgebra de Tipos, Cálculo Lambda Tipado, Sistemas Afins e Lineares (Ownership), Inferência Bidirecional.',
    tasks: [
      {
        id: 't-2-1',
        title: 'Implementar o Solver de Grupos Abelianos (SI: Z^7)',
        description: 'Criar a biblioteca que calcula L^a * M^b * T^c e garante a lei da homogeneidade física em operações (+, -, *, /).',
        hoursEstimate: 16,
        tags: ['Physics', 'Type Checker', 'Abelian Groups'],
      },
      {
        id: 't-2-2',
        title: 'Sistema de Posse (Ownership) e Tokens de Capacidade Linear',
        description: 'Modelar semântica de movimento afim: recursos como memória e handles de GPU são consumidos exatamente uma vez.',
        hoursEstimate: 24,
        tags: ['Linear Types', 'Borrow Checker', 'No-GC'],
      },
      {
        id: 't-2-3',
        title: 'Estudar a inferência de tipos do Luau e TypeScript',
        description: 'Analisar o algoritmo de resolução por restrições (Constraint-Based Type Inference) para permitir omitir anotações redundantes.',
        hoursEstimate: 20,
        tags: ['Type Inference', 'Luau Engine', 'Subtyping'],
      },
    ],
  },
  {
    id: 'phase-3',
    number: '03',
    title: 'Engenharia de Baixo Nível, Memória & Arquitetura Linux',
    subtitle: 'Otimização direta de silício, CPU e registradores',
    description: 'Eliminar o Garbage Collector através de Arenas de memória por processo e dominar chamadas de sistema eficientes no Linux.',
    conceptFocus: 'Páginas de memória virtual, mmap, alinhamento de cache (L1/L2/L3), epoll, io_uring, Syscalls.',
    tasks: [
      {
        id: 't-3-1',
        title: 'Construir um Alocador de Arenas (Region Allocator)',
        description: 'Implementar alocador que reserva blocos contíguos de memória e desaloca tudo em O(1) quando o ator reinicia.',
        hoursEstimate: 15,
        tags: ['Memory', 'Arenas', 'Low-Level'],
      },
      {
        id: 't-3-2',
        title: 'Explorar chamadas de sistema no Linux (epoll & io_uring)',
        description: 'Compreender como o Linux atinge milhões de operações de E/S por segundo sem bloquear threads do sistema operacional.',
        hoursEstimate: 18,
        tags: ['Linux', 'Syscalls', 'Performance'],
      },
      {
        id: 't-3-3',
        title: 'Green Threads & Troca de Contexto em Assembly',
        description: 'Escrever uma rotina mínima de salvamento e restauração de registradores de CPU para corrotinas ultraleves.',
        hoursEstimate: 22,
        tags: ['Assembly', 'Coroutines', 'Scheduler'],
      },
    ],
  },
  {
    id: 'phase-4',
    number: '04',
    title: 'Backends Modernos: MLIR, LLVM & Computação em GPU',
    subtitle: 'Geração de código de máquina e aceleração vetorial',
    description: 'Transformar a AST do Asthex em LLVM IR para gerar binários nativos para x86_64/ARM e SPIR-V/Vulkan para tensores em GPU.',
    conceptFocus: 'Representações Intermediárias (IR), MLIR Dialects, Otimizações Poliedrais, SIMD, Shaders de Computação.',
    tasks: [
      {
        id: 't-4-1',
        title: 'Completar o tutorial Kaleidoscope do LLVM',
        description: 'Aprender a API oficial do LLVM (ou Inkwell em Rust) para compilar funções, blocos básicos e chamadas nativas.',
        hoursEstimate: 25,
        tags: ['LLVM', 'Compiler Backend', 'JIT'],
      },
      {
        id: 't-4-2',
        title: 'Explorar dialetos MLIR para matrizes e física',
        description: 'Entender como o MLIR permite criar o dialeto "uni" e desdobrar laços automaticamente para GPUs.',
        hoursEstimate: 20,
        tags: ['MLIR', 'Polyhedral', 'AI/Tensors'],
      },
      {
        id: 't-4-3',
        title: 'Compilar kernels matemáticos para SPIR-V / Vulkan Compute',
        description: 'Gerar bytecode portável para GPUs modernas para simulações de N-corpos e machine learning sem travar o processador.',
        hoursEstimate: 26,
        tags: ['GPU', 'SPIR-V', 'Vulkan'],
      },
    ],
  },
  {
    id: 'phase-5',
    number: '05',
    title: 'Concorrência de Atores (Elixir) & Sinais Reativos (Solid)',
    subtitle: 'Resiliência a falhas e grafos de dependência atômica',
    description: 'Construir o runtime com escalonador work-stealing, árvores de supervisão no estilo OTP e reatividade fina sem Virtual DOM.',
    conceptFocus: 'Actor Model, Work-Stealing, Session Types, Reactive Dependency Graph (DAG), Atomics.',
    tasks: [
      {
        id: 't-5-1',
        title: 'Escalonador de Corrotinas M:N com Roubo de Trabalho',
        description: 'Distribuir milhões de atores entre os núcleos reais da CPU de forma balanceada e sem locks pesados.',
        hoursEstimate: 22,
        tags: ['Concurrency', 'Work-Stealing', 'Scheduler'],
      },
      {
        id: 't-5-2',
        title: 'Árvores de Supervisão e Tolerância a Falhas',
        description: 'Implementar a filosofia "Let it Crash": se um ator falhar por exceção física, seu supervisor o reinicia com estado limpo.',
        hoursEstimate: 16,
        tags: ['Fault-Tolerance', 'Elixir/OTP', 'Actors'],
      },
      {
        id: 't-5-3',
        title: 'Motor de Sinais Reativos em Grafo Acíclico Dirigido',
        description: 'Reatividade em nível de compilador: criar células reativas que atualizam apenas a instrução conectada.',
        hoursEstimate: 18,
        tags: ['Reactivity', 'Solid.js', 'DAG'],
      },
    ],
  },
  {
    id: 'phase-6',
    number: '06',
    title: 'Ecossistema Isomórfico (Astro), WASM & Metaprogramação Luau',
    subtitle: 'Unificação entre servidores nativos, navegador e scripts rápidos',
    description: 'Integrar a arquitetura de ilhas, compilação para WebAssembly e o interpretador embutido Luau para scripts seguros e hot-reload.',
    conceptFocus: 'WebAssembly (WASM), FFI Zero-Copy, Sandboxing, Metaprogramação em tempo de compilação.',
    tasks: [
      {
        id: 't-6-1',
        title: 'Compilação de Ilhas @island para WebAssembly',
        description: 'Emitir binários .wasm compactos para permitir que os componentes reativos executem no navegador a 60 FPS.',
        hoursEstimate: 18,
        tags: ['WASM', 'Islands', 'Astro'],
      },
      {
        id: 't-6-2',
        title: 'Embutir o Runtime C do Luau com Sandbox',
        description: 'Conectar o interpretador Luau ao núcleo Asthex para processamento de regras dinâmicas e builds configuráveis.',
        hoursEstimate: 20,
        tags: ['Luau', 'FFI', 'Embed'],
      },
      {
        id: 't-6-3',
        title: 'Metaprogramação em Comptime usando Luau',
        description: 'Executar código Luau dentro do astunc durante a compilação para gerar tabelas de senos, matrizes ou desdobramentos.',
        hoursEstimate: 20,
        tags: ['Metaprogramming', 'Comptime', 'Macros'],
      },
    ],
  },
];

export const CANONICAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    type: 'book',
    typeLabel: 'Livro Canônico',
    url: 'https://craftinginterpreters.com/',
    summary: 'A melhor introdução prática do mundo para construir uma linguagem completa. Cobre leitor de caracteres, parser descendente recursivo, AST, e depois uma máquina virtual completa em C.',
    keyTopics: ['Scanners', 'Pratt Parsing', 'Bytecode VM', 'Garbage Collection'],
    relevanceToAsthex: 'Essencial para a Fase 1: fornece a arquitetura base de Lexer e Parser que adaptaremos para a sintaxe do .astun.',
  },
  {
    id: 'res-2',
    title: 'Types and Programming Languages (TAPL)',
    author: 'Benjamin C. Pierce',
    type: 'book',
    typeLabel: 'Bíblia da Teoria de Tipos',
    url: 'https://www.cis.upenn.edu/~bcpierce/tapl/',
    summary: 'O texto definitivo para fundamentos matemáticos de linguagens: cálculo lambda, sistemas de tipos estáticos, inferência e garantias formais de corretude.',
    keyTopics: ['Simply Typed Lambda Calculus', 'Subtyping', 'System F', 'Type Safety Theorems'],
    relevanceToAsthex: 'Fornece a base teórica para o Type Checker físico com dimensões e verificação semântica de conservação.',
  },
  {
    id: 'res-3',
    title: 'Terra: Flexible Low-Level Computing',
    author: 'Universidade de Stanford',
    type: 'paper',
    typeLabel: 'Artigo Científico',
    url: 'https://terralang.org/',
    summary: 'Artigo pioneiro que demonstrou o poder de acoplar uma linguagem de script leve (Lua) com um gerador nativo C/LLVM para computação científica de alto desempenho.',
    keyTopics: ['Multi-Stage Programming', 'Lua + LLVM', 'Metaprogramming', 'Hardware Kernels'],
    relevanceToAsthex: 'Inspiração direta para o papel do Luau no Asthex: metaprogramação em comptime e separação entre data-plane e control-plane.',
  },
  {
    id: 'res-4',
    title: 'The Linux Programming Interface (TLPI)',
    author: 'Michael Kerrisk',
    type: 'book',
    typeLabel: 'Engenharia de Sistemas',
    url: 'https://man7.org/tlpi/',
    summary: 'A referência exaustiva para chamadas de sistema no Linux, gerenciamento de memória virtual, sinais, processos e I/O multiplexado de alta concorrência.',
    keyTopics: ['mmap & Memória Virtual', 'epoll & IPC', 'Signals', 'POSIX Threads'],
    relevanceToAsthex: 'Fundamento para o runtime de atores do Asthex: gerenciar processos ultraleves e arenas de memória diretamente sobre o kernel Linux.',
  },
  {
    id: 'res-5',
    title: 'Repositório de Código Aberto do Luau',
    author: 'Roblox Open Source (GitHub)',
    type: 'repo',
    typeLabel: 'Código Fonte C++',
    url: 'https://github.com/luau-lang/luau',
    summary: 'O código fonte em C++ do motor Luau, apresentando um dos Type Checkers mais modernos, rápidos e ergonômicos da indústria moderna de software.',
    keyTopics: ['Constraint-Based Typing', 'Fast Bytecode VM', 'Sandbox Security', 'Bidirectional Inference'],
    relevanceToAsthex: 'Estudo de caso real para a engine de inferência do Asthex e biblioteca que será embutida no runtime.',
  },
  {
    id: 'res-6',
    title: 'MLIR: A Compiler Infrastructure for the End of Moore’s Law',
    author: 'Chris Lattner et al. (Google)',
    type: 'paper',
    typeLabel: 'Artigo / Infraestrutura',
    url: 'https://mlir.llvm.org/',
    summary: 'Publicação oficial do MLIR (Multi-Level Intermediate Representation) que revolucionou compiladores de IA e supercomputação heterogênea.',
    keyTopics: ['Dialetos de Compilação', 'Álgebra de Tensores', 'Transformações Poliedrais', 'Geração GPU/CPU'],
    relevanceToAsthex: 'O coração do backend do Asthex: unifica kernels matemáticos em GPU com binários nativos de CPU.',
  },
  {
    id: 'res-7',
    title: 'Building a Compiler in Rust (Série Tsoding & Jon Gjengset)',
    author: 'Engenheiros de Compiladores (YouTube)',
    type: 'video',
    typeLabel: 'Série Prática em Vídeo',
    url: 'https://www.youtube.com/results?search_query=building+compiler+in+rust+llvm',
    summary: 'Sessões práticas ao vivo construindo analisadores sintáticos, geradores de código intermediário e integração com LLVM usando Rust moderno.',
    keyTopics: ['Rust enums para AST', 'Inkwell LLVM Bindings', 'Diagnostics amigáveis'],
    relevanceToAsthex: 'Excelente para acompanhar o fluxo diário de desenvolvimento do compilador astunc.',
  },
  {
    id: 'res-8',
    title: 'Engineering a Compiler (2nd / 3rd Edition)',
    author: 'Keith Cooper & Linda Torczon',
    type: 'book',
    typeLabel: 'Livro Didático',
    url: 'https://www.sciencedirect.com/book/9780120884780/engineering-a-compiler',
    summary: 'Foco pragmático na construção de compiladores industriais: SSA (Static Single Assignment), alocação de registradores por coloração de grafos e otimizações de laços.',
    keyTopics: ['SSA Form', 'Register Allocation', 'Control Flow Graphs', 'Instruction Scheduling'],
    relevanceToAsthex: 'Ajuda a estruturar otimizações de memória e registradores para garantir que o Asthex supere C em velocidade.',
  },
];

export const STUDY_METHODOLOGY_STEPS = [
  {
    step: '1',
    title: 'A Regra dos Três Ciclos',
    desc: 'Nunca passe mais de 3 dias apenas lendo teoria. Para cada capítulo de livro estudado, escreva um teste de unidade e um protótipo em código executável no Rust.',
  },
  {
    step: '2',
    title: 'O Caderno do Logos',
    desc: 'Mantenha um arquivo de notas de design arquitetural (`DESIGN_LOGOS.md`) registrando cada decisão de tipo, garantia de invariante física e compromisso de hardware.',
  },
  {
    step: '3',
    title: 'Decouple & Test First',
    desc: 'Isole os algoritmos puros (como o solucionador abeliano de unidades e o avaliador de expressões) antes de conectar com I/O de arquivos e flags de linha de comando.',
  },
  {
    step: '4',
    title: 'Incremental Bootstrap',
    desc: 'Comece com um subconjunto mínimo (ex: apenas operações matemáticas com dimensões físicas). Adicione concorrência e metaprogramação após o núcleo estar estável.',
  },
];
