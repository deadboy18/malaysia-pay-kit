# Repo 1 — Malaysia Payment & DuitNow QR Developer Kit

> Everything a developer needs for Malaysian payment integration — data, validators, icons, QR specs, and documentation. All in one repo.

## Repo Naming Candidates

| Option | Notes |
|--------|-------|
| `my-payment-dev` | Broad, "MY" = Malaysia |
| `malaysia-pay-kit` | Clear purpose |
| `bayar-dev` | "Bayar" = Pay in Malay, local flavor |
| `my-fintech-data` | Fintech-focused |
| *(TBD — your call)* | |

---

## Overview

| Field | Detail |
|-------|--------|
| **Purpose** | Single open-source hub for Malaysian payment infrastructure — data, docs, tools, icons |
| **Audience** | Developers building payment apps, fintech, e-commerce in Malaysia |
| **Tech** | JSON data + JS/TS validators + SVG icons + Markdown documentation |
| **License** | MIT |
| **Publish** | GitHub + npm package |

---

## Repository Structure

```
repo-name/
├── README.md
├── LICENSE (MIT)
├── CONTRIBUTING.md
├── CHANGELOG.md
├── package.json
│
├── data/
│   ├── banks.json                  # All Malaysian banks (IBG + DuitNow + FPX + RENTAS)
│   ├── ewallets.json               # All e-wallets (TNG, Boost, GrabPay, ShopeePay, BigPay, etc.)
│   ├── acquirers.json              # PayNet DuitNow QR acquirer list (70 entries)
│   ├── payment-processors.json     # iPay88, Stripe MY, Billplz, Curlec/Xendit, senangPay, etc.
│   ├── fpx-banks.json              # FPX bank IDs (B2C/B2B, retail/corporate modes)
│   ├── card-bins.json              # Malaysian credit/debit card BIN numbers by bank
│   ├── states.json                 # 16 states/FT with postcodes, IC codes, lat/long
│   ├── districts.json              # All districts by state
│   ├── postcodes.json              # All Malaysian postcodes with city/state
│   ├── phone-prefixes.json         # Mobile/landline prefixes + carriers + number lengths
│   ├── ic-state-codes.json         # MyKad birth state codes (~60 codes)
│   ├── mcc-codes.json              # Common MCC codes used in Malaysia
│   ├── fpx-business-codes.json     # FPX business category + MSIC codes
│   ├── response-codes/
│   │   ├── fpx.json                # FPX response codes (from PayNet + PayEx)
│   │   ├── card.json               # Card payment response codes
│   │   ├── duitnow.json            # DuitNow response/reason codes
│   │   ├── grabpay.json            # GrabPay response codes
│   │   ├── tng.json                # TNG Digital response codes
│   │   ├── shopeepay.json          # ShopeePay response codes
│   │   ├── riipay.json             # Riipay response codes
│   │   ├── mandate.json            # e-Mandate response codes
│   │   ├── batch.json              # Batch processing response codes
│   │   └── billing.json            # Billing (ENRP) response codes
│   ├── currencies.json             # All world currencies with codes
│   ├── countries.json              # All countries with ISO codes
│   └── transaction-codes.json      # PayEx transaction type codes + descriptions
│
├── validators/
│   ├── index.js                    # Main entry point
│   ├── account-number.js           # Validate account number by bank
│   ├── phone-number.js             # Malaysian phone validation + carrier detection
│   ├── ic-number.js                # NRIC/MyKad validation + state/gender/DOB extraction
│   ├── business-reg.js             # SSM business registration number
│   ├── postcode.js                 # Malaysian postcode validation + city/state lookup
│   └── duitnow-qr.js              # DuitNow QR decoder/validator/CRC16
│
├── icons/
│   ├── banks/                      # SVG logos per bank (square + round + long)
│   ├── ewallets/                   # SVG logos per e-wallet
│   ├── bnpl/                       # BNPL provider logos (Atome, Riipay, etc.)
│   └── networks/                   # DuitNow, FPX, JomPAY, MyDebit, Visa, MC, etc.
│
├── docs/
│   ├── paynet-developer-docs.md    # Full PayNet docs scraped to markdown
│   ├── duitnow-qr-research.md     # QR spec research (natsu90 + community)
│   ├── bank-codes.md               # Human-readable bank code reference (IBG + BIC + FPX + RENTAS)
│   ├── account-formats.md          # Account number formats by bank (from UOB + OCBC PDFs)
│   ├── fpx-reference.md            # FPX integration reference (bank IDs, business codes, response codes)
│   ├── response-codes.md           # Complete response code documentation (all payment types)
│   └── resources.md                # Links to community repos, gists, tools, official docs
│
└── schemas/
    ├── bank.schema.json            # JSON Schema for bank data
    ├── ewallet.schema.json         # JSON Schema for e-wallet data
    └── duitnow-qr.schema.json     # JSON Schema for DuitNow QR payload
```

