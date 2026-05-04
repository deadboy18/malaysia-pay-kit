/**
 * Malaysia Payment & Developer Kit
 * 
 * Everything a developer needs for Malaysian payment integration —
 * data, validators, QR specs, and documentation.
 * 
 * @module malaysia-pay-kit
 */

// === DATA ===
const banks = require('./data/banks.json');
const ewallets = require('./data/ewallets.json');
const acquirers = require('./data/acquirers.json');
const fpxBanks = require('./data/fpx-banks.json');
const states = require('./data/states.json');
const phonePrefixes = require('./data/phone-prefixes.json');
const icStateCodes = require('./data/ic-state-codes.json');
const transactionCodes = require('./data/transaction-codes.json');

// Response codes
const fpxResponseCodes = require('./data/response-codes/fpx.json');
const cardResponseCodes = require('./data/response-codes/card.json');
const duitnowResponseCodes = require('./data/response-codes/duitnow.json');

// === VALIDATORS ===
const { validateAccount, getAllBanks, findBank } = require('./validators/account-number');
const { validatePhone, normalizePhone } = require('./validators/phone-number');
const { validateIC, extractBirthDate, extractGender, extractState } = require('./validators/ic-number');
const { validateSSM } = require('./validators/business-reg');
const { validatePostcode, getStateByPostcode } = require('./validators/postcode');
const { decodeDuitNowQR, validateCRC, calculateCRC, generateStaticQR } = require('./validators/duitnow-qr');

// === LOOKUP HELPERS ===

// Build indexes
const _bankById = {};
const _bankByBic = {};
const _bankByIbg = {};
const _bankByAcquirer = {};
banks.forEach(b => {
  _bankById[b.id] = b;
  if (b.codes.bic) _bankByBic[b.codes.bic] = b;
  if (b.codes.ibg) _bankByIbg[b.codes.ibg] = b;
  if (b.codes.acquirerId) _bankByAcquirer[b.codes.acquirerId] = b;
});

const _ewalletById = {};
ewallets.forEach(e => { _ewalletById[e.id] = e; });

const _stateById = {};
states.forEach(s => { _stateById[s.id] = s; });

function getBank(id) { return _bankById[id] || null; }
function getBankByBic(bic) { return _bankByBic[bic] || null; }
function getBankByIbg(code) { return _bankByIbg[code] || null; }
function getBankByAcquirer(id) { return _bankByAcquirer[id] || null; }
function getBankByFpx(fpxId) {
  return banks.find(b => b.codes.fpx && 
    (b.codes.fpx.retail === fpxId || b.codes.fpx.corporate === fpxId)) || null;
}

function getEwallet(id) { return _ewalletById[id] || null; }
function getState(id) { return _stateById[id] || null; }

function getCarrierByPrefix(prefix) {
  const clean = prefix.replace(/^0/, '');
  const data = phonePrefixes.find(p => p.prefix === clean);
  return data || null;
}

function getCityByPostcode(postcode) {
  const result = validatePostcode(postcode);
  return result.valid ? { state: result.state, stateId: result.stateId } : null;
}

// === EXPORTS ===
module.exports = {
  // Data
  banks,
  ewallets,
  acquirers,
  fpxBanks,
  states,
  phonePrefixes,
  icStateCodes,
  transactionCodes,

  // Response codes
  responseCodes: {
    fpx: fpxResponseCodes,
    card: cardResponseCodes,
    duitnow: duitnowResponseCodes
  },

  // Lookups
  getBank,
  getBankByBic,
  getBankByIbg,
  getBankByFpx,
  getBankByAcquirer,
  getEwallet,
  getState,
  getCarrierByPrefix,
  getCityByPostcode,
  findBank,

  // Validators
  validateAccount,
  validatePhone,
  normalizePhone,
  validateIC,
  extractBirthDate,
  extractGender,
  extractState,
  validateSSM,
  validatePostcode,
  getStateByPostcode,

  // DuitNow QR
  decodeDuitNowQR,
  validateCRC,
  calculateCRC,
  generateStaticQR
};
