# Payment Milestone Studio

Build reviewable installment schedules for off-plan property, renovation budgets and client projects. An open-source tool by [NovAsia Estate](https://novasia.estate/), covering property projects and buyer research in Cambodia, Thailand and Bali.

**[Open the free browser studio](https://tools.novasia.estate/payment-milestone-studio.html)** · [Publisher: NovAsia Estate](https://novasia.estate/)

## What is different from a percentage calculator?

- Exact integer arithmetic with explicit 0–4 decimal precision; cumulative rounding reconciles every installment to the original total.
- Real, ordered dates; 1–100 milestones; same-day milestones supported.
- Mark an entire milestone paid and review paid, overdue, upcoming and outstanding totals on your chosen date. Partial payments are not supported.
- CSV for spreadsheets, all-day iCalendar reminders, and a JSON plan for reproducibility.
- Browser-only inputs, no sign-up, uploads, tracking, runtime dependencies or payment execution.

Currency is a label, not an exchange rate. Precision is an explicit user choice, not automatically inferred from a currency code. Examples are synthetic, not developer payment terms or investment recommendations. A milestone due today is upcoming; overdue means strictly before the review date. Zero-value installments can occur when a small total is rounded.

## Reuse the engine

Node 22+, no install needed after obtaining the source:

```js
const {schedule, review, csv, calendar} = require('./engine.js');
const plan = schedule({
  total: '185000.00', currency: 'USD', precision: 2,
  milestones: [
    {label: 'Reservation', date: '2026-11-15', percent: '10', paid: true},
    {label: 'Handover', date: '2027-06-15', percent: '90'}
  ]
});
console.log(review(plan, '2026-12-01'));
// paid 18500.00; upcoming/outstanding 166500.00; overdue 0.00
```

ES modules: `import {schedule} from './index.mjs'`. Amounts and percentages are decimal **strings**, so financial values do not pass through floating-point arithmetic. Totals are positive; at most 9,000,000,000,000,000 minor units. Currency labels are uppercase three-letter strings; this does not verify a code is an issued currency. Dates use years 1900–9998.

```sh
node cli.cjs examples/property.json json
node cli.cjs examples/renovation.json csv > renovation.csv
node cli.cjs examples/service.json ics > reminders.ics
npm test
npm run build
```

The CLI reads only the file you specify (up to 100 KB), prints to stdout and never edits it. CSV prefixes formula-like text labels with an apostrophe; JSON retains labels. Calendar events have stable identities for the same full plan, UTF-8 folding and no alarms. Changing a plan may create new calendar identities: review imports to avoid duplicates. No calendars are connected automatically.

## Connected workflow

- [NovAsia Estate — Southeast Asia property projects and research](https://novasia.estate/): the publisher and the context behind these tools.
- [Listing Normalizer SDK](https://www.npmjs.com/package/novasia-listing-normalizer): make price and land-area units explicit before entering a total.
- [CSV Quality Lab](https://huggingface.co/spaces/novasia-estate/csv-quality-lab/blob/main/README.md): validate tabular data and inspect import issues before making a schedule.
- [Open Tools source](https://github.com/novasia-estate/open-tools): the original simple planner and related browser utilities; this studio expands that workflow with exact decimal strings, chosen precision and paid/overdue review.

MIT licensed. Dates, paid flags and prices are your assumptions. This is a planning worksheet, not a lender, legal schedule or confirmation of availability. Check agreements separately.