---

## Data Sources Inventory (Complete)

### Banks & Financial Institutions

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 1 | UOB IBG PDF (Mar 2024) | Uploaded | 41 banks/e-wallets: IBG codes, BIC codes, routing IDs, account number lengths per type (CA/SA/CC/Loan/HP) | ✅ In context |
| 2 | OCBC IBG PDF (Oct 2023) | ocbc.com.my/assets/pdf | 44 banks (incl. Islamic arms): routing numbers, account lengths, delivery channels | ✅ Scraped |
| 3 | RHB BIC Code Listing | rhbgroup.com/myreflex | 84 financial institutions: BIC codes, RENTAS status, IBG routing numbers | ✅ Scraped |
| 4 | Affin Bank IBG Listing | affinalways.com/en/ibg-listing | 21 banks: account lengths per type, delivery channels | ✅ Scraped |
| 5 | PIDM Member Banks | pidm.gov.my | 27 licensed banks + 18 Islamic banks + 5 digital banks — **definitive** list of deposit-taking banks in Malaysia | ✅ Scraped |
| 6 | shah253kt SWIFT Gist | gist.github.com/shah253kt | 146 Malaysian FI SWIFT/BIC codes (2016, still useful for reference) | ✅ Scraped |
| 7 | zulhfreelancer Banks Gist | gist.github.com/zulhfreelancer | 30 banks + FPX codes (2016) | ✅ Scraped |
| 8 | fadziljusri Banks JSON | gist.github.com/fadziljusri | 27 bank names (simple list, 2018) | ✅ Scraped |
| 9 | Bank Islam RENTAS PDF | bankislam.com | Bank code listing with RENTAS codes | 🔲 To scrape (PDF blocked) |
| 10 | HSBC IBG FAQ | hsbc.com.my | IBG account structure info | ✅ Scraped (limited content) |

### PayNet / DuitNow / FPX

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 11 | PayNet Developer Docs | docs.developer.paynet.my | QR spec, 70 acquirers, FPX banks, flows, response codes, branding | ✅ Scraped → `PAYNET_DEVELOPER_DOCS.md` |
| 12 | PayNet FPX Mapping Table | docs.developer.paynet.my/docs/fpx/mapping-table | FPX bank IDs, business codes, MSIC codes | ✅ Scraped |
| 13 | PayNet FPX Response Codes | docs.developer.paynet.my/docs/fpx/response-code | FPX response code descriptions | ✅ Scraped |
| 14 | PayEx FPX Buyer Bank Codes | payex.io/docs/fpx-buyer-bank-response-code | FPX buyer bank IDs with retail/corporate mode flags (52 entries) | ✅ Scraped |
| 15 | PayEx Reference Codes PDF | Uploaded | Complete response codes: FPX (53), Card (71+), GrabPay, TNG, ShopeePay, Riipay, Split, Batch, Billing, ENRP, Mandate. Also: transaction codes, ID types, states, countries, currencies, business nature codes (400+), MCC codes (180+) | ✅ In context |

### DuitNow QR Research

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 16 | natsu90/duitnowqr-test | github.com/natsu90 | DuitNow QR reverse engineering, dynamic QR findings, bank-specific quirks | ✅ Scraped → `DUITNOW_QR_RESEARCH.md` |
| 17 | natsu90 duitnow-js Gist | gist.github.com/natsu90 | JS QR generator code, gist comments with findings (Maybank ID 05, CIMB SHA-256, etc.) | ✅ Scraped |
| 18 | natsu90/duitnowqr-razer | github.com/natsu90 | Razer Merchant Services integration for real-time DuitNow QR payment notification | ✅ Scraped |
| 19 | chengkiang PayNow ref | chengkiang.com | CRC16 implementation, PayNow structure reference | ✅ Scraped |
| 20 | deadboy18/qr-studio | github.com/deadboy18 | DuitNow QR decode logic (your repo) | ✅ In context |

