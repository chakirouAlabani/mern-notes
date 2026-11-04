# Instructor — One-hour collaboration lab

Use [the root README](../README.md) as the only student guide. This lab teaches one reviewed PR per student. The previous failed-test and merge-conflict exercises are outside this hour.

## Prepare before class

1. Use the starter main commit recorded in the [rehearsal report](Rehearsal%20-%20One%20Hour%20Collab.md), after the preparation PR is merged. Do not use a rehearsal branch with completed student changes.
2. Create one new public team repository from a ZIP of the starter (not a fork). One owner imports it, then invites the other two students and `chakirouAlabani`. Teams may do this in a separate setup session. Do not spend the timed hour creating accounts or installing tools.
3. Import instructions for the team owner, run from the extracted root:
```sh
git init
git branch -M main
git add .
git commit -m "chore: import collaboration starter"
git remote add origin https://github.com/OWNER/TEAM-REPOSITORY.git
git push -u origin main
```
Everyone else accepts the invitation, then clones that team URL. Each student configures their own Git name/email and tests GitHub authentication. Never share credentials.
4. Enable Actions in each team repository. The supplied workflow is already committed; students do not write YAML. Check the import's main run is green.
5. As repository owner, configure a main rule requiring a PR, one approval, and the successful `tests` check where supported. Select the check only after it exists. Enable merge commits. Avoid requiring an out-of-date branch update for this short exercise; the chosen tasks touch different files. If enforcement is unavailable, retain the same manual rules and record the limitation in a short repository issue.
6. Each laptop starts Docker Desktop, copies root `.env.example` to root `.env`, and sets a local random SESSION_SECRET. Ignore the GHCR image variables; this lab uses source builds. Keep .env untracked.
7. Warm the images and verify the baseline:
```sh
docker compose -f compose.test.yaml build
docker compose -f compose.test.yaml run --rm backend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml run --rm backend-test npm run lint
docker compose -f compose.test.yaml run --rm backend-test npm run typecheck
docker compose -f compose.test.yaml down --volumes
docker compose up --build -d --wait
```
Expected: 5 backend / 2 frontend tests, no lint/typecheck errors, healthy app at localhost:3000. Test signup and one note. First-time downloads/builds are preparation time and may exceed the class budget.

## Ten-minute demonstration

Use a disposable practice repository or a separate demo file, not a student's assigned file. Show branch, one edit, commit, push, PR base main, Files changed, and running checks. Use a colleague's account to review and merge. Prepare the demo PR/check run ahead of class in case an image build is slow. Never pretend one account is an independent reviewer.

Explain: a branch isolates a change; a PR proposes it; checks run existing tests; the reviewer reads the diff; the reviewer merges after approval and green checks.

## Facilitation and timing

- At minute 10, everyone can identify their file, branch, and reviewer.
- At minute 25, all three PRs should be open. While CI runs, have students review the code.
- At minute 40, finish merges in A/B/C feature order, performed by reviewers C/A/B.
- At minute 50, complete local main verification and one short PR comment.
- Reserve the last ten minutes for failures. If setup or network is still broken at minute 10, finish preflight before claiming this is a one-hour activity.

The 60-minute budget is a teaching target, not a measured novice completion time. Time a human dry run before scheduling the class.

## Repository-only grading

Use the /10 rubric in README. Inspect each person's commit author, file diff, PR base/checks, substantive review, merge event, and final comment. No live grading or report is required. A student who only comments but does not contribute code/review/merge has not completed the cycle.

## Human rehearsal still required

Use at least two independent accounts (three for the exact team rotation). In a practice team repository confirm invitation acceptance, reviewer selection, approval, the main rule, and reviewer merge rights. Rehearse the student's exact commands with those identities and a stopwatch. Automated runs cannot establish independent human approval or the classroom duration.

Current automated results and any limits are recorded in the [rehearsal report](Rehearsal%20-%20One%20Hour%20Collab.md).
