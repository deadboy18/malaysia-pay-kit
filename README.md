# 🇲🇾 Malaysia Payment Dev Kit

> Everything a developer needs for Malaysian payment integration — bank data, validators, QR specs, icons, and documentation. All in one repo.

## Why This Exists

If you've built payment features for the Malaysian market, you know the pain: bank codes scattered across PDFs, account formats buried in bank websites, FPX IDs that don't match DuitNow BIC codes, no single source of truth for any of it.

This repo fixes that. One `npm install` gives you validated, cross-referenced data for every bank, e-wallet, and payment method in Malaysia.

---

## Install

```bash
npm install malaysia-pay-kit
```

Or just grab the JSON files directly from `/data/`.

---

## Quick Start

```javascript
const MY = require('malaysia-pay-kit');

// Look up any bank by ID, BIC, IBG code, or FPX ID
MY.getBank('maybank');              // Full bank object
MY.getBankByBic('MBBEMYKL');        // By DuitNow BIC
MY.getBankByIbg('0227');            // By IBG code  
MY.getBankByFpx('MB2U0227');        // By FPX bank ID
MY.getBankByAcquirer('588700');     // By acquirer ID

// Validate a bank account number
MY.validateAccount('maybank', '512345678901');
// { valid: true, possibleTypes: ['current','savings','loan','hirePurchase'], bank: 'Maybank' }

MY.validateAccount('cimb-bank', '12345');
// { valid: false, error: 'INVALID_LENGTH', message: 'CIMB Bank account numbers should be 10, 12, 14, 16, 17 digits, got 5' }

// Validate & normalize phone numbers
MY.validatePhone('0123456789');
// { valid: true, normalized: '+60123456789', carrier: 'Maxis', type: 'mobile' }

MY.validatePhone('+60162345678');
// { valid: true, normalized: '+60162345678', carrier: 'DiGi', type: 'mobile' }

// Validate MyKad / NRIC
MY.validateIC('900101-14-5678');
// { valid: true, birthDate: '1990-01-01', age: 36, state: 'Kuala Lumpur', gender: 'female' }

// Validate postcodes
MY.validatePostcode('50000');
// { valid: true, state: 'Kuala Lumpur', stateId: 'kuala-lumpur' }

// Decode DuitNow QR codes
MY.decodeDuitNowQR('00020101021126...');
// { valid: true, type: 'static', isDuitNow: true, merchant: {...}, amount: 10.50, currency: 'MYR', crcValid: true }

// Generate static DuitNow QR strings
MY.generateStaticQR({
  acquirerId: '588700',
  merchantId: '0123456789',
  merchantName: 'ALI SHOP',
  amount: 10.50
});
// Returns EMV-compliant QR payload string with valid CRC16
```

---

## What's Inside

### `/data/` — Machine-readable JSON

| File | Records | Description |
|------|---------|-------------|
| `banks.json` | 46 | All Malaysian banks — conventional, Islamic arms, digital banks. IBG, BIC, routing ID, acquirer ID, FPX IDs, account formats per type. |
| `ewallets.json` | 9 | TNG, GrabPay, Boost, ShopeePay, BigPay, Merchantrade, etc. Proxy vs account pay flags, app store links. |
| `acquirers.json` | 62 | PayNet DuitNow QR acquirers — banks, e-wallets, processors. |
| `fpx-banks.json` | 52 | FPX bank IDs with retail/corporate mode flags. |
| `states.json` | 16 | All states/FT with IC codes, lat/lng, area codes, postcode ranges. |
| `phone-prefixes.json` | 10 prefixes | Complete mobile prefix-to-carrier mapping including 011 sub-ranges. |
| `ic-state-codes.json` | 88 | All MyKad birth state/country codes. |
| `transaction-codes.json` | 89 | Payment types: FPX, card, DuitNow QR, e-wallets, BNPL, instalment plans per bank. |
| `response-codes/fpx.json` | 77 | FPX response codes with descriptions. |
| `response-codes/card.json` | 71 | Visa/MC/Amex card response codes. |
| `response-codes/duitnow.json` | — | DuitNow + GrabPay + TNG + ShopeePay + Riipay codes. |

### `/validators/` — Ready-to-use validation

| Validator | What It Does |
|-----------|-------------|
| `account-number.js` | Validates account number by bank (46 banks × 5 account types). Handles CIMB dual lengths, ICBC prefix rules, UOB variable formats. |
| `phone-number.js` | Malaysian phone validation, +60 normalization, carrier detection from prefix, mobile/landline/VoIP classification. |
| `ic-number.js` | MyKad/NRIC: birth date, state, gender extraction from 12-digit IC. |
| `duitnow-qr.js` | EMV QR TLV decoder, CRC16 validation, static QR generator. |
| `postcode.js` | 5-digit postcode validation, state lookup. |
| `business-reg.js` | SSM registration number (old + new format). |

### `/docs/` — Comprehensive documentation

| File | Description |
|------|-------------|
| `bank-codes.md` | Cross-reference table: IBG + BIC + FPX + acquirer + routing per bank |
| `account-formats.md` | Account number lengths per bank per type, special cases |
| `fpx-reference.md` | FPX bank IDs, response codes, ID types, developer tips |
| `response-codes.md` | 500+ response codes across all payment types |
| `duitnow-qr-research.md` | Community QR reverse engineering (natsu90 + contributors) |
| `paynet-developer-docs.md` | Full PayNet docs scraped to markdown |
| `resources.md` | Curated links to all community repos and official docs |
| `icon-inventory.md` | Icon audit: what's available vs what needs creating |

