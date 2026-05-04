/**
 * Malaysian SSM Business Registration Number Validator
 * Supports old format (XX-XXXXX) and new format (202301012345).
 * 
 * @module validators/business-reg
 */

/**
 * Validate an SSM business registration number
 * @param {string} regNo - Registration number
 * @returns {object} Validation result
 */
function validateSSM(regNo) {
  if (!regNo || typeof regNo !== 'string') {
    return { valid: false, error: 'EMPTY', message: 'Registration number is required' };
  }

  const cleaned = regNo.replace(/[\s\-]/g, '');

  // New format: 12 digits starting with year (e.g., 202301012345)
  if (/^\d{12}$/.test(cleaned)) {
    const year = parseInt(cleaned.substring(0, 4), 10);
    if (year >= 2000 && year <= new Date().getFullYear()) {
      return {
        valid: true,
        format: 'new',
        regNo: cleaned,
        formatted: cleaned,
        year: year
      };
    }
  }

  // Old format with dash: XX-XXXXX or similar patterns
  const oldFormatMatch = regNo.match(/^(\d{2,6})\-?(\d{1,7})(\s*\([A-Z]+\))?$/i);
  if (oldFormatMatch) {
    return {
      valid: true,
      format: 'old',
      regNo: cleaned,
      formatted: `${oldFormatMatch[1]}-${oldFormatMatch[2]}${oldFormatMatch[3] || ''}`.trim()
    };
  }

  // Company number format: xxxxxxx-X (7 digits + letter)
  if (/^\d{5,7}[A-Za-z]$/.test(cleaned)) {
    return {
      valid: true,
      format: 'company',
      regNo: cleaned,
      formatted: cleaned.toUpperCase()
    };
  }

  return {
    valid: false,
    error: 'INVALID_FORMAT',
    message: 'Unrecognized registration number format. Expected: 12-digit new format (e.g., 202301012345) or old format (e.g., 12-34567).'
  };
}

module.exports = { validateSSM };
