# Malaysian Bank Account Number Formats

> Account number lengths by bank and account type. Use this for validation.
> Compiled from: UOB IBG PDF (Mar 2024), OCBC IBG PDF (Oct 2023), Affin Bank IBG Listing.

---

## How to Read This Table

- **CA** = Current Account
- **SA** = Savings Account / e-Wallet Account
- **CC** = Credit Card Account
- **Loan** = Loan Account
- **HP** = Hire Purchase Account
- `—` = Not available / not supported for IBG
- Multiple lengths shown as `10 & 14` means the bank uses either length

---

## Account Number Lengths by Bank

### Major Retail Banks

| Bank | CA | SA | CC | Loan | HP | Notes |
|------|----|----|----|----|----|----|
| **Maybank** | 12 | 12 | 15-16 | 12 | 12 | CC: 15 digits (Amex), 16 digits (Visa/MC) |
| **CIMB Bank** | 10 & 14 | 10 & 14 | 16 | 10, 14 & 17 | 10, 12 & 17 | Islamic arm same lengths |
| **Public Bank** | 10 | 10 | 16 | 15 | 15 | Islamic arm same lengths |
| **RHB Bank** | 14 | 14 | 16 | 14 | 12 | Islamic arm same lengths |
| **Hong Leong Bank** | 11 & 13 | 11 & 13 | 15-16 | 11 & 13 | 11 & 13 | CC: 15 digits (Amex), 16 digits (Visa/MC). Islamic arm same lengths. |
| **AmBank** | 13 | 13 | 16 | 13-14 | 14 | AmIslamic: SA 13, Loan 13 & 14, HP 14 |
| **OCBC Bank** | 9-17 | 10 | 16 | 15 | — | CA is variable (9-17 digits). Al-Amin arm: CA 10-17, no CC. |
| **UOB Bank** | 7, 9-14, 17 | 10 & 11 | 16 | 10 & 15 | — | Very variable CA lengths |
| **Affin Bank** | 12 | 12 | 16 | 12 | 12 | Islamic arm: 12/12/—/12/12 |
| **Alliance Bank** | 15 | 15 | 16 | 15 | 15 | Islamic arm: 15/15/—/15/15 |

### HSBC & Standard Chartered

| Bank | CA | SA | CC | Loan | HP | Notes |
|------|----|----|----|----|----|----|
| **HSBC Bank** | 12-15, 17 | 12 | 16 | 12-14 | — | OCBC lists: CA 12,13,14,15,17. Amanah arm: CA same, Loan 12-14. |
| **Standard Chartered** | 12 (personal), 5-17 (corporate) | 12 | 16 | 8 | — | Saadiq arm same. Loan is only 8 digits. |

### Islamic & Cooperative Banks

| Bank | CA | SA | CC | Loan | HP | Notes |
|------|----|----|----|----|----|----|
| **Bank Islam** | 14 | 14 | 16 | 14 | 14 | |
| **Bank Muamalat** | 14 | 14 | — | 14 & 17 | 14 & 17 | No credit card |
| **Bank Rakyat** | 10 & 12 | 10 & 12 | 16 | 10 & 12 | 10 & 12 | CC: Master only (per Affin listing) |
| **Al Rajhi Bank** | 15 | 15 | 16 | — | — | |
| **Kuwait Finance House** | 12 | 12 | 16 | 12 | 12 | |
| **MBSB Bank** | 16 | 16 | — | 17 | 17 | |

### Government-Linked & Development Banks

| Bank | CA | SA | CC | Loan | HP | Notes |
|------|----|----|----|----|----|----|
| **Agrobank** | — | 16 | — | 17 | — | No current account |
| **BSN** | — | 16 | 16 | 15 | 15 | No current account |

### Foreign Banks

