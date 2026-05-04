# 🇲🇾 DuitNow QR Acquirer Codes — Complete Reference

> **PayNet DuitNow QR acquirer IDs** used in EMV Merchant-Presented Mode QR codes.
> These are the 6-digit codes in **Tag 26 → Sub-tag 01** of DuitNow QR payloads.
>
> Source: [PayNet QR Spec v1.5](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/qr-data-object) · [QR Studio](https://github.com/deadboy18/qr-studio) · [natsu90 research](https://github.com/natsu90/duitnowqr-test)
>
> Last updated: **May 2026** · **70 acquirers**

---

## How Acquirer IDs Work in DuitNow QR

Every DuitNow QR code follows the EMV QR Code Specification. The acquirer ID sits inside the **Merchant Account Information** block:

```
Tag 26  Merchant Account Information
  ├── 00  A0000006150001          ← DuitNow AID (always this value)
  ├── 01  588734                  ← Acquirer ID (6 digits — this document)
  └── 02  0123456789              ← Merchant / QR ID
```

The acquirer ID identifies which bank or payment processor registered the merchant. A merchant using Maybank as their acquiring bank will have `588734` in sub-tag 01, regardless of which bank the *customer* pays from.

---

## Quick Lookup

| Acquirer ID | Name | Category |
|:-----------:|:-----|:--------:|
| `588734` | **Maybank** | 🏦 Bank |
| `501854` | **CIMB Bank** | 🏦 Bank |
| `564162` | **Public Bank** | 🏦 Bank |
| `564169` | **AmBank** | 🏦 Bank |
| `564160` | **RHB Bank** | 🏦 Bank |
| `588830` | **Hong Leong Bank** | 🏦 Bank |
| `501664` | **Affin Bank** | 🏦 Bank |
| `504374` | **Alliance Bank** | 🏦 Bank |
| `504324` | **OCBC Bank** | 🏦 Bank |
| `519469` | **UOB** | 🏦 Bank |
| `539981` | **Standard Chartered** | 🏦 Bank |
| `589836` | **HSBC** | 🏦 Bank |
| `589170` | **Citibank** | 🏦 Bank |
| `420709` | **BSN** | 🏦 Bank |
| `603346` | **Bank Islam** | 🏦 Bank |
| `564167` | **Bank Muamalat** | 🏦 Bank |
| `589267` | **Bank Rakyat** | 🏦 Bank |
| `589373` | **Agrobank** | 🏦 Bank |
| `432310` | **MBSB Bank** | 🏦 Bank |
| `432134` | **Al Rajhi Bank** | 🏦 Bank |
| `639406` | **Kuwait Finance House** | 🏦 Bank |
| `890053` | **Touch 'n Go eWallet** | 📱 E-Wallet |
| `890046` | **GrabPay** | 📱 E-Wallet |
| `890061` | **Axiata Digital (Boost)** | 📱 E-Wallet |
| `890004` | **ShopeePay** | 📱 E-Wallet |
| `890012` | **BigPay** | 📱 E-Wallet |
| `890129` | **Setel** | 📱 E-Wallet |

---

## Full Acquirer Directory

### 🏦 Malaysian Commercial Banks

| Acquirer ID | Institution | Notes |
|:-----------:|:------------|:------|
| `588734` | **Maybank** (Malayan Banking Berhad) | Largest bank by assets. QR IDs often prefixed `QRMBB` or `MAEPP` (MAE) |
| `501854` | **CIMB Bank** Berhad | QR IDs may use `QRCIMB` prefix |
| `564162` | **Public Bank** Berhad | QR IDs may use `QRPBB` prefix |
| `564169` | **AmBank** (M) Berhad | QR IDs may use `QRAMB` prefix |
| `564160` | **RHB Bank** Berhad | QR IDs may use `QRRHB` prefix |
| `588830` | **Hong Leong Bank** Berhad | QR IDs may use `QRHLB` prefix |
| `501664` | **Affin Bank** Berhad | QR IDs may use `QRAFB` prefix |
| `504374` | **Alliance Bank** Malaysia Berhad | — |
| `504324` | **OCBC Bank** (Malaysia) Berhad | QR IDs may use `QROCBC` prefix |
| `519469` | **UOB** (United Overseas Bank Malaysia) | QR IDs may use `QRUOB` prefix |
| `539981` | **Standard Chartered** Bank Malaysia | QR IDs may use `QRSCB` prefix |
| `589836` | **HSBC** Bank Malaysia Berhad | QR IDs may use `QRHSBC` prefix |
| `589170` | **Citibank** Berhad | — |
| `420709` | **BSN** (Bank Simpanan Nasional) | QR IDs may use `QRBSN` prefix |
| `432310` | **MBSB Bank** Berhad | — |

### 🕌 Islamic Banks

| Acquirer ID | Institution | Notes |
|:-----------:|:------------|:------|
| `603346` | **Bank Islam** Malaysia Berhad | QR IDs may use `QRBIM` prefix |
| `564167` | **Bank Muamalat** Malaysia Berhad | — |
| `589267` | **Bank Rakyat** (Bank Kerjasama Rakyat) | QR IDs may use `QRBKR` prefix |
| `589373` | **Agrobank** (Bank Pertanian Malaysia) | — |
| `432134` | **Al Rajhi Bank** Malaysia | — |
| `639406` | **Kuwait Finance House** (Malaysia) | — |

### 🏦 Foreign Banks (Malaysia Operations)

| Acquirer ID | Institution | Country |
|:-----------:|:------------|:-------:|
| `629152` | **Bank of China** (Malaysia) | 🇨🇳 China |
| `629261` | **China Construction Bank** (Malaysia) | 🇨🇳 China |
| `629253` | **ICBC** (Malaysia) | 🇨🇳 China |
| `629188` | **Bank of America** (Malaysia) | 🇺🇸 USA |
| `629212` | **JP Morgan Chase** (Malaysia) | 🇺🇸 USA |
| `629204` | **BNP Paribas** (Malaysia) | 🇫🇷 France |
| `629246` | **Deutsche Bank** (Malaysia) | 🇩🇪 Germany |
| `629196` | **MUFG Bank** (Malaysia) | 🇯🇵 Japan |
| `629220` | **Mizuho Bank** (Malaysia) | 🇯🇵 Japan |
| `629238` | **Sumitomo Mitsui** (Malaysia) | 🇯🇵 Japan |

### 🏦 Digital Banks

| Acquirer ID | Institution | Notes |
|:-----------:|:------------|:------|
| `629279` | **GX Bank** Berhad | Grab–Singtel consortium |
| `629303` | **Boost Bank** Berhad | Axiata–RHB consortium |
| `629295` | **AEON Bank** (M) Berhad | AEON Financial Service |
| `629287` | **YTL Digital Bank** Berhad | SEA Limited partnership |
| `629311` | **KAF Investment Bank** | — |

### 📱 E-Wallets

| Acquirer ID | Institution | Notes |
|:-----------:|:------------|:------|
| `890053` | **Touch 'n Go eWallet** | TNG Digital. QR IDs may use `TNG` prefix |
| `890046` | **GrabPay** | QR IDs may use `GRAB` prefix |
| `890061` | **Axiata Digital (Boost e-Wallet)** | QR IDs may use `BOOST` prefix |
| `890004` | **ShopeePay** | QR IDs may use `SHOPEE` prefix |
| `890012` | **BigPay** | AirAsia subsidiary |
| `890129` | **Setel** | Petronas e-wallet. QR IDs may use `SETEL` prefix |
| `890152` | **KiplePay** | — |
| `890111` | **Merchantrade** | Remittance + e-wallet |
| `890244` | **Boost Connect** | Boost B2B platform |

### 💳 Payment Processors & Acquirers

| Acquirer ID | Institution | Notes |
|:-----------:|:------------|:------|
| `890103` | **GHL** (GHL Systems Berhad) | Major POS terminal provider |
| `890079` | **iPay88** | Online payment gateway |
| `890087` | **Razer Merchant Services** | Formerly MOLPay/Razer Pay |
| `890095` | **Revenue Solution** | Revenue Monster |
| `890038` | **Finexus** (Finexus Cards Sdn Bhd) | Card processing |
| `890160` | **Curlec** | Direct debit & payments |
| `890137` | **Stripe** | Stripe Payments Malaysia |
| `890186` | **Global Payments** | — |
| `890178` | **Instapay** | — |
| `890194` | **Payex** | Xendit / PayEx |
| `890020` | **Fave** | Fave (formerly Groupon MY) |
| `890145` | **Fass Payment** | — |
| `890210` | **MobilityOne** | — |
| `890269` | **Paydibs** | — |
| `890277` | **Mobiedge** | — |
| `890285` | **2C2P** | Southeast Asia payment platform |
| `890293` | **Ampersand Pay** | — |
| `890301` | **ManagePay** | — |
| `890319` | **Wannapay** | — |
| `890327` | **MRuncit** | — |
| `890236` | **Beez Fintech** | — |
| `890202` | **SiliconNet (SPayGlobal)** | — |
| `890251` | **UniPin** | Gaming payments |
| `890228` | **Co-opbank Pertama** | — |

### 🧾 Bill Payments

| Acquirer ID | Institution | Notes |
|:-----------:|:------------|:------|
| `898989` | **JomPAY** | PayNet bill payment platform. Uses same EMV structure but with biller codes instead of merchant IDs |

---

## Acquirer ID Patterns

The IDs follow observable patterns based on institution type:

| Range | Category | Examples |
|:------|:---------|:--------|
| `4xxxxx` | Card-issuing banks | BSN (`420709`), Al Rajhi (`432134`), MBSB (`432310`) |
| `5xxxxx` | Major commercial banks | Maybank (`588734`), CIMB (`501854`), Public Bank (`564162`), RHB (`564160`) |
| `6xxxxx` | Foreign banks, digital banks, Islamic banks | Bank Islam (`603346`), KFH (`639406`), GX Bank (`629279`) |
| `890xxx` | E-wallets & payment processors | TNG (`890053`), GrabPay (`890046`), GHL (`890103`), Stripe (`890137`) |
| `898989` | JomPAY (bill payments) | Special fixed ID |

---

## QR ID Prefix Detection

Some acquirers use predictable prefixes in the Merchant/QR ID field (Tag 26 → Sub-tag 02). This can help identify the wallet or bank when the acquirer ID alone is ambiguous:

| Prefix | Institution |
|:-------|:------------|
| `MAEPP` | Maybank MAE |
| `QRMBB` | Maybank |
| `QRCIMB` | CIMB Bank |
| `QRHLB` | Hong Leong Bank |
| `QRRHB` | RHB Bank |
| `QRBSN` | BSN |
| `QRPBB` | Public Bank |
| `QRAFB` | Alliance Bank |
| `QRBKR` | Bank Rakyat |
| `QRBIM` | Bank Islam |
| `QRSCB` | Standard Chartered |
| `QRHSBC` | HSBC |
| `QRUOB` | UOB |
| `QROCBC` | OCBC |
| `QRAMB` | AmBank |
| `QRBNM` | Bank Negara Malaysia |
| `GRAB` | GrabPay |
| `TNG` | Touch 'n Go eWallet |
| `SETEL` | Setel |
| `SHOPEE` | ShopeePay |
| `BOOST` | Boost |

---

## EMV QR Structure Reference

A complete DuitNow QR string follows this TLV (Tag-Length-Value) structure:

```
ID  Tag Name                        Required   Example
──  ──────────────────────────────  ────────   ───────
00  Payload Format Indicator        ✓          01 (always "01")
01  Point of Initiation Method      ✓          11 = Static, 12 = Dynamic
26  Merchant Account Information    ✓          (nested TLV — see below)
52  Merchant Category Code (MCC)    ✓          5812 (Restaurant)
53  Transaction Currency            ✓          458 (MYR)
54  Transaction Amount              ○          10.00
55  Tip or Convenience Indicator    ○          01 = prompt, 02 = fixed, 03 = %
56  Value of Convenience Fee Fixed  ○          1.00
57  Value of Convenience Fee %      ○          5
58  Country Code                    ✓          MY
59  Merchant Name                   ✓          KEDAI KOPI ALI
60  Merchant City                   ✓          KUALA LUMPUR
61  Postal Code                     ○          59200
62  Additional Data                 ○          (nested TLV — see below)
64  Language Template               ○          (alternate language name)
63  CRC                             ✓          XXXX (CRC16-CCITT)
```

### Tag 26 — Merchant Account Information (nested)

```
Sub  Field                          Value
──   ──────────────────────────────  ─────
00   Globally Unique Identifier     A0000006150001 (DuitNow AID — always this)
01   Acquirer ID                    588734 (from this document)
02   Merchant / QR ID              Up to 28 characters
```

### Tag 62 — Additional Data (nested, all optional)

```
Sub  Field
──   ──────────────────────────────
01   Bill Number
02   Mobile Number
03   Store Label
04   Loyalty Number
05   Reference Label
06   Customer Label
07   Terminal Label
08   Purpose of Transaction
09   Consumer Data Request
10   Merchant Tax ID
11   Merchant Channel (3-digit code — see PayNet Tables 3-5)
```

### Merchant Channel (Tag 62, Sub-tag 11)

A 3-digit code where each digit represents:

**Digit 1 — QR Media:**
`0` Print (sticker) · `1` Print (bill/invoice) · `2` Print (magazine/poster) · `3` Print (other) · `4` Screen (POS/POI) · `5` Screen (website) · `6` Screen (app) · `7` Screen (other)

**Digit 2 — Location:**
`0` At merchant premises · `1` Not at merchant premises · `2` Remote commerce · `3` Other

**Digit 3 — POS Presence:**
`0` Attended POS · `1` Unattended · `2` Semi-attended (self-checkout) · `3` Other

---

## Currency Codes (Tag 53)

| Code | Currency |
|:----:|:---------|
| `458` | 🇲🇾 MYR — Malaysian Ringgit |
| `840` | 🇺🇸 USD — US Dollar |
| `702` | 🇸🇬 SGD — Singapore Dollar |
| `764` | 🇹🇭 THB — Thai Baht |
| `360` | 🇮🇩 IDR — Indonesian Rupiah |
| `156` | 🇨🇳 CNY — Chinese Yuan |
| `826` | 🇬🇧 GBP — British Pound |
| `978` | 🇪🇺 EUR — Euro |
| `392` | 🇯🇵 JPY — Japanese Yen |
| `036` | 🇦🇺 AUD — Australian Dollar |
| `344` | 🇭🇰 HKD — Hong Kong Dollar |
| `410` | 🇰🇷 KRW — Korean Won |
| `608` | 🇵🇭 PHP — Philippine Peso |
| `704` | 🇻🇳 VND — Vietnamese Dong |
| `356` | 🇮🇳 INR — Indian Rupee |
| `784` | 🇦🇪 AED — UAE Dirham |
| `682` | 🇸🇦 SAR — Saudi Riyal |

---

## Common MCC Codes (Tag 52)

| MCC | Category | Common Use |
|:---:|:---------|:-----------|
| `0000` | Not specified | P2P transfers |
| `4111` | Transport | Grab, buses, trains |
| `4511` | Airlines | AirAsia, MAS |
| `4812` | Telecom | Maxis, CelcomDigi, U Mobile |
| `5311` | Department Store | Parkson, SOGO |
| `5411` | Grocery | Jaya Grocer, Village Grocer |
| `5462` | Bakery | Roti Boy, Lavender |
| `5499` | Food Store | Convenience stores |
| `5541` | Fuel / Petrol | Petronas, Shell, Petron |
| `5812` | Restaurant / Cafe | Mamak, kopitiam, cafes |
| `5814` | Fast Food | McDonald's, KFC |
| `5912` | Pharmacy | Guardian, Watsons |
| `5999` | Retail (General) | Misc retail |
| `6010` | POS Cash Out | — |
| `6012` | Banking | — |
| `7011` | Hotel | Hilton, Shangri-La |
| `7230` | Beauty / Barber | Salons |
| `7299` | Services | General services |
| `7832` | Cinema | GSC, TGV |
| `8011` | Medical | Clinics, hospitals |
| `8021` | Dental | Dental clinics |
| `8099` | Health Services | — |
| `8211` | School | — |
| `8220` | University | — |
| `9999` | Government | — |
| `1111` | Bill Payment | JomPAY billers |

---

## CRC16-CCITT Calculation

The last 4 characters of every DuitNow QR string are a CRC16-CCITT checksum. The calculation:

1. Build the full EMV string **including** the `6304` tag prefix (but not the CRC value itself)
2. Calculate CRC16 with polynomial `0x1021`, initial value `0xFFFF`
3. Append the 4-character uppercase hex result

```javascript
function crc16(data) {
  const table = [
    0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
    0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
    // ... full 256-entry table
  ];
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = table[((data.charCodeAt(i) ^ (crc >> 8)) & 0xFF)] ^ (crc << 8);
    crc &= 0xFFFF;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}
```

To verify: strip the last 4 characters, recalculate, compare.

---

## Example: Decoding a DuitNow QR String

```
000201                              → Payload Format: 01
0102 11                             → Initiation: Static (reusable)
2640                                → Merchant Account Info (64 chars):
  0014 A0000006150001               →   DuitNow AID
  0106 588734                       →   Acquirer: Maybank
  0210 0123456789                   →   Merchant QR ID
5204 5812                           → MCC: Restaurant
5303 458                            → Currency: MYR
5405 10.00                          → Amount: RM 10.00
5802 MY                             → Country: Malaysia
5913 KEDAI KOPI ALI                 → Merchant Name
6014 KUALA LUMPUR                   → City
6304 XXXX                           → CRC16 checksum
```

---

## Important Notes

- **These IDs won't process real payments.** Generating a QR with a valid acquirer ID format doesn't register you with PayNet. The Merchant/QR ID must be issued by the acquirer bank through official onboarding.
- **Static vs Dynamic:** Static QR (`01=11`) can be reused and optionally includes an amount. Dynamic QR (`01=12`) is generated per-transaction and always includes an amount.
- **JomPAY** uses the same EMV structure but sub-tag 02 contains a **biller code** instead of a merchant ID, and the acquirer ID is always `898989`.
- The acquirer list is maintained by PayNet and may change as new participants join DuitNow.

---

## Sources

| Source | URL |
|:-------|:----|
| PayNet QR Spec v1.5 | [docs.developer.paynet.my](https://docs.developer.paynet.my/docs/duitNow-QR/integration/QR-generation-specification/merchant-presented-mode/qr-data-object) |
| PayNet Developer Docs | [docs.developer.paynet.my](https://docs.developer.paynet.my/docs) |
| QR Studio (DuitNow decoder) | [github.com/deadboy18/qr-studio](https://github.com/deadboy18/qr-studio) |
| natsu90 DuitNow QR research | [github.com/natsu90/duitnowqr-test](https://github.com/natsu90/duitnowqr-test) |
| natsu90 EMV QR issues | [github.com/natsu90/emvqr/issues/1](https://github.com/natsu90/emvqr/issues/1) |
| PayNet (DuitNow operator) | [paynet.my](https://www.paynet.my) |
| Malaysia Payment Dev Kit | [github.com/deadboy18/malaysia-pay-kit](https://github.com/deadboy18/malaysia-pay-kit) |

---

*This document is part of [Malaysia Payment Dev Kit](https://github.com/deadboy18/malaysia-pay-kit). PRs welcome — if a new acquirer appears in the wild, open an issue with the QR string evidence.*
