# Lab — Team Collab

**420-530-LE · Teams of three · Individual grade: /10**

Build a small improvement to this MERN notes application while practising shared-repository collaboration. Each student must author code and tests, review a teammate's pull request, and explain the final application.

This is a separate lab from [student-lab.md](student-lab.md). Use its incremental checkpoint approach, but follow **this document's shared repository, branch, and PR rules**. The older lab's instructions to fork, push directly to main, and publish GHCR images do not apply here. No image publication or online deployment is required.

## Before you start

Each student needs a GitHub account, Git, an editor, and Docker Desktop running with Docker Compose available. Use your own account for commits, PRs, and reviews. Configure your Git name and an email associated with your GitHub account.

Assign Student A, B, and C and record names and GitHub usernames in `docs/team-collab-evidence.md`. These are task assignments, not permanent roles: everyone codes, tests, reviews, and verifies Docker.

**Work one checkpoint at a time. Inspect the result and keep its evidence before continuing. Never merge a red PR.**

| Checkpoint | What you do | Expected result |
| --- | --- | --- |
| 1 | Download source; create shared repository; invite team | One new repository, three collaborators |
| 2 | Run the starter locally | App works; 5 backend and 2 frontend tests pass |
| 3 | Add PR checks through a reviewed PR | Green automated Compose checks |
| 4 | Each student implements a code task and tests | Three attributable feature PRs |
| 5 | Deliberately fail, then repair a test on a PR | Red and green runs on the same PR |
| 6 | Create and resolve a real merge conflict | Conflict evidence and reviewed resolution |
| 7 | Verify final main in Docker and submit | Working integrated app and individual evidence |

## Checkpoint 1 — Create the shared team repository

