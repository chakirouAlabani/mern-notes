# Lab — Team Collab — Student {{MEMBER_B}} (B)
**Assigned student:** {{MEMBER_B}} · **GitHub:** @{{GITHUB_B}} · **Role:** B

**Personal confirmation:** NOT YET CONFIRMED — replace this entire value yourself in your feature PR.


**420-530-LE · Team of three · Your individual grade: /10**

Follow the checkpoints in order, and perform review/handoff requests as soon as a teammate is ready—even if their request appears later in this guide. Do not make everyone wait until you finish your own feature before reviewing theirs. This guide includes your supplied code, tests, reviews, dependencies, and final verification. Other members use [Student {{MEMBER_A}} (A)](Lab%20-%20Team%20Collab%20-%20Student%20A.md) and [Student {{MEMBER_C}} (C)](Lab%20-%20Team%20Collab%20-%20Student%20C.md). See the [team overview](Lab%20-%20Team%20Collab.md) for the complete handoff order.

Use your own GitHub account. Run commands locally from your project root, except workflow YAML which runs on GitHub. Replace explicit uppercase placeholders only. Copy supplied code into the exact stated locations; understand it and be ready to explain it. No GHCR publication or online deployment is required.

Before starting, agree who is {{MEMBER_A}} (A), {{MEMBER_B}} (B), and {{MEMBER_C}} (C). **{{MEMBER_A}} (A) owns the new team repository.** Everyone must personally apply their assigned code and tests, review teammates, and verify Docker. Your grade depends on attributable activity and explanations, even though code is supplied.

Configure your identity once:
```sh
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR GITHUB EMAIL"
```

## Your dependencies and handoffs

| Your step | Wait for | Tell the team when |
| --- | --- | --- |
| Clone | {{MEMBER_A}} (A)'s repository and invitation | Invitation accepted |
| Review workflow | {{MEMBER_A}} (A) opens workflow PR; {{MEMBER_C}} (C) inspects run | Workflow merged, feature work may start |
| Implement feature | Workflow merged | {{MEMBER_A}} (A) can review your feature PR |
| Review {{MEMBER_C}} (C) feature | {{MEMBER_C}} (C) opens feature PR | {{MEMBER_C}} (C)'s feature merged |
| Explain red run | {{MEMBER_A}} (A) deliberately fails health test | Your diagnosis is posted on {{MEMBER_A}} (A)'s PR |
| Create conflict branch | All features merged; shared SHA agreed | {{MEMBER_C}} (C) and {{MEMBER_A}} (A) know your branch/PR exists |
| Get your conflict PR merged by {{MEMBER_A}} (A) | {{MEMBER_C}} (C) confirms branch exists; {{MEMBER_A}} (A) approves and merges | {{MEMBER_C}} (C) can resolve against new main |
| Review resolution | {{MEMBER_C}} (C) pushes repaired branch and green run | {{MEMBER_C}} (C)'s resolution merged; final testing may start |

## Checkpoint 1 — Join {{MEMBER_A}} (A)'s repository

**WAIT FOR {{MEMBER_A}} (A):** {{MEMBER_A}} (A) must download the starter, create a new public team repository (not a fork), push the starter, and send you its URL and collaborator invitation. You can configure Git and start Docker Desktop while waiting.

Accept the invitation on GitHub. Replace the placeholders, then run:
```sh
git clone https://github.com/OWNER/TEAM-REPOSITORY.git
cd TEAM-REPOSITORY
git remote -v
```

Expected: origin identifies {{MEMBER_A}} (A)'s **team repository**, not the instructor's source repository. Tell {{MEMBER_A}} (A) that you accepted access. Do not initialize a second repository or work in another member's folder.

## Rules for every PR

