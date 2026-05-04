/**
 * DuitNow QR Code Decoder & Validator
 * Parses EMV QR Code Merchant-Presented Mode (MPM) format.
 * Validates CRC16 checksum.
 * 
 * Based on: EMVCo QR Code Specification, PayNet DuitNow QR docs,
 * natsu90's research, chengkiang's CRC16 implementation.
 * 
 * @module validators/duitnow-qr
 */

// CRC16-CCITT lookup table (polynomial 0x1021)
const CRC_TABLE = [
  0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50A5, 0x6046, 0x7067,
  0x8108, 0x9129, 0xA14A, 0xB16B, 0xC18C, 0xD1AD, 0xE1CE, 0xF1EF,
  0x1231, 0x0210, 0x3273, 0x2252, 0x52B5, 0x4294, 0x72F7, 0x62D6,
  0x9339, 0x8318, 0xB37B, 0xA35A, 0xD3BD, 0xC39C, 0xF3FF, 0xE3DE,
  0x2462, 0x3443, 0x0420, 0x1401, 0x64E6, 0x74C7, 0x44A4, 0x5485,
  0xA56A, 0xB54B, 0x8528, 0x9509, 0xE5EE, 0xF5CF, 0xC5AC, 0xD58D,
  0x3653, 0x2672, 0x1611, 0x0630, 0x76D7, 0x66F6, 0x5695, 0x46B4,
  0xB75B, 0xA77A, 0x9719, 0x8738, 0xF7DF, 0xE7FE, 0xD79D, 0xC7BC,
  0x4864, 0x5845, 0x6826, 0x7807, 0x08E0, 0x18C1, 0x28A2, 0x38C3,
  0xC92C, 0xD90D, 0xE92E, 0xF90F, 0x89E8, 0x99C9, 0xA9AA, 0xB98B,
  0x5A55, 0x4A74, 0x7A17, 0x6A36, 0x1AD1, 0x0AF0, 0x3A93, 0x2AB2,
  0xDB5D, 0xCB7C, 0xFB1F, 0xEB3E, 0x9BD9, 0x8BF8, 0xBB9B, 0xABBA,
  0x6CA6, 0x7C87, 0x4CE4, 0x5CC5, 0x2C22, 0x3C03, 0x0C60, 0x1C41,
  0xEDAE, 0xFD8F, 0xCDEC, 0xDDCD, 0xAD2A, 0xBD0B, 0x8D68, 0x9D49,
  0x7E97, 0x6EB6, 0x5ED5, 0x4EF4, 0x3E13, 0x2E32, 0x1E51, 0x0E70,
  0xFF9F, 0xEFBE, 0xDFDD, 0xCFFC, 0xBF1B, 0xAF3A, 0x9F59, 0x8F78,
  0x9188, 0x81A9, 0xB1CA, 0xA1EB, 0xD10C, 0xC12D, 0xF14E, 0xE16F,
  0x1080, 0x00A1, 0x30C2, 0x20E3, 0x5004, 0x4025, 0x7046, 0x6067,
  0x83B9, 0x9398, 0xA3FB, 0xB3DA, 0xC33D, 0xD31C, 0xE37F, 0xF35E,
  0x02B1, 0x1290, 0x22F3, 0x32D2, 0x4235, 0x5214, 0x6277, 0x7256,
  0xB5EA, 0xA5CB, 0x95A8, 0x8589, 0xF56E, 0xE54F, 0xD52C, 0xC50D,
  0x34E2, 0x24C3, 0x14A0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405,
  0xA7DB, 0xB7FA, 0x8799, 0x97B8, 0xE75F, 0xF77E, 0xC71D, 0xD73C,
  0x26D3, 0x36F2, 0x0691, 0x16B0, 0x6657, 0x7676, 0x4615, 0x5634,
  0xD94C, 0xC96D, 0xF90E, 0xE92F, 0x99C8, 0x89E9, 0xB98A, 0xA9AB,
  0x5844, 0x4865, 0x7806, 0x6827, 0x18C0, 0x08E1, 0x3882, 0x28A3,
  0xCB7D, 0xDB5C, 0xEB3F, 0xFB1E, 0x8BF9, 0x9BD8, 0xABBB, 0xBB9A,
  0x4A75, 0x5A54, 0x6A37, 0x7A16, 0x0AF1, 0x1AD0, 0x2AB3, 0x3A92,
  0xFD2E, 0xED0F, 0xDD6C, 0xCD4D, 0xBDAA, 0xAD8B, 0x9DE8, 0x8DC9,
  0x7C26, 0x6C07, 0x5C64, 0x4C45, 0x3CA2, 0x2C83, 0x1CE0, 0x0CC1,
  0xEF1F, 0xFF3E, 0xCF5D, 0xDF7C, 0xAF9B, 0xBFBA, 0x8FD9, 0x9FF8,
  0x6E17, 0x7E36, 0x4E55, 0x5E74, 0x2E93, 0x3EB2, 0x0ED1, 0x1EF0
];

