# Malaysian Payment Response Codes — Complete Reference

> Response codes for all payment types in the Malaysian payment ecosystem.
> Sources: PayEx Reference Codes PDF, PayNet Developer Docs, senangPay Guide.

---

## Card Payment Response Codes (Visa / Mastercard / Amex)

| Code | Description | Action |
|------|-------------|--------|
| 00 | Approved | Success |
| 01 | Refer To Issuer | Contact card issuer |
| 02 | Refer To Issuer, special condition | Contact card issuer |
| 03 | Invalid Merchant ID | Check merchant setup |
| 04 | Pick Up Card | Card flagged, do not proceed |
| 05 | Do Not Honour | Bank declined — generic |
| 06 | Error | General error |
| 07 | Pick Up Card, special condition | Card flagged |
| 08 | Check Signature/ID or Honor with ID | Verify cardholder identity |
| 10 | Partial Approval | Partial amount approved |
| 11 | VIP Approval | Approved |
| 12 | Invalid Transaction | Check transaction type |
| 13 | Invalid Amount | Check amount format |
| 14 | Invalid Card No | Card number incorrect |
| 15 | Invalid Issuer | Card issuer not found |
| 19 | Re-enter Transaction | Retry |
| 21 | No Transactions | No action needed |
| 22 | Related Transaction Error; Suspected Malfunction | Investigate |
| 23 | Invalid/Unacceptable Transaction Fee | Check fee configuration |
| 24 | Invalid Currency Code | Check currency |
| 25 | Terminated/Inactive card | Card no longer active |
| 30 | Message Format Error | Check message format |
| 31 | Bank ID Not Found | Invalid bank ID |
| 32 | Partial Reversal | Partial reversal done |
| 38 | PIN Try Limit Exceeded | Too many wrong PIN attempts |
| 41 | Card Reported Lost | Do not proceed |
| 43 | Stolen Card | Do not proceed |
| 44 | PIN Change Required | Cardholder must update PIN |
| 45 | Card Not Activated For Use | Cardholder must activate |
| 51 | Insufficient Fund | Not enough balance |
| 52 | No Checking Account | Account type mismatch |
| 53 | No Savings Account | Account type mismatch |
| 54 | Expired Card | Card past expiry date |
| 55 | Invalid PIN | Wrong PIN entered |
| 56 | Invalid Card | Card not recognized |
| 57 | Transaction Not Permitted to Cardholder | Restricted transaction |
| 58 | Transaction Not Permitted to Terminal | Terminal restriction |
| 59 | Suspected Fraud | Flagged by fraud system |
| 61 | Over Limit | Exceeds card limit |
| 62 | Restricted Card | Card has restrictions |
| 63 | Security Violation | Security check failed |
| 64 | Transaction does not fulfill AML requirement | Anti-money laundering |
| 65 | Exceeds Withdrawal Count Limit | Too many withdrawals |
| 68 | Transaction timeout (No reply from acquirer) | Retry |
| 70 | Contact Card Issuer | Call bank |
| 71 | PIN not changed | PIN update failed |
| 75 | PIN Tries Exceeded | Locked out |
| 76 | Invalid Description Code | Check description |
| 77 | Reconcile Error | Settlement issue |
| 78 | Invalid Trace No | Check trace number |
| 79 | Batch Already Open | Close existing batch |
| 80 | Invalid Batch No | Check batch number |
| 83 | Unable to verify PIN | PIN verification failed |
| 85 | Batch Not Found | Check batch exists |
| 86 | PIN Validation Not Possible | Cannot validate PIN |
| 87 | Purchase Amount Only, No Cash Back Allowed | No cashback |
| 88 | Cryptographic Failure, Call Issuer | Encryption issue |
| 89 | Invalid Terminal ID | Terminal not recognized |
| 91 | Issuer/Switch Inoperative | Bank system down |
| 92 | Destination Cannot Be Found for Routing | Routing error |
| 93 | Transaction cannot be completed; violation of law | Legal restriction |
| 94 | Duplicate Transaction | Already processed |
| 95 | Total Mismatch | Settlement mismatch |
| 96 | System Malfunction/Error | System error |
| 98 | Issuer Response Not Received by UnionPay | Timeout |
| 99 | Declined | Generic decline |
| B1 | Transaction Not Permitted to Cardholder | Restriction |
| N7 | Decline for CVV2 failure | Card verification failed |
| P1 | Failed 3D Authentication | 3D Secure failed |

