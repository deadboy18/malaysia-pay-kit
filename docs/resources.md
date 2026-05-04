# Malaysian Payment & Developer Resources

> Curated links to community repos, gists, official docs, and tools for Malaysian payment development.

---

## Official Sources

### PayNet (Payments Network Malaysia)

| Resource | URL | Description |
|----------|-----|-------------|
| PayNet Developer Portal | https://docs.developer.paynet.my/docs | Official API docs — DuitNow QR, FPX, acquirer list, response codes |
| PayNet Website | https://www.paynet.my | Product info — DuitNow, FPX, JomPAY, MyDebit, IBG |
| JomPAY Biller Codes | https://www.paynet.my/personal-solutions/jompay/biller-code.html | Searchable biller code directory |
| DuitNow QR Branding | https://docs.developer.paynet.my/docs (branding section) | Logo usage guidelines |

### Bank Negara Malaysia (BNM)

| Resource | URL | Description |
|----------|-----|-------------|
| List of Regulatees | https://www.bnm.gov.my/list-of-regulatees | All BNM-regulated financial institutions |
| BNM GitHub | https://github.com/banknegaramy | Official data repos |
| PIDM Member Banks | https://www.pidm.gov.my/general/how-we-protect-you/member-banks | Definitive list of deposit-insured banks |

### Bank IBG/Account Info

| Resource | URL | Description |
|----------|-----|-------------|
| UOB IBG PDF (Mar 2024) | https://www.uob.com.my/assets/web-resources/business/pdf/ibg-duitnow-participating-bank.pdf | 41 banks — IBG codes, BIC codes, account lengths |
| OCBC IBG PDF (Oct 2023) | https://www.ocbc.com.my/assets/pdf/MY/Velocity/IBG%20Product%20Offering%20and%20Account%20Structure.pdf | 44 banks incl. Islamic arms — routing numbers, delivery channels |
| RHB BIC Code Listing | https://www.rhbgroup.com/myreflex/premium/articles/article/bic_code_listing/index.html | 84 FIs — BIC codes, RENTAS, IBG routing numbers |
| Affin Bank IBG Listing | https://www.affinalways.com/en/ibg-listing | 21 banks — account lengths, delivery channels |
| HSBC IBG FAQ | https://www.hsbc.com.my/ways-to-bank/interbank-giro/faq/ | IBG info from HSBC perspective |
| Bank Islam RENTAS PDF | https://www.bankislam.com/wp-content/uploads/Bank-Code-RENTAS.pdf | RENTAS bank codes |

---

## Community GitHub Repos

### DuitNow QR / EMV QR

