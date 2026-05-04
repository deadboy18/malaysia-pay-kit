/**
 * Malaysian Postcode Validator
 * Validates 5-digit postcodes and detects state from postcode range.
 * 
 * @module validators/postcode
 */

const states = require('../data/states.json');

// Build postcode-to-state lookup from ranges
const stateRanges = states.map(s => ({
  id: s.id,
  name: s.name,
  from: parseInt(s.postcodeRange.from, 10),
  to: parseInt(s.postcodeRange.to, 10)
})).sort((a, b) => a.from - b.from);

/**
 * Validate a Malaysian postcode
 * @param {string} postcode - 5-digit postcode
 * @returns {object} Validation result with state info
 */
function validatePostcode(postcode) {
  if (!postcode || typeof postcode !== 'string') {
    return { valid: false, error: 'EMPTY', message: 'Postcode is required' };
  }

  const cleaned = postcode.replace(/\s/g, '');

  if (!/^\d{5}$/.test(cleaned)) {
    return {
      valid: false,
      error: 'INVALID_FORMAT',
      message: 'Malaysian postcodes must be exactly 5 digits'
    };
  }

  const num = parseInt(cleaned, 10);

  // Find state by range
  for (const range of stateRanges) {
    if (num >= range.from && num <= range.to) {
      return {
        valid: true,
        postcode: cleaned,
        state: range.name,
        stateId: range.id
      };
    }
  }

  return {
    valid: false,
    error: 'UNKNOWN_POSTCODE',
    message: `Postcode ${cleaned} does not fall within any known Malaysian state range`
  };
}

/**
 * Get state from postcode
 * @param {string} postcode
 * @returns {string|null} State name or null
 */
function getStateByPostcode(postcode) {
  const result = validatePostcode(postcode);
  return result.valid ? result.state : null;
}

module.exports = { validatePostcode, getStateByPostcode };
