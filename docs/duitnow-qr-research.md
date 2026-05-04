# DuitNow QR & EMV QR — Malaysia

> A comprehensive open-source research compilation on Malaysia's DuitNow QR payment system, EMV QR Code specifications, and related tools.

---

## Table of Contents

- [What Is This](#what-is-this)
- [DuitNow QR Overview](#duitnow-qr-overview)
- [EMV QR Code Specification](#emv-qr-code-specification)
  - [TLV Format](#tlv-format)
  - [Root-Level Data Objects](#root-level-data-objects)
  - [Merchant Account Information (ID 26)](#merchant-account-information-id-26)
  - [Additional Data Field Template (ID 62)](#additional-data-field-template-id-62)
  - [Data Integrity Check (ID 82)](#data-integrity-check-id-82)
  - [CRC Checksum (ID 63)](#crc-checksum-id-63)
- [Acquirer ID Directory](#acquirer-id-directory)
- [Merchant Category Codes](#merchant-category-codes)
- [DuitNow QR Examples](#duitnow-qr-examples)
  - [Example 1: Static Retail POS](#example-1-static-retail-pos)
  - [Example 2: Static P2P](#example-2-static-p2p)
  - [Example 3: With Data Integrity Check](#example-3-with-data-integrity-check)
  - [Example 4: JomPAY Bill Payment](#example-4-jompay-bill-payment)
  - [Example 5: Dynamic QR with Razer Merchant](#example-5-dynamic-qr-with-razer-merchant)
- [How to Decode a DuitNow QR String](#how-to-decode-a-duitnow-qr-string)
- [How to Generate a DuitNow QR String](#how-to-generate-a-duitnow-qr-string)
- [CRC16 Implementation](#crc16-implementation)
- [Static vs Dynamic QR](#static-vs-dynamic-qr)
- [Known Limitations](#known-limitations)
- [Comparison: DuitNow vs PayNow vs PromptPay](#comparison-duitnow-vs-paynow-vs-promptpay)
- [Merchant Channel Codes](#merchant-channel-codes)
- [Related Tools & Repos](#related-tools--repos)
- [Credits & Acknowledgements](#credits--acknowledgements)
- [Official References](#official-references)

---

## What Is This

This repository compiles and organizes all known open-source research on Malaysia's DuitNow QR payment system. The DuitNow QR spec is based on the EMV® QR Code Specification for Payment Systems (Merchant-Presented Mode), but Malaysia's implementation has unique characteristics that aren't well-documented publicly.

This document brings together findings from multiple developers who've reverse-engineered DuitNow QR codes, official PayNet developer documentation, and working code samples — all in one place.

---

## DuitNow QR Overview

DuitNow QR is Malaysia's National QR Standard, established by Payments Network Malaysia (PayNet) under Bank Negara Malaysia's Interoperable Credit Transfer Framework (ICTF).

**Key facts:**
- Based on EMV® QR Code Specification for Payment Systems (EMV QRCPS) — Merchant-Presented Mode
- Malaysia's Application Identifier (AID): `A0000006150001`
- Country code: `MY` (ISO 3166)
- Currency code: `458` (MYR, ISO 4217)
- Governed by PayNet (Payments Network Malaysia Sdn Bhd)
- Interoperable across all participating banks and e-wallets
- Supports both static (printed sticker) and dynamic (app-generated) QR codes
- Cross-border QR linkages with Thailand (PromptPay), Singapore (PayNow/NETS), Indonesia (QRIS), China, South Korea, Cambodia

---

## EMV QR Code Specification

### TLV Format

Every DuitNow QR code encodes a string using TLV (Tag-Length-Value) format:

```
[ID][Length][Value]
 2     2     variable
digits digits
```

- **ID**: 2-digit identifier (`"00"` to `"99"`)
- **Length**: 2-digit decimal length of the value
- **Value**: the actual data (length specified by Length field)

Example: `000201` means ID=`00`, Length=`02`, Value=`01`

Templates (like ID 26, 62) contain nested TLV structures within their value field.

### Ordering Rules

- ID `"00"` (Payload Format Indicator) MUST be first
- ID `"63"` (CRC) MUST be last
- All other root-level data objects can be in any order
- Data objects within templates can be in any order

---

### Root-Level Data Objects

| ID | Name | Format | Length | Presence | Description |
|----|------|--------|--------|----------|-------------|
| `00` | Payload Format Indicator | N | 02 | **M** | Always `"01"` (EMV spec says 01, PayNet examples show 02) |
| `01` | Point of Initiation Method | N | 02 | **M** | `"11"` = Static QR, `"12"` = Dynamic QR |
| `26` | Merchant Account Information | ANS | var ≤99 | **M** | See [Merchant Account Information](#merchant-account-information-id-26) |
| `27` | Merchant Account Information | ANS | var ≤99 | O | Reserved for Future Use (RFU) |
| `52` | Merchant Category Code | N | 04 | **M** | ISO 18245. `"0000"` for P2P, `"6010"` for POS Cash Out |
| `53` | Transaction Currency Code | N | 03 | **M** | `"458"` for MYR (ISO 4217) |
| `54` | Transaction Amount | ANS | var ≤13 | **C** | Numeric + `"."` only. Absent = user enters amount |
| `55` | Tip or Convenience Indicator | N | 02 | O | `1`=prompt tip, `2`=flat fee, `3`=percentage fee |
| `56` | Value of Convenience Fee Fixed | ANS | var ≤13 | **C** | Present only if ID 55 = `"02"` |
| `57` | Value of Convenience Fee % | ANS | var ≤05 | **C** | Present only if ID 55 = `"03"` |
| `58` | Country Code | ANS | 02 | **M** | `"MY"` for Malaysia (ISO 3166) |
| `59` | Merchant Name | ANS | var ≤25 | **M** | e.g. `"RESTORAN AH HOCK"` |
| `60` | Merchant City | ANS | var ≤15 | **M** | e.g. `"KUALA LUMPUR"`. Use `"MY"` if not applicable |
| `61` | Postal Code | ANS | 05 | O | 5 numeric digits |
| `62` | Additional Data Field Template | S | var ≤99 | **C** | See [Additional Data Field Template](#additional-data-field-template-id-62). Required for JomPAY |
| `64` | Merchant Info — Language Template | S | var ≤99 | O | Alternate language merchant info (ISO 639) |
| `82` | Data Integrity Check | ANS | 99 | O | Hash value for integrity. See [Data Integrity Check](#data-integrity-check-id-82) |
| `63` | CRC | ANS | 04 | **M** | CRC16 checksum. **Must be last** |

**Presence**: M = Mandatory, C = Conditional, O = Optional

---

### Merchant Account Information (ID 26)

The merchant account template contains nested TLV data objects:

| ID | Name | Format | Length | Presence | Description |
|----|------|--------|--------|----------|-------------|
| `00` | Application ID (AID) | ANS | 14 | **M** | `"A0000006150001"` (Malaysia) |
| `01` | Acquirer ID | ANS | var ≤06 | **M** | See [Acquirer ID Directory](#acquirer-id-directory) |
| `02` | QR ID / Merchant ID | AN | var ≤28 | **M** | Assigned by acquirer. For JomPAY = Biller Code |
| `03` | Merchant Descriptor | ANS | var ≤20 | O | Description assigned by acquirer |
| `04` | Mobile Number | ANS | var ≤15 | O | Merchant mobile number |

**Example breakdown:**

```
26 41                              ← ID 26, length 41 chars
  00 14 A0000006150001             ← AID (always this for MY)
  01 06 501664                     ← Acquirer ID (Affin Bank)
  02 09 123456789                  ← Merchant/QR ID
```

---

### Additional Data Field Template (ID 62)

Used for bill references, terminal IDs, purpose of transaction, etc. Required for JomPAY QR.

| ID | Name | Format | Length | Presence | Description |
|----|------|--------|--------|----------|-------------|
| `01` | Bill Number | ANS | var ≤25 | O | Invoice/bill number |
| `02` | Mobile Number | ANS | var ≤25 | O | Mobile number |
| `03` | Store Label | ANS | var ≤25 | O | Store identifier |
| `04` | Loyalty Number | ANS | var ≤25 | O | Loyalty card number |
| `05` | Reference Label | ANS | var ≤25 | O | Transaction reference |
| `06` | Customer Label | ANS | var ≤25 | O | Customer identifier |
| `07` | Terminal Label | ANS | var ≤25 | O | Terminal identifier |
| `08` | Purpose of Transaction | ANS | var ≤25 | O | e.g. "Start machine via DuitNow" |
| `09` | Additional Consumer Data Request | A | var ≤03 | O | `"A"`=address, `"M"`=mobile, `"E"`=email |
| `10` | Merchant Tax ID | ANS | var ≤15 | O | Tax Identification Number (TIN) |
| `11` | Merchant Channel | ANS | var ≤03 | O | 3-char code. See [Merchant Channel Codes](#merchant-channel-codes) |
| `90` | RRN (Ref-1) | ANS | var ≤20 | **C** | Recipient Reference Number. **Required for JomPAY** |
| `91` | RRN2 (Ref-2) | ANS | var ≤30 | O | Optional for JomPAY |
| `92` | Geo Coordinates | ANS | var ≤35 | O | Latitude,Longitude |
| `50`-`89`, `92`-`99` | Payment System Specific | S | var | O | Reserved for Future Use |

**Key finding from natsu90**: In dynamic QR codes, the information in ID 62 is sent to PayNet for verification and callback purposes. For example, Maybank uses ID `05` in ID 62, while CIMB uses ID `01`, ID `03` (with format YYYYMMDDHHMMSS), and ID `82` (SHA-256 hash).

---

### Data Integrity Check (ID 82)

- Used to carry a hash value for data integrity verification
- Hash algorithm: SHA-256 (standardized in ISO/IEC 10118-3)
- Found primarily in Razer Merchant Services QR codes
- According to natsu90's research: the ref82 value is used by Razer to match which account the payment belongs to, enabling webhook callbacks when payment is received
- **Not required** for normal DuitNow QR generation — most standard QR codes don't include this

---

### CRC Checksum (ID 63)

The CRC is calculated over the **entire QR string** (including the ID and Length of the CRC field itself, but excluding the CRC value).

**Specification:**
- Algorithm: CRC-16/CCITT-FALSE
- Polynomial: `0x1021`
- Initial value: `0xFFFF`
- Input: all data objects in order, plus `"6304"` (the CRC ID + length prefix)
- Output: 4-character uppercase hex string

**Example:** If the QR string before CRC is `"000201...6304"`, calculate CRC16 over that string → result `"343F"` → final string ends with `"6304343F"`.

---

## Acquirer ID Directory

The Acquirer ID (found in ID 26, sub-ID 01) identifies which bank or payment processor issued the QR code.

Full list of 70 registered acquirers as of 2026 (from PayNet developer documentation):

### Banks

| # | Name | Acquirer ID | BIC Code |
|---|------|-------------|----------|
| 1 | AEON Bank (M) Berhad | 629295 | ACDBMYK2 |
| 2 | Affin Bank Berhad | 501664 | PHBMMYKL |
| 3 | Al Rajhi Banking & Investment Corporation | 432134 | RJHIMYKL |
| 4 | Alliance Bank Malaysia Berhad | 504374 | MFBBMYKL |
| 5 | AmBank Malaysia Berhad | 564169 | ARBKMYKL |
| 6 | Bank Islam Malaysia Berhad | 603346 | BIMBMYKL |
| 7 | Bank Kerjasama Rakyat Malaysia Berhad | 589267 | BKRMMYKL |
| 8 | Bank Muamalat Malaysia Berhad | 564167 | BMMBMYKL |
| 9 | Bank of America (M) Berhad | 629188 | BOFAMY2X |
| 10 | Bank of China (M) Berhad | 629152 | BKCHMYKL |
| 11 | Bank Pertanian Malaysia Berhad (Agrobank) | 589373 | AGOBMYKL |
| 12 | Bank Simpanan Nasional | 420709 | BSNAMYK1 |
| 13 | BNP Paribas Malaysia Berhad | 629204 | BNPAMYKL |
| 14 | Boost Bank Berhad | 629303 | BOBEMYK2 |
| 15 | China Construction Bank (Malaysia) Berhad | 629261 | PCBCMYKL |
| 16 | CIMB Bank Berhad | 501854 | CIBBMYKL |
| 17 | Citibank Berhad | 589170 | CITIMYKL |
| 18 | Deutsche Bank (M) Berhad | 629246 | DEUTMYKL |
| 19 | GX Bank Berhad | 629279 | GXSPMYKL |
| 20 | Hong Leong Bank Berhad | 588830 | HLBBMYKL |
| 21 | HSBC Bank Berhad | 589836 | HBMBMYKL |
| 22 | Industrial and Commercial Bank of China (M) Berhad | 629253 | ICBKMYKL |
| 23 | JP Morgan Chase Bank Berhad | 629212 | CHASMYKX |
| 24 | KAF Investment Bank Berhad | 629311 | KAFBMYK2 |
| 25 | Kuwait Finance House (Malaysia) Berhad | 639406 | KFHOMYKL |
| 26 | Malayan Banking Berhad (Maybank) | 588734 | MBBEMYKL |
| 27 | MBSB Bank Berhad | 432310 | AFBQMYKL |
| 28 | Mizuho Bank (Malaysia) Berhad | 629220 | MHCBMYKA |
| 29 | MUFG Bank (Malaysia) Berhad | 629196 | BOTKMYKX |
| 30 | OCBC Bank Berhad | 504324 | OCBCMYKL |
| 31 | Public Bank Berhad | 564162 | PBBEMYKL |
| 32 | RHB Bank Berhad | 564160 | RHBBMYKL |
| 33 | Standard Chartered Bank Malaysia Berhad | 539981 | SCBLMYKX |
| 34 | Sumitomo Mitsui Banking Corporation (M) Berhad | 629238 | SMBCMYKL |
| 35 | United Overseas Bank (Malaysia) Berhad | 519469 | UOVBMYKL |
| 36 | YTL Digital Bank Berhad | 629287 | SCCHMYKL |

### E-wallets & Payment Processors

| # | Name | Acquirer ID | BIC Code |
|---|------|-------------|----------|
| 37 | Ampersand Pay Sdn Bhd | 890293 | APSBMYNB |
| 38 | Axiata Digital eCode Sdn Bhd (Boost) | 890061 | BOSTMYNB |
| 39 | Beez Fintech Sdn Bhd | 890236 | BEEZMYNB |
| 40 | BigPay Malaysia Sdn Bhd | 890012 | BGPYMYNB |
| 41 | Boost Connect Sdn Bhd | 890244 | BCNTMYNB |
| 42 | Curlec Sdn Bhd | 890160 | CRLCMYNB |
| 43 | Fass Payment Solutions Sdn Bhd | 890145 | FSPYMYNB |
| 44 | Fave Asia Technologies Sdn Bhd | 890020 | FAVEMYNB |
| 45 | Finexus Cards Sdn Bhd | 890038 | FNXSMYNB |
| 46 | GHL Cardpay Sdn Bhd | 890103 | GHLCMYNB |
| 47 | Global Payments Asia-Pacific Limited | 890186 | GLPYMYNB |
| 48 | GPay Network (M) Sdn Bhd (GrabPay) | 890046 | GRABMYNB |
| 49 | Instapay Technologies Sdn Bhd | 890178 | INSTMYNB |
| 50 | iPay88 (M) Sdn Bhd | 890079 | IPAYMYNB |
| 51 | Kiplepay Sdn Bhd | 890152 | KPLPMYNB |
| 52 | Koperasi Co-opbank Pertama Malaysia Berhad | 890228 | KCPMMYK1 |
| 53 | ManagePay Systems Sdn Bhd | 890301 | MPAYMYNB |
| 54 | Merchantrade Asia Sdn Bhd | 890111 | MASBMYNB |
| 55 | MobilityOne Sdn Bhd | 890210 | MBLOMYNB |
| 56 | Mobiedge E-commerce Sdn Bhd | 890277 | MDGEMYNB |
| 57 | MRuncit Commerce Sdn Bhd | 890327 | MRCTMYNB |
| 58 | Paydibs Sdn Bhd | 890269 | PDBSMYNB |
| 59 | Payex PLT | 890194 | PAYXMYNB |
| 60 | Razer Merchant Services Sdn Bhd | 890087 | RZMSMYNB |
| 61 | Revenue Solution Sdn Bhd | 890095 | RSSBMYNB |
| 62 | Setel Ventures Sdn Bhd | 890129 | SVSBMYNB |
| 63 | ShopeePay Malaysia Sdn Bhd | 890004 | ARPYMYNB |
| 64 | SiliconNet Technologies Sdn Bhd | 890202 | SPAYMYNB |
| 65 | Stripe Payments Singapore Pte Ltd | 890137 | STRPMYNB |
| 66 | TNG Digital Sdn Bhd | 890053 | TNGDMYNB |
| 67 | UniPin (M) Sdn Bhd | 890251 | UNPNMYNB |
| 68 | Wannapay Sdn Bhd | 890319 | WANNMYNB |
| 69 | 2C2P System Sdn Bhd | 890285 | C2P2MYNB |

### Special

| # | Name | Acquirer ID | BIC Code |
|---|------|-------------|----------|
| 70 | JomPAY | 898989 | N/A |

**Pattern observed:** Bank acquirer IDs are typically 6 digits starting with 4-6. E-wallet/processor IDs start with `890`. JomPAY uses `898989`.

---

## Merchant Category Codes

Common MCC values used in DuitNow QR:

| MCC | Description | Usage |
|-----|-------------|-------|
| `0000` | Not applicable | **P2P transfers** |
| `1111` | Bill Payment | JomPAY QR |
| `4121` | Taxi / Limousines | Transport |
| `5045` | Computer equipment | IT |
| `5411` | Grocery stores | Retail |
| `5812` | Eating places / Restaurants | F&B |
| `5814` | Fast food | F&B |
| `6010` | Manual Cash Disbursements | **POS Cash Out** |
| `7399` | Business services | General services |
| `9999` | Government agency | Government |

Full MCC list: https://global.alipay.com/docs/ac/ref/mcccodes

---

## DuitNow QR Examples

### Example 1: Static Retail POS

```
00020201021126410014A000000615000101065016640209123456789520499995303458540510.005802MY5909QRCSDNBHD6005BANGI6304343F
```

Decoded:

| Field | ID | Value |
|-------|-----|-------|
| Payload Format Indicator | 00 | `02` |
| Point of Initiation | 01 | `11` (Static) |
| Merchant Account Info | 26 | (template) |
| → AID | 26-00 | `A0000006150001` |
| → Acquirer ID | 26-01 | `501664` (Affin Bank) |
| → Merchant ID | 26-02 | `123456789` |
| MCC | 52 | `9999` (Government) |
| Currency | 53 | `458` (MYR) |
| Amount | 54 | `10.00` |
| Country | 58 | `MY` |
| Merchant Name | 59 | `QRCSDNBHD` |
| City | 60 | `BANGI` |
| CRC | 63 | `343F` |

### Example 2: Static P2P

```
00020201021126410014A000000615000101065016640209123456789520400005303458540510.005802MY5909AUSERNAME6005BANGI63043A23
```

Key difference: MCC = `0000` (P2P transfer, not merchant payment).

### Example 3: With Data Integrity Check

```
00020201021126410014A000000615000101065016640209123456789520499995303458540510.005802MY5909QRCSDNBHD6005BANGI8264f879ac6266d8d6da081fc1c17160021119747b190615c21076b3fc0fce56c6eb6304B623
```

ID `82` contains a SHA-256 hash for data integrity verification.

### Example 4: JomPAY Bill Payment

```
00020201021126360014A00000061500010106898989020412345204111153034585802MY5903TNB6002KL610559200621790130124007552406823231d4db4506dc9852b1c21c74be148b8363045DFB
```

Key differences:
- Acquirer ID = `898989` (JomPAY)
- MCC = `1111` (Bill Payment)
- QR ID = `1234` (Biller Code)
- ID 62 contains RRN (ID 90) = `0124007552406` (Recipient Reference Number / Ref-1)

### Example 5: Dynamic QR with Razer Merchant

Based on natsu90's reverse engineering:

```
const qrString = generateDuitNowStr({
    account: '0000000000000000000000072339',  // Temporary account from acquirer
    app: '890087',                             // Razer Merchant acquirer ID
    category: '7399',
    name: 'GINTELL REST N GO SDN BHD',
    city: 'KEPONG MENJALARA',
    postcode: '52200',
    ref5: '0.1626.0',                         // Reference Label
    ref6: '16881451',                          // Customer Label
    ref8: 'Start machine via DuitNow',         // Purpose
    ref82: '7FFC1AC00E99EA2D7A0D7BB79755736A'  // Razer internal hash
})
```

**Note:** The `account` value is a temporary account number assigned by the acquirer (Razer). It cannot be self-generated. The `ref82` hash is used by Razer internally to match payments to webhooks.

---

## How to Decode a DuitNow QR String

### JavaScript Implementation

```javascript
function decodeDuitNowQR(str) {
  const result = {};
  let i = 0;

  function parseTLV(data, end) {
    const objects = {};
    let pos = 0;
    while (pos < data.length && pos < end) {
      const id = data.substring(pos, pos + 2);
      const len = parseInt(data.substring(pos + 2, pos + 4), 10);
      const val = data.substring(pos + 4, pos + 4 + len);
      objects[id] = val;
      pos += 4 + len;
    }
    return objects;
  }

  // Parse root level
  const root = parseTLV(str, str.length);

  result.version = root['00'];
  result.pointOfInitiation = root['01'] === '11' ? 'static' : 'dynamic';

  // Parse merchant account info (ID 26)
  if (root['26']) {
    const mai = parseTLV(root['26'], root['26'].length);
    result.merchant = {
      aid: mai['00'],             // Should be A0000006150001
      acquirerId: mai['01'],
      merchantId: mai['02'],
      descriptor: mai['03'] || null,
      mobile: mai['04'] || null
    };
  }

  result.mcc = root['52'];
  result.currencyCode = root['53'];  // 458 = MYR
  result.amount = root['54'] ? parseFloat(root['54']) : null;
  result.country = root['58'];
  result.merchantName = root['59'];
  result.merchantCity = root['60'];
  result.postalCode = root['61'] || null;

  // Parse additional data (ID 62)
  if (root['62']) {
    const ad = parseTLV(root['62'], root['62'].length);
    result.additionalData = {
      billNumber: ad['01'] || null,
      mobileNumber: ad['02'] || null,
      storeLabel: ad['03'] || null,
      loyaltyNumber: ad['04'] || null,
      referenceLabel: ad['05'] || null,
      customerLabel: ad['06'] || null,
      terminalLabel: ad['07'] || null,
      purposeOfTransaction: ad['08'] || null,
      merchantChannel: ad['11'] || null,
      rrn: ad['90'] || null,         // JomPAY Ref-1
      rrn2: ad['91'] || null         // JomPAY Ref-2
    };
  }

  result.dataIntegrity = root['82'] || null;
  result.crc = root['63'];

  // Verify CRC
  const dataWithoutCRC = str.substring(0, str.length - 4);
  result.crcValid = crc16(dataWithoutCRC) === root['63'];

  return result;
}
```

---

## How to Generate a DuitNow QR String

### JavaScript Implementation

Based on natsu90's `duitnow-js` gist, with structure from chengkiang's PayNow generator:

```javascript
function generateDuitNowStr(opts) {
  function tlv(id, value) {
    const len = value.length.toString().padStart(2, '0');
    return id + len + value;
  }

  // Build Merchant Account Info (ID 26)
  let mai = '';
  mai += tlv('00', 'A0000006150001');        // AID (Malaysia)
  mai += tlv('01', opts.acquirerId);          // Acquirer ID
  mai += tlv('02', opts.merchantId);          // Merchant/QR ID
  if (opts.descriptor) mai += tlv('03', opts.descriptor);

  // Build Additional Data (ID 62) if needed
  let ad = '';
  if (opts.billNumber) ad += tlv('01', opts.billNumber);
  if (opts.referenceLabel) ad += tlv('05', opts.referenceLabel);
  if (opts.customerLabel) ad += tlv('06', opts.customerLabel);
  if (opts.purposeOfTransaction) ad += tlv('08', opts.purposeOfTransaction);
  if (opts.rrn) ad += tlv('90', opts.rrn);

  // Build root
  let str = '';
  str += tlv('00', '02');                             // Payload Format Indicator
  str += tlv('01', opts.isStatic ? '11' : '12');      // Static or Dynamic
  str += tlv('26', mai);                              // Merchant Account Info
  str += tlv('52', opts.mcc || '0000');                // MCC
  str += tlv('53', '458');                             // Currency (MYR)
  if (opts.amount) str += tlv('54', opts.amount.toString());
  str += tlv('58', 'MY');                              // Country
  str += tlv('59', opts.merchantName);                 // Merchant Name
  str += tlv('60', opts.merchantCity || 'MY');          // City
  if (opts.postalCode) str += tlv('61', opts.postalCode);
  if (ad) str += tlv('62', ad);                        // Additional Data

  // CRC must be last
  str += '6304';                                       // CRC ID + Length prefix
  str += crc16(str);                                   // Calculate and append CRC

  return str;
}
```

**Important:** You cannot generate a *functional* dynamic DuitNow QR yourself. The `merchantId` (account number) for dynamic QR codes is a temporary value assigned by the acquirer/banking app and is only valid for ~60 seconds. See [Known Limitations](#known-limitations).

---

## CRC16 Implementation

### JavaScript (from chengkiang's PayNow gist)

```javascript
function crc16(str) {
  const crcTable = [
    0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50A5, 0x60C6, 0x70E7,
    0x8108, 0x9129, 0xA14A, 0xB16B, 0xC18C, 0xD1AD, 0xE1CE, 0xF1EF,
    0x1231, 0x0210, 0x3273, 0x2252, 0x52B5, 0x4294, 0x72F7, 0x62D6,
    0x9339, 0x8318, 0xB37B, 0xA35A, 0xD3BD, 0xC39C, 0xF3FF, 0xE3DE,
    0x2462, 0x3443, 0x0420, 0x1401, 0x64E6, 0x74C7, 0x44A4, 0x5485,
    0xA56A, 0xB54B, 0x8528, 0x9509, 0xE5EE, 0xF5CF, 0xC5AC, 0xD58D,
    0x3653, 0x2672, 0x1611, 0x0630, 0x76D7, 0x66F6, 0x5695, 0x46B4,
    0xB75B, 0xA77A, 0x9719, 0x8738, 0xF7DF, 0xE7FE, 0xD79D, 0xC7BC,
    0x48C4, 0x58E5, 0x6886, 0x78A7, 0x0840, 0x1861, 0x2802, 0x3823,
    0xC9CC, 0xD9ED, 0xE98E, 0xF9AF, 0x8948, 0x9969, 0xA90A, 0xB92B,
    0x5AF5, 0x4AD4, 0x7AB7, 0x6A96, 0x1A71, 0x0A50, 0x3A33, 0x2A12,
    0xDBFD, 0xCBDC, 0xFBBF, 0xEB9E, 0x9B79, 0x8B58, 0xBB3B, 0xAB1A,
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

  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c > 255) throw new RangeError();
    const j = (c ^ (crc >> 8)) & 0xFF;
    crc = crcTable[j] ^ (crc << 8);
  }
  return ((crc ^ 0) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}
```

---

## Static vs Dynamic QR

| | Static QR (ID 01 = `11`) | Dynamic QR (ID 01 = `12`) |
|---|---|---|
| **Generated by** | Acquirer portal, printed once | Banking app, per-transaction |
| **Amount** | Usually absent (user enters) | Usually pre-filled |
| **Account/Merchant ID** | Permanent | Temporary (~60 sec validity) |
| **Use case** | Printed stickers at shops | App-generated per sale |
| **Can self-generate?** | Partially (need acquirer account) | **No** (acquirer assigns temp account) |
| **ID 62 usage** | Optional | Often includes timestamp, refs |
| **ID 82 usage** | Rare | Used by some acquirers (e.g. Razer) |

---

## Known Limitations

Documented by natsu90 (Sulaiman Sudirman) through reverse engineering:

1. **Cannot use your own DuitNow ID** — Unlike Singapore's PayNow (where you can use your UEN/phone directly) or Thailand's PromptPay, DuitNow QR requires going through an acquirer. You cannot simply generate a QR using your registered DuitNow proxy (phone/NRIC).

2. **Cannot self-generate dynamic QR** — The account number in dynamic QR codes is a temporary value assigned by the acquirer and is only valid for approximately 60 seconds. This is verified server-side by PayNet.

3. **PayNet gatekeeping** — The mapping between your DuitNow ID and the acquirer-assigned account number is not publicly accessible. You must go through a registered acquirer (bank or payment processor).

4. **Static QR reuse limitation** — A static QR account ID cannot be reused in a dynamic QR with a specified amount. They are treated as different entities.

5. **Bank-specific implementations** — Different banks implement ID 62 differently:
   - Maybank: uses ID `05` within ID 62
   - CIMB: uses ID `01`, ID `03` (format: YYYYMMDDHHMMSS), and ID `82` (SHA-256)

---

## Comparison: DuitNow vs PayNow vs PromptPay

| Feature | DuitNow (MY) | PayNow (SG) | PromptPay (TH) |
|---------|-------------|-------------|-----------------|
| AID | `A0000006150001` | `SG.PAYNOW` | `A000000677010111` |
| Currency | `458` (MYR) | `702` (SGD) | `764` (THB) |
| Country | `MY` | `SG` | `TH` |
| Self-generate QR? | **No** (need acquirer) | **Yes** (use UEN/phone) | **Yes** (use phone/NID) |
| Proxy types | Phone, NRIC, BRN, passport | Phone, UEN, NRIC | Phone, NID, Tax ID |
| Dynamic QR self-gen? | **No** | **Yes** | **Yes** |
| ID used for account | 26 (custom template) | 26 (SG.PAYNOW template) | 29 (PromptPay template) |
| Operator | PayNet | ABS/NETS | NITMX |

---

## Merchant Channel Codes

Used in ID 62, sub-ID 11. Three characters, each position has meaning:

**Position 1 — Media:**

| Value | Description |
|-------|-------------|
| `0` | Print — Merchant sticker |
| `1` | Print — Bill/Invoice |
| `2` | Print — Magazine/Poster |
| `3` | Print — Others |
| `4` | Screen — Merchant POS/POI |
| `5` | Screen — Website |
| `6` | Screen — App |
| `7` | Screen — Others |

**Position 2 — Transaction Location:**

| Value | Description |
|-------|-------------|
| `0` | At merchant premises |
| `1` | Not at merchant premises |
| `2` | Remote commerce |
| `3` | Others |

**Position 3 — Merchant Presence:**

| Value | Description |
|-------|-------------|
| `0` | Attended POS |
| `1` | Unattended |
| `2` | Semi-attended (self-checkout) |
| `3` | Others |

Example: `"400"` = Screen at POS, at merchant premises, attended.

---

## Related Tools & Repos

| Repo | Author | Description | Language | Stars |
|------|--------|-------------|----------|-------|
| [duitnowqr-test](https://github.com/natsu90/duitnowqr-test) | natsu90 | DuitNow QR generator (reverse engineered) | JS | 14 |
| [duitnowqr-razer](https://github.com/natsu90/duitnowqr-razer) | natsu90 | DuitNow QR real-time notification demo with Razer | JS | 44 |
| [duitnow-js gist](https://gist.github.com/natsu90/f45dc88b38a037325ad9095163b82b42) | natsu90 | DuitNow QR generator source code | JS | — |
| [paynow.js gist](https://gist.github.com/chengkiang/7e1c4899768245570cc49c7d23bc394c) | chengkiang | SG PayNow QR generator (inspiration) | JS | 43 |
| [qr-studio](https://github.com/deadboy18/qr-studio) | deadboy18 | QR generator with DuitNow decode | HTML/JS | — |
| [emv-qr](https://github.com/lee-ratinan/emv-qr) | lee-ratinan | EMV QR encoder/decoder (PHP, SG/TH) | PHP | — |
| [Payment-Icon](https://github.com/SnorSnor9998/Payment-Icon) | SnorSnor9998 | MY bank/wallet SVG icon collection | SVG | 72 |
| [wc-malaysia-payment-gateway](https://github.com/AliffAzmi/wc-malaysia-payment-gateway) | AliffAzmi | WooCommerce DuitNow QR + bank transfer | PHP | — |

---

## Credits & Acknowledgements

This compilation would not be possible without the research and work of:

- **[Sulaiman Sudirman (natsu90)](https://github.com/natsu90)** — Pioneering reverse engineering of DuitNow QR, documenting limitations, creating working generator and Razer integration demo. Blog: [sulaiman.dev](https://sulaiman.dev)
- **[chengkiang](https://github.com/chengkiang)** — Singapore PayNow QR generator gist that served as the reference implementation for EMV QR generation
- **[kidino](https://github.com/kidino)** — Originally discovered the Gintell massage chair DuitNow QR use case that inspired natsu90's research
- **[SnorSnor9998](https://github.com/SnorSnor9998)** — Comprehensive Malaysian payment icon collection
- **[deadboy18](https://github.com/deadboy18)** — QR Studio with DuitNow decode functionality
- **PayNet (Payments Network Malaysia)** — Official DuitNow QR specification and developer documentation

---

## Official References

- [PayNet Developer Portal — DuitNow QR Overview](https://docs.developer.paynet.my/docs/duitNow-QR/introduction/overview)
- [PayNet — QR Data Object Specification](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/qr-data-object)
- [PayNet — QR Generation Examples](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/example)
- [PayNet — Acquirer ID List](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/qr-data-object#acquirer-id-id-01)
- [PayNet — Branding & Guidelines](https://docs.developer.paynet.my/docs/duitNow-QR/introduction/branding-&-guidelines)
- [EMV® QR Code Specification for Payment Systems (EMV QRCPS)](https://www.emvco.com/emv-technologies/qrcodes/) — Merchant-Presented Mode
- [ISO 3166 — Country Codes](https://www.iso.org/iso-3166-country-codes.html)
- [ISO 4217 — Currency Codes](https://www.iso.org/iso-4217-currency-codes.html)
- [ISO 18245 — Merchant Category Codes](https://www.iso.org/standard/33365.html)
- [DuitNow QR Official Site](https://www.duitnow.my/DuitNow-QR/index.html)

---

## License

MIT

---

*Last updated: 2026-05-04*