- Start your own named branch from current main, e.g. `a/title-validation`, `b/login-guidance`, or `c/delete-button`. Do not share feature branches.
- Push your branch and open a PR **targeting main**. Changes enter main only through reviewed GitHub PR merges. Never push commits directly to main, force-push main, or merge locally and push main.
- The author requests a teammate's review. Rotate: {{MEMBER_A}} (A) reviews {{MEMBER_B}} (B), {{MEMBER_B}} (B) reviews {{MEMBER_C}} (C), {{MEMBER_C}} (C) reviews {{MEMBER_A}} (A). A reviewer reads the diff, checks acceptance criteria and tests, and leaves a specific observation. “Looks good” alone is insufficient.
- The author addresses review comments; the reviewer approves the final revision. The reviewer, rather than the author, merges after approval and green checks. If new commits invalidate the review, review again.
- Updating your feature branch by merging `origin/main` into it is allowed. That does not put changes into main.
- The repository owner configures a main branch rule requiring a PR, one approval, resolved conversations, and the test check where available. Add the required check after its first successful run. If your repository plan cannot enforce a setting, record that limitation and follow the same rules manually. Do not bypass them.


Complete your own baseline before anyone merges features. Respond to review requests as soon as they arrive, even if you are still working on your feature.

Use the exact branch and staging commands in your own task below. The starter import by {{MEMBER_A}} (A) is the only direct push to main.

## Checkpoint 2 — Establish the baseline

Perform this checkpoint on your own computer. In your editor, copy root `.env.example` to a new root file named `.env`. Alternatively, in PowerShell run `Copy-Item .env.example .env` once (do not overwrite an existing configured file). In `.env`, set `SESSION_SECRET` to your own long random local value. For example, the line has this form; replace the placeholder:

```dotenv
SESSION_SECRET=REPLACE_WITH_YOUR_OWN_LONG_RANDOM_VALUE
```

Keep any other supplied settings and keep `.env` out of Git. From the repository root:

```sh
docker compose up --build -d --wait
docker compose ps
```

Open http://localhost:3000. Sign up, log out, log in, and create, edit, and delete a note.

Run the starter checks:

```sh
docker compose -f compose.test.yaml build
docker compose -f compose.test.yaml run --rm backend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml run --rm backend-test npm run lint
docker compose -f compose.test.yaml run --rm backend-test npm run typecheck
docker compose -f compose.test.yaml down --volumes
```

Expected baseline: **5 backend tests, 2 frontend tests**, successful lint and type checking. The Compose test configuration supplies a temporary MongoDB named `mern_notes_test`; you do not need database secrets. Do not redirect the tests to your application database: the API suite deletes collections.

**Checkpoint evidence:** record your own baseline results. If something fails, inspect the first failure and fix your setup before adding features. Rebuild test images after code/test edits: these images contain copied source.

## Checkpoint 3 — Review {{MEMBER_A}} (A)'s PR workflow

**WAIT FOR {{MEMBER_A}} (A):** {{MEMBER_A}} (A) opens `a/pr-checks` and requests you. Do not create another workflow.

1. Open {{MEMBER_A}} (A)'s PR → **Files changed**. Compare its workflow with the complete YAML in [Student {{MEMBER_A}} (A)](Lab%20-%20Team%20Collab%20-%20Student%20A.md), Checkpoint 3.
2. Check the four personalized lab documents: all three names and GitHub usernames must match your team; the confirmation fields stay unconfirmed until each student edits their own feature PR. Check `pull_request` targets main; the workflow builds Compose test images, runs backend/frontend tests, lint/type checking, and ends with cleanup using `if: always()`.
3. Open **Checks → Team collaboration checks → tests**. Confirm 5 backend and 2 frontend tests pass, lint/type checking pass, and cleanup succeeds.
4. Leave a specific review comment explaining one check you verified. Request changes for missing steps or errors.
5. **WAIT FOR {{MEMBER_C}} (C):** {{MEMBER_C}} (C) posts their service/run explanation. Confirm latest checks are green, approve, and merge {{MEMBER_A}} (A)'s workflow with **Create a merge commit**.
6. Tell {{MEMBER_A}} (A) and {{MEMBER_C}} (C) the workflow is merged. Ask {{MEMBER_A}} (A) to require the test check in the main rule where available.