### Icons

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 21 | SnorSnor9998/Payment-Icon | github.com/SnorSnor9998 | SVGs: 26 banks, 21 e-wallets, 7 BNPL, cards, mobile pay. Multiple formats (square/round/transparent/long). 72 stars, active. | ✅ Identified |
| 22 | nurfaizfoat/bankMY-webfont | github.com/nurfaizfoat | Legacy webfont icons (19, 2015, outdated but referenced) | ✅ Identified |

### Geography & Identity

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 23 | AsyrafHussin/malaysia-postcodes | github.com/AsyrafHussin | **Best postcode source.** All postcodes with city/state, JSON per state, 104 stars, actively maintained (last update 2025), MIT license, npm package available | ✅ Identified |
| 24 | farhan-syah/Malaysia-Cities-JSON | github.com/farhan-syah | 16 states with lat/long coordinates | ✅ Scraped |
| 25 | lomotech/jajahan | github.com/lomotech | States, districts, postcodes (alternative source) | ✅ Identified |
| 26 | PayEx Reference Codes PDF | Uploaded | Malaysian states (16 entries with codes), IC state codes | ✅ In context |

### Phone Numbers & Carriers

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 27 | Wikipedia - Telephone Numbers in Malaysia | en.wikipedia.org | **Complete** prefix-to-carrier mapping: 010 (sub-ranges), 011 (8-digit, 50+ sub-range allocations), 012 (Maxis), 013 (Celcom), 014 (sub-ranges), 015 (VoIP/data), 016 (DiGi), 017 (Maxis), 018 (sub-ranges for U Mobile/Yes), 019 (Celcom). Area codes for landlines. | ✅ Scraped |
| 28 | magirtopcu MCC/MNC SQL Gist | gist.github.com/magirtopcu | Mobile carrier MCC/MNC codes globally (filter for MY = MCC 502) | ✅ Scraped |
| 29 | Prepaid Data SIM Card Wiki | prepaid-data-sim-card.fandom.com | Current operator info: CelcomDigi merger, 5G rollout, coverage data | ✅ Scraped |

### Card BIN Numbers

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 30 | xanda Malaysian BINs Gist | gist.github.com/xanda | ~230 Malaysian card BIN numbers: BIN, vendor (Visa/MC/Amex), type (credit/debit), level (Classic/Gold/Platinum/Infinite/World/Signature), bank name | ✅ Scraped |

### Payment Processor Response Codes

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 31 | senangPay Payment Failure Guide | guide.senangpay.com | Credit card response codes (26 codes with descriptions), FPX response codes (28 codes), practical troubleshooting info | ✅ Scraped |
| 32 | PayEx Response Codes | payex.io/docs/payex-response-codes | PayEx-specific response codes (site erroring, but data available in uploaded PDF) | ✅ Via PDF |

### Official / Regulatory

| # | Source | URL | What We Get | Status |
|---|--------|-----|-------------|--------|
| 33 | BNM List of Regulatees | bnm.gov.my/list-of-regulatees | Complete list of BNM-regulated financial institutions | 🔲 Blocked (robots.txt) — use PIDM list instead |
| 34 | banknegaramy GitHub | github.com/banknegaramy | Official BNM data repos | ✅ Identified |
| 35 | JomPAY Biller Codes | paynet.my/personal-solutions/jompay/biller-code.html | Biller code directory (paginated, thousands of entries) | 🔲 TBD (separate concern, very large) |

---

## What's Inside (Content Map)

### `/data/` — Machine-readable JSON data