1. Open [chakirouAlabani/mern-notes](https://github.com/chakirouAlabani/mern-notes), select **Code → Download ZIP**, and extract it. Record the download date and source repository URL in your evidence document. Keep the licence/attribution files supplied with the source.
2. One teammate creates a **new empty repository**, for example `420-530-team-03-notes`. **Do not fork** and do not initialize the remote with a README, licence, or .gitignore. Choose visibility according to your instructor's directions.
3. In the extracted project root (the folder containing `compose.yaml`), initialize and upload the starter. Replace the uppercase placeholders:

   ```sh
   git init
   git branch -M main
   git add .
   git commit -m "chore: import MERN notes starter"
   git remote add origin https://github.com/OWNER/TEAM-REPOSITORY.git
   git push -u origin main
   ```

   Check staged files before committing. Do not include `.env`, passwords, `node_modules`, or generated build files. A ZIP download has no original Git history; do not copy a different project's `.git` folder.
4. The owner opens **Settings → Collaborators → Add people** and invites both teammates. Both accept. Invite **chakirouAlabani** with Write access for grading and send the shared repository link to the instructor on Teams.
5. The other two teammates clone the **new team repository**, not the instructor's repository. From now on, all three work in clones of that same remote.

**Checkpoint evidence:** shared repository URL, roster, and accepted collaborator access. The initial starter import is the only direct push to main allowed in this lab.

### Collaboration rules for all remaining checkpoints

- Start your own named branch from current main, e.g. `a/title-validation`, `b/login-guidance`, or `c/delete-button`. Do not share feature branches.
- Push your branch and open a PR **targeting main**. Changes enter main only through reviewed GitHub PR merges. Never push commits directly to main, force-push main, or merge locally and push main.
- The author requests a teammate's review. Rotate: A reviews B, B reviews C, C reviews A. A reviewer reads the diff, checks acceptance criteria and tests, and leaves a specific observation. “Looks good” alone is insufficient.
- The author addresses review comments; the reviewer approves the final revision. The reviewer, rather than the author, merges after approval and green checks. If new commits invalidate the review, review again.
- Updating your feature branch by merging `origin/main` into it is allowed. That does not put changes into main.
- Enable a main branch rule requiring a PR, one approval, resolved conversations, and the test check where available. Add the required check after its first successful run. If your repository plan cannot enforce a setting, record that limitation and follow the same rules manually. Do not bypass them.

Typical branch cycle, run from the repository root:

```sh
git switch main
git pull --ff-only origin main
git switch -c a/title-validation
# Edit, test, and inspect your changes.
git add backend/src/controllers/notes.ts backend/tests/api.test.ts
git commit -m "feat: validate and trim note titles"
git push -u origin a/title-validation
```

Use paths relevant to your own task. Open the PR on GitHub, request review, and include: issue/task, behavior before and after, tests run and results, and any remaining concerns. After merge, synchronize main before starting another branch.

## Checkpoint 2 — Establish the baseline

Each student performs this checkpoint locally. Copy root `.env.example` to root `.env`, set a nonempty local `SESSION_SECRET`, and keep `.env` out of Git. From the repository root:

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

**Checkpoint evidence:** each student records baseline results. If something fails, inspect the first failure and fix your setup before adding features. Rebuild test images after code/test edits: these images contain copied source.

## Checkpoint 3 — Add PR-triggered automated checks

Student A authors `a/pr-checks`; Student B reviews and merges it. Student C inspects the run and records what each service checks.

Create `.github/workflows/team-collab.yml` in the **team repository**, with this complete workflow:

```yaml
name: Team collaboration checks

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  tests:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - name: Get the project files
        uses: actions/checkout@v7

      - name: Build test images
        run: docker compose -f compose.test.yaml build

      - name: Backend API tests
        run: docker compose -f compose.test.yaml run --rm backend-test

      - name: Frontend tests
        run: docker compose -f compose.test.yaml run --rm frontend-test

      - name: Backend lint
        run: docker compose -f compose.test.yaml run --rm backend-test npm run lint

      - name: Backend type checking
        run: docker compose -f compose.test.yaml run --rm backend-test npm run typecheck

      - name: Clean up test environment
        if: always()
        run: docker compose -f compose.test.yaml down --volumes
```

Keep cleanup last and `if: always()`. Do not add `continue-on-error`, skip tests, or weaken assertions to get green. No `setup-node`, GHCR login, personal token, or uploaded .env is needed: tests execute inside the supplied containers.

Push the branch and open a PR. Confirm checks run **before merge** and all seven starter tests pass. Review and merge it before opening the feature PRs. The push trigger also verifies integrated main. If an inherited workflow exists, inspect its triggers; do not add publishing to this lab or confuse a publishing run with these required tests.

**Checkpoint evidence:** workflow PR, substantive review, and green PR run. Configure the main rule to require this workflow's `tests` check.

## Checkpoint 4 — Three concrete code tasks

Create three task issues, assign one to each student, and link each issue from its PR. Each student must change application code **and add meaningful automated tests**. Keep existing tests passing and preserve authentication, note ownership, and CRUD behavior.

### Student A — Validate and normalize note titles

Files: `backend/src/controllers/notes.ts` and `backend/tests/api.test.ts`.

Currently create/update check whether a title is truthy. Improve **both** operations:

- Reject missing, empty, whitespace-only, and non-string titles with HTTP 400.
- Trim surrounding whitespace before saving; `"  Team note  "` must be stored and returned as `"Team note"`.
- Keep existing status codes and ownership restrictions for valid requests. Invalid user input must not become an HTTP 500.

Add API tests using the existing `request.agent(app)` signup pattern. Cover POST and PATCH rejection of whitespace-only and non-string titles, and successful trimming on both operations. Assert returned/stored values; a rejected PATCH must leave the previous note unchanged. Do not remove the existing CRUD or cross-user tests.

### Student B — Give logged-out users clear guidance

Files: `frontend/src/components/NotesPageLoggedOutView.tsx` and a new adjacent `NotesPageLoggedOutView.test.tsx`.

Replace the current single paragraph with accessible content containing:

- A heading: **Your notes, together**.
- Clear text telling new users to choose **Sign Up** and returning users to choose **Log In** in the navigation.
- A statement that users must sign in to view their notes.

Use semantic elements. Do not add fake buttons or change authentication/network behavior. Add a React Testing Library test that renders this component and checks the heading by role and the guidance text. The existing navigation callback tests must still pass.

### Student C — Make note deletion keyboard accessible

Files: `frontend/src/components/Note.tsx` and a new adjacent `Note.test.tsx`.

The current delete icon has a mouse click handler. Put it inside a real `button` with `type="button"` and an accessible name such as `Delete note: Team note`, derived from the note title. Keep the icon decorative and preserve the layout.

The button must call `onDeleteNoteClicked(note)` exactly once, stop the click from opening the note, and support native keyboard activation. Clicking the note title must still call `onNoteClicked(note)`.

Add tests that locate the delete button by role/name, click it, assert the delete callback receives the note exactly once, and assert the open callback is not called. Also test opening through the title. Manually verify Tab focus and Enter/Space activation in the browser; do not claim a synthetic keydown test proves native browser activation.

**For each feature PR:** run relevant Compose tests after rebuilding, then inspect the full PR checks. Reviewer checks the acceptance criteria and leaves at least one specific technical comment. Resolve feedback and merge only when green. The suite now contains more than the original seven tests; record the actual totals.

## Checkpoint 5 — Demonstrate red → green on the same PR

Do this on Student A's feature PR **before it merges**. Do not perform it on main.

1. First obtain a green run for the legitimate feature changes.
2. In `backend/tests/api.test.ts`, deliberately change the health expectation from `{ status: "ok" }` to `{ status: "broken" }`. Do not change the health endpoint.
3. Commit with `test: demonstrate failing PR check` and push the same branch.
4. Open the PR check details. Confirm the backend assertion fails, later normal steps are skipped, and cleanup still runs. Keep the failed run URL and failing commit SHA. Do not merge.
5. Restore `{ status: "ok" }`, commit with `test: restore passing health assertion`, and push to the same branch. Keep the passing run URL and repaired commit SHA.
6. Student B comments with the assertion's expected/actual difference and why the PR was blocked. Student C verifies cleanup in the failed run and confirms the repaired run passes. Student A explains the repair in the PR.
7. Obtain the final approval, then merge through GitHub.

**Checkpoint evidence:** one PR with separate visible failing and repaired commits/runs, and named explanations from all three students. Keep both commits; do not squash away or rewrite the demonstration history. A syntax error or intentionally disabled workflow is not a substitute for a failing assertion.

## Checkpoint 6 — Plan a real merge conflict

Complete the feature merges first. Use a fresh synchronization point so the conflict is reproducible.

1. All three synchronize main. Record `git rev-parse HEAD` as the **shared base SHA** in an issue titled `Planned login guidance conflict`.
2. **Before either conflict PR merges**, Student B creates `b/guidance-heading` and Student C creates `c/guidance-heading` from that exact base. Both change the **same heading line** in `NotesPageLoggedOutView.tsx`:
   - B: `Your team's private notes`
   - C: `Your notes, organized`
3. Each updates B's component test to match their own heading, commits, pushes, and opens a PR targeting main. Both branches should pass tests independently. Do not synchronize C's branch with main yet.
4. Student A reviews B's PR and merges it first.
5. C's PR should now report a conflict because both branches replaced the same base line differently. Capture the conflict status on GitHub and/or terminal output with conflict markers **before resolving**. If Git merges automatically, you have not met this checkpoint: repeat with new branches from a common base and competing replacements of the exact same line.
6. Student C resolves locally on C's branch:

   ```sh
   git switch c/guidance-heading
   git fetch origin
   git merge origin/main
   # Inspect git status; edit every conflicted file.
   ```

   Agree on the final heading **Your team's notes, organized**. Remove all `<<<<<<<`, `=======`, and `>>>>>>>` markers and update the heading test to the agreed wording. Preserve B's login guidance and all unrelated work. Never choose an entire side blindly.
7. Rebuild and run frontend tests, inspect the diff and `git status`, stage resolved files, commit the merge, and push C's branch. If a merge must be abandoned before committing, `git merge --abort` returns to the pre-merge state; do not delete teammates' work.
8. Student B reviews the resolution, checks that both intentions are represented and tests match, and merges C's PR after green checks. Student A checks the integrated result on main.

**Checkpoint evidence:** shared base SHA, both PR URLs, actual conflict capture, resolution commit SHA, discussion of the chosen wording, and final green run. B and C explain their competing edits; A explains why merge order caused the conflict. Conflict resolution happens on the feature branch; main still changes only through a reviewed PR.

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

## Submit — One repository, individual evidence

Maintain `docs/team-collab-evidence.md` through reviewed PRs; each student authors their own evidence section. Include:

- Team roster, shared repository URL, source download information, and collaborator/rule setup (or enforcement limitation).
- Three assigned task issues and feature PRs, linked commits, meaningful review comments, approvals, and merge records.
- Workflow PR and green PR run; actual final test totals.
- Failed and repaired runs/SHAs on the same PR, plus each student's explanation.
- Conflict base SHA, two PRs, conflict capture, resolution SHA, and individual explanations.
- For each student: local baseline and final Docker results, verified main SHA, and live demonstration.
- A concise contribution table: student → code/test PR → review given → CI/conflict role → final verification.

Commit evidence via a final reviewed PR and keep its checks green. After it merges, all students pull main again and record/submit that final SHA and its green push run; repeat the final checks if application, test, or workflow files changed. Submit the repository and evidence-document links on Teams as instructed. Ensure the instructor can access private repositories. Screenshots supplement links; they do not replace attributable commits, PR reviews, and Actions runs.

## Individual grading — /10 per student

Team membership alone does not earn credit. The instructor grades each student using their own GitHub activity, evidence section, and demonstration. Shared artifacts count only when your contribution is identifiable.

| Criterion | Points | Individually observable evidence |
| --- | ---: | --- |
| Shared repository and branch discipline | 1 | Own account, accepted access, own named branches; changes reach main through PRs |
| Assigned application change | 2 | Authored code meets the assigned acceptance criteria; student explains behavior and implementation |
| Meaningful automated tests | 2 | Authored tests cover required cases, pass in Compose/CI, and would catch a regression |
| Review and integration | 2 | Substantive review of a teammate's PR, verified fixes/approval, and compliant merge participation |
| CI failure and conflict understanding | 2 | 1 point: named red/green contribution and explanation; 1 point: named real-conflict contribution and explanation |
| Final Docker verification and evidence | 1 | Own final-main checks, working live demonstration, complete traceable evidence |
| **Total** | **10** | **Assessed separately for A, B, and C** |

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
