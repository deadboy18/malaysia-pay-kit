/**
 * Malaysian Bank Account Number Validator
 * Validates account number length/format by bank and account type.
 * 
 * @module validators/account-number
 */

const banks = require('../data/banks.json');

// Build lookup maps
const bankById = {};
const bankByBic = {};
const bankByIbg = {};
banks.forEach(b => {
  bankById[b.id] = b;
  if (b.codes.bic) bankByBic[b.codes.bic] = b;
  if (b.codes.ibg) bankByIbg[b.codes.ibg] = b;
});

/**
 * Validate a Malaysian bank account number
 * @param {string} bankId - Bank identifier (slug id, BIC code, or IBG code)
 * @param {string} accountNumber - The account number to validate
 * @param {string} [accountType] - Optional: 'current', 'savings', 'creditCard', 'loan', 'hirePurchase'
 * @returns {object} Validation result
 */
function validateAccount(bankId, accountNumber, accountType) {
  // Find bank
  const bank = bankById[bankId] || bankByBic[bankId] || bankByIbg[bankId];
  
  if (!bank) {
    return {
      valid: false,
      error: 'UNKNOWN_BANK',
      message: `Bank not found: ${bankId}`
    };
  }

  // Clean account number - remove spaces, dashes
  const cleaned = accountNumber.replace(/[\s\-]/g, '');

  // Must be all digits
  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      error: 'INVALID_FORMAT',
      message: 'Account number must contain only digits',
      bank: bank.shortName
    };
  }

  const length = cleaned.length;

  // If account type specified, validate against that type
  if (accountType) {
    const format = bank.accountFormats[accountType];
    if (!format) {
      return {
        valid: false,
        error: 'UNSUPPORTED_TYPE',
        message: `${bank.shortName} does not support ${accountType} accounts via IBG`,
        bank: bank.shortName
      };
    }

    if (format.lengths.includes(length)) {
      return {
        valid: true,
        bank: bank.shortName,
        bankId: bank.id,
        type: accountType,
        length: length,
        notes: format.notes || null
      };
    } else {
      return {
        valid: false,
        error: 'INVALID_LENGTH',
        message: `${bank.shortName} ${accountType} account should be ${format.lengths.join(' or ')} digits, got ${length}`,
        bank: bank.shortName,
        expectedLengths: format.lengths
      };
    }
  }

  // No account type specified — try to detect
  const matches = [];
  const types = ['current', 'savings', 'creditCard', 'loan', 'hirePurchase'];

  for (const type of types) {
    const format = bank.accountFormats[type];
    if (format && format.lengths.includes(length)) {
      matches.push(type);
    }
  }

  if (matches.length > 0) {
    return {
      valid: true,
      bank: bank.shortName,
      bankId: bank.id,
      type: matches.length === 1 ? matches[0] : null,
      possibleTypes: matches,
      length: length
    };
  }

  // Collect all valid lengths for this bank
  const allLengths = new Set();
  for (const type of types) {
    const format = bank.accountFormats[type];
    if (format) {
      format.lengths.forEach(l => allLengths.add(l));
    }
  }

  return {
    valid: false,
    error: 'INVALID_LENGTH',
    message: `${bank.shortName} account numbers should be ${[...allLengths].sort((a, b) => a - b).join(', ')} digits, got ${length}`,
    bank: bank.shortName,
    validLengths: [...allLengths].sort((a, b) => a - b)
  };
}

/**
 * Get all banks
 * @returns {Array} All bank entries
 */
function getAllBanks() {
  return banks;
}

/**
 * Find bank by any code type
 * @param {string} code - BIC, IBG, acquirer ID, or slug
 * @returns {object|null} Bank entry or null
 */
function findBank(code) {
  return bankById[code] || bankByBic[code] || bankByIbg[code] || 
    banks.find(b => b.codes.acquirerId === code) ||
    banks.find(b => b.codes.fpx && (b.codes.fpx.retail === code || b.codes.fpx.corporate === code)) ||
    null;
}

module.exports = { validateAccount, getAllBanks, findBank };