| File | Records | Key Sources |
|------|---------|-------------|
| `banks.json` | ~45 banks | UOB PDF + OCBC PDF + RHB listing + PIDM + PayNet acquirers + shah253kt SWIFT gist |
| `ewallets.json` | ~15 wallets | PayNet acquirers + UOB PDF (TNG, BigPay, Boost, ShopeePay, GrabPay, Merchantrade, GX Bank, Boost Bank, AEON Bank, Finexus) |
| `acquirers.json` | 70 entries | PayNet developer docs |
| `fpx-banks.json` | ~52 entries | PayNet FPX mapping + PayEx FPX buyer bank codes (with retail/corporate mode) |
| `card-bins.json` | ~230 entries | xanda gist (Visa/MC/Amex BINs per bank) |
| `payment-processors.json` | ~20 | PayNet acquirers (filtered) + manual research |
| `states.json` | 16 entries | PayEx PDF + farhan-syah + AsyrafHussin |
| `districts.json` | 150+ | lomotech/jajahan OR AsyrafHussin |
| `postcodes.json` | All postcodes | AsyrafHussin/malaysia-postcodes (MIT, npm) |
| `phone-prefixes.json` | ~60 prefix ranges | Wikipedia telephone numbers + magirtopcu MCC/MNC |
| `ic-state-codes.json` | ~60 codes | JPN official codes |
| `mcc-codes.json` | ~180 | PayEx PDF (complete with descriptions) |
| `fpx-business-codes.json` | 400+ | PayEx PDF (business nature codes) |
| `response-codes/*.json` | 500+ total | PayEx PDF + PayNet + senangPay |
| `currencies.json` | 180+ | PayEx PDF |
| `countries.json` | 250+ | PayEx PDF |
| `transaction-codes.json` | 100+ | PayEx PDF (payment type codes + instalment plans per bank) |

### `/docs/` — Markdown documentation

| File | What | Source |
|------|------|--------|
| `paynet-developer-docs.md` | **Complete PayNet docs** — products, QR spec, acquirers, FPX banks, transaction codes, response codes, flows, branding | Scraped from docs.developer.paynet.my |
| `duitnow-qr-research.md` | **Community QR research** — EMV TLV format, decoder, generator, static vs dynamic, bank-specific quirks, natsu90's findings, CRC16 code | natsu90, chengkiang, deadboy18/qr-studio, PayNet |
| `bank-codes.md` | Quick reference table — IBG code, BIC code, acquirer ID, FPX ID, routing ID, RENTAS per bank. Cross-referenced from ALL sources. | Merged from UOB PDF + OCBC PDF + RHB listing + PayNet + gists |
| `account-formats.md` | Account number lengths by type (current/savings/CC/loan/HP) per bank. Includes Islamic bank arms. Notes on special cases (ICBC prefix removal, Citibank corporate-only, etc.) | UOB PDF + OCBC PDF + Affin listing |
| `fpx-reference.md` | FPX B2C/B2B1/B2B2 flows, all bank IDs (retail + corporate mode), business codes, response codes | PayNet FPX docs + PayEx |
| `response-codes.md` | **Complete response code reference** — FPX, Card (Visa/MC), DuitNow, GrabPay, TNG, ShopeePay, Riipay, Mandate, Batch, Billing/ENRP. Cross-referenced from multiple payment processors. | PayEx PDF + PayNet + senangPay |
| `resources.md` | Links to all community repos, gists, tools, official docs | Compilation |

### `/validators/` — JavaScript validation functions

| Validator | What It Does |
|-----------|-------------|
| `account-number.js` | Validates account number length/format by bank. Supports 45 banks, 5 account types. Handles special cases (ICBC 19→17 digit prefix, CIMB dual lengths, variable ranges for BOA/Deutsche). |
| `phone-number.js` | Malaysian phone validation (+60 normalization), 10 vs 11 digit detection, carrier detection from prefix (with caveat about MNP), mobile vs landline vs VoIP classification |
| `ic-number.js` | MyKad/NRIC validation: 12-digit format, extract birth date (YYMMDD), state code lookup (~60 codes), gender (odd=male, even=female), basic date validation |
| `business-reg.js` | SSM business registration: old format (XX-XXXXX), new format (202301012345), entity type detection |
| `postcode.js` | 5-digit postcode validation, city/state lookup from postcode, state detection from first 2 digits |
| `duitnow-qr.js` | Parse/decode DuitNow QR string (EMV TLV), validate CRC16, extract all fields (merchant, amount, currency, acquirer, etc.) |

### `/icons/` — SVG logos

| Category | Count | Source |
|----------|-------|--------|
| Banks (conventional + Islamic) | ~35 | Fork/attribute SnorSnor9998/Payment-Icon + create missing (digital banks: GX Bank, Boost Bank, Ryt Bank, AEON Bank, KAF Digital Bank) |
| E-wallets | ~15 | Fork/attribute SnorSnor9998 + create missing |
| BNPL | ~7 | SnorSnor9998 (Atome, Riipay, Grab PayLater, SPayLater, etc.) |
| Payment networks | ~10 | DuitNow, FPX, JomPAY, MyDebit, Visa, Mastercard, Amex, UnionPay |