## Checkpoint 4 — Your code task

### Put your own name in this guide

**WAIT FOR:** the workflow PR is merged and the assigned-student field at the top has your correct name. If it is still a placeholder, ask the repository owner to complete the name-setup step in the overview.

On the feature branch you create below, edit the top of **this guide in your team's repository**:
- Check that **Assigned student** and **GitHub** identify you; correct them if needed.
- Replace **Personal confirmation** with your own full name and GitHub username, for example `Sam Lee (@samlee) — I accept this role`. Use your actual identity.
- Commit this change yourself, together with your application code and tests. Do not confirm a teammate's guide for them.

The feature commit commands below already stage this guide together with your assigned code/tests.

Your feature PR must contain your guide confirmation, your application change, and your tests. The review should check all three. Branch names, file names, and role letters inside commands remain unchanged.



**WAIT FOR:** {{MEMBER_A}} (A)'s workflow is merged. Create issue **Explain signup and login**, assign yourself, and link it from your feature PR. {{MEMBER_A}} (A) reviews and merges this feature.

### Student {{MEMBER_B}} (B) — Give logged-out users clear guidance

**B1. Create your branch:**

```sh
git switch main
git pull --ff-only origin main
git switch -c b/login-guidance
```


**B2. Replace the entire contents of `frontend/src/components/NotesPageLoggedOutView.tsx` with:**

```tsx
const NotesPageLoggedOutView = () => {
    return (
        <section aria-labelledby="notes-welcome-heading">
            <h1 id="notes-welcome-heading">Your notes, together</h1>
            <p>New here? Choose Sign Up in the navigation.</p>
            <p>Already have an account? Choose Log In in the navigation.</p>
            <p>You must sign in to view your notes.</p>
        </section>
    );
};

export default NotesPageLoggedOutView;
```


The heading identifies the section, and the paragraphs refer to existing navigation buttons. No new authentication logic is needed.

**B3. Create `frontend/src/components/NotesPageLoggedOutView.test.tsx` with the entire following contents:**

```tsx
import { render, screen } from '@testing-library/react';
import NotesPageLoggedOutView from './NotesPageLoggedOutView';

test('explains how new and returning users can access their notes', () => {
    render(<NotesPageLoggedOutView />);
    expect(screen.getByRole('heading', { level: 1, name: "Your notes, together" }))
        .toBeInTheDocument();
    expect(screen.getByText('New here? Choose Sign Up in the navigation.'))
        .toBeInTheDocument();
    expect(screen.getByText('Already have an account? Choose Log In in the navigation.'))
        .toBeInTheDocument();
    expect(screen.getByText('You must sign in to view your notes.'))
        .toBeInTheDocument();
});
```


**B4. Rebuild and test:**

```sh
docker compose -f compose.test.yaml build frontend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml down --volumes
```


**Expected:** 3 frontend tests pass if {{MEMBER_C}} (C)'s task has not merged; 5 if {{MEMBER_C}} (C)'s task has merged and is included in your branch. The two original tests remain.

**B5. Commit and push:**

```sh
git diff
git add frontend/src/components/NotesPageLoggedOutView.tsx frontend/src/components/NotesPageLoggedOutView.test.tsx
git add "docs/Lab - Team Collab - Student B.md"
git commit -m "feat: explain how to access notes"
git push -u origin b/login-guidance
```


Open a PR targeting main, request {{MEMBER_A}} (A), and follow the review procedure below.

### Your review of {{MEMBER_C}} (C)'s feature

**WAIT FOR {{MEMBER_C}} (C):** review the **Make note deletion accessible** PR. Check the native button has a title-based accessible name, the icon is decorative, click propagation stops, and tests assert one delete with no open. Ask {{MEMBER_C}} (C) for browser Tab/Enter/Space results. Leave a specific review, request fixes if needed, and approve/merge only when green.

## Checkpoint 5 — Diagnose {{MEMBER_A}} (A)'s deliberate failure