/**
 * Calculate CRC16-CCITT checksum
 * @param {string} str - Input string
 * @returns {string} 4-character hex CRC
 */
function calculateCRC(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    const j = (c ^ (crc >> 8)) & 0xFF;
    crc = CRC_TABLE[j] ^ (crc << 8);
    crc &= 0xFFFF;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Validate CRC of a QR string
 * @param {string} qrString - Full QR payload string
 * @returns {boolean} Whether CRC is valid
 */
function validateCRC(qrString) {
  if (!qrString || qrString.length < 8) return false;
  const payload = qrString.substring(0, qrString.length - 4);
  const providedCRC = qrString.substring(qrString.length - 4);
  const calculatedCRC = calculateCRC(payload);
  return providedCRC.toUpperCase() === calculatedCRC;
}

/**
 * Parse TLV (Tag-Length-Value) from EMV QR string
 * @param {string} str - TLV encoded string
 * @returns {Array} Array of {id, length, value} objects
 */
function parseTLV(str) {
  const result = [];
  let i = 0;
  while (i < str.length) {
    if (i + 4 > str.length) break;
    const id = str.substring(i, i + 2);
    const length = parseInt(str.substring(i + 2, i + 4), 10);
    if (isNaN(length)) break;
    const value = str.substring(i + 4, i + 4 + length);
    result.push({ id, length, value });
    i += 4 + length;
  }
  return result;
}

// EMV QR field IDs
const FIELD_NAMES = {
  '00': 'payloadFormatIndicator',
  '01': 'pointOfInitiation',
  '26': 'merchantAccountInfo',
  '27': 'merchantAccountInfo2',
  '28': 'merchantAccountInfo3',
  '51': 'merchantCategoryCode_alt',
  '52': 'merchantCategoryCode',
  '53': 'transactionCurrency',
  '54': 'transactionAmount',
  '55': 'tipIndicator',
  '56': 'fixedTip',
  '57': 'percentageTip',
  '58': 'countryCode',
  '59': 'merchantName',
  '60': 'merchantCity',
  '61': 'postalCode',
  '62': 'additionalData',
  '63': 'crc',
  '64': 'merchantInfoLanguage'
};

// Merchant Account Info sub-fields
const MAI_FIELDS = {
  '00': 'guid',
  '01': 'acquirerId',
  '02': 'merchantId',
  '03': 'merchantPAN'
};

// Additional Data sub-fields
const AD_FIELDS = {
  '01': 'billNumber',
  '02': 'mobileNumber',
  '03': 'storeLabel',
  '04': 'loyaltyNumber',
  '05': 'referenceLabel',
  '06': 'customerLabel',
  '07': 'terminalLabel',
  '08': 'purposeOfTransaction',
  '09': 'additionalConsumerData',
  '82': 'ref82'
};

/**
 * Decode a DuitNow QR string
 * @param {string} qrString - The QR payload string
 * @returns {object} Decoded QR data
 */
function decodeDuitNowQR(qrString) {
  if (!qrString || typeof qrString !== 'string') {
    return { valid: false, error: 'EMPTY', message: 'QR string is required' };
  }

  const crcValid = validateCRC(qrString);
  const fields = parseTLV(qrString);
  
  const result = {
    valid: true,
    crcValid: crcValid,
    raw: qrString,
    fields: {},
    merchant: {},
    additionalData: {}
  };

  for (const field of fields) {
    const name = FIELD_NAMES[field.id] || `field_${field.id}`;
    
    if (field.id === '01') {
      result.fields[name] = field.value;
      result.type = field.value === '11' ? 'static' : field.value === '12' ? 'dynamic' : field.value;
    } else if (field.id === '26' || field.id === '27' || field.id === '28') {
      // Parse merchant account info sub-TLV
      const subFields = parseTLV(field.value);
      const mai = {};
      for (const sf of subFields) {
        const sfName = MAI_FIELDS[sf.id] || `sub_${sf.id}`;
        mai[sfName] = sf.value;
      }
      result.merchant = { ...result.merchant, ...mai };
      
      // Check if this is DuitNow (Malaysia AID)
      if (mai.guid === 'A0000006150001') {
        result.isDuitNow = true;
      }
    } else if (field.id === '62') {
      // Parse additional data sub-TLV
      const subFields = parseTLV(field.value);
      for (const sf of subFields) {
        const sfName = AD_FIELDS[sf.id] || `ad_${sf.id}`;
        result.additionalData[sfName] = sf.value;
      }
    } else if (field.id === '53') {
      result.fields[name] = field.value;
      result.currency = field.value === '458' ? 'MYR' : field.value;
    } else if (field.id === '54') {
      result.fields[name] = field.value;
      result.amount = parseFloat(field.value);
    } else if (field.id === '52') {
      result.fields[name] = field.value;
      result.mcc = field.value;
      result.isP2P = field.value === '0000';
    } else {
      result.fields[name] = field.value;
    }
  }

  return result;
}

/**
 * Generate a static DuitNow QR string (P2P)
 * Note: Dynamic QR codes require PayNet acquirer integration.
 * This generates basic static QR only.
 * 
 * @param {object} options
 * @param {string} options.acquirerId - 6-digit acquirer ID
 * @param {string} options.merchantId - Merchant/proxy ID (phone/NRIC)
 * @param {string} [options.merchantName] - Merchant name
 * @param {string} [options.merchantCity] - City (default: 'KUALA LUMPUR')
 * @param {number} [options.amount] - Transaction amount
 * @param {string} [options.reference] - Reference label
 * @returns {string} EMV QR string with CRC
 */
function generateStaticQR(options) {
  const { acquirerId, merchantId, merchantName, merchantCity, amount, reference } = options;

  let qr = '';
  
  // 00 - Payload Format Indicator
  qr += tlv('00', '01');
  
  // 01 - Point of Initiation (11 = static, 12 = dynamic)
  qr += tlv('01', amount ? '12' : '11');
  
  // 26 - Merchant Account Info
  let mai = '';
  mai += tlv('00', 'A0000006150001'); // DuitNow AID
  mai += tlv('01', acquirerId);
  mai += tlv('02', merchantId);
  qr += tlv('26', mai);
  
  // 52 - MCC (0000 = P2P)
  qr += tlv('52', '0000');
  
  // 53 - Currency (458 = MYR)
  qr += tlv('53', '458');
  
  // 54 - Amount (optional)
  if (amount) {
    qr += tlv('54', amount.toFixed(2));
  }
  
  // 58 - Country
  qr += tlv('58', 'MY');
  
  // 59 - Merchant Name
  qr += tlv('59', (merchantName || 'MERCHANT').substring(0, 25));
  
  // 60 - Merchant City
  qr += tlv('60', (merchantCity || 'KUALA LUMPUR').substring(0, 15));
  
  // 62 - Additional Data
  if (reference) {
    let ad = tlv('05', reference);
    qr += tlv('62', ad);
  }
  
  // 63 - CRC (placeholder, then calculate)
  qr += '6304';
  const crc = calculateCRC(qr);
  qr += crc;
  
  return qr;
}

function tlv(id, value) {
  const length = value.length.toString().padStart(2, '0');
  return id + length + value;
}

module.exports = { decodeDuitNowQR, validateCRC, calculateCRC, generateStaticQR, parseTLV };