---

## Data Sources

This repo cross-references data from **35+ sources**:

| Source | What |
|--------|------|
| [PayNet Developer Docs](https://docs.developer.paynet.my) | QR spec, 70 acquirers, FPX banks, response codes |
| UOB IBG PDF (Mar 2024) | 41 banks: IBG codes, BIC, account formats |
| OCBC IBG PDF (Oct 2023) | 44 banks incl. Islamic arms, delivery channels |
| [RHB BIC Listing](https://www.rhbgroup.com/myreflex/premium/articles/article/bic_code_listing/) | 84 FIs: BIC, RENTAS, routing numbers |
| [PIDM Member Banks](https://www.pidm.gov.my/general/how-we-protect-you/member-banks) | Definitive list of deposit-insured banks |
| [PayEx/Xendit](https://www.payex.io/docs/) | Response codes, FPX buyer bank IDs, transaction types |
| [Wikipedia: MY Telephone Numbers](https://en.wikipedia.org/wiki/Telephone_numbers_in_Malaysia) | Prefix-to-carrier mapping |
| [SnorSnor9998/Payment-Icon](https://github.com/SnorSnor9998/Payment-Icon) | SVG icons (66 payment methods) |
| [AsyrafHussin/malaysia-postcodes](https://github.com/AsyrafHussin/malaysia-postcodes) | Postcode dataset |
| [natsu90](https://github.com/natsu90) | DuitNow QR reverse engineering |
| Full list in [`docs/resources.md`](docs/resources.md) | |

---

## Phone Number Carrier Detection

```javascript
MY.validatePhone('0123456789');  // → Maxis
MY.validatePhone('0162345678');  // → DiGi (CelcomDigi)
MY.validatePhone('0191234567');  // → Celcom (CelcomDigi)
MY.validatePhone('01112345678'); // → Maxis (011-12x range)
MY.validatePhone('0181234567');  // → U Mobile
```

> **Note:** Due to Mobile Number Portability (MNP), carrier detection indicates the *original* assigned operator. The current operator may differ if the user has ported their number.

---

## DuitNow QR

Decode any DuitNow QR string into structured data:

```javascript
const decoded = MY.decodeDuitNowQR(qrString);

console.log(decoded.type);        // 'static' or 'dynamic'
console.log(decoded.isDuitNow);   // true (Malaysia AID detected)
console.log(decoded.merchant);    // { guid, acquirerId, merchantId }
console.log(decoded.amount);      // 10.50
console.log(decoded.currency);    // 'MYR'
console.log(decoded.crcValid);    // true/false
```

Generate static QR strings (P2P):

```javascript
const qr = MY.generateStaticQR({
  acquirerId: '588700',      // Maybank
  merchantId: '60123456789', // Phone number
  merchantName: 'ALI',
  amount: 25.00
});
// Returns: '00020101021226...' with valid CRC16
```

> **Important:** Dynamic QR codes require PayNet acquirer integration. Only static QR can be generated client-side. See `docs/duitnow-qr-research.md` for details.

---

## Contributing

Found outdated info? New bank launched? Account format changed? PRs welcome.

1. Fork this repo
2. Update the relevant JSON file in `/data/`
3. Update the corresponding doc in `/docs/` if needed
4. Submit a PR with your source (link to official bank page, PDF, etc.)

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines.

---

## Credits

This project wouldn't exist without the Malaysian developer community:

| Contributor | Contribution |
|-------------|-------------|
| [natsu90](https://github.com/natsu90) (Sulaiman Sudirman) | DuitNow QR reverse engineering, duitnow-js generator |
| [kidino](https://github.com/kidino) | Original DuitNow QR use case discovery |
| [chengkiang](https://chengkiang.com) | CRC16 implementation (PayNow/SGQR reference) |
| [SnorSnor9998](https://github.com/SnorSnor9998) | Payment-Icon SVG collection (66 icons) |
| [AsyrafHussin](https://github.com/AsyrafHussin) | malaysia-postcodes dataset |
| [shah253kt](https://gist.github.com/shah253kt) | Malaysian SWIFT/BIC codes (146 entries) |
| [zulhfreelancer](https://gist.github.com/zulhfreelancer) | Malaysian banks JSON with FPX codes |
| [xanda](https://gist.github.com/xanda) | Malaysian card BIN numbers (~230 entries) |
| [farhan-syah](https://github.com/farhan-syah) | Malaysia states JSON with coordinates |
| [lomotech](https://github.com/lomotech) | jajahan — states/districts/postcodes |
| [nurfaizfoat](https://github.com/nurfaizfoat) | bankMY payment webfont |
| [deadboy18](https://github.com/deadboy18) | qr-studio — DuitNow QR decode tool |

**Official sources:** [PayNet](https://developer.paynet.my), [BNM](https://www.bnm.gov.my), [PIDM](https://www.pidm.gov.my), [MCMC](https://www.mcmc.gov.my), [PayEx/Xendit](https://www.payex.io), [senangPay](https://guide.senangpay.com)

---

## License

MIT — use it however you want. Attribution appreciated but not required.

Data sourced from publicly available official documents and community contributions. Bank logos/icons are trademarks of their respective owners.

---

## Disclaimer

This is a community project. Data is compiled from public sources and may not always be current. Always verify critical payment details with the relevant bank or institution before production use. This project is not affiliated with PayNet, BNM, or any financial institution.