---

## banks.json Schema

Each bank entry will have this structure:

```json
{
  "id": "maybank",
  "name": "Malayan Banking Berhad",
  "shortName": "Maybank",
  "type": "conventional",
  "category": "commercial",
  "islamicArm": "maybank-islamic",
  "digitalBank": false,
  "pidmMember": true,
  "codes": {
    "ibg": "0227",
    "bic": "MBBEMYKL",
    "routingId": "100002270",
    "acquirerId": "588700",
    "fpxBankId": {
      "retail": "MB2U0227",
      "corporate": "MBB0228"
    }
  },
  "accountFormats": {
    "current": { "lengths": [12] },
    "savings": { "lengths": [12] },
    "creditCard": { "lengths": [15, 16], "notes": "15 digits for Amex, 16 for Visa/MC" },
    "loan": { "lengths": [12] },
    "hirePurchase": { "lengths": [12] }
  },
  "channels": ["OTC", "Internet", "Mobile Banking"],
  "icon": "icons/banks/maybank.svg"
}
```

---

## ewallets.json Schema

```json
{
  "id": "tng",
  "name": "Touch 'n Go eWallet",
  "shortName": "TNG eWallet",
  "provider": "TNG Digital Sdn Bhd",
  "bic": "TNGDMYNB",
  "acquirerId": "588766",
  "modes": {
    "proxyPay": true,
    "accountPay": true
  },
  "accountFormat": {
    "length": 12,
    "type": "savings"
  },
  "appLinks": {
    "android": "https://play.google.com/store/apps/details?id=my.com.tngdigital.ewallet",
    "ios": "https://apps.apple.com/my/app/touch-n-go-ewallet/id1344696702"
  },
  "icon": "icons/ewallets/tng.svg"
}
```

---

## phone-prefixes.json Schema

```json
{
  "prefix": "012",
  "type": "mobile",
  "subscriberDigits": 7,
  "totalDigits": 10,
  "originalOperator": "Maxis",
  "subRanges": null,
  "notes": "Full prefix assigned to Maxis. MNP means current operator may differ."
}
```

For 011 (which has sub-ranges):
```json
{
  "prefix": "011",
  "type": "mobile",
  "subscriberDigits": 8,
  "totalDigits": 11,
  "originalOperator": "multiple",
  "subRanges": [
    { "range": "100-104", "operator": "UniFi Mobile" },
    { "range": "105-109", "operator": "redONE" },
    { "range": "11", "operator": "U Mobile" },
    { "range": "12", "operator": "Maxis" },
    { "range": "13", "operator": "XOX" },
    { "range": "140-144", "operator": "Maxis" },
    { "range": "145-149", "operator": "Celcom" },
    { "range": "150-154", "operator": "Tune Talk" },
    { "range": "16", "operator": "DiGi" }
  ]
}
```

---

## Milestones

### Phase 1: Core Bank Data (Week 1)

| # | Task | Output | Priority | Status |
|---|------|--------|----------|--------|
| 1.1 | Build `banks.json` — merge UOB PDF + OCBC PDF + RHB listing + PIDM + PayNet acquirers + gists. Cross-reference all IBG codes, BIC codes, routing IDs, acquirer IDs, FPX IDs. Include Islamic arms as linked entries. | ~45 banks | HIGH | 🔲 |
| 1.2 | Build `ewallets.json` — from PayNet acquirers + UOB PDF. Include TNG, Boost, GrabPay, ShopeePay, BigPay, Merchantrade, Finexus, GX Bank, Boost Bank, AEON Bank. Differentiate proxy-only vs account-transfer. | ~15 wallets | HIGH | 🔲 |
| 1.3 | Build `acquirers.json` — direct from PayNet developer docs, categorized (banks vs non-bank vs JomPAY) | 70 entries | HIGH | 🔲 |
| 1.4 | Build `fpx-banks.json` — merge PayNet FPX mapping + PayEx buyer bank codes. Include retail and corporate mode flags. | ~52 entries | HIGH | 🔲 |
| 1.5 | Build `payment-processors.json` — from acquirers (filtered), add Xendit/PayEx, senangPay, Billplz, Stripe MY, Revenue Monster | ~20 processors | MEDIUM | 🔲 |
| 1.6 | Build `card-bins.json` — from xanda gist, structured JSON with bank, vendor, type, level | ~230 BINs | MEDIUM | 🔲 |