### senangPay/Payment Gateway Card Codes

| Code | Description |
|------|-------------|
| 0 | Transaction Successful |
| ? | Transaction status is unknown |
| 1 | Unknown Error |
| 2 | Bank Declined Transaction |
| 3 | No Reply from Bank |
| 4 | Expired Card |
| 5 | Insufficient funds |
| 6 | Error Communicating with Bank |
| 7 | Payment Server System Error |
| 8 | Transaction Type Not Supported |
| 9 | Bank declined transaction (Do not contact Bank) |
| A | Transaction Aborted |
| C | Transaction Cancelled |
| D | Deferred transaction received, awaiting processing |
| F | 3D Secure Authentication failed |
| I | Card Security Code verification failed |
| L | Shopping Transaction Locked |
| N | Cardholder not enrolled in Authentication scheme |
| P | Transaction received, being processed |
| R | Reached limit of retry attempts |
| S | Duplicate SessionID (OrderInfo) |
| T | Address Verification Failed |
| U | Card Security Code Failed |
| V | Address Verification and Card Security Code Failed |

---

## GrabPay Response Codes

| Code | Description |
|------|-------------|
| success | Payment successful |
| failed | Payment failed |
| confirm_failed | Confirmation failed |
| consent_required | User consent needed |
| invalid_argument | Invalid parameter |
| invalid_request | Request format error |
| mfa_not_completed | Multi-factor auth incomplete |
| server_error | GrabPay server error |
| session_expired | Session timeout |
| cancelled | User cancelled |
| authorisation_declined | GrabPay declined |
| processing | Still processing |

---

## Touch 'n Go Digital (TNG) Response Codes

| Code | Description |
|------|-------------|
| SUCCESS | Payment successful |
| FAILED | Payment failed |
| CLOSED | Transaction closed |
| INIT | Transaction initialized |

---

## ShopeePay Response Codes

| Code | Description |
|------|-------------|
| Success | Payment successful |
| Failed | Payment failed |
| Processing | Still processing |

---

## Riipay (BNPL) Response Codes

| Code | Description |
|------|-------------|
| Accepted | Payment accepted |
| Success | Payment successful |
| Failed | Payment failed |
| Cancelled by Customer | User cancelled |
| Gateway Request Error | API error |
| Not Found | Resource not found |
| Payment Failed | Payment processing failed |
| Too Many Requests | Rate limited |
| User Limit Exceeded | User credit limit exceeded |

---

## DuitNow / ENRP Response Codes

### Status Codes

| Code | Description |
|------|-------------|
| approved | Transaction approved |
| in_progress | Processing |
| failed | Transaction failed |

### Reason Codes (for failed/rejected transactions)

| Code | Description |
|------|-------------|
| INSUFFICIENT_FUNDS | Not enough balance |
| ACCOUNT_CLOSED | Account has been closed |
| NO_ACCOUNT | Account does not exist |
| INVALID_ACCOUNT_NUMBER | Wrong account number |
| WITHDRAWAL_FREQUENCY_EXCEEDED | Too many transactions |
| RETURNED PER OFI'S REQUEST | Returned by originating FI |
| AUTHORISATION REVOKED BY CUSTOMER | Customer revoked auth |
| PAYMENT STOPPED | Payment stopped |
| WITHDRAWAL_LIMIT_EXCEEDED | Amount exceeds limit |
| CONSUMER ADVISE NOT AUTHORISED | Not authorized |
| MISMATCH ACCOUNT TYPE | Wrong account type |
| ACCOUNT HOLDER DECEASED | Account holder deceased |
| BENEFICIARY DECEASED | Beneficiary deceased |
| ACCOUNT FROZEN | Account is frozen |
| FILE RECORD EDIT CRITERIA | Record edit issue |
| NON_TRANSACTION_ACCOUNT | Not a transactional account |
| INVALID COMPANY IDENTIFICATION | Wrong company ID |
| INVALID INDIVIDUAL ID NUMBER | Wrong individual ID |
| CREDIT ENTRY REFUSED BY RECEIVER | Receiver refused |
| DUPLICATE ENTRY | Duplicate transaction |
| UNABLE_TO_PROCESS | Cannot process |

---

## Batch Processing Response Codes

