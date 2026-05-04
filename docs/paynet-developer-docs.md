# PayNet Developer Documentation

> Scraped and organized from [docs.developer.paynet.my](https://docs.developer.paynet.my/docs) — May 2026
>
> **Note:** PayNet has launched a new documentation platform at [docs.paynet.my](https://docs.paynet.my) (beta). This document references the original platform which remains active.

---

## Table of Contents

- [Products Overview](#products-overview)
- [DuitNow QR](#duitnow-qr)
  - [Merchant-Presented Mode: Domestic QR](#merchant-presented-mode-domestic-qr)
  - [Cross-Border Outbound QR](#cross-border-outbound-qr)
  - [Cross-Border Inbound QR](#cross-border-inbound-qr)
  - [Consumer-Presented Mode](#consumer-presented-mode)
- [QR Generation Specification](#qr-generation-specification)
  - [Introduction & Scope](#introduction--scope)
  - [Format Conventions](#format-conventions)
  - [Data Organization](#data-organization)
  - [QR Data Object Table](#qr-data-object-table)
  - [Merchant Account Information (IDs 26-27)](#merchant-account-information-ids-26-27)
  - [Additional Data Field Template (ID 62)](#additional-data-field-template-id-62)
  - [Transaction Amount Rules](#transaction-amount-rules)
  - [CRC Checksum (ID 63)](#crc-checksum-id-63)
  - [Data Integrity Check (ID 82)](#data-integrity-check-id-82)
  - [Merchant Channel Codes](#merchant-channel-codes)
- [Acquirer ID Directory (70 Entries)](#acquirer-id-directory-70-entries)
- [QR Code Examples](#qr-code-examples)
- [Appendix A: Common Character Set](#appendix-a-common-character-set)
- [DuitNow QR Transaction Flow](#duitnow-qr-transaction-flow)
  - [Account Enquiry Flow (Steps 1-6)](#account-enquiry-flow-steps-1-6)
  - [Credit Transfer Flow (Steps 7-13)](#credit-transfer-flow-steps-7-13)
  - [SAF Processing Flow](#saf-processing-flow)
  - [Validation Rules](#validation-rules)
- [Transaction Codes](#transaction-codes)
- [Response Codes](#response-codes)
  - [API Gateway General Response Codes](#api-gateway-general-response-codes)
  - [Status Codes and Reason Codes](#status-codes-and-reason-codes)
  - [Reject Reason Codes](#reject-reason-codes)
  - [Participant Reason Codes](#participant-reason-codes)
  - [Cross-Border Response Codes](#cross-border-response-codes)
- [Repeat Handling](#repeat-handling)
- [FPX (Financial Process Exchange)](#fpx-financial-process-exchange)
  - [B2C Transaction Flow](#b2c-transaction-flow)
  - [FPX Bank IDs](#fpx-bank-ids)
  - [FPX Business Category Codes](#fpx-business-category-codes)
- [Branding & Guidelines](#branding--guidelines)
- [Other PayNet Products](#other-paynet-products)
- [Contact & Support](#contact--support)

---

## Products Overview

PayNet (Payments Network Malaysia Sdn Bhd) provides the following products:

| Product | Description |
|---------|-------------|
| **DuitNow Transfer** | Instant credit transfer via account numbers or proxies (phone, NRIC) |
| **DuitNow QR** | QR code payments — Merchant-Presented & Consumer-Presented modes |
| **DuitNow Online Banking/Wallet** | Real-time online payments via internet/mobile banking or e-wallets |
| **DuitNow AutoDebit** | Recurring payment collection with pre-established consent |
| **DuitNow Consent** | Permission management for future payment collections |
| **DuitNow Request** | Real-time digital payment request to collect funds |
| **DuitNow Pay** | Single API consolidating multiple online payment channels |
| **DuitNow Reversal** | Refund/reversal processing for disputes and timeouts |
| **FPX** | Online banking payment gateway (B2C, B2B1, B2B2) |
| **JomPAY** | Bill payment system with biller notification |
| **MyDebit** | Domestic debit card network (CNP + Tokenisation) |
| **National Addressing Database (NAD)** | Proxy registration (phone, NRIC) linking to bank accounts |
| **Network Administration** | System sign-on/off and echo management |
| **National Fraud Portal** | Fraud detection and prevention |

Source: [docs.developer.paynet.my/docs](https://docs.developer.paynet.my/docs)

---

## DuitNow QR

### Merchant-Presented Mode: Domestic QR

When a customer wants to make a payment, the merchant provides a QR code (static or dynamic) for the customer to scan. The customer scans using their mobile banking or e-payment app, keys in the amount (for static QR), and receives confirmation upon successful transaction.

**Two modes available:**
- **Merchant-Presented QR** — Merchant displays QR, customer scans
- **Consumer-Presented QR** — Customer displays QR, merchant scans

Source: [Domestic QR Overview](https://docs.developer.paynet.my/docs/duitNow-QR/integration/merchant-presented-QR/domestic-QR)

### Cross-Border Outbound QR

Enables Malaysians abroad to make payments via their mobile banking or e-payment application by scanning foreign merchants' QR codes.

Source: [Cross-Border Outbound](https://docs.developer.paynet.my/docs/duitNow-QR/integration/merchant-presented-QR/crossborder-outbound-QR)

### Cross-Border Inbound QR

Enables foreign customers to pay via their mobile banking apps by scanning DuitNow QR at participating Malaysian merchants.

Source: [Cross-Border Inbound](https://docs.developer.paynet.my/docs/duitNow-QR/integration/merchant-presented-QR/crossborder-inbound-QR)

### Consumer-Presented Mode

Consumers generate a QR Code from their mobile app, which the merchant scans at the point of sale to complete the transaction. Processed online for seamless and secure payments.

Source: [Consumer-Presented QR](https://docs.developer.paynet.my/docs/duitNow-QR/integration/consumer-presented-QR/domestic-QR)

---

## QR Generation Specification

**Version:** V1.5

### Introduction & Scope

Specifications for the QR Code displayed by the merchant, including format and content.

**Referenced standards:**
- EMV® QR Code Specification for Payment Systems (EMV QRCPS) — Merchant-Presented Mode
- EMV Book 4 Version 4.3
- ISO 3166 — Country Codes (two-letter)
- ISO 4217 — Currency Codes
- ISO 18245 — Merchant Category Codes (MCC)

**In scope:** Format of the Merchant-Presented QR Code

**Out of scope:** Consumer-presented QR, transaction/message/settlement requirements, QR application & terminal requirements

Source: [QR Spec Overview](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/overview)

### Format Conventions

| Format | Description |
|--------|-------------|
| **Numeric (N)** | Digits "0" to "9" only. 10 characters total. |
| **Alphanumeric Special (ANS)** | Common Character Set as defined in EMV Book 4. 96 characters total — includes numeric + punctuation. See [Appendix A](#appendix-a-common-character-set). |
| **String (S)** | Any precomposed Unicode character(s). |

**Presence notation:**
| Code | Meaning |
|------|---------|
| M | Mandatory — shall always be present |
| C | Conditional — shall be present under certain conditions |
| O | Optional — may be present |

### Data Organization

- Payload Format Indicator (ID "00") **must be first** data object
- CRC (ID "63") **must be last** data object
- All other root-level data objects may be placed in any position
- Data objects within templates (e.g., ID "62", ID "64") may be in any order within their template

### QR Data Object Table

| Name | ID | Format | Length | Presence | Description |
|------|-----|--------|--------|----------|-------------|
| Payload Format Indicator | 00 | N | 02 | M | Always "02" |
| Point of Initiation Method | 01 | N | 02 | M | `11` = Static QR, `12` = Dynamic QR |
| Merchant Account Information | 26-27 | ANS | up to 99 | M | See [Merchant Account Info](#merchant-account-information-ids-26-27). ID 27 is RFU. |
| Merchant Category Code | 52 | N | 04 | M | ISO 18245. `0000` = P2P, `6010` = POS Cash Out |
| Transaction Currency Code | 53 | N | 03 | M | ISO 4217. `458` = Malaysian Ringgit (MYR) |
| Transaction Amount | 54 | ANS (numeric + ".") | up to 13 | C | See [Amount Rules](#transaction-amount-rules) |
| Tip or Convenience Indicator | 55 | N | 02 | O | `1` = prompt for tip, `2` = flat fee, `3` = percentage fee |
| Value of Convenience Fee Fixed | 56 | ANS (numeric + ".") | up to 13 | C | Required if ID 55 = "02" |
| Value of Convenience Fee % | 57 | ANS (numeric + ".") | up to 05 | C | Required if ID 55 = "03". Range "0.01"-"99.99" |
| Country Code | 58 | ANS | 02 | M | ISO 3166. Use `MY` for Malaysia |
| Merchant Name | 59 | ANS | up to 25 | M | Name of merchant |
| Merchant City | 60 | ANS | up to 15 | M | Use `MY` if not applicable |
| Postal Code | 61 | ANS | 05 | O | Must be 5 numeric digits |
| Additional Data Field Template | 62 | S | up to 99 | C | See [Additional Data](#additional-data-field-template-id-62). Required for JomPAY QR. |
| Merchant Info Language Template | 64 | S | up to 99 | O | ISO 639. Alternate language merchant info. |
| └ Language Preference | 64-00 | ANS | 02 | M | Required if ID 64 present |
| └ Merchant Name (Alt) | 64-01 | S | up to 25 | M | Required if ID 64 present |
| └ Merchant City (Alt) | 64-02 | S | up to 15 | O | Optional |
| CRC | 63 | ANS | 04 | M | CRC16 checksum. See [CRC](#crc-checksum-id-63) |
| Data Integrity Check | 82 | ANS | 99 | O | Hash/authentication value. See [Data Integrity](#data-integrity-check-id-82) |

Source: [QR Data Object](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/qr-data-object)

### Merchant Account Information (IDs 26-27)

The template used when the payment system is explicitly identified:

| Name | ID | Format | Length | Presence | Description |
|------|-----|--------|--------|----------|-------------|
| Application Identifier (AID) | 00 | ANS | 14 | M | Malaysia: `A0000006150001` |
| Acquirer ID | 01 | ANS | up to 06 | M | See [Acquirer ID Directory](#acquirer-id-directory-70-entries) |
| QR ID | 02 | AN | up to 28 | M | Merchant/Recipient ID assigned by acquirer. For Dynamic QR: maintained across different QR. For JomPAY: use Biller Code. |
| Merchant Descriptor | 03 | ANS | up to 20 | O | Description assigned by acquirer |
| Mobile Number | 04 | ANS | up to 15 | O | Merchant mobile number |

### Additional Data Field Template (ID 62)

If present, must contain at least 1 data object. Content of IDs 01-08 shall be either `***` (indicating mobile app should obtain the info) or a merchant-defined value.

| Name | ID | Format | Length | Presence | Description |
|------|-----|--------|--------|----------|-------------|
| Bill Number | 01 | ANS | up to 25 | O | Invoice/bill number |
| Mobile Number | 02 | ANS | up to 25 | O | Mobile number |
| Store Label | 03 | ANS | up to 25 | O | Store identifier |
| Loyalty Number | 04 | ANS | up to 25 | O | Loyalty card number |
| Reference Label | 05 | ANS | up to 25 | O | Transaction reference |
| Customer Label | 06 | ANS | up to 25 | O | Customer identifier |
| Terminal Label | 07 | ANS | up to 25 | O | Terminal identifier |
| Purpose of Transaction | 08 | ANS | up to 25 | O | Transaction description |
| Additional Consumer Data Request | 09 | A | up to 03 | O | `A` = Address, `M` = Mobile, `E` = Email. Combine: e.g., `AME` |
| Merchant Tax ID | 10 | ANS | up to 15 | O | TIN number |
| Merchant Channel | 11 | ANS | up to 3 | O | See [Merchant Channel Codes](#merchant-channel-codes) |
| RRN (Ref-1) | 90 | ANS | up to 20 | C | **Required for JomPAY QR** |
| RRN2 (Ref-2) | 91 | ANS | up to 30 | O | Optional for JomPAY QR |
| Geo Coordinates | 92 | ANS | up to 35 | O | Lat/Long of merchant |
| Payment System Specific | 50-89, 92-99 | S | Variable | O | RFU for Payment Network |

### Transaction Amount Rules

1. If present: amount ≠ zero, digits 0-9 only, single `.` as decimal mark
2. Decimal places must align with currency exponent (ISO 4217)
3. No spaces, commas, or other separators allowed
4. Valid: `98.73`, `98`, `98.`, `0.1`, `0.01`
5. Invalid: `98,73`, `3 705`, `3,705`
6. Omit amount if the mobile app should prompt the consumer to enter it

### CRC Checksum (ID 63)

- Calculated per ISO/IEC 13239
- Polynomial: `1021` (hex)
- Initial value: `FFFF` (hex)
- Data scope: all data objects including their ID, Length, and Value, plus the ID and Length of the CRC itself (but **excluding** CRC value)
- Result: 2-byte hex value encoded as 4-character ANS string
- Example: CRC hex `007B` → encoded as `"6304007B"`

### Data Integrity Check (ID 82)

- Uses Hash Function per ISO/IEC 10118-3
- Algorithm: SHA-256
- Takes arbitrary-length message input, produces hash value
- Used to ensure data accuracy and consistency

### Merchant Channel Codes

ID 62, sub-field 11. Three characters, each representing a channel characteristic:

**First character — Media:**

| Value | Definition |
|-------|------------|
| 0 | Print — Merchant sticker |
| 1 | Print — Bill/Invoice |
| 2 | Print — Magazine/Poster |
| 3 | Print — Others |
| 4 | Screen/Electronic — Merchant POS/POI |
| 5 | Screen/Electronic — Website |
| 6 | Screen/Electronic — App |
| 7 | Screen/Electronic — Others |

**Second character — Transaction Location:**

| Value | Definition |
|-------|------------|
| 0 | At merchant premises/registered address |
| 1 | Not at merchant premises |
| 2 | Remote commerce |
| 3 | Others |

**Third character — Merchant Presence:**

| Value | Definition |
|-------|------------|
| 0 | Attended POS/POI |
| 1 | Unattended |
| 2 | Semi-attended (self-checkout) |
| 3 | Others |

---

## Acquirer ID Directory (70 Entries)

Complete list from PayNet DuitNow QR specification. Categorized by type.

### Banks (36)

| # | Name | Acquirer ID | BIC Code |
|---|------|-------------|----------|
| 1 | AEON Bank (M) Berhad | 629295 | ACDBMYK2 |
| 2 | Affin Bank Berhad | 501664 | PHBMMYKL |
| 3 | Al Rajhi Banking & Investment Corporation (M) Berhad | 432134 | RJHIMYKL |
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
| 15 | China Construction Bank (M) Berhad | 629261 | PCBCMYKL |
| 16 | CIMB Bank Berhad | 501854 | CIBBMYKL |
| 17 | Citibank Berhad | 589170 | CITIMYKL |
| 18 | Deutsche Bank (M) Berhad | 629246 | DEUTMYKL |
| 19 | GX Bank Berhad | 629279 | GXSPMYKL |
| 20 | Hong Leong Bank Berhad | 588830 | HLBBMYKL |
| 21 | HSBC Bank Berhad | 589836 | HBMBMYKL |
| 22 | Industrial and Commercial Bank of China (M) Berhad | 629253 | ICBKMYKL |
| 23 | JP Morgan Chase Bank Berhad | 629212 | CHASMYKX |
| 24 | KAF Investment Bank Berhad | 629311 | KAFBMYK2 |
| 25 | Koperasi Co-opbank Pertama Malaysia Berhad | 890228 | KCPMMYK1 |
| 26 | Kuwait Finance House (M) Berhad | 639406 | KFHOMYKL |
| 27 | Malayan Banking Berhad | 588734 | MBBEMYKL |
| 28 | MBSB Bank Berhad | 432310 | AFBQMYKL |
| 29 | Mizuho Bank (M) Berhad | 629220 | MHCBMYKA |
| 30 | MUFG Bank (M) Berhad | 629196 | BOTKMYKX |
| 31 | OCBC Bank Berhad | 504324 | OCBCMYKL |
| 32 | Public Bank Berhad | 564162 | PBBEMYKL |
| 33 | RHB Bank Berhad | 564160 | RHBBMYKL |
| 34 | Standard Chartered Bank Malaysia Berhad | 539981 | SCBLMYKX |
| 35 | Sumitomo Mitsui Banking Corporation (M) Berhad | 629238 | SMBCMYKL |
| 36 | United Overseas Bank (M) Berhad | 519469 | UOVBMYKL |

### E-wallets & Non-Bank Financial Institutions (33)

| # | Name | Acquirer ID | BIC Code |
|---|------|-------------|----------|
| 1 | Ampersand Pay Sdn Bhd | 890293 | APSBMYNB |
| 2 | Axiata Digital eCode Sdn Bhd (Boost) | 890061 | BOSTMYNB |
| 3 | Beez Fintech Sdn Bhd | 890236 | BEEZMYNB |
| 4 | BigPay Malaysia Sdn Bhd | 890012 | BGPYMYNB |
| 5 | Boost Connect Sdn Bhd | 890244 | BCNTMYNB |
| 6 | Curlec Sdn Bhd | 890160 | CRLCMYNB |
| 7 | Fass Payment Solutions Sdn Bhd | 890145 | FSPYMYNB |
| 8 | Fave Asia Technologies Sdn Bhd | 890020 | FAVEMYNB |
| 9 | Finexus Cards Sdn Bhd | 890038 | FNXSMYNB |
| 10 | GHL Cardpay Sdn Bhd | 890103 | GHLCMYNB |
| 11 | Global Payments Asia-Pacific Limited | 890186 | GLPYMYNB |
| 12 | GPay Network (M) Sdn Bhd (GrabPay) | 890046 | GRABMYNB |
| 13 | Instapay Technologies Sdn Bhd | 890178 | INSTMYNB |
| 14 | iPay88 (M) Sdn Bhd | 890079 | IPAYMYNB |
| 15 | Kiplepay Sdn Bhd | 890152 | KPLPMYNB |
| 16 | ManagePay Systems Sdn Bhd | 890301 | MPAYMYNB |
| 17 | Merchantrade Asia Sdn Bhd | 890111 | MASBMYNB |
| 18 | MobilityOne Sdn Bhd | 890210 | MBLOMYNB |
| 19 | Mobiedge E-commerce Sdn Bhd | 890277 | MDGEMYNB |
| 20 | MRuncit Commerce Sdn Bhd | 890327 | MRCTMYNB |
| 21 | Paydibs Sdn Bhd | 890269 | PDBSMYNB |
| 22 | Payex PLT | 890194 | PAYXMYNB |
| 23 | Razer Merchant Services Sdn Bhd | 890087 | RZMSMYNB |
| 24 | Revenue Solution Sdn Bhd | 890095 | RSSBMYNB |
| 25 | Setel Ventures Sdn Bhd | 890129 | SVSBMYNB |
| 26 | ShopeePay Malaysia Sdn Bhd | 890004 | ARPYMYNB |
| 27 | SiliconNet Technologies Sdn Bhd | 890202 | SPAYMYNB |
| 28 | Stripe Payments Singapore Pte Ltd | 890137 | STRPMYNB |
| 29 | TNG Digital Sdn Bhd | 890053 | TNGDMYNB |
| 30 | UniPin (M) Sdn Bhd | 890251 | UNPNMYNB |
| 31 | Wannapay Sdn Bhd | 890319 | WANNMYNB |
| 32 | YTL Digital Bank Berhad | 629287 | SCCHMYKL |
| 33 | 2C2P System Sdn Bhd | 890285 | C2P2MYNB |

### JomPAY

| Name | Acquirer ID | BIC Code |
|------|-------------|----------|
| JomPAY | 898989 | N/A |

Source: [QR Data Object — Acquirer ID](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/qr-data-object#acquirer-id-id-01)

---

## QR Code Examples

### Example 1: Static Retail POS (without Data Integrity Check)

```
00020201021126410014A000000615000101065016640209123456789520499995303458540510.005802MY5909QRCSDNBHD6005BANGI6304343F
```

| Field | Encoded | Decoded |
|-------|---------|---------|
| Payload Format Indicator | `000202` | Version 02 |
| Point of Initiation | `010211` | Static QR |
| Merchant Account Info | `2641` | — |
| └ AID | `0014A0000006150001` | Malaysia AID |
| └ Acquirer ID | `0106501664` | Affin Bank |
| └ QR ID | `0209123456789` | Merchant ID: 123456789 |
| MCC | `52049999` | 9999 — Government Agency |
| Currency | `5303458` | MYR |
| Amount | `540510.00` | RM 10.00 |
| Country | `5802MY` | Malaysia |
| Merchant Name | `5909QRCSDNBHD` | QRCSDNBHD |
| Merchant City | `6005BANGI` | Bangi |
| CRC | `6304343F` | Checksum |

### Example 2: Static P2P (without Data Integrity Check)

```
00020201021126410014A000000615000101065016640209123456789520400005303458540510.005802MY5909AUSERNAME6005BANGI63043A23
```

Same as Example 1 but MCC = `0000` (P2P) and merchant name = AUSERNAME.

### Example 3: Static Retail POS (with Data Integrity Check)

```
00020201021126410014A000000615000101065016640209123456789520499995303458540510.005802MY5909QRCSDNBHD6005BANGI8264f879ac6266d8d6da081fc1c17160021119747b190615c21076b3fc0fce56c6eb6304B623
```

Same as Example 1 but includes ID 82 (Data Integrity Check) with SHA-256 hash value.

### Example 4: JomPAY Bill Payment

```
00020201021126360014A00000061500010106898989020412345204111153034585802MY5903TNB6002KL610559200621790130124007552406823231d4db4506dc9852b1c21c74be148b8363045DFB
```

| Field | Decoded |
|-------|---------|
| Acquirer | 898989 — JomPAY |
| QR ID | 1234 — Biller Code |
| MCC | 1111 — Bill Payment |
| Merchant Name | TNB (Tenaga Nasional Berhad) |
| City | KL |
| Postal Code | 59200 |
| RRN (ID 62, sub 90) | 0124007552406 |

Source: [QR Examples](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/example)

---

## Appendix A: Common Character Set

The character set common to all parts of ISO/IEC 8859, as defined in EMV Book 4. Includes:

- Space (SP)
- Digits: `0`-`9`
- Uppercase: `A`-`Z`
- Lowercase: `a`-`z`
- Special: `! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~`

Total: 96 characters.

Source: [Appendix A](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/appendix-a)

---

## DuitNow QR Transaction Flow

### Account Enquiry Flow (Steps 1-6)

| Step | From | To | Process |
|------|------|----|---------|
| 1 | Customer | Issuer | Scans merchant QR via Issuer Mobile App |
| 2 | Issuer | RPP | Validates QR, parses AID/Acquirer ID/Merchant Name/QR ID/Amount. If off-us, sends Account Enquiry (TC: 520) |
| 3 | RPP | Acquirer | Message & business validation. If valid, forwards enquiry |
| 4 | Acquirer | RPP | Validates QR string (hash, key fields, or entire string comparison). For dynamic QR: checks validity period |
| 5 | RPP | Issuer | Returns merchant name, QR payment type, acceptable source of fund |
| 6 | Issuer | Customer | Displays merchant name and payment options, or error |

### Credit Transfer Flow (Steps 7-13)

| Step | From | To | Process |
|------|------|----|---------|
| 7 | Customer | Issuer | Confirms QR payment |
| 8 | Issuer | RPP | Sends Credit Transfer request (TC: 030) |
| 9 | RPP | Acquirer | Validates and forwards |
| 10 | Acquirer | RPP | Validates, credits merchant, returns success |
| 11 | Acquirer | Merchant | Notifies merchant of successful payment |
| 12 | RPP | Issuer | Sets settlement date/cycle, updates liquidity, returns success |
| 13 | Issuer | Customer | Displays success |

### SAF Processing Flow

When acquirer times out during credit transfer, RPP stores the transaction in SAF (Store and Forward) and retries with configurable parameters: max TPS, retry limit, pause period, tolerance period. If retries exhausted, manual reconciliation is required.

### Validation Rules

**Message Validation:**
- Message format validation
- Digital signature verification

**Business Validation (RPP):**
- Mandatory/conditional field checks
- Business Message Identifier validation
- Issuer/Acquirer checks
- Repeat check, date tolerance
- Min/max amount, liquidity position
- Account enquiry existence (for credit transfer)

**Business Validation (Acquirer):**
- QR validation (hash/key fields/full string)
- Beneficiary account validation

Source: [Domestic QR Integration](https://docs.developer.paynet.my/docs/duitNow-QR/integration/merchant-presented-QR/domestic-QR)

---

## Transaction Codes

### DuitNow QR Specific

| TC | Description | Initiator | Receiver |
|----|-------------|-----------|----------|
| 030 | QR POS payment via Credit Transfer | Issuer | Acquirer |
| 040 | QR P2P payment via Credit Transfer | Issuer | Acquirer |
| 520 | Account Enquiry for Domestic QR | Issuer | Acquirer |
| 031 | QR POS Cross-Border payment | Issuer | Acquirer |
| 521 | Account Enquiry for Cross-Border QR | Issuer | Acquirer |
| 240 | Debit request — CPM Domestic | Acquirer | Issuer |
| 880 | Pre-auth request — CPM Domestic | Acquirer | Issuer |
| 250 | Post-auth debit — CPM Domestic | Acquirer | Issuer |
| 522 | Account Enquiry — DuitNow QR Cash Out | Issuer | Acquirer |
| 032 | Credit Transfer — QR Cash Out | Issuer | Acquirer |
| 630 | Transaction status inquiry via BizMsgId | Issuer/Acquirer | RPP |
| 872 | Cancellation to QR Debit Request | RPP | Issuer |

### DuitNow Transfer

| TC | Description |
|----|-------------|
| 010 | Credit Transfer — Instant Transfer |
| 110 | Credit Transfer — Pay-to-Proxy (P2P) |
| 510 | Account Resolution Enquiry |

### Network Administration

| TC | Description |
|----|-------------|
| 1001 | Sign On to RPP network |
| 1002 | Sign Off from RPP network |
| 1003 | Echo (connectivity test) |

### JomPAY Bill Payment

| TC | Description |
|----|-------------|
| 523 | Account Resolution Enquiry |
| 033 | Credit Transfer for JomPAY |

### Reversals

| TC | Description |
|----|-------------|
| 011 | Credit Transfer Reversal (Clear) |
| 012 | Credit Transfer Reversal (Masked) |
| 854 | Refund Intent |

Source: [Transaction Codes](https://docs.developer.paynet.my/docs/duitNow-QR/transaction-codes)

---

## Response Codes

### API Gateway General Response Codes

| Status | Reason | Name | Description |
|--------|--------|------|-------------|
| RJCT | API.001 | MESSAGE_VALIDATION_ERROR | Invalid request body |
| RJCT | API.002 | MESSAGE_VALIDATION_ERROR | Invalid format |
| RJCT | API.003 | MESSAGE_VALIDATION_ERROR | Invalid length |
| RJCT | API.004 | MESSAGE_VALIDATION_ERROR | Invalid value |
| RJCT | API.005 | MESSAGE_VALIDATION_ERROR | Missing mandatory field |
| RJCT | API.006 | SYSTEM_ERROR | Access Denied |
| RJCT | API.007 | SYSTEM_ERROR | Unauthorized Request |
| RJCT | API.008 | SYSTEM_ERROR | Request Timeout |
| RJCT | API.009 | RESOURCE_NOT_FOUND | Invalid URL |
| RJCT | API.010 | RESOURCE_NOT_FOUND | Record Not Found |
| RJCT | API.999 | SYSTEM_ERROR | API Exception |
| RJCT | KMS.001 | SIGNATURE_ERROR | Invalid Signature |
| ACTC | KMS.002 | SIGNATURE_ERROR | Failed to generate signature |

### Status Codes and Reason Codes

**Status Code meanings:**

| Code | Name | Description |
|------|------|-------------|
| ACSP | AcceptedSettlementInProcess | Payment accepted for execution |
| ACTC | AcceptedTechnicalValidation | Validation successful; also used for unknown state on KMS.002 |
| RJCT | Rejected | Payment/transaction rejected |

**Key reason codes (selected):**

| Status | Reason | Description |
|--------|--------|-------------|
| ACSP | U000 | Success / Transaction Accepted |
| ACTC | U002 | Stored in SAF |
| RJCT | U149 | Duplicate Transaction |
| RJCT | U193 | Liquidity Position Validation Failure |
| RJCT | U194 | Insufficient Liquidity |
| RJCT | U300 | No QR Enquiry prior to QR Payment |
| RJCT | U301 | Invalid Source of Fund (QR) |
| RJCT | U327 | Merchant Not Active |
| RJCT | U329 | Merchant Not Found |
| RJCT | U999 | Signature Validation Failed |

### Participant Reason Codes

Key codes from responding participants:

**Payer Behavioral:**
| Code | Description |
|------|-------------|
| D101 | User Cancel During Login |
| D102 | User Cancel During Account Selection |
| D103 | User Cancel During TAC Request |
| D104 | User Cancel During Confirmation |
| D105 | User Fail to Login |
| D106 | Fail to Authenticate MFA |
| D107 | Session Timeout |

**Liquidity / Account:**
| Code | Description |
|------|-------------|
| D301 | Insufficient Funds |
| D302 | Transaction Not Permitted |
| D303 | Maximum Transaction Limit Exceeded |
| D304 | Invalid DuitNow ID or Proxy ID |
| D305 | Invalid Secondary ID |
| D306 | Source of Fund Not Supported |
| D307 | Account Dormant/Inactive/Invalid |
| D308 | Account Restricted (Debit) |
| D309 | Account is Mule |
| D312 | Account Does Not Exist |
| D313 | QR Expired |
| D314 | Merchant Inactive/Suspended/Terminated |

**System:**
| Code | Description |
|------|-------------|
| D401 | Transaction Enquiry Timeout |
| D403 | Internal Error at Bank System |
| D407 | Duplicate Transmission |
| D408 | QR Validation Failed |

**Suspicion:**
| Code | Description |
|------|-------------|
| D501 | Merchant Prohibited by Bank |
| D502 | Suspicious Transaction |
| D503 | Account Prohibited by Bank |

### Cross-Border Response Codes

Cross-border codes are available for Singapore, Indonesia, Thailand, and China partnerships.

Source: [Response Codes](https://docs.developer.paynet.my/docs/duitNow-QR/response-codes)

---

## Repeat Handling

When the sender fails to receive a response from RPP, the transaction status is unknown. The repeat request feature allows resending with `<PssblDplct>` set to `true` to prevent duplicate payment. This is for exceptional scenarios only.

**Exception scenarios handled:**
1. RPP failed to receive request from OFI
2. OFI failed to receive response from RPP
3. OFI timeout due to longer processing at RFI
4. OFI timeout while RPP response is in transit

Source: [Repeat Handling](https://docs.developer.paynet.my/docs/duitNow-QR/repeat-handling)

---

## FPX (Financial Process Exchange)

### B2C Transaction Flow

1. Buyer initiates purchase on merchant website
2. Buyer selects bank from dropdown
3. Merchant sends Authorization Request (AR) to FPX via SSL
4. FPX redirects buyer to bank's Internet Banking login
5. Buyer authorizes via 2FA
6. Bank sends Direct Authorization Confirmation (AC) to FPX
7. FPX sends acknowledgment to bank
8. FPX sends AC + email notifications to merchant and buyer
9. Merchant acknowledges with "OK"
10. Bank displays status, buyer clicks "Continue"
11. Bank redirects buyer to FPX (Indirect AC)
12. FPX redirects buyer to merchant (Indirect AC)
13. Merchant displays status
14. FPX sends RR to Acquiring Bank
15. Acquiring Bank credits merchant
16. Acquiring Bank sends RC to FPX

Source: [FPX B2C](https://docs.developer.paynet.my/docs/fpx/b2c-overview)

### FPX Bank IDs

| Bank ID | Bank Name |
|---------|-----------|
| ABB0232 | Affin Bank Berhad |
| ABB0233 | Affin Bank Berhad B2C |
| ABMB0212 | Alliance Bank (B2C) |
| ABMB0213 | Alliance Bank (B2B) |
| AMBB0208 | AmBank (B2B) |
| AMBB0209 | AmBank (B2C) |
| BCBB0235 | CIMB Bank |
| BIMB0340 | Bank Islam |
| BMMB0341 | Bank Muamalat |
| BMMB0342 | Bank Muamalat (B2B) |
| BKRM0602 | Bank Rakyat (B2C) |
| BSN0601 | BSN |
| DBB0199 | Deutsche Bank |
| HLB0224 | Hong Leong Bank |
| HLB0225 | Hong Leong Bank (B2B2) |
| HSBC0223 | HSBC Bank |
| KFH0346 | Kuwait Finance House |
| MB2U0227 | Maybank (M2U) |
| MBB0227 | Maybank (M2E) |
| MBB0228 | Maybank (B2B) |
| OCBC0229 | OCBC Bank |
| PBB0233 | Public Bank |
| RHB0218 | RHB Bank |
| SCB0215 | Standard Chartered (B2B) |
| SCB0216 | Standard Chartered (B2C) |
| UOB0226 | UOB (B2C) |
| UOB0227 | UOB (B2B1) |
| UOB0228 | UOB (B2B1 Regional) |

**Payment Aggregators:**

| ID | Name |
|----|------|
| TPAGHL | GHL CardPay |
| TPAIPAY88 | Mobile88.com (iPay88) |
| TPAMOLPAY | MOL Pay |
| TPAREVENUE | Revenue Harvest |

Source: [FPX Mapping Table](https://docs.developer.paynet.my/docs/fpx/mapping-table)

### FPX Business Category Codes

Selected common codes:

| Code | Description |
|------|-------------|
| 0001 | Electricity |
| 0002 | Water |
| 0003 | Telecommunication |
| 0101 | Airlines |
| 0201 | Unit Trusts |
| 0202 | Insurances |
| 0204 | Financial Institutions |
| 0301 | Educational Services |
| 0501 | Government Agencies |
| 0502 | Retail Goods |
| 0509 | Payment Solution Provider |
| 0515 | E-Commerce Service Provider |
| 0516 | Banking Products |
| 1111 | Refund |
| 1234 | RPP Bridge |

Full list: 100+ codes at [FPX Mapping Table](https://docs.developer.paynet.my/docs/fpx/mapping-table)

---

## Branding & Guidelines

PayNet provides brand guidelines and downloadable resources for:
- DuitNow Brand Guidelines (design specifications for Merchant-Presented displays)
- DuitNow Logo (for all marketing collateral)
- DuitNow QR Logo (for all marketing collateral)

Download from: [Branding & Guidelines](https://docs.developer.paynet.my/docs/duitNow-QR/introduction/branding-&-guidelines)

---

## Other PayNet Products

### DuitNow Transfer
Instant credit transfer supporting account numbers and proxies (mobile numbers, NRICs).

### DuitNow Online Banking/Wallet (DOBW)
Real-time online payment for merchants via internet/mobile banking or e-payment apps.

### DuitNow AutoDebit
Payment collection with pre-established consent for recurring payments.

### DuitNow Request
Real-time digital payment requests to collect funds via account or proxy.

### DuitNow Pay
Single API consolidating DuitNow QR, DOBW, and other payment channels at checkout.

### MyDebit
- **Secure CNP (Card Not Present):** Online/in-app transactions using EMV 3-D Secure
- **Tokenisation:** Replacing card details with tokens to reduce fraud

### JomPAY
- **BNS:** Biller Notification System — real-time/batch payment alerts
- **BRS:** Biller Registration System — online validation service
- **BVM:** Biller Validation Module — bill payment confirmation

### National Fraud Portal
Onboarding guide for fraud detection and prevention.

---

## Contact & Support

**PayNet (Payments Network Malaysia Sdn Bhd)**
- Registration: 200801035403 (836743-D)
- Address: Level 8, Menara Southpoint @ Mid Valley City, Medan Syed Putra Selatan, 59200 Kuala Lumpur
- Phone: +603 2781 0500
- Email: ask@paynet.my
- Support: [knowledgebase.paynet.my](https://knowledgebase.paynet.my/hc/en-us)
- Developer Portal: [developer.paynet.my](https://developer.paynet.my)
- Documentation: [docs.developer.paynet.my](https://docs.developer.paynet.my/docs)
- New Documentation (Beta): [docs.paynet.my](https://docs.paynet.my)

---

*Scraped: May 2026*
*Source: [docs.developer.paynet.my](https://docs.developer.paynet.my/docs)*
