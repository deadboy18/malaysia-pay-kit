/**
 * Malaysian IC/NRIC/MyKad Validator
 * Validates 12-digit NRIC format, extracts birth date, state, and gender.
 * 
 * Format: YYMMDD-SS-XXXG
 * - YYMMDD: Date of birth
 * - SS: State/country code
 * - XXX: Sequential number
 * - G: Gender (odd=male, even=female)
 * 
 * @module validators/ic-number
 */

const icStateCodes = require('../data/ic-state-codes.json');

// Build state lookup
const stateMap = {};
icStateCodes.forEach(s => { stateMap[s.code] = s; });

/**
 * Validate a Malaysian IC number
 * @param {string} ic - IC number (with or without dashes)
 * @returns {object} Validation result with extracted info
 */
function validateIC(ic) {
  if (!ic || typeof ic !== 'string') {
    return { valid: false, error: 'EMPTY', message: 'IC number is required' };
  }

  // Remove dashes and spaces
  const cleaned = ic.replace(/[\s\-]/g, '');

  // Must be exactly 12 digits
  if (!/^\d{12}$/.test(cleaned)) {
    return {
      valid: false,
      error: 'INVALID_FORMAT',
      message: 'IC number must be exactly 12 digits'
    };
  }

  // Extract parts
  const year = cleaned.substring(0, 2);
  const month = cleaned.substring(2, 4);
  const day = cleaned.substring(4, 6);
  const stateCode = cleaned.substring(6, 8);
  const sequential = cleaned.substring(8, 11);
  const genderDigit = parseInt(cleaned.substring(11, 12), 10);

  // Validate date
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);

  if (monthNum < 1 || monthNum > 12) {
    return {
      valid: false,
      error: 'INVALID_MONTH',
      message: `Invalid month: ${month}`
    };
  }

  if (dayNum < 1 || dayNum > 31) {
    return {
      valid: false,
      error: 'INVALID_DAY',
      message: `Invalid day: ${day}`
    };
  }

  // Determine full year (assume 00-29 = 2000s, 30-99 = 1900s)
  const yearNum = parseInt(year, 10);
  const fullYear = yearNum <= 29 ? 2000 + yearNum : 1900 + yearNum;

  // Validate the date is real
  const birthDate = new Date(fullYear, monthNum - 1, dayNum);
  if (birthDate.getFullYear() !== fullYear ||
      birthDate.getMonth() !== monthNum - 1 ||
      birthDate.getDate() !== dayNum) {
    return {
      valid: false,
      error: 'INVALID_DATE',
      message: `Invalid date: ${fullYear}-${month}-${day}`
    };
  }

  // Check not in future
  if (birthDate > new Date()) {
    return {
      valid: false,
      error: 'FUTURE_DATE',
      message: 'Birth date cannot be in the future'
    };
  }

  // Validate state code
  const stateInfo = stateMap[stateCode];
  if (!stateInfo) {
    return {
      valid: false,
      error: 'INVALID_STATE',
      message: `Unknown state code: ${stateCode}`
    };
  }

  // Determine gender
  const gender = genderDigit % 2 === 0 ? 'female' : 'male';

  // Format birth date as ISO string
  const birthDateStr = `${fullYear}-${month}-${day}`;

  // Calculate age
  const today = new Date();
  let age = today.getFullYear() - fullYear;
  const m = today.getMonth() - (monthNum - 1);
  if (m < 0 || (m === 0 && today.getDate() < dayNum)) {
    age--;
  }

  // Format IC with dashes
  const formatted = `${cleaned.substring(0, 6)}-${cleaned.substring(6, 8)}-${cleaned.substring(8, 12)}`;

  return {
    valid: true,
    ic: cleaned,
    formatted: formatted,
    birthDate: birthDateStr,
    age: age,
    stateCode: stateCode,
    state: stateInfo.state,
    stateNotes: stateInfo.notes || null,
    bornInMalaysia: parseInt(stateCode, 10) <= 59,
    gender: gender,
    sequential: sequential
  };
}

/**
 * Extract just the birth date from an IC
 * @param {string} ic
 * @returns {string|null} ISO date string or null
 */
function extractBirthDate(ic) {
  const result = validateIC(ic);
  return result.valid ? result.birthDate : null;
}

/**
 * Extract gender from IC
 * @param {string} ic
 * @returns {string|null} 'male' or 'female' or null
 */
function extractGender(ic) {
  const result = validateIC(ic);
  return result.valid ? result.gender : null;
}

/**
 * Extract state from IC
 * @param {string} ic
 * @returns {string|null} State name or null
 */
function extractState(ic) {
  const result = validateIC(ic);
  return result.valid ? result.state : null;
}

module.exports = { validateIC, extractBirthDate, extractGender, extractState };