| Bank | CA | SA | CC | Loan | HP | Notes |
|------|----|----|----|----|----|----|
| **Citibank** | 10 (personal), 9-16 (corporate) | 10 | 15-16 | 10-14 | — | Corporate IBG only for some services |
| **Deutsche Bank** | 10-17 | 10-17 | — | 10-17 | — | Variable lengths |
| **Bank of America** | 5-17 | 5-17 | — | — | — | Very variable |
| **Bank of China** | 13 & 15 | 13 & 15 | 16 | — | — | |
| **Bangkok Bank** | 13 | 13 | — | — | — | |
| **BNP Paribas** | 6-16 (corporate) | — | — | 16 | — | Corporate only |
| **China Construction Bank** | 12 | 12 | — | — | — | |
| **ICBC** | 19 (actual) / 17 (IBG) | 19 (actual) / 17 (IBG) | 16 | 19 (actual) / 17 (IBG) | — | **Special:** Omit "01" prefix for IBG. Enter 17 digits. |
| **JP Morgan Chase** | 10-17 | 10-17 | — | 10-17 | — | |
| **Mizuho Bank** | 10 | — | — | — | — | CA only |
| **MUFG Bank** | 6 | 6 | — | 6 | — | Very short account numbers |
| **Sumitomo Mitsui** | 8 | — | — | — | — | CA only |

### Digital Banks & E-Wallets (DuitNow)

| Entity | SA / e-Wallet | Loan | Notes |
|--------|---------------|------|-------|
| **TNG Digital (Touch'n Go)** | 12 | — | e-Wallet |
| **Finexus Cards** | 16 | — | e-Wallet |
| **BigPay** | 14 | — | e-Wallet |
| **Boost** | — | — | Pay-to-proxy only |
| **ShopeePay** | — | — | Pay-to-proxy only |
| **GX Bank** | 13 | — | Digital bank. Pay-to-proxy and account. |
| **Merchantrade** | 12 | — | e-Wallet. Pay-to-proxy and account. |
| **Boost Bank** | 12 | — | Digital bank. Pay-to-proxy and account. |
| **AEON Bank** | 13 | 13 | Digital bank. Loan account live Q3 2024. |

---

## Special Cases & Validation Notes

### ICBC — Prefix Removal Required
The actual ICBC account number is **19 digits** with prefix `01`. For IBG transfers, customers must **omit the "01" prefix** and enter the remaining **17 digits**.

Example:
- Actual account: `01 29000 1000 0012 3456`
- For IBG transfer: `29000 1000 0012 3456` (17 digits)

### CIMB — Dual Length Accounts
CIMB uses both **10-digit** and **14-digit** account numbers. The length depends on the account type/era:
- Older accounts: 10 digits
- Newer accounts: 14 digits
- Loan/HP accounts can also be 17 digits

### Hong Leong — Dual Length + CC Variation
- Current/Savings: 11 or 13 digits
- Credit Card: 15 digits (Amex) or 16 digits (Visa/MC)

### Maybank — CC Variation
- Credit Card: 15 digits (Amex) or 16 digits (Visa/MC)

### Standard Chartered — Short Loan Numbers
- Loan accounts are only **8 digits** — the shortest loan account format in Malaysia

### Bank Rakyat — Dual Length
- All account types: 10 or 12 digits

### UOB — Highly Variable CA
- Current account: 7, 9, 10, 11, 12, 13, 14, or 17 digits
- This is the most variable format of any Malaysian bank

---

## Credit Card Lengths Summary

Almost all Malaysian banks use **16-digit** credit card numbers (Visa/Mastercard). The exceptions:

| Exception | Length | Card Network |
|-----------|--------|-------------|
| Maybank Amex | 15 | American Express |
| Hong Leong Amex | 15 | American Express |
| Citibank | 15-16 | Amex (15), Visa/MC (16) |

---

*Sources: UOB IBG & DuitNow Participating Bank PDF V1.8 (13 Mar 2024), OCBC IBG Product Offering and Account Structure (27 Oct 2023), Affin Bank IBG Listing*
*Last updated: 2026-05-04*
