/**
 * Malaysian Phone Number Validator
 * Validates format, normalizes to +60, detects carrier from prefix.
 * 
 * Note: Due to Mobile Number Portability (MNP), carrier detection
 * only indicates the ORIGINAL assigned operator, not necessarily
 * the current operator.
 * 
 * @module validators/phone-number
 */

const prefixes = require('../data/phone-prefixes.json');

// Build prefix lookup
const prefixMap = {};
prefixes.forEach(p => { prefixMap[p.prefix] = p; });

// Landline area codes
const areaCodes = {
  '3': { area: 'Selangor / KL / Putrajaya', subscriberDigits: 8 },
  '4': { area: 'Kedah / Penang / Perlis', subscriberDigits: 7 },
  '5': { area: 'Perak / Cameron Highlands', subscriberDigits: 7 },
  '6': { area: 'Negeri Sembilan / Melaka', subscriberDigits: 7 },
  '7': { area: 'Johor', subscriberDigits: 7 },
  '9': { area: 'Pahang / Terengganu / Kelantan', subscriberDigits: 7 },
  '82': { area: 'Sarawak (Kuching)', subscriberDigits: 6 },
  '83': { area: 'Sarawak (Sri Aman)', subscriberDigits: 6 },
  '84': { area: 'Sarawak (Sibu)', subscriberDigits: 6 },
  '85': { area: 'Sarawak (Miri)', subscriberDigits: 6 },
  '86': { area: 'Sarawak (Bintulu)', subscriberDigits: 6 },
  '87': { area: 'Labuan / Interior Sabah', subscriberDigits: 6 },
  '88': { area: 'Sabah (Kota Kinabalu)', subscriberDigits: 6 },
  '89': { area: 'Sabah (Sandakan / Tawau)', subscriberDigits: 6 }
};

/**
 * Validate and parse a Malaysian phone number
 * @param {string} number - Phone number in any format
 * @returns {object} Validation result with carrier info
 */
function validatePhone(number) {
  if (!number || typeof number !== 'string') {
    return { valid: false, error: 'EMPTY', message: 'Phone number is required' };
  }

  // Clean: remove spaces, dashes, dots, parentheses
  let cleaned = number.replace(/[\s\-\.\(\)]/g, '');

  // Handle international format
  if (cleaned.startsWith('+60')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('60') && cleaned.length > 9) {
    cleaned = '0' + cleaned.slice(2);
  }

  // Must start with 0
  if (!cleaned.startsWith('0')) {
    return { valid: false, error: 'INVALID_FORMAT', message: 'Malaysian numbers must start with 0 or +60' };
  }

  // Must be all digits
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: 'INVALID_CHARS', message: 'Phone number must contain only digits' };
  }

  // Determine type: mobile (01x) or landline (0x)
  if (cleaned.startsWith('01')) {
    return validateMobile(cleaned);
  } else {
    return validateLandline(cleaned);
  }
}

function validateMobile(cleaned) {
  // Extract prefix: "0123456789" -> prefix "012"
  const prefix = cleaned.substring(0, 3); // "012", "011", "016", etc.
  const prefixData = prefixMap[prefix];

  if (!prefixData) {
    return {
      valid: false,
      error: 'UNKNOWN_PREFIX',
      message: `Unknown mobile prefix: ${prefix}`,
      type: 'mobile'
    };
  }

  const expectedTotal = prefixData.totalDigits;

  if (cleaned.length !== expectedTotal) {
    return {
      valid: false,
      error: 'INVALID_LENGTH',
      message: `Numbers with prefix ${prefix} should be ${expectedTotal} digits total, got ${cleaned.length}`,
      type: 'mobile',
      expectedLength: expectedTotal
    };
  }

  // Detect carrier from sub-range
  let carrier = prefixData.originalOperator;
  
  if (prefixData.subRanges && prefixData.subRanges.length > 0) {
    const subscriberPart = cleaned.substring(3); // after prefix
    carrier = detectCarrier(subscriberPart, prefixData.subRanges) || 'Unknown';
  }

  const normalized = '+60' + cleaned.substring(1);

  return {
    valid: true,
    type: prefixData.type || 'mobile',
    normalized: normalized,
    local: cleaned,
    prefix: prefix,
    carrier: carrier,
    carrierNote: 'Original operator. May differ due to Mobile Number Portability (MNP).',
    length: cleaned.length
  };
}

function detectCarrier(subscriberPart, subRanges) {
  for (const range of subRanges) {
    const r = range.range;
    
    if (r.includes('-')) {
      // Range like "30-34"
      const [start, end] = r.split('-');
      const checkDigits = start.length;
      const sub = subscriberPart.substring(0, checkDigits);
      const subNum = parseInt(sub, 10);
      if (subNum >= parseInt(start, 10) && subNum <= parseInt(end, 10)) {
        return range.operator;
      }
    } else {
      // Exact match like "2" or "11"
      if (subscriberPart.startsWith(r)) {
        return range.operator;
      }
    }
  }
  return null;
}

function validateLandline(cleaned) {
  // Try 2-digit area codes first (East Malaysia: 8x)
  const twoDigit = cleaned.substring(1, 3);
  if (areaCodes[twoDigit]) {
    const ac = areaCodes[twoDigit];
    const expectedTotal = 1 + 2 + ac.subscriberDigits; // 0 + area + subscriber
    if (cleaned.length === expectedTotal) {
      return {
        valid: true,
        type: 'landline',
        normalized: '+60' + cleaned.substring(1),
        local: cleaned,
        areaCode: '0' + twoDigit,
        area: ac.area,
        length: cleaned.length
      };
    }
  }

  // Try 1-digit area codes (Peninsular: 3-9)
  const oneDigit = cleaned.substring(1, 2);
  if (areaCodes[oneDigit]) {
    const ac = areaCodes[oneDigit];
    const expectedTotal = 1 + 1 + ac.subscriberDigits; // 0 + area + subscriber
    if (cleaned.length === expectedTotal) {
      return {
        valid: true,
        type: 'landline',
        normalized: '+60' + cleaned.substring(1),
        local: cleaned,
        areaCode: '0' + oneDigit,
        area: ac.area,
        length: cleaned.length
      };
    }
  }

  return {
    valid: false,
    error: 'INVALID_LANDLINE',
    message: `Invalid landline number format: ${cleaned}`,
    type: 'landline'
  };
}

/**
 * Normalize any Malaysian number to +60 format
 * @param {string} number
 * @returns {string|null} Normalized number or null if invalid
 */
function normalizePhone(number) {
  const result = validatePhone(number);
  return result.valid ? result.normalized : null;
}

module.exports = { validatePhone, normalizePhone };
