# DuitNow QR Cross-Border Interoperability

> How Malaysia's DuitNow QR connects with payment systems across Asia.

## Overview

DuitNow QR, operated by PayNet, is Malaysia's national QR payment standard with **2.9 million+ merchant touchpoints**. Since 2021, it has been progressively linked with foreign QR payment schemes, enabling tourists to pay seamlessly across borders using their home banking apps.

All cross-border QR payments are **free for consumers**, processed **instantly**, and settled in the payer's home currency with transparent FX rates.

---

## Active Corridors

### 1. Thailand — PromptPay
| Detail | Value |
|--------|-------|
| Foreign Scheme | PromptPay (operated by NITMX) |
| Central Bank | Bank of Thailand (BOT) |
| Launch | June 2021 (Phase 1) |
| Status | **Live** — bidirectional |
| Settlement | CIMB Group |

**Phase 1 (Jun 2021):** Thai users scan DuitNow QR at Malaysian merchants.
**Phase 2 (2022):** Malaysian users scan PromptPay / Thai QR at Thai merchants.

This was ASEAN's pioneering cross-border QR payment linkage.

---

### 2. Indonesia — QRIS
| Detail | Value |
|--------|-------|
| Foreign Scheme | QRIS (Quick Response Code Indonesian Standard) |
| Operators | Alto, Artajasa, Jalin, Rintis |
| Central Bank | Bank Indonesia (BI) |
| Launch | January 2022 (pilot), May 2023 (commercial) |
| Status | **Live** — bidirectional |

Supports both offline and online merchant payments. Indonesian participants include Bank Mandiri, Bank Mega, and others.

---

### 3. Singapore — NETS QR + PayNow
| Detail | Value |
|--------|-------|
| Foreign Scheme | NETS QR (merchant payments) + PayNow (P2P transfers) |
| Operator | NETS / ABS |
| Central Bank | Monetary Authority of Singapore (MAS) |
| Launch | March 2023 (QR), November 2023 (PayNow-DuitNow) |
| Status | **Live** — bidirectional QR + P2P fund transfers |

**QR Linkage (Mar 2023):** Scan NETS QR in Singapore or DuitNow QR in Malaysia.
**PayNow-DuitNow (Nov 2023):** Real-time P2P fund transfers via mobile number — the world's first such linkage with non-bank participation.

---

### 4. Cambodia — Bakong QR / KHQR
| Detail | Value |
|--------|-------|
| Foreign Scheme | Bakong QR / KHQR |
| Operator | National Bank of Cambodia (NBC) |
| Launch | 2024 |
| Status | **Live** — bidirectional |
| Currency | KHR / USD |

---

### 5. China — Alipay+ / WeChat Pay
| Detail | Value |
|--------|-------|
| Foreign Scheme | Alipay+ / WeChat Pay |
| Operator | Ant Group / Tencent |
| Launch | November 2023 |
| Status | **Live** |
| Direction | Inbound (Chinese tourists → DuitNow QR) + Outbound (Malaysians → Alipay+ merchants globally) |

Via the Ant Group partnership, DuitNow QR also accepts payments from tourists using **7+ wallet apps** connected to Alipay+, including GCash (Philippines), KakaoPay (South Korea), and others.

---

### 6. India — UPI (Signed, Not Yet Live)
| Detail | Value |
|--------|-------|
| Foreign Scheme | UPI (Unified Payments Interface) |
| Operator | NPCI International (NIPL) |
| Central Bank | Reserve Bank of India (RBI) |
| Agreement | February 12, 2026 |
| Status | **Signed** — rollout in phases |

**Phase 1:** Indian tourists scan DuitNow QR in Malaysia via UPI-enabled apps.
**Phase 2:** Malaysians scan UPI QR in India (planned).

Timed for Visit Malaysia 2026, targeting 2+ million Indian tourists.

---

## Malaysian Participating Banks & Wallets

### Inbound (Accepting Foreign Tourists at DuitNow QR Merchants)

| Participant | Type |
|-------------|------|
| Maybank | Bank |
| CIMB Bank | Bank |
| Public Bank | Bank |
| Hong Leong Bank | Bank |
| OCBC Bank | Bank |
| AmBank | Bank |
| Bank of China (Malaysia) | Bank |
| BigPay | E-wallet |
| Touch 'n Go eWallet | E-wallet |
| Finexus | Processor |
| Razer Merchant Services | Processor |

### Outbound (Malaysians Scanning QR Abroad)

