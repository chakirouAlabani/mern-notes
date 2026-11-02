# Lab — Team Collab — Student {{MEMBER_A}} (A)
**Assigned student:** {{MEMBER_A}} · **GitHub:** @{{GITHUB_A}} · **Role:** A

**Personal confirmation:** NOT YET CONFIRMED — replace this entire value yourself in your feature PR.


**420-530-LE · Team of three · Your individual grade: /10**

Follow the checkpoints in order, and perform review/handoff requests as soon as a teammate is ready—even if their request appears later in this guide. Do not make everyone wait until you finish your own feature before reviewing theirs. This guide includes your supplied code, tests, reviews, dependencies, and final verification. Other members use [Student {{MEMBER_B}} (B)](Lab%20-%20Team%20Collab%20-%20Student%20B.md) and [Student {{MEMBER_C}} (C)](Lab%20-%20Team%20Collab%20-%20Student%20C.md). See the [team overview](Lab%20-%20Team%20Collab.md) for the complete handoff order.

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
| Import starter | Role agreement | Repository URL and invitations are ready |
| Add workflow | Your local baseline is green | {{MEMBER_B}} (B) can review workflow; {{MEMBER_C}} (C) can inspect run |
| Start feature | {{MEMBER_B}} (B) merges workflow | Your feature PR is ready for {{MEMBER_C}} (C) |
| Fail/repair test | First green feature run | {{MEMBER_B}} (B) can explain failure; {{MEMBER_C}} (C) can verify cleanup |
| Feature merge | {{MEMBER_B}} (B)/{{MEMBER_C}} (C) evidence and {{MEMBER_C}} (C)'s final approval | {{MEMBER_C}} (C) may merge your repaired PR |
| Review {{MEMBER_B}} (B) | {{MEMBER_B}} (B) opens feature PR | {{MEMBER_B}} (B)'s feature is merged |
| Coordinate conflict | All three features merged | Common SHA recorded; both branches created |
| Merge {{MEMBER_B}} (B) conflict | {{MEMBER_C}} (C) confirms branch already exists | {{MEMBER_C}} (C) may merge main into their branch |
| Final verification | {{MEMBER_B}} (B) merges {{MEMBER_C}} (C) resolution | Final Docker results and evidence ready |

## Checkpoint 1 — Create the shared team repository

