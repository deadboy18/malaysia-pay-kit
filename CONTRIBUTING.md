# Contributing

Thanks for wanting to improve Malaysian payment data!

## How to Contribute

1. **Data updates**: If a bank changes their account format, adds a new BIC code, or a new e-wallet launches — update the relevant JSON in `/data/` and submit a PR.

2. **Documentation**: Found an error? Better explanation? Update the relevant `.md` file in `/docs/`.

3. **Validators**: Bug fix or new validation logic? Update the `.js` files in `/validators/`.

4. **Icons**: New bank/wallet icon? Add SVGs to the relevant folder in `/icons/`.

## PR Guidelines

- Include your source (link to official bank page, PDF, PayNet doc, etc.)
- One logical change per PR
- Test validators if you change them: `node -e "const MY = require('.'); ..."`

## Data Format

Follow the existing JSON structure. Check `schemas/` for reference.

## Questions?

Open an issue.
