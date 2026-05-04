# FPX (Financial Process Exchange) Reference

> Complete FPX reference for Malaysian developers — bank IDs, response codes, business codes, and flows.
> Sources: PayNet Developer Docs, PayEx/Xendit FPX Buyer Bank Response Codes, senangPay Guide.

---

## Overview

FPX is Malaysia's real-time online payment platform operated by PayNet. It enables direct debit transactions from buyer bank accounts to seller bank accounts via internet banking.

- **B2C (Retail)** — Consumer to business, mode `01`
- **B2B (Corporate)** — Business to business, mode `02`

---

## FPX Bank IDs

### Retail Banks (Mode 01 — B2C)

| FPX Bank ID | Bank Name | Notes |
|-------------|-----------|-------|
| ABB0233 | Affin Bank | |
| ABB0234 | Affin Bank B2C — Test ID | Testing only |
| ABMB0212 | Alliance Bank (Personal) | |
| AGRO01 | AGRONet (Agrobank) | |
| AMBB0209 | AmBank | |
| BCBB0235 | CIMB Clicks | |
| BIMB0340 | Bank Islam | |
| BKRM0602 | Bank Rakyat | |
| BMMB0341 | Bank Muamalat | |
| BOCM01 | Bank of China | |
| BSN0601 | BSN | |
| CIT0219 | Citibank | |
| HLB0224 | Hong Leong Bank | |
| HSBC0223 | HSBC Bank | |
| KFH0346 | KFH (Kuwait Finance House) | |
| MB2U0227 | Maybank2u | Main consumer FPX |
| MBB0228 | Maybank2E | Maybank enterprise (also retail) |
| OCBC0229 | OCBC Bank | |
| PBB0233 | Public Bank | |
| RHB0218 | RHB Bank | |
| SCB0216 | Standard Chartered | |
| UOB0226 | UOB Bank | |

### Corporate Banks (Mode 02 — B2B)

| FPX Bank ID | Bank Name | Notes |
|-------------|-----------|-------|
| ABB0232 | Affin Bank | |
| ABB0235 | Affin Bank B2B | |
| ABMB0213 | Alliance Bank (Business) | |
| AGRO02 | AGRONetBIZ | |
| AMBB0208 | AmBank | |
| BCBB0235 | CIMB Bank | Same ID, different mode |
| BIMB0340 | Bank Islam | Same ID, different mode |
| BKRM0602 | i-bizRAKYAT | |
| BMMB0342 | Bank Muamalat | Different from retail |
| BNP003 | BNP Paribas | Corporate only |
| CIT0218 | Citibank Corporate Banking | |
| DBB0199 | Deutsche Bank | Corporate only |
| HLB0224 | Hong Leong Bank | Same ID |
| HSBC0223 | HSBC Bank | Same ID |
| KFH0346 | KFH | Same ID |
| MBB0228 | Maybank2E | |
| OCBC0229 | OCBC Bank | Same ID |
| PBB0233 | Public Bank PBe | |
| PBB0234 | Public Bank PB Enterprise | Additional corporate |
| RHB0218 | RHB Bank | Same ID |
| SCB0215 | Standard Chartered | Different from retail |
| UOB0227 | UOB Bank | Different from retail |
| UOB0228 | UOB Regional | Additional corporate |

### Test Banks

| FPX Bank ID | Bank Name | Mode |
|-------------|-----------|------|
| TEST0021 | SBI Bank A | 01 & 02 |
| TEST0022 | SBI Bank B | 01 & 02 |
| TEST0023 | SBI Bank C | 01 & 02 |

---

## FPX Response Codes

### Success

| Code | Description |
|------|-------------|
| 00 | Approved |

### Buyer-Side Errors (Codes 1x)

| Code | Description |
|------|-------------|
| 09 | Transaction Pending |
| 12 | Invalid Transaction |
| 13 | Invalid Amount |
| 14 | Invalid Buyer Account |
| 1A | Buyer Session Timeout At Internet Banking Login Page |
| 1B | Buyer Failed To Provide Necessary Info To Login |
| 1C | Buyer Chose Cancel At Login Page |
| 1D | Buyer Session Timeout At Account Selection Page |
| 1E | Buyer Failed To Provide Necessary Info At Account Selection |
| 1F | Buyer Chose Cancel At Account Selection Page |
| 1G | Buyer Session Timeout At TAC Request Page |
| 1H | Buyer Failed To Provide Necessary Info At TAC Request |
| 1I | Buyer Chose Cancel At TAC Request Page |
| 1J | Buyer Session Timeout At Confirmation Page |
| 1K | Buyer Failed To Provide Necessary Info At Confirmation |
| 1L | Buyer Chose Cancel At Confirmation Page |
| 1M | Internet Banking Session Timeout |

### Merchant/Seller Errors (Codes 03, 05, 2x, 3x, 4x)