### Phase 2: Response Codes & Transaction Data (Week 1-2)

| # | Task | Output | Priority | Status |
|---|------|--------|----------|--------|
| 2.1 | Build `response-codes/fpx.json` — merge PayNet + PayEx PDF + senangPay. ~100 codes with descriptions. | FPX codes | HIGH | 🔲 |
| 2.2 | Build `response-codes/card.json` — from PayEx PDF. Visa/MC/Amex response codes with descriptions. | Card codes | HIGH | 🔲 |
| 2.3 | Build `response-codes/duitnow.json` — DuitNow status/reason codes from PayNet docs | DuitNow codes | HIGH | 🔲 |
| 2.4 | Build remaining response-codes/ — GrabPay, TNG, ShopeePay, Riipay, Mandate, Batch, Billing | All payment types | MEDIUM | 🔲 |
| 2.5 | Build `transaction-codes.json` — from PayEx PDF. All transaction types (FPX, Card, DuitNow QR, e-wallets, instalments per bank) | ~100 codes | MEDIUM | 🔲 |
| 2.6 | Build `mcc-codes.json` — from PayEx PDF. ~180 MCC codes with descriptions | MCC codes | MEDIUM | 🔲 |
| 2.7 | Build `fpx-business-codes.json` — from PayEx PDF. 400+ business nature codes with MSIC | Business codes | LOW | 🔲 |

### Phase 3: Geography & Identity Data (Week 2)

| # | Task | Output | Priority | Status |
|---|------|--------|----------|--------|
| 3.1 | Build `states.json` — 16 states/FT with IC codes, lat/long, PayEx state codes | 16 entries | HIGH | 🔲 |
| 3.2 | Build `postcodes.json` — from AsyrafHussin/malaysia-postcodes (or reference as dependency) | All postcodes | MEDIUM | 🔲 |
| 3.3 | Build `districts.json` — from jajahan or AsyrafHussin | 150+ districts | MEDIUM | 🔲 |
| 3.4 | Build `phone-prefixes.json` — from Wikipedia telephone numbers page. Complete prefix-to-carrier mapping including 011 sub-ranges. | ~60 prefix ranges | HIGH | 🔲 |
| 3.5 | Build `ic-state-codes.json` — JPN birth codes (~60 codes) | ~60 codes | MEDIUM | 🔲 |
| 3.6 | Build `currencies.json` — from PayEx PDF | 180+ currencies | LOW | 🔲 |
| 3.7 | Build `countries.json` — from PayEx PDF | 250+ countries | LOW | 🔲 |

### Phase 4: Documentation (Week 2-3)

| # | Task | Output | Priority | Status |
|---|------|--------|----------|--------|
| 4.1 | Finalize `paynet-developer-docs.md` — full PayNet docs in markdown | Complete reference | HIGH | ✅ Draft done |
| 4.2 | Finalize `duitnow-qr-research.md` — community research compilation with proper credits | Complete reference | HIGH | ✅ Draft done |
| 4.3 | Create `bank-codes.md` — cross-referenced lookup table (IBG + BIC + FPX + acquirer + routing) per bank | Lookup table | HIGH | 🔲 |
| 4.4 | Create `account-formats.md` — per-bank account lengths by type, including Islamic arms + special notes | Reference table | HIGH | 🔲 |
| 4.5 | Create `fpx-reference.md` — FPX flows, all bank IDs, business codes | FPX reference | MEDIUM | 🔲 |
| 4.6 | Create `response-codes.md` — human-readable response code documentation | Error reference | MEDIUM | 🔲 |
| 4.7 | Create `resources.md` — community links, tools, repos, official docs | Link collection | LOW | 🔲 |

### Phase 5: Validators (Week 3)