**WAIT FOR {{MEMBER_A}} (A):** {{MEMBER_A}} (A) first obtains green checks, changes only the health test expectation to `{ status: "broken" }`, and pushes a separate failing commit on the existing feature PR.

Open {{MEMBER_A}} (A)'s **failed** run, not a previous green run. Inspect **Backend API tests** and find the health assertion. Post your own comment explaining:
- Actual response: `{ status: "ok" }`.
- Deliberately wrong expected response: `{ status: "broken" }`.
- The assertion makes the job red, so the PR must remain unmerged.

Link the failing run and commit. Tell {{MEMBER_A}} (A) your diagnosis is posted. **WAIT FOR {{MEMBER_A}} (A):** after {{MEMBER_A}} (A) restores the expectation, inspect the new green run and save its URL/SHA too. {{MEMBER_C}} (C) checks cleanup and performs the final feature review/merge; do not merge {{MEMBER_A}} (A) yourself.

## Checkpoint 6 — Create the first competing heading and review {{MEMBER_C}} (C)'s resolution

All three feature PRs must be merged first, including {{MEMBER_A}} (A)'s red → green demonstration. Do not start the conflict branches while features are still being merged.

**WAIT FOR ALL THREE:** agree on a freeze: nobody merges unrelated changes until both conflict branches are created from the same main commit. Each student runs:
```sh
git switch main
git pull --ff-only origin main
git rev-parse HEAD
```

Post the printed SHA in the issue **Planned login guidance conflict**. All three SHAs must match. {{MEMBER_B}} (B) and {{MEMBER_C}} (C) must confirm that both branches exist from this SHA before {{MEMBER_A}} (A) merges {{MEMBER_B}} (B)'s conflict PR.

Create your branch **now**, before either conflict PR merges:
```sh
git switch -c b/guidance-heading
```


In `frontend/src/components/NotesPageLoggedOutView.tsx`, replace only the heading line with:
```tsx
<h1 id="notes-welcome-heading">Your team's private notes</h1>
```

In `frontend/src/components/NotesPageLoggedOutView.test.tsx`, replace only the heading expectation with:
```tsx
expect(screen.getByRole('heading', { level: 1, name: "Your team's private notes" }))
        .toBeInTheDocument();
```

Test, commit, and push:
```sh
docker compose -f compose.test.yaml build frontend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml down --volumes
git add frontend/src/components/NotesPageLoggedOutView.tsx frontend/src/components/NotesPageLoggedOutView.test.tsx
git commit -m "feat: revise logged-out heading"
git push -u origin b/guidance-heading
```

Expected: 5 frontend tests pass. Open a PR targeting main; link the conflict issue, state the shared base SHA, and request {{MEMBER_A}} (A).

**WAIT FOR {{MEMBER_C}} (C):** {{MEMBER_C}} (C) must confirm `c/guidance-heading` already exists from the shared SHA and has a competing PR. Tell {{MEMBER_A}} (A) both branches are ready. **WAIT FOR {{MEMBER_A}} (A):** {{MEMBER_A}} (A) reviews and merges your PR first. Do not merge it yourself.

**WAIT FOR {{MEMBER_C}} (C):** {{MEMBER_C}} (C) fetches main, captures the real conflict, resolves it, tests, and pushes the resolution on {{MEMBER_C}} (C)'s existing PR.

Then:
1. Open {{MEMBER_C}} (C)'s PR and inspect the conflict capture, merge commit, and latest diff.
2. Verify the final component heading is **Your team's notes, organized**, the test expects the identical text, and signup/login paragraphs remain intact.
3. Confirm the latest workflow is green (18 backend / 5 frontend tests, lint, typecheck). Leave a specific comment explaining how the resolution combines both edits.
4. Approve and merge {{MEMBER_C}} (C)'s PR using **Create a merge commit**.
5. Tell {{MEMBER_A}} (A) and {{MEMBER_C}} (C) final main is ready. Save both conflict PRs, base SHA, capture, resolution SHA, and your review. Explain why competing replacements of the same base line conflicted.

