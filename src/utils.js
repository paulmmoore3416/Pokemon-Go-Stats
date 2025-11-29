/** Utility helpers for tests and small logic that benefit from unit testing */

function normalizeName(name) {
  if (!name) return '';
  return String(name).trim().toLowerCase().replace(/[^a-z0-9- ]/g, '');
}

module.exports = { normalizeName };