| # | Task | Output | Priority | Status |
|---|------|--------|----------|--------|
| 5.1 | Account number validator — length validation by bank (45 banks, 5 account types, handles dual-length cases like CIMB 10/14) | `account-number.js` | HIGH | 🔲 |
| 5.2 | Phone number validator — Malaysian phone validation, +60 normalization, carrier detection, 10 vs 11 digit, mobile/landline/VoIP classification | `phone-number.js` | HIGH | 🔲 |
| 5.3 | IC/NRIC validator — 12-digit validation, birth date extraction, state code lookup, gender detection | `ic-number.js` | HIGH | 🔲 |
| 5.4 | SSM business reg validator — old/new format detection, year extraction | `business-reg.js` | MEDIUM | 🔲 |
| 5.5 | Postcode validator — 5-digit validation, city/state lookup | `postcode.js` | MEDIUM | 🔲 |
| 5.6 | DuitNow QR decoder/validator — parse EMV TLV, validate CRC16, extract all fields (port from qr-studio) | `duitnow-qr.js` | HIGH | 🔲 |

### Phase 6: Icons (Week 3-4)

| # | Task | Output | Priority | Status |
|---|------|--------|----------|--------|
| 6.1 | Fork/collect bank icons from SnorSnor9998 (with attribution) | SVGs for ~26 banks | HIGH | 🔲 |
| 6.2 | Create missing bank icons — digital banks (GX Bank, Boost Bank, Ryt Bank, AEON Bank, KAF Digital Bank), foreign banks without icons | ~10 additional SVGs | MEDIUM | 🔲 |
| 6.3 | Collect/create e-wallet icons | ~15 SVGs | HIGH | 🔲 |
| 6.4 | Collect BNPL icons | ~7 SVGs | LOW | 🔲 |
| 6.5 | Collect payment network icons (DuitNow, FPX, JomPAY, MyDebit, Visa, MC, Amex, UnionPay) | ~10 SVGs | MEDIUM | 🔲 |

### Phase 7: Package & Publish (Week 4)

| # | Task | Output | Priority | Status |
|---|------|--------|----------|--------|
| 7.1 | Create `package.json` with proper exports | npm-ready | HIGH | 🔲 |
| 7.2 | TypeScript type definitions (`.d.ts`) | Type safety | HIGH | 🔲 |
| 7.3 | JSON Schema files for validation | `schemas/*.json` | MEDIUM | 🔲 |
| 7.4 | Write README with full usage examples | README.md | HIGH | 🔲 |
| 7.5 | Write CONTRIBUTING.md — how to update/add data, PR guidelines | CONTRIBUTING.md | MEDIUM | 🔲 |
| 7.6 | Publish to npm | `npm publish` | HIGH | 🔲 |

---

## What's Missing / Still Need to Find

| # | Gap | Priority | Notes |
|---|-----|----------|-------|
| 1 | Bank account number **prefix rules** (e.g., Maybank savings starts with 1, current with 5) | Medium | Not in any PDF — need bank-specific research or community knowledge |
| 2 | Bank account **check digit algorithms** (Luhn, custom) | Low | Would make validation much stronger than just length checking. Very few banks document this publicly. |
| 3 | E-wallet **deep links** for all apps (TNG, Boost, GrabPay, ShopeePay, BigPay, Setel) | Medium | Need testing on actual devices |
| 4 | DuitNow **proxy types per bank** (which banks support phone/NRIC/passport/bizreg proxy) | Medium | PayNet NAD docs might have this |
| 5 | JomPAY **biller codes** list | Low | Huge list (thousands), paginated on paynet.my. Probably separate repo/file. |
| 6 | Bank **brand colors** (hex codes per bank) | Low | For UI rendering. Need manual research. |
| 7 | **App store IDs** for all banking/e-wallet apps | Low | For deep linking |
| 8 | Cross-border QR partner specs (PayNow SG, PromptPay TH, QRIS ID, Alipay+ CN) | Low | Nice to have |
| 9 | **MyDebit** specs (different from QR, card-based) | Low | Different domain |
| 10 | BNPL providers detailed data (Atome, Grab PayLater, SPayLater, Riipay) | Low | Add to ewallets.json or separate file |
| 11 | Updated carrier prefix allocations from MCMC (post-CelcomDigi merger) | Medium | Wikipedia is reasonably current but MCMC is authoritative |

---

## npm Package API (End Goal)