## Checkpoint 7 — Verify the final main in Docker

Every student pulls the merged main and records the same final commit SHA:

```sh
git switch main
git pull --ff-only origin main
git status
git rev-parse HEAD
docker compose -f compose.test.yaml build
docker compose -f compose.test.yaml run --rm backend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml run --rm backend-test npm run lint
docker compose -f compose.test.yaml run --rm backend-test npm run typecheck
docker compose -f compose.test.yaml down --volumes
docker compose up --build -d --wait
docker compose ps
docker compose images
```

Use root .env with your local session secret. Confirm all checks pass on final main, not just on an old feature branch. Open http://localhost:3000 and verify:

- The combined logged-out heading and Sign Up / Log In guidance.
- Signup, logout, login, and note creation/editing/deletion.
- Title trimming; demonstrate whitespace-only rejection through an API test if browser validation prevents submitting it.
- Keyboard focus and Enter/Space deletion; deleting must not also open the edit dialog.
- Account isolation: another signed-in account cannot see the first account's notes.
- Persistence: create a note to keep, run `docker compose down`, restart with `docker compose up -d --wait`, sign in again, and confirm that note remains.

Do not use `--volumes` on the application stack during the persistence check: it deletes saved application data. The earlier cleanup commands explicitly target the separate test stack.

**Final checkpoint:** call the instructor for a live demonstration before stopping the app. Each student must explain their code/test, their review, and one collaboration event. Show the final main SHA, green checks, containers, and working app. Then use `docker compose down` to stop the application.

## Submit your individual evidence

**WAIT FOR:** {{MEMBER_C}} (C)'s conflict-resolution PR must be merged and final main checks must pass. Create your own evidence file so each student's contribution is attributable and separate.

```sh
git switch main
git pull --ff-only origin main
git switch -c b/evidence
```

Create `docs/team-collab-evidence-B.md`. Copy this template and replace every placeholder with actual results and links:

```md
# Student B — Team collaboration evidence

- Name / GitHub username: NAME / USERNAME
- My guide-confirmation commit / feature PR: SHA / URL
- Team repository and roster A/B/C: URL_AND_NAMES
- Accepted collaborator / instructor access: DETAILS
- Main protection or manual-enforcement limitation: DETAILS
- Local baseline results: RESULTS
- My task issue / feature PR / code and test commits: URLS
- What my supplied code and tests do: MY_EXPLANATION
- My review of a teammate's feature: REVIEW_URL_AND_WHAT_I_CHECKED
- Workflow PR / green run and my role: URLS_AND_EXPLANATION
- Failed run / failing commit: URL / SHA
- Repaired run / repaired commit: URL / SHA
- My red-to-green contribution and explanation: DETAILS
- Conflict issue / common base SHA / both PRs: URLS_AND_SHA
- Actual conflict capture / resolution commit / green run: LINKS_AND_SHA
- My conflict contribution and explanation: DETAILS
- Final verified application SHA: SHA
- Final local backend/frontend totals, lint, typecheck: RESULTS
- Final Docker / keyboard / CRUD / isolation / persistence checks: RESULTS
- Live demonstration: DATE_AND_RESULT
```

Then run:
```sh
git add docs/team-collab-evidence-B.md
git commit -m "docs: record Student B lab evidence"
git push -u origin b/evidence
```

Open a PR against main. Request {{MEMBER_A}} (A) to review and merge after green checks. Review the evidence PR assigned to you too. Each student submits the repository link and their own evidence-file link on Teams.

**WAIT FOR ALL THREE EVIDENCE PRs:** after they merge, pull main again and submit the final main SHA plus green push-run URL on Teams. No extra commit is needed just to insert a commit's own SHA. If code, tests, or workflow changed since your Docker verification, repeat the checks on the final revision.

### Open, review, and merge each PR on GitHub

