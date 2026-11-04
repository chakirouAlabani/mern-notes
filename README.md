# Lab — Team collaboration in one hour

**420-530-LE · Teams of three · Individual grade /10**

**Goal:** contribute one small change through **branch → commit → push → PR → review → merge**. Everyone follows this page. Your instructor provides the tests and workflow.

## Before the timed hour

Your team repository must already exist, contain this starter on main, and have all three students plus instructor `chakirouAlabani` as collaborators. Each student has their own clone and working GitHub authentication. Docker Desktop, the baseline app, test images, and the seven starter tests must work on each laptop. Preparation instructions are in the [instructor checklist](docs/Instructor%20-%20One%20Hour%20Collab.md).

Use the **team repository**, not the instructor's source repository. In your clone, `git remote -v` must show your team URL. Keep your local `.env` out of Git. Each person uses their own GitHub account and Git name/email.

## 0–10 minutes — Watch the example and choose a task

Watch your instructor demonstrate the complete PR cycle. Then assign A, B, C:

| Student | Application change | Branch command (run only yours) | Reviewer who also merges |
| --- | --- | --- | --- |
| A | Logged-out welcome | `git switch -c a/welcome` | C |
| B | Empty-notes guidance | `git switch -c b/empty-notes` | A |
| C | Privacy-page guidance | `git switch -c c/privacy` | B |

A reviews B, B reviews C, C reviews A. Review as soon as the teammate's PR is ready; do not wait to finish your own work. Each person changes **one different file**. Do not edit this README or a teammate's file.

## 10–25 minutes — Make your change and open a PR

### 1. Start from main

Run from the folder containing `compose.yaml`:
```sh
git switch main
git pull --ff-only origin main
git status
```

Expected: clean working tree. If you have unrelated changes, ask your instructor before proceeding.

Run **only your own branch command from the assignment table above**. Expected: Git says it switched to your new branch. Do not create your teammates' branches.

### 2. Copy your supplied change

**A:** replace the entire contents of `frontend/src/components/NotesPageLoggedOutView.tsx` with:
```tsx
const NotesPageLoggedOutView = () => {
    return (
        <section>
            <h1>Welcome to Team Notes</h1>
            <p>Choose Sign Up to create an account, or Log In to see your notes.</p>
        </section>
    );
};

export default NotesPageLoggedOutView;
```


**B:** in `frontend/src/components/NotesPageLoggedInView.tsx`, find:
```tsx
<p>You don't have any notes yet</p>
```

Replace only that element with:
```tsx
<p>No notes yet. Choose Add new note to create your first note.</p>
```

Keep the surrounding conditional and the rest of the file unchanged.

**C:** replace the entire contents of `frontend/src/pages/PrivacyPage.tsx` with:
```tsx
const PrivacyPage = () => {
    return (
        <section>
            <h1>Your notes and privacy</h1>
            <p>Sign in to view your own notes. Log out when using a shared computer.</p>
        </section>
    );
};

export default PrivacyPage;
```


### 3. Check, commit, and push

Save your file and run `git diff`. Expected: only your assigned file changed. Run **only your own** command block.

**A:**
```sh
git add frontend/src/components/NotesPageLoggedOutView.tsx
git commit -m "ui: improve the logged-out welcome"
git push -u origin a/welcome
```

**B:**
```sh
git add frontend/src/components/NotesPageLoggedInView.tsx
git commit -m "ui: explain how to create the first note"
git push -u origin b/empty-notes
```

**C:**
```sh
git add frontend/src/pages/PrivacyPage.tsx
git commit -m "ui: clarify privacy guidance"
git push -u origin c/privacy
```


Open the team repository on GitHub → **Pull requests → New pull request**. Select **base: main**, **compare: your branch**, then **Create pull request**. Use a title describing your change. Copy and fill this description:
```text
Name / GitHub: YOUR NAME / @USERNAME
Change: One sentence describing my assigned change.
Expected result: The text the user should now see.
```

Request your assigned reviewer. In **Checks**, open **Team PR checks → tests**.

Expected: 5 backend and 2 frontend tests, successful lint/typecheck, successful cleanup. While checks run, review your teammate's diff. The checks protect existing tested behavior; they do not prove your new wording is correct, so the reviewer must check it.

## 25–40 minutes — Review and merge

### 4. Review a teammate's PR

Open the PR assigned to you in the table, then **Files changed**. Check:
- Only their assigned file changed.
- The supplied text is present and the surrounding code is preserved.
- No credentials, .env, or unrelated files were committed.
- The latest automated checks pass.

Leave one **specific** comment describing what you checked. Example: “The empty message tells the user which existing button creates a note, and the notes-grid condition is preserved.” Write your own observation.

If a fix is needed, use **Review changes → Request changes**. The author edits their same branch, stages the corrected file, commits, and runs `git push`; the PR updates automatically. Recheck the new revision.

When satisfied, choose **Review changes → Approve**. An author cannot approve their own PR.

### 5. The reviewer merges

**WAIT FOR green checks and approval.** The reviewer selects **Merge pull request → Create a merge commit → Confirm merge**.

Merge in this order:
1. C merges A's welcome PR.
2. A merges B's empty-notes PR.
3. B merges C's privacy PR.

Tell the next reviewer when your merge is done. Do not push directly to main. If GitHub requires the branch to be updated, use **Update branch**, wait for the new checks, and review again. If a conflict appears, stop and ask your instructor; the supplied tasks are designed to merge cleanly.

## 40–50 minutes — Check final main

**WAIT FOR all three PRs to be merged**, then everyone runs:
```sh
git switch main
git pull --ff-only origin main
git log -3 --oneline
docker compose up --build -d --wait
docker compose ps
```

Open http://localhost:3000 and check:
- Logged out: **Welcome to Team Notes** and the signup/login guidance.
- Signed in with no notes: the new empty-notes guidance. Use a new test account if your account already has notes.
- At http://localhost:3000/privacy: **Your notes and privacy** and the shared-computer guidance.
- Create, edit, and delete one note to check the app still works.

Each student posts this short comment on **their own merged PR**:
```text
Final main checked: SHA (from git rev-parse HEAD)
My review of a teammate: URL
Local app: all three messages and note create/edit/delete PASS (or describe the problem)
```

Then stop the app with `docker compose down`. No live demonstration, separate report, screenshots, or new evidence PR is required. Grading uses the team repository only.

## 50–60 minutes — Finish and resolve problems

Use this buffer to fix failed checks, missing reviews, or app problems. Send the instructor the team repository link if they do not already have it.

| Problem | What to do |
| --- | --- |
| Push denied | Check team origin URL, accepted invitation, and GitHub login |
| No checks | Confirm PR base main, Actions enabled, and .github/workflows/team-pr.yml exists |
| Red checks | Open first failed step; fix your branch and push; never skip checks |
| Reviewer unavailable in selector | Check invitation was accepted; they can still open PR → Files changed → Review changes |
| Merge blocked | Check latest approval, conversations, checks, and main's rule |
| Old app text | Save files, pull final main, rebuild app images, refresh browser |

## Individual grading /10

| Criterion | Points | Repository evidence |
| --- | ---: | --- |
| Own branch, commit, correct supplied change | 3 | Your commit and single-file feature diff |
| Clear PR targeting main with passing checks | 2 | Your name/description and latest check results |
| Specific review of a teammate | 3 | Your review comment and approval or requested correction |
| Merge participation and final check | 2 | 1: merge of the PR assigned to you; 1: your final verification comment |
| **Total** | **10** | **Each student graded individually** |

**Done:** your own PR is merged, you reviewed and merged the assigned teammate's PR, and you posted your final comment.