```javascript
// Import
import MY from 'repo-name';

// === DATA ACCESS ===
MY.banks                         // Array of all banks
MY.ewallets                      // Array of all e-wallets
MY.acquirers                     // Array of all DuitNow QR acquirers
MY.fpxBanks                      // Array of FPX bank IDs
MY.cardBins                      // Array of Malaysian card BINs
MY.states                        // Array of all states
MY.postcodes                     // All postcodes with city/state
MY.phonePrefixes                 // Array of phone prefixes
MY.mccCodes                      // MCC codes
MY.responseCodes.fpx             // FPX response codes
MY.responseCodes.card            // Card response codes
MY.responseCodes.duitnow         // DuitNow response codes

// Lookups
MY.getBank('maybank')            // By slug ID
MY.getBankByBic('MBBEMYKL')      // By DuitNow BIC
MY.getBankByIbg('0227')          // By IBG code
MY.getBankByFpx('MB2U0227')      // By FPX bank ID
MY.getBankByAcquirer('588700')   // By acquirer ID
MY.getEwallet('tng')             // By slug ID
MY.getState('selangor')          // By slug ID
MY.getCityByPostcode('50000')    // Returns { city, state }
MY.getCarrierByPrefix('012')     // Returns carrier info

// === VALIDATORS ===
MY.validateAccount('maybank', '512345678901')
// { valid: true, type: 'savings', bank: 'Maybank' }

MY.validatePhone('0123456789')
// { valid: true, normalized: '+60123456789', carrier: 'Maxis', type: 'mobile' }

MY.validateIC('900101145678')
// { valid: true, birthDate: '1990-01-01', state: 'Melaka', gender: 'female' }

MY.validateSSM('202301012345')
// { valid: true, format: 'new', year: 2023 }

MY.validatePostcode('50000')
// { valid: true, city: 'Kuala Lumpur', state: 'Kuala Lumpur' }

// === DUITNOW QR ===
MY.decodeDuitNowQR('00020201021126...')
// { version: '02', type: 'static', merchant: {...}, amount: 10.00, crcValid: true }

MY.validateCRC('00020201021126...')
// true/false
```

---

## Credits

| Contributor | What |
|-------------|------|
| [natsu90](https://github.com/natsu90) (Sulaiman Sudirman) | DuitNow QR reverse engineering, duitnow-js generator, Razer integration research |
| [chengkiang](https://chengkiang.com) | CRC16 implementation, PayNow reference |
| [kidino](https://github.com/kidino) | Original DuitNow QR use case discovery |
| [SnorSnor9998](https://github.com/SnorSnor9998) | Payment-Icon SVG collection (26 banks, 21 e-wallets, 7 BNPL) |
| [AsyrafHussin](https://github.com/AsyrafHussin) | malaysia-postcodes — comprehensive postcode data |
| [farhan-syah](https://github.com/farhan-syah) | Malaysia-Cities-JSON — states with coordinates |
| [lomotech](https://github.com/lomotech) | jajahan — Malaysian states/districts/postcodes |
| [shah253kt](https://gist.github.com/shah253kt) | Malaysian SWIFT/BIC codes compilation (146 entries) |
| [zulhfreelancer](https://gist.github.com/zulhfreelancer) | Malaysian banks JSON with FPX codes |
| [fadziljusri](https://gist.github.com/fadziljusri) | Malaysian banks JSON list |
| [xanda](https://gist.github.com/xanda) | Malaysian card BIN numbers (~230 entries) |
| [nurfaizfoat](https://github.com/nurfaizfoat) | bankMY payment webfont (legacy) |
| [magirtopcu](https://gist.github.com/magirtopcu) | MCC/MNC carrier codes SQL data |
| [deadboy18](https://github.com/deadboy18) | qr-studio — DuitNow QR decode tool |
| [PayNet](https://developer.paynet.my) | Official developer documentation |
| [PayEx/Xendit](https://www.payex.io) | Response codes, FPX buyer bank IDs, transaction types |
| [senangPay/DOKU](https://guide.senangpay.com) | Payment failure codes and troubleshooting |
| [PIDM](https://www.pidm.gov.my) | Official member banks list |
| [RHB Group](https://www.rhbgroup.com) | BIC code listing with RENTAS and IBG routing |
| [Affin Bank](https://www.affinalways.com) | IBG account format listing |
| [OCBC Bank](https://www.ocbc.com.my) | IBG product offering and account structure PDF |
| [UOB Bank](https://www.uob.com.my) | IBG & DuitNow participating bank code PDF |
| [Wikipedia](https://en.wikipedia.org/wiki/Telephone_numbers_in_Malaysia) | Malaysian telephone prefix-to-carrier mapping |

---

*Plan updated: 2026-05-04*
*35 data sources catalogued. Phase 1 ready to execute.*
