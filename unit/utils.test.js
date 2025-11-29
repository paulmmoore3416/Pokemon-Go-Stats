const { normalizeName } = require('../../src/utils');

describe('normalizeName', () => {
  test('normalizes spacing, case and removes punctuation', () => {
    expect(normalizeName('  BulBaSaur!! ')).toBe('bulbasaur');
  });

  test('handles empty and non-string inputs', () => {
    expect(normalizeName(null)).toBe('');
    expect(normalizeName(123)).toBe('123');
  });
});