1. Open the **team repository → Pull requests → New pull request**.
2. Select **base: main** and **compare: your branch**. Inspect **Files changed**; your feature PR should contain your assigned code/tests and your own guide confirmation. The initial workflow PR also includes all four personalized lab documents. Later conflict/evidence PRs contain only their stated files.
3. Choose **Create pull request**. Use your commit message as its title. Copy this body, replacing the capitalized placeholders:

```md
Closes #ISSUE_NUMBER

## Change
BEFORE_AND_AFTER_BEHAVIOR

## Local verification
COMMANDS_RUN_AND_ACTUAL_RESULTS

## Review focus
ONE_SPECIFIC_THING_FOR_THE_REVIEWER_TO_CHECK
```


4. Under **Reviewers**, request {{MEMBER_A}} (A) for your feature PR. In **Checks**, open **Team collaboration checks → tests** and inspect individual steps. Save the run URL.
5. Reviewer: open **Files changed**, select a line's **+** button, and leave a specific comment explaining a checked behavior or a needed correction. Use **Review changes → Request changes** for a required fix. Do not copy a review claim without checking it.
6. Author: make requested edits on the same branch, rebuild/retest, commit the changed files, and `git push`. The existing PR updates automatically. Reply to the review with what changed.
7. Reviewer: inspect the latest revision and results, resolve addressed discussions, and use **Review changes → Approve**.
8. When checks are green, the reviewer selects **Merge pull request → Create a merge commit → Confirm merge**. Use merge commits for this lab so demonstration commits stay visible. **Hold {{MEMBER_A}} (A)'s feature PR until Checkpoint 5 is complete. This hold does not apply to {{MEMBER_A}} (A)'s workflow PR.**
9. Everyone updates their local main with `git switch main` and `git pull --ff-only origin main`. Do not copy files between teammates' folders.

**Expected integrated result after {{MEMBER_A}} (A), {{MEMBER_B}} (B), and {{MEMBER_C}} (C) merge:** 18 backend tests and 5 frontend tests, plus passing lint/type checking. Tests on an older feature branch may contain fewer teammate tests until it incorporates current main.

## Individual grading — /10 per student

Team membership alone does not earn credit. The instructor grades each student using their own GitHub activity, evidence document, and demonstration. Shared artifacts count only when your contribution is identifiable.

| Criterion | Points | Individually observable evidence |
| --- | ---: | --- |
| Shared repository and branch discipline | 1 | Own account, accepted access, own named branches; changes reach main through PRs |
| Assigned application change | 2 | Authored code meets the assigned acceptance criteria; student explains behavior and implementation |
| Meaningful automated tests | 2 | Authored tests cover required cases, pass in Compose/CI, and would catch a regression |
| Review and integration | 2 | Substantive review of a teammate's PR, verified fixes/approval, and compliant merge participation |
| CI failure and conflict understanding | 2 | 1 point: named red/green contribution and explanation; 1 point: named real-conflict contribution and explanation |
| Final Docker verification and evidence | 1 | Own final-main checks, working live demonstration, complete traceable evidence |
| **Total** | **10** | **Assessed separately for {{MEMBER_A}} (A), {{MEMBER_B}} (B), and {{MEMBER_C}} (C)** |

Partial credit follows demonstrated completion within each criterion. Missing or unattributable work earns no credit for that part. A teammate's successful implementation cannot replace your own code, tests, review, or explanation.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Push denied | Accepted collaborator invitation and origin points to the team repository |
| No PR checks | Workflow under .github/workflows, valid YAML, PR base main, Actions enabled |
| Tests still use old behavior | Rebuild compose.test.yaml images after edits |
| Unexpected red run | Read the first failing step; repair before merging or continuing |
| No actual conflict | Same base SHA, exact same line, different replacements; second branch not updated early |
| Conflict markers break build | Resolve all conflicted files, including tests; inspect diff and status |
| App startup fails | Docker Desktop, local .env secret, port 3000, compose logs |
| Data missing | Correct stack/account; application volumes must be preserved |