| Code | Description |
|------|-------------|
| Processed | Successfully processed |
| Pending | Awaiting processing |
| Submitted | Submitted to bank |
| Expired | Transaction expired |
| Retrying | Retry in progress |
| Cancelled | Cancelled |

---

## Billing / ENRP Response Codes

| Code | Description |
|------|-------------|
| Approved | Billing approved |
| INSUFFICIENT_FUNDS | Insufficient funds |
| ACCOUNT_CLOSED | Account closed |
| NO_ACCOUNT | No account found |
| INVALID_ACCOUNT_NUMBER | Invalid account number |
| WITHDRAWAL_FREQUENCY_EXCEEDED | Frequency exceeded |
| WITHDRAWAL_LIMIT_EXCEEDED | Limit exceeded |
| UNABLE_TO_PROCESS | Cannot process |
| And others... | Same as DuitNow reason codes above |

---

## Mandate (e-Mandate / Auto Debit) Response Codes

| Code | Description |
|------|-------------|
| Approved | Mandate approved |
| Signature Differ | Signature mismatch |
| Invalid Account Number | Wrong account number |
| Signature Incomplete | Incomplete signature |
| Amendment Not Countersigned | Amendment needs countersigning |
| Different Account Holder | Name mismatch |
| Others | Other reasons |
| Missing Mandatory Fields | Required fields missing |
| Invalid Data | Data validation failed |
| Duplicated Form | Duplicate submission |
| Missing Signature | No signature provided |
| Unclear Image | Image quality too low |

### Mandate Status Codes

| Code | Description |
|------|-------------|
| Draft | Mandate drafted |
| Pending Authorization | Awaiting authorization |
| Pending Approval | Awaiting approval |
| Approved | Active mandate |
| Rejected | Mandate rejected |
| Terminated | Mandate terminated |
| Expired | Mandate expired |

---

## PayEx Transaction Type Codes

| Code | Value | Description |
|------|-------|-------------|
| FPX | FPX | FPX online banking payment |
| FPX CCA | FPX CCA | FPX credit card acquiring |
| FPX B2B | FPX B2B | FPX business-to-business |
| FPX CCA B2B | FPX CCA B2B | FPX CCA B2B |
| Direct Debit | Direct Debit | Direct debit |
| Direct Debit CCA | Direct Debit CCA | Direct debit CCA |
| Mandate Auth | Mandate - Authorization | e-Mandate authorization |
| Mandate Approval | Mandate - Approval | e-Mandate approval |
| Mandate Maint | Mandate - Maintenance | e-Mandate maintenance |
| Mandate Term | Mandate - Termination | e-Mandate termination |
| MyDebit | Malaysian Debit Card | MyDebit payment |
| Credit Card MY | Malaysian Credit Card | Local credit card |
| Amex MY | Malaysian AMEX Card | Local Amex card |
| Foreign Card | Foreign Card | International card |
| Foreign CCY | Card - Foreign Currency | Foreign currency card |
| Auto Debit | Auto Debit - Authorization | Auto debit authorization |
| DuitNow QR | DuitNow QR | DuitNow QR payment |
| GrabPay | GrabPay | GrabPay payment |
| Grab PostPaid | PayLater by Grab Postpaid | Grab PayLater postpaid |
| Grab Install | PayLater by Grab Instalment | Grab PayLater instalment |
| TNG | Touch 'n Go eWallet | TNG eWallet payment |
| ShopeePay | ShopeePay | ShopeePay payment |
| Alipay | Alipay | Alipay payment |
| Alipay+ | Alipay+ | Alipay+ payment |
| WeChat Pay | WeChat Pay | WeChat Pay |
| WeChat Pay MY | WeChat Pay MY | WeChat Pay Malaysia |
| EzBeli | EzBeli | EzBeli BNPL |
| Atome | Atome | Atome BNPL |
| Riipay | Riipay | Riipay BNPL |

### Bank Instalment Plans (via PayEx)

Available for Maybank, CIMB, UOB, Public Bank, HSBC, Standard Chartered, Hong Leong, RHB, AmBank, OCBC, and Affin Bank. Tenures range from 6 to 60 months depending on bank.

---

*Sources: PayEx Reference Codes PDF (ilide.info), PayNet Developer Docs, senangPay Payment Failure Guide*
*Last updated: 2026-05-04*