1. Open [chakirouAlabani/mern-notes](https://github.com/chakirouAlabani/mern-notes), select **Code → Download ZIP**, and extract it.
2. You create a **new empty repository**, for example `420-530-team-03-notes`. **Do not fork** and do not initialize the remote with a README, licence, or .gitignore. Visibility should be public.
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
4. Open **Settings → Collaborators → Add people** and invite both teammates. Both accept. Invite **chakirouAlabani** for grading and send the shared repository link on Teams.
5. The other two teammates clone the **new team repository**, not the instructor's repository. Replace OWNER and TEAM-REPOSITORY, then run:

```sh
git clone https://github.com/OWNER/TEAM-REPOSITORY.git
cd TEAM-REPOSITORY
git remote -v
```

The owner stays in the imported project folder. Everyone's origin URL must identify the same team repository. From now on, all three work in clones of that same remote.

**Checkpoint evidence:** shared repository URL, roster, and accepted collaborator access. The initial starter import is the only direct push to main allowed in this lab.

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

## Checkpoint 3 — Add PR-triggered automated checks

Student {{MEMBER_A}} (A) authors `a/pr-checks`; Student {{MEMBER_B}} (B) reviews and merges it. Student {{MEMBER_C}} (C) inspects the run and records what each service checks.

First create the branch locally:

```sh
git switch main
git pull --ff-only origin main
git switch -c a/pr-checks
```

**Before creating the workflow:** follow **Fill the names once in the team repository** in the [overview](Lab%20-%20Team%20Collab.md). Set all three full names and GitHub usernames, run the supplied PowerShell block, and stage the four personalized documents. Keep working on this same branch; the name edits and YAML go into one workflow PR.

**WAIT FOR BOTH TEAMMATES:** confirm they completed the starter baseline before merging any features. The workflow PR itself should still run the seven starter tests.

In your editor, create folders `.github` and `workflows` if needed. Create `.github/workflows/team-collab.yml` in the **team repository**, with this complete workflow:

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

Save the workflow, then run:

```sh
git diff
git add .github/workflows/team-collab.yml
git commit -m "ci: run Compose checks on pull requests"
git push -u origin a/pr-checks
```

Open **Pull requests → New pull request**, select base **main** and compare **a/pr-checks**, and create the PR. Request {{MEMBER_B}} (B) as reviewer. Use the PR procedure at the end of this guide for this PR too. Confirm checks run **before merge** and all seven starter tests pass. Review and merge it before opening the feature PRs. The push trigger also verifies integrated main. If an inherited workflow exists, inspect its triggers; do not add publishing to this lab or confuse a publishing run with these required tests.

**Checkpoint evidence:** workflow PR, substantive review, and green PR run. After its first successful run, configure the main rule to require this workflow's `tests` check. Do not require a check before it exists.


**WAIT FOR {{MEMBER_B}} (B):** do not merge your own workflow. {{MEMBER_C}} (C) must also inspect the run. Once {{MEMBER_B}} (B) merges it, add the required tests check to main's rule where available; record any plan limitation.

## Checkpoint 4 — Your code task

### Put your own name in this guide

**WAIT FOR:** the workflow PR is merged and the assigned-student field at the top has your correct name. If it is still a placeholder, ask the repository owner to complete the name-setup step in the overview.

On the feature branch you create below, edit the top of **this guide in your team's repository**:
- Check that **Assigned student** and **GitHub** identify you; correct them if needed.
- Replace **Personal confirmation** with your own full name and GitHub username, for example `Sam Lee (@samlee) — I accept this role`. Use your actual identity.
- Commit this change yourself, together with your application code and tests. Do not confirm a teammate's guide for them.

The feature commit commands below already stage this guide together with your assigned code/tests.

Your feature PR must contain your guide confirmation, your application change, and your tests. The review should check all three. Branch names, file names, and role letters inside commands remain unchanged.



**WAIT FOR {{MEMBER_B}} (B):** the workflow PR must be merged. Create an issue titled **Validate and trim note titles**, assign yourself, and use its number in your feature PR. {{MEMBER_C}} (C) reviews and merges your feature after Checkpoint 5.

### Student {{MEMBER_A}} (A) — Validate and normalize note titles

**A1. Create your branch locally:**

```sh
git switch main
git pull --ff-only origin main
git switch -c a/title-validation
```


**A2. Edit only the stated pieces of `backend/src/controllers/notes.ts`.**

In `createNote`, replace this existing block:

```ts
if (!title) {
            throw createHttpError(400, "Note must have a title");
        }
```


with:

```ts
if (typeof title !== "string" || title.trim().length === 0) {
            throw createHttpError(400, "Note must have a title");
        }
```


In the `NoteModel.create` object immediately below, replace `title: title,` with:

```ts
title: title.trim(),
```


In `updateNote`, replace this existing block:

```ts
if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }
```


with:

```ts
if (typeof newTitle !== "string" || newTitle.trim().length === 0) {
            throw createHttpError(400, "Note must have a title");
        }
```


Replace `note.title = newTitle;` with:

```ts
note.title = newTitle.trim();
```


Leave the rest of the controller, including session, ownership, ID validation, and status codes, unchanged. The type check protects runtime JSON input even though the TypeScript interface describes a string. The `||` stops evaluation before `.trim()` when the value is not a string.

**A3. Append these tests at the end of `backend/tests/api.test.ts`.** Keep its imports, setup/cleanup, and all five existing tests. The existing `app`, `request`, and `credentials` values are reused; no new imports are needed.

```ts
test.each([
    ["missing", {}],
    ["empty", { title: "" }],
    ["whitespace", { title: "   " }],
    ["number", { title: 42 }],
    ["null", { title: null }],
    ["object", { title: { value: "Title" } }],
])("POST rejects a %s title without saving a note", async (_label, body) => {
    const client = request.agent(app);
    await client.post("/api/users/signup").send(credentials).expect(201);
    await client.post("/api/notes").send(body).expect(400);
    const list = await client.get("/api/notes").expect(200);
    expect(list.body).toEqual([]);
});

test.each([
    ["missing", {}],
    ["empty", { title: "" }],
    ["whitespace", { title: "   " }],
    ["number", { title: 42 }],
    ["null", { title: null }],
    ["object", { title: { value: "Title" } }],
])("PATCH rejects a %s title and preserves the original note", async (_label, body) => {
    const client = request.agent(app);
    await client.post("/api/users/signup").send(credentials).expect(201);
    const created = await client.post("/api/notes")
        .send({ title: "Original", text: "Keep this text" }).expect(201);
    const url = "/api/notes/" + created.body._id;
    await client.patch(url).send(body).expect(400);
    const unchanged = await client.get(url).expect(200);
    expect(unchanged.body.title).toBe("Original");
    expect(unchanged.body.text).toBe("Keep this text");
});

test("POST and PATCH trim titles before saving", async () => {
    const client = request.agent(app);
    await client.post("/api/users/signup").send(credentials).expect(201);
    const created = await client.post("/api/notes")
        .send({ title: "  Team note  ", text: "Shared work" }).expect(201);
    expect(created.body.title).toBe("Team note");
    const url = "/api/notes/" + created.body._id;
    const saved = await client.get(url).expect(200);
    expect(saved.body.title).toBe("Team note");
    const updated = await client.patch(url)
        .send({ title: "  Updated team note  ", text: "Shared work" }).expect(200);
    expect(updated.body.title).toBe("Updated team note");
    const savedAgain = await client.get(url).expect(200);
    expect(savedAgain.body.title).toBe("Updated team note");
});
```


Each `test.each` row becomes a separate test. The tests prove rejected input does not save or overwrite data, and GET confirms trimmed titles were persisted.

**A4. Rebuild and verify locally:**

```sh
docker compose -f compose.test.yaml build backend-test
docker compose -f compose.test.yaml run --rm backend-test
docker compose -f compose.test.yaml run --rm backend-test npm run lint
docker compose -f compose.test.yaml run --rm backend-test npm run typecheck
docker compose -f compose.test.yaml down --volumes
```


**Expected:** 18 backend tests pass (5 original + 6 POST cases + 6 PATCH cases + 1 trimming test); lint and type checking succeed.

**A5. Commit and open the PR:**

```sh
git diff
git add backend/src/controllers/notes.ts backend/tests/api.test.ts
git add "docs/Lab - Team Collab - Student A.md"
git commit -m "feat: validate and trim note titles"
git push -u origin a/title-validation
```


Follow the PR instructions below and request {{MEMBER_C}} (C). **Keep this PR open for Checkpoint 5.**

## Checkpoint 5 — Demonstrate red → green on the same PR

Do this on Student {{MEMBER_A}} (A)'s feature PR **before it merges**. Do not perform it on main.

1. First obtain a green run for the legitimate feature changes.
2. In `backend/tests/api.test.ts`, deliberately change the health expectation from `{ status: "ok" }` to `{ status: "broken" }`. Do not change the health endpoint.
3. Save the test file. While still on `a/title-validation`, run:

```sh
git add backend/tests/api.test.ts
git commit -m "test: demonstrate failing PR check"
git push
git rev-parse HEAD
```

Copy the printed SHA as the failing commit.
4. Open the PR check details. Confirm the backend assertion fails, later normal steps are skipped, and cleanup still runs. Keep the failed run URL and failing commit SHA. Do not merge.
5. Restore the health test to this complete block (replace only the health test, not the file):

```ts
test("health endpoint is available", async () => {
    const response = await request(app).get("/api/health").expect(200);
    expect(response.body).toEqual({ status: "ok" });
});
```

Then run:

```sh
git add backend/tests/api.test.ts
git commit -m "test: restore passing health assertion"
git push
git rev-parse HEAD
```

Keep the passing run URL and repaired commit SHA. Expected: 18 backend tests pass again. A red run remains in the run history; the latest PR check must now be green.
6. Student {{MEMBER_B}} (B) comments with the assertion's expected/actual difference and why the PR was blocked. Student {{MEMBER_C}} (C) verifies cleanup in the failed run and confirms the repaired run passes. Student {{MEMBER_A}} (A) explains the repair in the PR.
7. Ask {{MEMBER_C}} (C) for final approval and a GitHub merge. Do not merge your own PR.

**Checkpoint evidence:** one PR with separate visible failing and repaired commits/runs, and named explanations from all three students. Keep both commits; do not squash away or rewrite the demonstration history. A syntax error or intentionally disabled workflow is not a substitute for a failing assertion.


**WAIT FOR {{MEMBER_B}} (B) AND {{MEMBER_C}} (C):** {{MEMBER_B}} (B) must explain expected versus actual on the failing run; {{MEMBER_C}} (C) must confirm failed-run cleanup and repaired-run success. {{MEMBER_C}} (C) then reviews your latest revision and merges. Do not merge your own feature.

### Your review of {{MEMBER_B}} (B)'s feature

**WAIT FOR {{MEMBER_B}} (B):** {{MEMBER_B}} (B) sends the PR **Explain signup and login**. Read the component and its test. Check that the heading is “Your notes, together”, both navigation choices are explained, and sign-in is required to view notes. Use the review procedure at the end. Request fixes if needed; approve and merge only when green. Save your substantive review link.

## Checkpoint 6 — Coordinate and review the conflict

All three feature PRs must be merged first, including {{MEMBER_A}} (A)'s red → green demonstration. Do not start the conflict branches while features are still being merged.

**WAIT FOR ALL THREE:** agree on a freeze: nobody merges unrelated changes until both conflict branches are created from the same main commit. Each student runs:
```sh
git switch main
git pull --ff-only origin main
git rev-parse HEAD
```

Post the printed SHA in the issue **Planned login guidance conflict**. All three SHAs must match. {{MEMBER_B}} (B) and {{MEMBER_C}} (C) must confirm that both branches exist from this SHA before {{MEMBER_A}} (A) merges {{MEMBER_B}} (B)'s conflict PR.

Create the issue **Planned login guidance conflict** and record the common base SHA. Ask {{MEMBER_B}} (B) and {{MEMBER_C}} (C) to each create their own branch and competing heading change using their guides.

**WAIT FOR {{MEMBER_B}} (B) AND {{MEMBER_C}} (C):** both must post their conflict PR URLs and confirm their branches started from the recorded SHA. In particular, **do not merge {{MEMBER_B}} (B) until {{MEMBER_C}} (C)'s branch already exists**.

1. Review {{MEMBER_B}} (B)'s component and test. {{MEMBER_B}} (B)'s heading must be **Your team's private notes**; {{MEMBER_C}} (C)'s competing heading is **Your notes, organized**.
2. Confirm {{MEMBER_B}} (B)'s PR is green, leave a substantive review, approve, and merge {{MEMBER_B}} (B)'s PR using **Create a merge commit**.
3. Tell {{MEMBER_C}} (C): “{{MEMBER_B}} (B)'s conflict PR is merged. Fetch main and resolve on c/guidance-heading.”
4. **WAIT FOR {{MEMBER_C}} (C):** ask {{MEMBER_C}} (C) for the actual conflict capture before resolution. A report of an automatic merge is insufficient; {{MEMBER_B}} (B)/{{MEMBER_C}} (C) must repeat from a common base with competing edits to the exact same line if no conflict occurs.
5. **WAIT FOR {{MEMBER_B}} (B):** {{MEMBER_B}} (B) reviews and merges {{MEMBER_C}} (C)'s repaired PR. Pull main and inspect the final heading **Your team's notes, organized**, preserved paragraphs, matching test, and green push run.
6. Record why {{MEMBER_B}} (B)'s earlier merge made {{MEMBER_C}} (C)'s branch conflict. Link the base SHA, both PRs, capture, resolution commit, and your review.

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
git switch -c a/evidence
```

Create `docs/team-collab-evidence-A.md`. Copy this template and replace every placeholder with actual results and links:

```md
# Student A — Team collaboration evidence

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
git add docs/team-collab-evidence-A.md
git commit -m "docs: record Student A lab evidence"
git push -u origin a/evidence
```

Open a PR against main. Request {{MEMBER_C}} (C) to review and merge after green checks. Review the evidence PR assigned to you too. Each student submits the repository link and their own evidence-file link on Teams.

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


4. Under **Reviewers**, request {{MEMBER_C}} (C) for your feature PR; {{MEMBER_B}} (B) for your workflow PR. In **Checks**, open **Team collaboration checks → tests** and inspect individual steps. Save the run URL.
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
