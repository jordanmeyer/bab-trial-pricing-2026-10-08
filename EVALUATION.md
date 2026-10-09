# Evaluation

## Expected behavior established before execution

PLAN.md records hand arithmetic derived before implementation. The simulated student highlighted the risk of equating low break-even with a good price. The interface explicitly says entered quantity is not forecast sales and cannot determine an optimal price. Browser tests import app/model.js, include independent normal/boundary/cents/large-value cases and rejected input formats, and display loading/error states plus per-case expected/observed results.

## Setup and supplementary round

The coordinator verified the bundled starter module status and button transition in the shared browser. The original app replaced that starter after the simulated student agreed to the plan. Supplementary Node v22.19.0 evaluation ran tests/cases.js: 25/25 passed. This did not substitute for the browser run. No failed calculation round occurred. Source review and a separate simplification pass retained one calculation module and native form without frameworks, extra tooling or unused abstractions.

## Final browser round — 2026-10-08

Tested commit: **39fc83d2c757e27bccf0372e3e8f704602aaa596**. Relevant paths: app/, tests/, .github/workflows/. The full project file inventory showed no executable tooling elsewhere. The agreed PLAN.md, real source link and unchanged bundled Pages workflow were included in this checkpoint. Tests/source/plan were clean before and after the browser run. The comparison commands in the frozen evaluation-freshness reference all passed: current-vs-tested commit, staged, unstaged, untracked (including ignored) relevant files, and current-vs-tested PLAN.md. No substantive plan change followed the checkpoint.

Method: coordinator-operated CUA browser, serving the identical project files from a no-store loopback preview at http://127.0.0.1:9100/pricing/ to avoid stale starter modules. Original preview http://127.0.0.1:9101/ remains available. Browser engine/version was not supplied; the browser observations below were relayed by the coordinator, not independently observed by the app-writing agent.

| Check | Independent expected | Observed | Result |
| --- | --- | --- | --- |
| Browser test page | 25 cases pass | 25/25 visible passes | Pass |
| Default $20/$12/100/$500 | Profit $300; revenue $2,000; total $1,700; contribution $8; whole break-even 63 | All matched; USD two decimals | Pass |
| Edit quantity to 62 | Old output hidden; profit 62×8−500 = −$4 after Calculate | Hidden output, Enter Calculate gave −$4 | Pass |
| Fractional quantity 1.5 | Whole-unit error, no results, first bad field focus | Message shown, results hidden, quantity focused | Pass |
| Equal price/cost 12/12, fixed 500 | −$500, no break-even, zero contribution explained | Matched | Pass |
| Price10/cost12/quantity100/fixed0 | −$200; zero units break even, every extra sale loses money | Matched including warning | Pass |
| Decimal price19.90/cost19.80/quantity1000/fixed100 | 10 cents × 1000 = 10000 cents; profit $0, contribution $.10, theoretical/whole count1000 | All matched | Pass |
| Keyboard Calculate and Reset | Operate without mouse; reset restores defaults | Enter Calculate and keyboard Reset succeeded; final baseline restored | Pass |
| Narrow and desktop | Legible stacked/column layouts, no horizontal overflow | Actual iframe widths319 and1439 CSS pixels, legible screenshot, no document horizontal overflow | Pass |
| Console | No app warning/error | Inspected console warnings/errors empty | Pass |

The 25 visible browser test cases include the full independent baseline (all outputs in cents), profits at 62/63 units, extra-sale contribution and fixed-cost relationships, positive/zero/negative contribution cases, all-zero case, exact-cent .30/.20/3/.30 case, maximum supported scenario, break-even above quantity cap, maximum amount and whole-unit parsing, and rejection of empty/negative/over-precise/exponent/Infinity/NaN/comma/currency-symbol/over-limit/fractional-count inputs. Each case's expected and observed value is reproducible on tests/index.html.

Source-reviewed contrast pairs use opaque colors: white/navy 14.76:1, white/royal 7.75:1; independently calculated error text #8a3500 on #F3F2F1 is 7.25:1, input boundary #666 on white 5.74:1, error boundary #C84E00 on #F3F2F1 is 4.13:1. Native labels, field associations, non-color error text and visible focus styles are present. No logos, imagery, institutional endorsement claims or remote fonts. This is a scoped review, not full accessibility certification.

## Limitations and handoff

Required plan checks above pass at the recorded source checkpoint. **200% text zoom was not tested.** No screen-reader audit was performed. Runtime network capture was not supplied; source review finds local modules/CSS only, no fetch, remote assets, analytics or persistence, and an intentional external source link. Do not call source review a network trace. GitHub source navigation and live repository-path assets await publication checks.

The simulated student reviewed the assumptions and said they were clear and acceptable: break-even is a cost-coverage threshold, not an optimal price. No business forecast certification is implied. All content and both commits were reviewed as synthetic/public; approved public Git attribution is disclosed in SETUP.md. The workflow matches the frozen template byte-for-byte and packages only app/; app contains no symlinks. Report-only commits may follow this checkpoint without pretending source was re-evaluated. Recheck freshness immediately before publication and verify the actual deployed revision.

## Second version — pending browser round

The simulated student requested a decimal-example preset after the first verified deployment. PLAN.md was updated with the new interaction requirement; formulas and model assumptions are unchanged. Expected preset output was derived before implementation: (19.90−19.80)×1000−100 = 0 USD; contribution $0.10, theoretical and whole-unit break-even 1000. Existing 25 model cases are retained. The new button reuses the existing update path; browser checks must verify keyboard activation, fields/output, clearing errors, original reset and narrow layout. This round is not yet final.