| Code | Description |
|------|-------------|
| 03 | Invalid Merchant |
| 05 | Invalid Seller Or Acquiring Bank Code |
| 20 | Invalid Response |
| 2A | Transaction Amount Is Lower Than Minimum Limit |
| 2X | Transaction Is Canceled By Merchant |
| 30 | Format Error |
| 31 | Invalid Bank |
| 39 | No Credit Account |
| 45 | Duplicate Seller Order Number |
| 46 | Invalid Seller Exchange Or Seller |
| 47 | Invalid Currency |
| 48 | Maximum Transaction Limit Exceeded |
| 49 | Merchant Specific Limit Exceeded |
| 50 | Invalid Seller for Merchant Specific Limit |

### Account Errors (Codes 5x)

| Code | Description |
|------|-------------|
| 51 | Insufficient Funds |
| 53 | No Buyer Account Number |
| 57 | Transaction Not Permitted |
| 58 | Transaction To Merchant Not Permitted |

### System Errors (Codes 7x, 8x, 9x)

| Code | Description |
|------|-------------|
| 70 | Invalid Serial Number |
| 76 | Transaction Not Found |
| 77 | Invalid Buyer Name Or Buyer ID |
| 78 | Decryption Failed |
| 79 | Host Decline When Down |
| 80 | Buyer Cancel Transaction |
| 83 | Invalid Transaction Model |
| 84 | Invalid Transaction Type |
| 85 | Internal Error At Bank System |
| 87 | Debit Failed Exception Handling |
| 88 | Credit Failed Exception Handling |
| 89 | Transaction Not Received Exception Handling |
| 90 | Bank Internet Banking Unavailable |
| 92 | Invalid Buyer Bank |
| 96 | System Malfunction |
| 98 | MAC Error |
| 99 | Pending Authorization (Applicable for B2B model) |

### Exchange/Seller Errors (Codes Bx, Dx, Fx, Ox, Sx, Xx)

| Code | Description |
|------|-------------|
| BB | Blocked Bank |
| BC | Transaction Cancelled by Customer |
| DA | Invalid Application Type |
| DB | Invalid Email Format |
| DC | Invalid Maximum Frequency |
| DD | Invalid Frequency Mode |
| DE | Invalid Expiry Date |
| DF | Invalid e-Mandate Buyer Bank ID |
| FE | Internal Error |
| OE | Transaction Rejected As Not In FPX Operating Hours |
| OF | Transaction Timeout |
| SB | Invalid Acquiring Bank Code |
| XA | Invalid Source IP Address (B2B2 model) |
| XB | Invalid Seller Exchange IP |
| XC | Seller Exchange Encryption Error |
| XE | Invalid Message |
| XF | Invalid Number Of Orders |
| XI | Invalid Seller Exchange |
| XM | Invalid FPX Transaction Model |
| XN | Transaction Rejected Due To Duplicate Seller Exchange Order Number |
| XO | Duplicate Exchange Order Number |
| XS | Seller Does Not Belong To Exchange |
| XT | Invalid Transaction Type |
| XW | Seller Exchange Date Difference Exceeded |

---

## FPX Modes

| Mode Code | Description |
|-----------|-------------|
| 01 | Retail (B2C) |
| 02 | Corporate (B2B) |

## FPX ID Types

| ID Type | Description |
|---------|-------------|
| 1 | New IC Number (MyKad/NRIC) |
| 2 | Old IC Number |
| 3 | Passport Number |
| 4 | Business Registration |
| 5 | Others |

## FPX Frequency Codes (for e-Mandate / Direct Debit)

| Code | Description |
|------|-------------|
| DL | Daily |
| WK | Weekly |
| MT | Monthly |
| YR | Yearly |

## FPX Debit Types

| Code | Description |
|------|-------------|
| DD | Direct Debit |
| AD | Auto Debit |

---

## Common FPX Error Scenarios (Developer Tips)

Based on senangPay troubleshooting guide:

1. **Code 80 (Buyer Cancel)** — Most common. User clicked back/cancel during banking flow. Nothing wrong with integration.
2. **Code 51 (Insufficient Funds)** — Self-explanatory. User needs to top up.
3. **Code 1A-1M (Session Timeouts)** — User took too long at various banking pages. Common on slow connections.
4. **Code 31 (Invalid Bank)** — Bank ID not recognized. Check FPX bank ID list is current.
5. **Code 45 (Duplicate Order)** — Same order number sent twice. Ensure unique order numbers.
6. **Code 90 (Bank Unavailable)** — Bank's internet banking is down. User should try again later or use different bank.

---

*Sources: PayNet Developer Docs, PayEx/Xendit FPX Buyer Bank Response Code, senangPay Payment Failure Guide, PayEx Reference Codes PDF*
*Last updated: 2026-05-04*