| Bank / Wallet | Thailand | Indonesia | Singapore | Cambodia |
|---------------|:--------:|:---------:|:---------:|:--------:|
| Public Bank | ✅ | ✅ | ✅ | ✅ |
| Hong Leong Bank | ✅ | ✅ | ✅ | ✅ |
| CIMB Bank | ✅ | ✅ | ✅ | — |
| Maybank | ✅ | ✅ | ✅ | — |
| TnG eWallet | ✅ | ✅ | ✅ | — |

> This list grows frequently — check your bank's app for current corridor support.

---

## Transaction Limits & Fees

| Parameter | Value |
|-----------|-------|
| Per transaction | RM 3,000 max |
| Daily limit | RM 10,000 (shared with domestic DuitNow QR limit) |
| Consumer fees | **Free** |
| FX rate | Provided by PayNet at point of transaction |
| Authentication | Follows domestic app auth (biometric / PIN) |
| Refunds | Via foreign merchant; refund amount may differ due to FX |

---

## Technical Notes

**QR Standard:** EMVCo QR Code Specification for Payment Systems (EMV QRCPS). Cross-border routing data is carried in Tag 26-51 (Merchant Account Information) of the EMV QR payload.

**Settlement Model:** Designated settlement banks in each corridor handle FX conversion and clearing between the two national payment systems.

**Supported QR Codes for Outbound (what Malaysians can scan abroad):**
- PromptPay QR (Thailand)
- QRIS (Indonesia)
- NETS QR (Singapore)
- Bakong QR / KHQR (Cambodia)
- Alipay+ QR (global)
- WeChat Pay QR (China)

**Not supported:** Arbitrary foreign QR codes. Only the specific national schemes listed above are interoperable with DuitNow.

---

## Future Roadmap

### Project Nexus (BIS Innovation Hub)
A hub-and-spoke model that replaces bilateral links. Each country connects once to Nexus and gains access to all others.

- **Participants:** Malaysia, India, Philippines, Singapore, Thailand
- **Operator:** Nexus Global Payments (Singapore)
- **Target:** 2026 rollout
- **Benefit:** Massively simplifies adding new corridors vs. bilateral negotiations

### Planned Corridors

| Country | Scheme | Status |
|---------|--------|--------|
| Philippines | QR Ph | Under development |
| Vietnam | VietQR | Planned |
| Japan | TBD | Exploring |
| South Korea | TBD | Exploring |
| Laos | Lao QR | ASEAN RPC member |

### ASEAN Vision
Fully integrated ASEAN QR payment zone by 2030 — any ASEAN citizen can scan and pay at any ASEAN merchant using their home banking app.

---

## Timeline

| Date | Milestone |
|------|-----------|
| Jun 2021 | 🇹🇭 DuitNow ↔ PromptPay Phase 1 |
| 2022 | 🇹🇭 Phase 2 (MY → TH) goes live |
| Jan 2022 | 🇮🇩 DuitNow ↔ QRIS pilot |
| Nov 2022 | ASEAN-5 MoU on Regional Payment Connectivity |
| Mar 2023 | 🇸🇬 DuitNow ↔ NETS QR launch |
| May 2023 | 🇮🇩 DuitNow ↔ QRIS commercial launch |
| Nov 2023 | 🇸🇬 PayNow ↔ DuitNow P2P fund transfers |
| Nov 2023 | 🇨🇳 Alipay+ partnership for cross-border QR |
| 2024 | 🇰🇭 DuitNow ↔ Bakong QR |
| Feb 2026 | 🇮🇳 PayNet ↔ NPCI International agreement signed (UPI) |
| 2026 | Project Nexus targeted rollout |

---

## Sources

- [PayNet — Cross Border QR Payments](https://paynet.my/personal-solutions/duitnow-crossborder-qr-payments.html)
- [BNM — DuitNow-QRIS Launch](https://www.bnm.gov.my/-/duitnow-qris-link-my-id)
- [BNM — DuitNow-PromptPay Launch](https://www.bnm.gov.my/-/cross-border-qr-payment-linkage-between-malaysia-and-thailand)
- [Bank of Thailand — Cross-border Payment Linkages](https://www.bot.or.th/en/financial-innovation/digital-finance/digital-payment/cross-border-payment.html)
- [PayNet ↔ NPCI International Agreement](https://paynet.my/about-us/media-centre/press-release/payments-network-malaysia-and-india-npci-international-sign-agreement-to-enable-cross-border-qr-payments.html)
- [AMRO — Enhancing Regional Payment Connectivity](https://amro-asia.org/enhancing-regional-payment-connectivity-across-asean3-economies)
