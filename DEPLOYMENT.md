# Deployment record

## First publication — 2026-10-08

Public source: https://github.com/jordanmeyer/bab-trial-pricing-2026-10-08

Live app: https://jordanmeyer.github.io/bab-trial-pricing-2026-10-08/

Evaluated source commit: 39fc83d2c757e27bccf0372e3e8f704602aaa596. Published commit: 361848ffc6453e3fc9900054026769d5388a3dfd. The intervening commit contains evaluation reports only. Source and PLAN freshness passed immediately before pushing main. The coordinator created the authorized empty public repository and set Pages Source to GitHub Actions before the push. Origin is the exact authorized repository; no history rewriting or force push occurred.

GitHub Actions run [37876881290](https://github.com/jordanmeyer/bab-trial-pricing-2026-10-08/actions/runs/37876881290) completed successfully for published commit 361848ffc6453e3fc9900054026769d5388a3dfd, verified by the coordinator through GitHub API.

Actual live browser observations supplied by the coordinator through CUA: the repository-path URL loaded styled HTML and working modules; default profit $300.00, whole break-even 63 and theoretical break-even 62.50 matched independent arithmetic. Enter Calculate at quantity 62 gave −$4.00. No console errors; the source link was observed with its intended destination. Only app/ is packaged; tests and reports remain in the public source repository. These observations establish live publication for this revision, not later revisions.

## Ordinary updates

Agree on model or acceptance changes and save PLAN.md, revise app/ and affected tests, inspect and commit the checkpoint, run affected browser evaluation and source/plan freshness checks, commit reports, verify the exact origin/main and Pages setting, push normally, wait for a successful workflow for the actual commit, and verify that revision's live interaction and source link. Never treat a push or queued run as deployment success. Keep earlier evaluation/deployment rounds. No runtime installation or generated output should enter the repository.

Limitations: see EVALUATION.md. Browser 200% text zoom, screen-reader behavior and runtime network capture remain unverified. This is a synthetic teaching application and not an optimal-price recommendation.

## Second publication — failed live behavior, 2026-10-08

Evaluated source commit: df0e909f67ec1517909196007abb617350eef0fb. Published commit: 5099d7934c31638925af693f7881d1ff450e40a6. GitHub Actions run [37877140794](https://github.com/jordanmeyer/bab-trial-pricing-2026-10-08/actions/runs/37877140794) completed successfully for that exact commit. Source and PLAN freshness passed before the push.

**Live interaction failed.** The coordinator's returning browser received the new HTML with Load decimal example, but retained the old app.js from the previous deployment. The new button was inactive, and an ordinary reload refreshed HTML only. No console errors were observed. API/HTTP comparison confirmed the published HTML matched committed source. A successful workflow therefore did not establish successful live behavior for returning visitors.

The corrective change versions the changed entry-script reference as ./app.js?v=2. Model and styles are unchanged. The frozen plugin remains untouched. A third corrective deployment is authorized, but publication/live verification are pending; do not relabel the second deployment as passing.
