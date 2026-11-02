# Lab — Team Collab

**420-530-LE · Teams of three · Individual grade: /10**

Download the MERN notes starter and collaborate in one **new public team repository, not a fork**. Choose A, B, and C before starting. Each student follows their own complete guide, including supplied application code, tests, commands, PR reviews, dependency waits, and Docker verification.

| Member | Open your guide | Your main responsibilities |
| --- | --- | --- |
| A | [Student A](Lab%20-%20Team%20Collab%20-%20Student%20A.md) | Create repository and invitations; add PR workflow; title validation/tests; review B; coordinate conflict |
| B | [Student B](Lab%20-%20Team%20Collab%20-%20Student%20B.md) | Review workflow; signup/login guidance/tests; review C; diagnose failed test; review conflict resolution |
| C | [Student C](Lab%20-%20Team%20Collab%20-%20Student%20C.md) | Inspect workflow; accessible deletion/tests; review A; verify failed-run cleanup; resolve conflict |

## Identify yourself in your guide

After choosing roles, each student edits their own guide in the **team repository**. Fill the **Assigned student** and **GitHub** fields at the top and sign the **Personal confirmation** line. Commit that change with your code/tests in your feature PR at Checkpoint 4. Do not fill or sign a teammate's guide.

Keep the role labels A/B/C and the supplied filenames and branch names unchanged. The instructor will match your guide, commits, PR, and GitHub account.

## Team order and dependencies

| Phase | Who acts | Who must wait / next handoff |
| --- | --- | --- |
| 1. Starter | A downloads ZIP, imports into new repository, invites B/C and instructor | B/C wait for URL and invitations, then accept and clone |
| 2. Baseline | Each member runs local Docker app and starter checks | A starts workflow after baseline passes |
| 3. PR checks | A opens workflow PR; C inspects run; B reviews and merges | All wait for workflow merge before feature branches |
| 4. Features | A/B/C apply their own supplied code and tests on separate branches | A reviews B; B reviews C; C reviews A |
| 5. Red → green | A keeps feature PR open, deliberately fails test, then repairs it | B diagnoses failed assertion; C verifies cleanup and latest green run, then merges A |
| 6. Conflict preparation | All features merged; all agree on same main SHA; B/C create competing branches | A must wait until **both branches/PRs exist** |
| 7. Conflict resolution | A reviews/merges B's conflict PR first | C waits for that merge, then fetches main, captures actual conflict, resolves and pushes |
| 8. Resolution review | B reviews/merges C's repaired PR after green checks | All wait for resolution merge before final Docker verification |
| 9. Verification | Each pulls main, runs full checks and live Docker demonstration | Instructor checks the running app and individual understanding |
| 10. Submission | Each student sends a short Teams message | Name/GitHub, repository, feature PR, review link, and 1–2 contribution sentences |

Keep your teammates informed at each handoff using your team's normal communication channel or PR/issue discussion. A “WAIT FOR” step in your guide is a required dependency, not permission to skip the later task. While waiting, complete independent setup, review available work, or inspect available PRs.

## Shared rules

- The starter import is the only direct push to main. All later changes enter main through reviewed PRs with green checks. Use your own account and named branches.
- Review rotation for features: A reviews B, B reviews C, C reviews A. Workflow: B reviews A. Conflict: A reviews B; B reviews C.
- The reviewer merges using **Create a merge commit**. Preserve deliberate-failure, repair, and conflict-resolution history.
- Everyone applies and explains their own supplied application change/tests, gives a substantive review, participates in CI/conflict evidence, and verifies the final app on their own computer.
- Never commit .env, credentials, or node_modules. Do not weaken tests to get green.
- This lab uses source-built Docker verification. GHCR publication and online deployment are not required. The earlier [student-lab.md](student-lab.md) is a different lab; its fork/direct-main instructions do not apply.

Expected integrated checks with the supplied code: **18 backend tests, 5 frontend tests**, passing backend lint and type checking. Each member's guide includes the same individual /10 rubric.

## Deliverables

One team repository, three feature PRs with substantive reviews, a PR-triggered Compose workflow, visible failed/repaired runs on A's PR, two competing conflict PRs with an actual conflict capture and resolution, and live final Docker demonstrations.

Each student sends a short Teams message with their name/GitHub username, repository URL, feature PR URL, review URL, and 1–2 sentences about their contribution. No separate evidence files or evidence PRs are required.

Shared proof stays in the existing PRs: A posts the failed/passing run links in A's feature PR; C posts one actual conflict capture in C's conflict PR. Each student's required short review/CI/conflict comments remain there too. Do not duplicate screenshots, logs, or commit SHAs in a report.

The instructor grades directly from the repository and each student's live demonstration. Make sure instructor `chakirouAlabani` has repository access.
