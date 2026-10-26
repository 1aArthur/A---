/**
 * Asthex Dimensional Type Algebra Engine
 * Implements compile-time physical dimension verification using the Abelian Group Z^7 (SI Units).
 * Follows Noether's theorem of conservation and dimensional homogeneity.
 */

export interface DimensionVector {
  l: number; // Length [m]
  m: number; // Mass [kg]
  t: number; // Time [s]
  i: number; // Electric Current [A]
  theta: number; // Temperature [K]
  n: number; // Substance [mol]
  j: number; // Luminous [cd]
}

export interface UnitDefinition {
  name: string;
  symbol: string;
  vector: DimensionVector;
  description: string;
  formula?: string;
}

export const ZERO_DIMENSION: DimensionVector = {
  l: 0,
  m: 0,
  t: 0,
  i: 0,
  theta: 0,
  n: 0,
  j: 0,
};

export const STANDARD_UNITS: Record<string, UnitDefinition> = {
  dimensionless: {
    name: 'Escalar / Adimensional',
    symbol: '1',
    vector: ZERO_DIMENSION,
    description: 'Valor puro sem dimensão física.',
  },
  m: {
    name: 'Comprimento (Metro)',
    symbol: 'm',
    vector: { ...ZERO_DIMENSION, l: 1 },
    description: 'Distância espacial e deslocamento.',
  },
  kg: {
    name: 'Massa (Quilograma)',
    symbol: 'kg',
    vector: { ...ZERO_DIMENSION, m: 1 },
    description: 'Massa inercial e gravitacional.',
  },
  s: {
    name: 'Tempo (Segundo)',
    symbol: 's',
    vector: { ...ZERO_DIMENSION, t: 1 },
    description: 'Intervalo temporal e duração.',
  },
  A: {
    name: 'Corrente Elétrica (Ampere)',
    symbol: 'A',
    vector: { ...ZERO_DIMENSION, i: 1 },
    description: 'Fluxo de carga por unidade de tempo.',
  },
  K: {
    name: 'Temperatura (Kelvin)',
    symbol: 'K',
    vector: { ...ZERO_DIMENSION, theta: 1 },
    description: 'Energia térmica cinética média.',
  },
  mol: {
    name: 'Quantidade de Matéria (Mol)',
    symbol: 'mol',
    vector: { ...ZERO_DIMENSION, n: 1 },
    description: 'Contagem atômica ou molecular.',
  },
  'm/s': {
    name: 'Velocidade',
    symbol: 'm/s',
    vector: { ...ZERO_DIMENSION, l: 1, t: -1 },
    description: 'Taxa de variação de posição no tempo.',
    formula: 'L T^-1',
  },
  'm/s^2': {
    name: 'Aceleração',
    symbol: 'm/s^2',
    vector: { ...ZERO_DIMENSION, l: 1, t: -2 },
    description: 'Taxa de variação de velocidade no tempo.',
    formula: 'L T^-2',
  },
  N: {
    name: 'Força (Newton)',
    symbol: 'N',
    vector: { ...ZERO_DIMENSION, l: 1, m: 1, t: -2 },
    description: 'Interação de massa e aceleração (Segunda Lei de Newton: F = m·a).',
    formula: 'M L T^-2',
  },
  J: {
    name: 'Energia / Trabalho (Joule)',
    symbol: 'J',
    vector: { ...ZERO_DIMENSION, l: 2, m: 1, t: -2 },
    description: 'Trabalho mecânico, energia cinética ou potencial.',
    formula: 'M L^2 T^-2',
  },
  W: {
    name: 'Potência (Watt)',
    symbol: 'W',
    vector: { ...ZERO_DIMENSION, l: 2, m: 1, t: -3 },
    description: 'Taxa de transferência ou conversão de energia.',
    formula: 'M L^2 T^-3',
  },
  Pa: {
    name: 'Pressão (Pascal)',
    symbol: 'Pa',
    vector: { ...ZERO_DIMENSION, l: -1, m: 1, t: -2 },
    description: 'Força normal distribuída por unidade de área.',
    formula: 'M L^-1 T^-2',
  },
  'kg/m^3': {
    name: 'Densidade Volumétrica',
    symbol: 'kg/m^3',
    vector: { ...ZERO_DIMENSION, l: -3, m: 1 },
    description: 'Concentração de massa em volume espacial.',
    formula: 'M L^-3',
  },
  'm^3/(kg*s^2)': {
    name: 'Constante Gravitacional (G)',
    symbol: 'm^3/(kg*s^2)',
    vector: { ...ZERO_DIMENSION, l: 3, m: -1, t: -2 },
    description: 'Constante fundamental da relatividade e gravitação newtoniana.',
    formula: 'L^3 M^-1 T^-2',
  },
};

/** Checks if two dimensional vectors are mathematically identical */
export function areDimensionsEqual(a: DimensionVector, b: DimensionVector): boolean {
  return (
    a.l === b.l &&
    a.m === b.m &&
    a.t === b.t &&
    a.i === b.i &&
    a.theta === b.theta &&
    a.n === b.n &&
    a.j === b.j
  );
}

