# Rehearsal — One-hour collaboration lab

Rehearsed on November 4, 2026. The student starter remains unsolved. Preparation is in [PR #2](https://github.com/chakirouAlabani/mern-notes/pull/2); use its merged main revision for distribution, never the completed rehearsal branches.

## Verified

| Check | Result and evidence |
| --- | --- |
| Starter Compose checks | PASS: 5 backend tests, 2 frontend tests, lint, type checking and cleanup. [Run](https://github.com/chakirouAlabani/mern-notes/actions/runs/41843836411) |
| A's supplied change | PASS: [PR #3](https://github.com/chakirouAlabani/mern-notes/pull/3), [run](https://github.com/chakirouAlabani/mern-notes/actions/runs/41843223543) |
| B's supplied change | PASS: [PR #4](https://github.com/chakirouAlabani/mern-notes/pull/4), [run](https://github.com/chakirouAlabani/mern-notes/actions/runs/41843355070) |
| C's supplied change | PASS: [PR #5](https://github.com/chakirouAlabani/mern-notes/pull/5), [run](https://github.com/chakirouAlabani/mern-notes/actions/runs/41843390690) |
| Clean integration | PASS: fetched all three remote branches and merged A, then B, then C in an isolated local checkout; no conflicts or whitespace errors |
| Combined component output / production build / live app | PASS: 5 backend and 5 frontend tests (2 original + 3 rehearsal checks), lint/typecheck, production frontend build, healthy Docker stack, frontend-proxied health/signup/session/empty-notes/create/edit/delete checks, and cleanup. [PR #6](https://github.com/chakirouAlabani/mern-notes/pull/6), [corrected run](https://github.com/chakirouAlabani/mern-notes/actions/runs/41844777629) |

Individual cloud PR runs took 85 seconds (A), 75 seconds (B), and 80 seconds (C), including runner setup. These are observed technical run times, not student completion times.

The integration-only branch adds three targeted React tests for the exact supplied messages and starts the real source-built Docker stack. Those three tests and the runtime script are rehearsal aids, not additional student tasks. An early integration run exposed missing SESSION_SECRET during Compose exec; the corrected run supplies that environment value to every application Compose step. The HTTP harness also explicitly requests HTML for browser routes; without the browser's Accept header the development proxy correctly sends /privacy to the API instead.

## Limits and the final human dry run

- All cloud checks run on GitHub Ubuntu runners using the real Compose test services. Local Git fetch and sequential merges were tested on Windows. Docker Desktop did not become available on this Windows host, so local Docker/browser success here is not claimed.
- The GitHub connector cannot create a repository. Rehearsal used isolated branches/PRs in this repository; no rehearsal source answers should be merged into starter main.
- One connected instructor identity authored the rehearsal PRs. No independent review, approval, collaborator invitation, branch-rule enforcement, or reviewer merge permission has been demonstrated.
- Automated React output and live HTTP checks do not replace a human browser walkthrough of the student instructions.
- The hour is an estimated teaching budget. A timed student/colleague rehearsal has not yet occurred.

The instructor elected to complete the human account walkthrough later. Before delivery, use a disposable team repository and two independent GitHub accounts (three for the exact rotation). Follow README, accept invitations, request/submit a real review, approve and merge with the reviewer, open the app in a browser, and time the exercise. The [instructor checklist](Instructor%20-%20One%20Hour%20Collab.md) lists preflight requirements.

No live student grading or lengthy evidence report is required.
