# Lab — Team Collab

**420-530-LE · Teams of three · Individual grade: /10**

Build a small improvement to this MERN notes application while practising shared-repository collaboration. Each student must author code and tests, review a teammate's pull request, and explain the final application.

This is a separate lab from [student-lab.md](student-lab.md). Use its incremental checkpoint approach, but follow **this document's shared repository, branch, and PR rules**. The older lab's instructions to fork, push directly to main, and publish GHCR images do not apply here. No image publication or online deployment is required.

## Before you start

Setup your github:

```sh
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR GITHUB EMAIL"
```


Assign Student A, B, and C. These are task assignments, not permanent roles: everyone codes, tests, reviews, and verifies Docker.

Replace only explicit uppercase placeholders in setup, PR descriptions, and evidence. Terminal commands run locally from the repository root.

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

1. Open [chakirouAlabani/mern-notes](https://github.com/chakirouAlabani/mern-notes), select **Code → Download ZIP**, and extract it.
2. One teammate creates a **new empty repository**, for example `420-530-team-03-notes`. **Do not fork** and do not initialize the remote with a README, licence, or .gitignore. Visibility should be public.
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
4. The owner opens **Settings → Collaborators → Add people** and invites both teammates. Both accept. Invite **chakirouAlabani** for grading and send the shared repository link on Teams.
5. The other two teammates clone the **new team repository**, not the instructor's repository. Replace OWNER and TEAM-REPOSITORY, then run:

```sh
git clone https://github.com/OWNER/TEAM-REPOSITORY.git
cd TEAM-REPOSITORY
git remote -v
```

The owner stays in the imported project folder. Everyone's origin URL must identify the same team repository. From now on, all three work in clones of that same remote.

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

Each student performs this checkpoint locally. In your editor, copy root `.env.example` to a new root file named `.env`. Alternatively, in PowerShell run `Copy-Item .env.example .env` once (do not overwrite an existing configured file). In `.env`, set `SESSION_SECRET` to your own long random local value. For example, the line has this form; replace the placeholder:

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

**Checkpoint evidence:** each student records baseline results. If something fails, inspect the first failure and fix your setup before adding features. Rebuild test images after code/test edits: these images contain copied source.

## Checkpoint 3 — Add PR-triggered automated checks

Student A authors `a/pr-checks`; Student B reviews and merges it. Student C inspects the run and records what each service checks.

First create the branch locally:

```sh
git switch main
git pull --ff-only origin main
git switch -c a/pr-checks
```

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

Open **Pull requests → New pull request**, select base **main** and compare **a/pr-checks**, and create the PR. Request B as reviewer. Use the detailed review procedure in Checkpoint 4 for this PR too. Confirm checks run **before merge** and all seven starter tests pass. Review and merge it before opening the feature PRs. The push trigger also verifies integrated main. If an inherited workflow exists, inspect its triggers; do not add publishing to this lab or confuse a publishing run with these required tests.

**Checkpoint evidence:** workflow PR, substantive review, and green PR run. Configure the main rule to require this workflow's `tests` check.

## Checkpoint 4 — Copy the three code changes and their tests

The code below is supplied so you can concentrate on collaboration. Copy it into the stated locations; do not invent a different feature. You are responsible for understanding, testing, committing, and explaining your own change. “Authored” in the rubric means you personally apply and commit your assigned work and can explain it, even when the starter code is supplied here.

Create issues using **Issues → New issue** with these titles and assignees:

| Student | Issue title | Branch | Reviewer / merger |
| --- | --- | --- | --- |
| A | Validate and trim note titles | a/title-validation | C |
| B | Explain signup and login | b/login-guidance | A |
| C | Make note deletion accessible | c/delete-button | B |

Copy each task's expected result into its issue description. Record the issue number for your PR. All three start from main after Checkpoint 3 is merged. B and C may merge when green; **A must complete Checkpoint 5 on the open feature PR before merging**.

### Student A — Validate and normalize note titles

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
git commit -m "feat: validate and trim note titles"
git push -u origin a/title-validation
```


Follow the PR instructions below and request C. **Keep this PR open for Checkpoint 5.**

### Student B — Give logged-out users clear guidance

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


**Expected:** 3 frontend tests pass if C's task has not merged; 5 if C's task has merged and is included in your branch. The two original tests remain.

**B5. Commit and push:**

```sh
git diff
git add frontend/src/components/NotesPageLoggedOutView.tsx frontend/src/components/NotesPageLoggedOutView.test.tsx
git commit -m "feat: explain how to access notes"
git push -u origin b/login-guidance
```


Open a PR targeting main, request A, and follow the review procedure below.

### Student C — Make note deletion keyboard accessible

**C1. Create your branch:**

```sh
git switch main
git pull --ff-only origin main
git switch -c c/delete-button
```


**C2. In `frontend/src/components/Note.tsx`, find the `<MdDelete ... />` element inside `Card.Title`.** Replace that entire element, including its existing `onClick`, with:

```tsx
<button
    type="button"
    className="btn btn-link text-muted ms-auto p-0"
    aria-label={"Delete note: " + title}
    onClick={(event) => {
        event.stopPropagation();
        onDeleteNoteClicked(note);
    }}
>
    <MdDelete aria-hidden="true" focusable="false" />
</button>
```


Keep the existing `MdDelete` import and all surrounding component code. The Bootstrap classes retain the icon's position. A native button provides Tab focus and keyboard activation. The accessible name includes the note title; the decorative icon is hidden from assistive technology. `stopPropagation()` prevents the card's click handler from also opening the note.

**C3. Create `frontend/src/components/Note.test.tsx` with:**

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import Note from './Note';

const note = {
    _id: 'team-note',
    title: 'Team note',
    text: 'Review before merging',
    createdAt: '2026-01-01T12:00:00Z',
    updatedAt: '2026-01-01T12:00:00Z',
};

test('delete button deletes once without opening the note', () => {
    const open = jest.fn();
    const remove = jest.fn();
    render(<Note note={note} onNoteClicked={open} onDeleteNoteClicked={remove} />);
    const button = screen.getByRole('button', { name: 'Delete note: Team note' });
    expect(button).toHaveAttribute('type', 'button');
    fireEvent.click(button);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith(note);
    expect(open).not.toHaveBeenCalled();
});

test('clicking the title opens the note without deleting it', () => {
    const open = jest.fn();
    const remove = jest.fn();
    render(<Note note={note} onNoteClicked={open} onDeleteNoteClicked={remove} />);
    fireEvent.click(screen.getByText('Team note'));
    expect(open).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith(note);
    expect(remove).not.toHaveBeenCalled();
});
```


**C4. Rebuild and test:**

```sh
docker compose -f compose.test.yaml build frontend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml down --volumes
docker compose up --build -d --wait
```


**Expected:** 4 frontend tests pass without B's change; 5 with it. In the browser, sign in and create two notes. Press Tab until a delete button has focus; press Enter to delete one. Repeat using Space for the other. Neither action should open the edit dialog. The automated tests verify callbacks and bubbling; this browser check verifies native keyboard behavior.

**C5. Commit and push:**

```sh
git diff
git add frontend/src/components/Note.tsx frontend/src/components/Note.test.tsx
git commit -m "feat: make note deletion keyboard accessible"
git push -u origin c/delete-button
```


Open a PR targeting main, request B, and follow the procedure below.

### Open, review, and merge each PR on GitHub

1. Open the **team repository → Pull requests → New pull request**.
2. Select **base: main** and **compare: your branch**. Inspect **Files changed**; only your assigned files should appear.
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


4. Under **Reviewers**, request the student named in the assignment table. In **Checks**, open **Team collaboration checks → tests** and inspect individual steps. Save the run URL.
5. Reviewer: open **Files changed**, select a line's **+** button, and leave a specific comment explaining a checked behavior or a needed correction. Use **Review changes → Request changes** for a required fix. Do not copy a review claim without checking it.
6. Author: make requested edits on the same branch, rebuild/retest, commit the changed files, and `git push`. The existing PR updates automatically. Reply to the review with what changed.
7. Reviewer: inspect the latest revision and results, resolve addressed discussions, and use **Review changes → Approve**.
8. When checks are green, the reviewer selects **Merge pull request → Create a merge commit → Confirm merge**. Use merge commits for this lab so demonstration commits stay visible. **Do not merge A until Checkpoint 5 is complete.**
9. Everyone updates their local main with `git switch main` and `git pull --ff-only origin main`. Do not copy files between teammates' folders.

**Expected integrated result after A, B, and C merge:** 18 backend tests and 5 frontend tests, plus passing lint/type checking. Tests on an older feature branch may contain fewer teammate tests until it incorporates current main.

## Checkpoint 5 — Demonstrate red → green on the same PR

Do this on Student A's feature PR **before it merges**. Do not perform it on main.

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


### Exact edits and commands for the conflict exercise

Perform these steps at the matching numbered steps above. B and C must create their branches **before B's conflict PR merges**.

**Both B and C — synchronize before branching:**

```sh
git switch main
git pull --ff-only origin main
git rev-parse HEAD
```


Compare the printed SHAs; they must be identical. B then runs `git switch -c b/guidance-heading`; C runs `git switch -c c/guidance-heading`. Neither uses a newly pulled main to create C's branch after B merges.

**B — replace only the heading line in the component with:**

```tsx
<h1 id="notes-welcome-heading">Your team's private notes</h1>
```


In `NotesPageLoggedOutView.test.tsx`, replace only the heading expectation with:

```tsx
expect(screen.getByRole('heading', { level: 1, name: "Your team's private notes" }))
        .toBeInTheDocument();
```


**C — on C's branch, replace the same component line with:**

```tsx
<h1 id="notes-welcome-heading">Your notes, organized</h1>
```


Replace the heading expectation in the test with:

```tsx
expect(screen.getByRole('heading', { level: 1, name: "Your notes, organized" }))
        .toBeInTheDocument();
```


**Both — test your own branch and stage the two files:**

```sh
docker compose -f compose.test.yaml build frontend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml down --volumes
git add frontend/src/components/NotesPageLoggedOutView.tsx frontend/src/components/NotesPageLoggedOutView.test.tsx
git commit -m "feat: revise logged-out heading"
```


B runs `git push -u origin b/guidance-heading`; C runs `git push -u origin c/guidance-heading`. Open both PRs against main. Expected: 5 frontend tests pass on each branch. A reviews and merges B first, following the PR procedure.

**C — after B merges, produce the conflict locally:**

```sh
git switch c/guidance-heading
git fetch origin
git merge origin/main
git status
```


The merge should stop and report conflicting files. This is expected. Your component will contain a block like this:

```text
<<<<<<< HEAD
            <h1 id="notes-welcome-heading">Your notes, organized</h1>
=======
            <h1 id="notes-welcome-heading">Your team's private notes</h1>
>>>>>>> origin/main
```


Capture this before editing. `HEAD` is C's current branch; `origin/main` contains B's merged change. A similar block will occur in the test.

Replace the **whole conflict block** in the component, including all three marker lines, with:

```tsx
<h1 id="notes-welcome-heading">Your team's notes, organized</h1>
```


Replace the **whole conflicting expectation block** in the test with:

```tsx
expect(screen.getByRole('heading', { level: 1, name: "Your team's notes, organized" }))
        .toBeInTheDocument();
```


Preserve all other paragraphs and assertions. Save both files, then run:

```sh
git diff --check
docker compose -f compose.test.yaml build frontend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml down --volumes
git add frontend/src/components/NotesPageLoggedOutView.tsx frontend/src/components/NotesPageLoggedOutView.test.tsx
git diff --cached
git status
git commit -m "merge: combine both login guidance headings"
git push
git rev-parse HEAD
```


Expected: no remaining conflict markers, 5 passing frontend tests, and a resolution commit on C's branch. Copy that SHA. Open C's existing PR; B reviews the resolution and merges only after the new run is green. Do not create a replacement PR that hides the conflict history.


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


### Copy-ready evidence document

At the end, A creates `a/team-evidence` from current main and creates `docs/team-collab-evidence.md` with the template below. Replace every uppercase placeholder with actual results and links. A fills the shared fields and A's section, then opens a PR. After A's PR merges, B and C each fill their own section from their own branch through a follow-up reviewed PR, so the final file has individually attributable updates. Work sequentially and pull main before each evidence branch to avoid an unnecessary second conflict.

```md
# Team collaboration evidence

## Team and source
- Team repository: URL
- Source: https://github.com/chakirouAlabani/mern-notes
- Download date: DATE
- A: NAME / GITHUB_USERNAME
- B: NAME / GITHUB_USERNAME
- C: NAME / GITHUB_USERNAME
- Collaborators accepted; instructor invited: DETAILS
- Main protection or manual enforcement limitation: DETAILS

## Shared checkpoints
- Workflow PR and green run: URLS
- Task issues: URLS
- Feature PRs: URLS
- Failed run / commit: URL / SHA
- Repaired run / commit: URL / SHA
- Conflict base: SHA
- B and C conflict PRs: URLS
- Conflict capture: IMAGE_OR_LINK
- Resolution commit and green run: SHA / URL
- Final backend/frontend totals: ACTUAL_COUNTS

## Student A
- Code and tests I applied and can explain: PR_URL_AND_EXPLANATION
- Review I gave: REVIEW_URL_AND_WHAT_I_CHECKED
- CI failure contribution and explanation: DETAILS
- Conflict contribution and explanation: DETAILS
- Local baseline results: RESULTS
- Final main SHA and Docker results: SHA_AND_RESULTS
- Keyboard/CRUD/persistence checks: RESULTS
- Live demonstration: DATE_AND_RESULT

## Student B
COPY_THE_SAME_FIELDS_AND_FILL_WITH_BS_OWN_EVIDENCE

## Student C
COPY_THE_SAME_FIELDS_AND_FILL_WITH_CS_OWN_EVIDENCE
```


For your own evidence update, create a unique branch such as `b/my-evidence`, edit only your section, then stage `docs/team-collab-evidence.md`, commit, push, and use the same PR review process. Submit the final SHA and run URL on Teams after the last evidence PR merges; you do not need another commit merely to insert that commit's own SHA into the file.


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