/** Formats dimensional vector into human readable exponent string (e.g. M L T^-2) */
export function formatDimensionVector(vec: DimensionVector): string {
  const parts: string[] = [];
  const expToStr = (num: number) => (num === 1 ? '' : `^${num}`);

  if (vec.l !== 0) parts.push(`L${expToStr(vec.l)}`);
  if (vec.m !== 0) parts.push(`M${expToStr(vec.m)}`);
  if (vec.t !== 0) parts.push(`T${expToStr(vec.t)}`);
  if (vec.i !== 0) parts.push(`I${expToStr(vec.i)}`);
  if (vec.theta !== 0) parts.push(`Θ${expToStr(vec.theta)}`);
  if (vec.n !== 0) parts.push(`N${expToStr(vec.n)}`);
  if (vec.j !== 0) parts.push(`J${expToStr(vec.j)}`);

  return parts.length > 0 ? parts.join(' ') : 'Adimensional (1)';
}

/** Finds a matched standard unit symbol for a vector, if any */
export function matchStandardSymbol(vec: DimensionVector): string {
  for (const [key, item] of Object.entries(STANDARD_UNITS)) {
    if (areDimensionsEqual(item.vector, vec)) {
      return item.symbol;
    }
  }
  return formatDimensionVector(vec);
}

export type OperationType = '+' | '-' | '*' | '/';

export interface TypeCheckResult {
  success: boolean;
  operator: OperationType;
  leftUnit: string;
  rightUnit: string;
  resultVector?: DimensionVector;
  resultSymbol?: string;
  error?: string;
  explanation: string;
}

/**
 * Validates a physical operation between two Asthex types at compile-time.
 */
export function checkPhysicalOperation(
  op: OperationType,
  leftKey: string,
  rightKey: string
): TypeCheckResult {
  const leftDef = STANDARD_UNITS[leftKey];
  const rightDef = STANDARD_UNITS[rightKey];

  if (!leftDef || !rightDef) {
    return {
      success: false,
      operator: op,
      leftUnit: leftKey,
      rightUnit: rightKey,
      error: `Unidade não registrada no sistema de tipos: ${!leftDef ? leftKey : rightKey}`,
      explanation: 'O compilador Asthex requer que todas as unidades façam parte do grupo abeliano formal.',
    };
  }

  const vA = leftDef.vector;
  const vB = rightDef.vector;

  if (op === '+' || op === '-') {
    if (areDimensionsEqual(vA, vB)) {
      return {
        success: true,
        operator: op,
        leftUnit: leftDef.symbol,
        rightUnit: rightDef.symbol,
        resultVector: vA,
        resultSymbol: leftDef.symbol,
        explanation: `Homogeneidade física preservada: ${leftDef.symbol} ${op} ${rightDef.symbol} = ${leftDef.symbol}. Dimensões idênticas (${formatDimensionVector(vA)}).`,
      };
    } else {
      return {
        success: false,
        operator: op,
        leftUnit: leftDef.symbol,
        rightUnit: rightDef.symbol,
        error: `Incompatibilidade Dimensional: Não é possível somar/subtrair ${leftDef.name} (${formatDimensionVector(vA)}) com ${rightDef.name} (${formatDimensionVector(vB)}).`,
        explanation: `O compilador Asthex rejeita esta expressão em tempo de compilação sem gerar instruções de máquina defeituosas.`,
      };
    }
  }

  if (op === '*') {
    const resVector: DimensionVector = {
      l: vA.l + vB.l,
      m: vA.m + vB.m,
      t: vA.t + vB.t,
      i: vA.i + vB.i,
      theta: vA.theta + vB.theta,
      n: vA.n + vB.n,
      j: vA.j + vB.j,
    };
    const symbol = matchStandardSymbol(resVector);
    return {
      success: true,
      operator: op,
      leftUnit: leftDef.symbol,
      rightUnit: rightDef.symbol,
      resultVector: resVector,
      resultSymbol: symbol,
      explanation: `Multiplicação física válida: expoentes somados (${formatDimensionVector(vA)} + ${formatDimensionVector(vB)} = ${formatDimensionVector(resVector)}). Tipo resultante: [${symbol}].`,
    };
  }

  if (op === '/') {
    const resVector: DimensionVector = {
      l: vA.l - vB.l,
      m: vA.m - vB.m,
      t: vA.t - vB.t,
      i: vA.i - vB.i,
      theta: vA.theta - vB.theta,
      n: vA.n - vB.n,
      j: vA.j - vB.j,
    };
    const symbol = matchStandardSymbol(resVector);
    return {
      success: true,
      operator: op,
      leftUnit: leftDef.symbol,
      rightUnit: rightDef.symbol,
      resultVector: resVector,
      resultSymbol: symbol,
      explanation: `Divisão física válida: expoentes subtraídos (${formatDimensionVector(vA)} - ${formatDimensionVector(vB)} = ${formatDimensionVector(resVector)}). Tipo resultante: [${symbol}].`,
    };
  }

  return {
    success: false,
    operator: op,
    leftUnit: leftKey,
    rightUnit: rightKey,
    error: `Operador não suportado: ${op}`,
    explanation: 'Apenas operadores comutativos ou distributivos físicos são avaliados.',
  };
}
