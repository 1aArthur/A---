import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkPhysicalOperation,
  areDimensionsEqual,
  formatDimensionVector,
  STANDARD_UNITS,
} from './dimensional-algebra';

test('areDimensionsEqual identifies identical dimension vectors', () => {
  const v1 = { l: 1, m: 0, t: -1, i: 0, theta: 0, n: 0, j: 0 };
  const v2 = { l: 1, m: 0, t: -1, i: 0, theta: 0, n: 0, j: 0 };
  const v3 = { l: 1, m: 0, t: -2, i: 0, theta: 0, n: 0, j: 0 };

  assert.equal(areDimensionsEqual(v1, v2), true);
  assert.equal(areDimensionsEqual(v1, v3), false);
});

test('Velocity * Time results in Length (meters)', () => {
  const result = checkPhysicalOperation('*', 'm/s', 's');
  assert.equal(result.success, true);
  assert.equal(result.resultSymbol, 'm');
  assert.deepEqual(result.resultVector, STANDARD_UNITS['m'].vector);
});

test('Mass * Acceleration results in Force (Newton)', () => {
  const result = checkPhysicalOperation('*', 'kg', 'm/s^2');
  assert.equal(result.success, true);
  assert.equal(result.resultSymbol, 'N');
  assert.deepEqual(result.resultVector, STANDARD_UNITS['N'].vector);
});

test('Force * Distance (m) results in Energy (Joule)', () => {
  const result = checkPhysicalOperation('*', 'N', 'm');
  assert.equal(result.success, true);
  assert.equal(result.resultSymbol, 'J');
  assert.deepEqual(result.resultVector, STANDARD_UNITS['J'].vector);
});

test('Energy (Joule) / Time (s) results in Power (Watt)', () => {
  const result = checkPhysicalOperation('/', 'J', 's');
  assert.equal(result.success, true);
  assert.equal(result.resultSymbol, 'W');
  assert.deepEqual(result.resultVector, STANDARD_UNITS['W'].vector);
});

test('Addition of incompatible dimensions produces a compile error', () => {
  const result = checkPhysicalOperation('+', 'm/s', 's');
  assert.equal(result.success, false);
  assert.match(result.error || '', /Incompatibilidade Dimensional/);
});

test('Addition of identical dimensions is valid and preserves unit', () => {
  const result = checkPhysicalOperation('+', 'm', 'm');
  assert.equal(result.success, true);
  assert.equal(result.resultSymbol, 'm');
});

test('formatDimensionVector handles complex exponents correctly', () => {
  const forceVec = STANDARD_UNITS['N'].vector;
  const formatted = formatDimensionVector(forceVec);
  assert.equal(formatted, 'L M T^-2');
});