| Repo | Author | Description | Stars |
|------|--------|-------------|-------|
| [duitnowqr-test](https://github.com/natsu90/duitnowqr-test) | natsu90 | DuitNow QR reverse engineering — dynamic QR findings, bank-specific quirks | — |
| [duitnowqr-razer](https://github.com/natsu90/duitnowqr-razer) | natsu90 | Razer Merchant Services integration for real-time DuitNow QR payment notification | — |
| [qr-studio](https://github.com/deadboy18/qr-studio) | deadboy18 | DuitNow QR decode tool — single HTML file, client-side | — |

### Icons & Assets

| Repo | Author | Description | Stars |
|------|--------|-------------|-------|
| [Payment-Icon](https://github.com/SnorSnor9998/Payment-Icon) | SnorSnor9998 | **Best icon source.** SVG icons: 26 banks, 21 e-wallets, 7 BNPL, cards, mobile pay. Multiple formats. | 72 |
| [bankMY-payment-webfont](https://github.com/nurfaizfoat/bankMY-payment-webfont) | nurfaizfoat | Legacy webfont icons (19 payment methods, 2015) | — |

### Geography & Postcodes

| Repo | Author | Description | Stars |
|------|--------|-------------|-------|
| [malaysia-postcodes](https://github.com/AsyrafHussin/malaysia-postcodes) | AsyrafHussin | **Best postcode source.** All postcodes with city/state, JSON per state, npm package. Actively maintained (2025). | 104 |
| [Malaysia-Cities-JSON](https://github.com/farhan-syah/Malaysia-Cities-JSON) | farhan-syah | 16 states with lat/long coordinates | 13 |
| [jajahan](https://github.com/lomotech/jajahan) | lomotech | Malaysian states, districts, postcodes | — |

---

## Community Gists

### Bank Data

| Gist | Author | Description |
|------|--------|-------------|
| [Malaysian SWIFT/BIC codes](https://gist.github.com/shah253kt/3c6ba00c881740f3c55f50c40319561e) | shah253kt | 146 Malaysian FI SWIFT/BIC codes (2016) |
| [Malaysian banks JSON](https://gist.github.com/zulhfreelancer/acf1abd1d0e22a0b59c9a51715c89b1e) | zulhfreelancer | 30 banks with FPX codes (2016) |
| [Malaysian banks list](https://gist.github.com/fadziljusri/52376eceee6d2447d493c0409099dba2) | fadziljusri | 27 bank names in JSON (2018) |
| [Malaysian card BINs](https://gist.github.com/xanda/748a62c1c9ad60d8723df763c9bc1c0d) | xanda | ~230 Malaysian credit/debit card BIN numbers by bank (Visa/MC/Amex) |
| [shakhassan gist](https://gist.github.com/shakhassan/4823577e43877aeecf6f3c5ac1aa5e3d) | shakhassan | Malaysian bank data |

### DuitNow QR

| Gist | Author | Description |
|------|--------|-------------|
| [duitnow-js QR generator](https://gist.github.com/natsu90/f45dc88b38a037325ad9095163b82b42) | natsu90 | JavaScript DuitNow QR string generator with EMV TLV encoding. Active discussion in comments. |

### Telecom / Carriers

| Gist | Author | Description |
|------|--------|-------------|
| [MCC/MNC carrier codes SQL](https://gist.github.com/magirtopcu/86424a3cbacf439c463aab7b1282e4c6) | magirtopcu | Global mobile carrier MCC/MNC codes (filter MCC=502 for Malaysia) |

---

## Payment Processors & Gateways (Malaysia)

| Provider | URL | Notes |
|----------|-----|-------|
| Xendit (formerly PayEx) | https://www.payex.io / https://www.xendit.co/en-my/ | FPX, cards, e-wallets, DuitNow QR, BNPL, instalments. Comprehensive API. |
| senangPay (now DOKU) | https://www.senangpay.com | Popular for SMEs. Payment links, FPX, cards. |
| Billplz | https://www.billplz.com | Simple payment collection, FPX, bills. |
| Stripe Malaysia | https://stripe.com/my | International cards, FPX. |
| Revenue Monster | https://www.revenuemonster.my | DuitNow QR, e-wallets, FPX. |
| iPay88 | https://www.ipay88.com | Multi-payment gateway. FPX, cards, e-wallets. |
| Curlec (now part of Razerpay) | https://www.curlec.com | Direct debit, FPX. |
| Razer Merchant Services | https://merchant.razer.com | DuitNow QR with real-time webhook (natsu90's research). |
| GHL / e-Ghl | https://www.ghl.com | POS terminals, online payments. |
| Molpay (now Fiuu) | https://www.fiuu.com | Multi-payment gateway. |

---

## Official Documentation (Payment Processor Docs)

| Resource | URL | Description |
|----------|-----|-------------|
| PayEx Response Codes | https://www.payex.io/docs/payex-response-codes/ | All PayEx/Xendit response codes |
| PayEx FPX Bank Codes | https://www.payex.io/docs/fpx-buyer-bank-response-code/ | FPX buyer bank IDs with retail/corporate mode |
| senangPay Payment Failures | https://guide.senangpay.com/why-does-payment-made-by-my-client-sometimes-fail | Practical error code guide for FPX and card payments |
| PayNet FPX Response Codes | https://docs.developer.paynet.my/docs/fpx/response-code | Official FPX response codes |

---

## Reference Data Sources

### Phone Numbers

| Resource | URL | Description |
|----------|-----|-------------|
| Wikipedia: Telephone numbers in Malaysia | https://en.wikipedia.org/wiki/Telephone_numbers_in_Malaysia | Complete prefix-to-carrier mapping, area codes, number formats |
| Wikipedia: Mobile operators in Asia | https://en.wikipedia.org/wiki/List_of_mobile_network_operators_in_Asia_and_Oceania | Malaysian carrier overview |

### Other

| Resource | URL | Description |
|----------|-----|-------------|
| Scribd: IBG Members BIC Codes | https://www.scribd.com/document/802402128/ibg-members-bic-codes | IBG BIC code compilation |
| bank-green/banks CSV | https://github.com/bank-green/banks/blob/main/bankprofiles.csv | Global bank profiles (filter for Malaysia) |
| pbakondy/mcc-mnc-list | https://github.com/pbakondy/mcc-mnc-list | Source for MCC/MNC carrier codes |

---

## Similar Projects / Inspiration

| Project | URL | Description |
|---------|-----|-------------|
| QRJE.my | https://qrje.my | Malaysian payment profile links (closed source, concept reference) |
| chengkiang PayNow generator | https://chengkiang.com | Singapore PayNow QR reference — CRC16 implementation used in DuitNow |

---

## Key People / Contributors

| Person | GitHub/Web | Contribution |
|--------|-----------|--------------|
| Sulaiman Sudirman (natsu90) | https://github.com/natsu90 | Pioneer of DuitNow QR reverse engineering |
| kidino | https://github.com/kidino | Original DuitNow QR use case discovery |
| chengkiang | https://chengkiang.com | CRC16 implementation for SGQR/PayNow |
| SnorSnor9998 | https://github.com/SnorSnor9998 | Best Malaysian payment icon collection |
| Asyraf Hussin | https://github.com/AsyrafHussin | Best Malaysian postcode dataset |

---

*Last updated: 2026-05-04*
