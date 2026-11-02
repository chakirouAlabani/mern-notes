# Lab — Team Collab

**420-530-LE · Teams of three · Individual grade: /10**

Download the MERN notes starter and collaborate in one **new public team repository, not a fork**. Choose {{MEMBER_A}} (A), {{MEMBER_B}} (B), and {{MEMBER_C}} (C) before starting. Each student follows their own complete guide, including supplied application code, tests, commands, PR reviews, dependency waits, and Docker verification.

| Member | Open your guide | Your main responsibilities |
| --- | --- | --- |
| {{MEMBER_A}} (A) | [Student {{MEMBER_A}} (A)](Lab%20-%20Team%20Collab%20-%20Student%20A.md) | Create repository and invitations; add PR workflow; title validation/tests; review {{MEMBER_B}} (B); coordinate conflict |
| {{MEMBER_B}} (B) | [Student {{MEMBER_B}} (B)](Lab%20-%20Team%20Collab%20-%20Student%20B.md) | Review workflow; signup/login guidance/tests; review {{MEMBER_C}} (C); diagnose failed test; review conflict resolution |
| {{MEMBER_C}} (C) | [Student {{MEMBER_C}} (C)](Lab%20-%20Team%20Collab%20-%20Student%20C.md) | Inspect workflow; accessible deletion/tests; review {{MEMBER_A}} (A); verify failed-run cleanup; resolve conflict |

## Fill the names once in the team repository

GitHub Markdown does not evaluate variables. The templates use `{{MEMBER_A}}`, `{{MEMBER_B}}`, and `{{MEMBER_C}}`, plus matching GitHub username placeholders. A one-time local replacement writes real names into the Markdown files, so GitHub displays them normally.

**Who:** the repository owner (role A), after importing the starter and creating `a/pr-checks` in their guide's Checkpoint 3. **When:** before committing the workflow PR. Both teammates must already have accepted their role assignments and invitations.

Run the following in **PowerShell from the team repository root**. Copy the whole block, edit the six values at the top to the real names/usernames, then run it. Enter usernames without @. Do not run this against the instructor's repository.

```powershell
# Edit only these six values, keeping the quotes.
# Use double single-quotes for an apostrophe: 'O''Neil'.
$members = @{
    A = @{ Name = 'FULL_NAME_A'; GitHub = 'GITHUB_USERNAME_A' }
    B = @{ Name = 'FULL_NAME_B'; GitHub = 'GITHUB_USERNAME_B' }
    C = @{ Name = 'FULL_NAME_C'; GitHub = 'GITHUB_USERNAME_C' }
}
$files = @(
    'docs/Lab - Team Collab.md',
    'docs/Lab - Team Collab - Student A.md',
    'docs/Lab - Team Collab - Student B.md',
    'docs/Lab - Team Collab - Student C.md'
)
# Validate all inputs and read all files before changing any file.
$documents = @{}
foreach ($role in @('A', 'B', 'C')) {
    $person = $members[$role]
    if ([string]::IsNullOrWhiteSpace($person.Name) -or
        $person.Name -like 'FULL_NAME_*' -or
        $person.GitHub -like 'GITHUB_USERNAME_*' -or
        $person.GitHub -notmatch '^[A-Za-z0-9-]+

| Phase | Who acts | Who must wait / next handoff |
| --- | --- | --- |
| 1. Starter | {{MEMBER_A}} (A) downloads ZIP, imports into new repository, invites {{MEMBER_B}} (B)/{{MEMBER_C}} (C) and instructor | {{MEMBER_B}} (B)/{{MEMBER_C}} (C) wait for URL and invitations, then accept and clone |
| 2. Baseline | Each member runs local Docker app and starter checks | {{MEMBER_A}} (A) starts workflow after baseline passes |
| 3. PR checks | {{MEMBER_A}} (A) opens workflow PR; {{MEMBER_C}} (C) inspects run; {{MEMBER_B}} (B) reviews and merges | All wait for workflow merge before feature branches |
| 4. Features | {{MEMBER_A}} (A)/{{MEMBER_B}} (B)/{{MEMBER_C}} (C) apply their own supplied code and tests on separate branches | {{MEMBER_A}} (A) reviews {{MEMBER_B}} (B); {{MEMBER_B}} (B) reviews {{MEMBER_C}} (C); {{MEMBER_C}} (C) reviews {{MEMBER_A}} (A) |
| 5. Red → green | {{MEMBER_A}} (A) keeps feature PR open, deliberately fails test, then repairs it | {{MEMBER_B}} (B) diagnoses failed assertion; {{MEMBER_C}} (C) verifies cleanup and latest green run, then merges {{MEMBER_A}} (A) |
| 6. Conflict preparation | All features merged; all agree on same main SHA; {{MEMBER_B}} (B)/{{MEMBER_C}} (C) create competing branches | {{MEMBER_A}} (A) must wait until **both branches/PRs exist** |
| 7. Conflict resolution | {{MEMBER_A}} (A) reviews/merges {{MEMBER_B}} (B)'s conflict PR first | {{MEMBER_C}} (C) waits for that merge, then fetches main, captures actual conflict, resolves and pushes |
| 8. Resolution review | {{MEMBER_B}} (B) reviews/merges {{MEMBER_C}} (C)'s repaired PR after green checks | All wait for resolution merge before final Docker verification |
| 9. Verification | Each pulls main, runs full checks and live Docker demonstration | Each submits their own evidence via reviewed PR |
| 10. Submission | All three evidence PRs merged | Each pulls final main and submits final SHA, green run, repository and own evidence link |

Keep your teammates informed at each handoff using your team's normal communication channel or PR/issue discussion. A “WAIT FOR” step in your guide is a required dependency, not permission to skip the later task. While waiting, complete independent setup, review available work, or record evidence.

## Shared rules

- The starter import is the only direct push to main. All later changes enter main through reviewed PRs with green checks. Use your own account and named branches.
- Review rotation for features/evidence: {{MEMBER_A}} (A) reviews {{MEMBER_B}} (B), {{MEMBER_B}} (B) reviews {{MEMBER_C}} (C), {{MEMBER_C}} (C) reviews {{MEMBER_A}} (A). Workflow: {{MEMBER_B}} (B) reviews {{MEMBER_A}} (A). Conflict: {{MEMBER_A}} (A) reviews {{MEMBER_B}} (B); {{MEMBER_B}} (B) reviews {{MEMBER_C}} (C).
- The reviewer merges using **Create a merge commit**. Preserve deliberate-failure, repair, and conflict-resolution history.
- Everyone applies and explains their own supplied application change/tests, gives a substantive review, participates in CI/conflict evidence, and verifies the final app on their own computer.
- Never commit .env, credentials, or node_modules. Do not weaken tests to get green.
- This lab uses source-built Docker verification. GHCR publication and online deployment are not required. The earlier [student-lab.md](student-lab.md) is a different lab; its fork/direct-main instructions do not apply.

Expected integrated checks with the supplied code: **18 backend tests, 5 frontend tests**, passing backend lint and type checking. Each member's guide includes the same individual /10 rubric.

## Clarity notes for the team

- Work on your feature and respond to teammate reviews in parallel. A review request should not wait until you finish your own checkpoint.
- Everyone completes the baseline before features merge, so the starting totals remain 5 backend / 2 frontend tests.
- A creates the workflow, so the first workflow PR can be opened before any required test check exists. Require its check only after the first successful run; never require a nonexistent check.
- The “hold until Checkpoint 5” instruction applies only to A's **feature PR**, not A's workflow PR.
- Preserve both conflict branches from the shared base before either competing PR merges.

## Deliverables

One team repository, three feature PRs with substantive reviews, a PR-triggered Compose workflow, visible failed/repaired runs on {{MEMBER_A}} (A)'s PR, two competing conflict PRs with an actual conflict capture and resolution, and live final Docker demonstrations.

Each student creates their own evidence document through a reviewed PR:

- {{MEMBER_A}} (A): `docs/team-collab-evidence-A.md`
- {{MEMBER_B}} (B): `docs/team-collab-evidence-B.md`
- {{MEMBER_C}} (C): `docs/team-collab-evidence-C.md`

Templates and exact submission steps are in the member guides. Submit links on Teams and make sure instructor `chakirouAlabani` has repository access.
) {
        throw "Fill the real name and GitHub username for role $role first (no @)."
    }
}
if (@($members.Values.GitHub | Sort-Object -Unique).Count -ne 3) {
    throw 'Use three different GitHub usernames.'
}
foreach ($file in $files) {
    $path = (Resolve-Path -LiteralPath $file -ErrorAction Stop).Path
    $documents[$file] = [System.IO.File]::ReadAllText($path)
}
$utf8 = New-Object System.Text.UTF8Encoding($false)
foreach ($file in $files) {
    $text = $documents[$file]
    foreach ($role in @('A', 'B', 'C')) {
        $text = $text.Replace(('{{' + 'MEMBER_' + $role + '}}'), $members[$role].Name)
        $text = $text.Replace(('{{' + 'GITHUB_' + $role + '}}'), $members[$role].GitHub)
    }
    [System.IO.File]::WriteAllText(
        (Resolve-Path -LiteralPath $file).Path, $text, $utf8
    )
}
git diff --stat
```


Expected: only the four `docs/Lab - Team Collab*.md` files change. References such as `{{MEMBER_B}} (B)` become the actual name followed by the role. **Keep the role labels A/B/C** so branch names, filenames, code examples, and grading references stay consistent. The script replaces name placeholders; it does not rename files, branches, code identifiers, or links.

Open all four guides and check every student's full name and GitHub username. If anyone is wrong, correct the name before committing. For a manual alternative, use your editor's **Replace All** across these same four files for the six exact placeholders; do not globally replace the single letters A, B, or C.

Stage these four files with the workflow:
```sh
git add "docs/Lab - Team Collab.md" "docs/Lab - Team Collab - Student A.md" "docs/Lab - Team Collab - Student B.md" "docs/Lab - Team Collab - Student C.md"
```


The workflow PR therefore includes the YAML **and four personalized lab documents**. B reviews the names as part of that PR; C checks their own assigned name too. B merges after the first checks pass. This name setup does **not** count as a student confirming their own guide.

**Each student must then edit their own guide personally:** on their feature branch at Checkpoint 4, replace the `Personal confirmation` line with their own full name and @username, commit it with their code/tests, and include it in their feature PR. Do not sign for a teammate. This gives the instructor an individual confirmation commit, in addition to the shared roster.


## Team order and dependencies

| Phase | Who acts | Who must wait / next handoff |
| --- | --- | --- |
| 1. Starter | {{MEMBER_A}} (A) downloads ZIP, imports into new repository, invites {{MEMBER_B}} (B)/{{MEMBER_C}} (C) and instructor | {{MEMBER_B}} (B)/{{MEMBER_C}} (C) wait for URL and invitations, then accept and clone |
| 2. Baseline | Each member runs local Docker app and starter checks | {{MEMBER_A}} (A) starts workflow after baseline passes |
| 3. PR checks | {{MEMBER_A}} (A) opens workflow PR; {{MEMBER_C}} (C) inspects run; {{MEMBER_B}} (B) reviews and merges | All wait for workflow merge before feature branches |
| 4. Features | {{MEMBER_A}} (A)/{{MEMBER_B}} (B)/{{MEMBER_C}} (C) apply their own supplied code and tests on separate branches | {{MEMBER_A}} (A) reviews {{MEMBER_B}} (B); {{MEMBER_B}} (B) reviews {{MEMBER_C}} (C); {{MEMBER_C}} (C) reviews {{MEMBER_A}} (A) |
| 5. Red → green | {{MEMBER_A}} (A) keeps feature PR open, deliberately fails test, then repairs it | {{MEMBER_B}} (B) diagnoses failed assertion; {{MEMBER_C}} (C) verifies cleanup and latest green run, then merges {{MEMBER_A}} (A) |
| 6. Conflict preparation | All features merged; all agree on same main SHA; {{MEMBER_B}} (B)/{{MEMBER_C}} (C) create competing branches | {{MEMBER_A}} (A) must wait until **both branches/PRs exist** |
| 7. Conflict resolution | {{MEMBER_A}} (A) reviews/merges {{MEMBER_B}} (B)'s conflict PR first | {{MEMBER_C}} (C) waits for that merge, then fetches main, captures actual conflict, resolves and pushes |
| 8. Resolution review | {{MEMBER_B}} (B) reviews/merges {{MEMBER_C}} (C)'s repaired PR after green checks | All wait for resolution merge before final Docker verification |
| 9. Verification | Each pulls main, runs full checks and live Docker demonstration | Each submits their own evidence via reviewed PR |
| 10. Submission | All three evidence PRs merged | Each pulls final main and submits final SHA, green run, repository and own evidence link |

Keep your teammates informed at each handoff using your team's normal communication channel or PR/issue discussion. A “WAIT FOR” step in your guide is a required dependency, not permission to skip the later task. While waiting, complete independent setup, review available work, or record evidence.

## Shared rules

- The starter import is the only direct push to main. All later changes enter main through reviewed PRs with green checks. Use your own account and named branches.
- Review rotation for features/evidence: {{MEMBER_A}} (A) reviews {{MEMBER_B}} (B), {{MEMBER_B}} (B) reviews {{MEMBER_C}} (C), {{MEMBER_C}} (C) reviews {{MEMBER_A}} (A). Workflow: {{MEMBER_B}} (B) reviews {{MEMBER_A}} (A). Conflict: {{MEMBER_A}} (A) reviews {{MEMBER_B}} (B); {{MEMBER_B}} (B) reviews {{MEMBER_C}} (C).
- The reviewer merges using **Create a merge commit**. Preserve deliberate-failure, repair, and conflict-resolution history.
- Everyone applies and explains their own supplied application change/tests, gives a substantive review, participates in CI/conflict evidence, and verifies the final app on their own computer.
- Never commit .env, credentials, or node_modules. Do not weaken tests to get green.
- This lab uses source-built Docker verification. GHCR publication and online deployment are not required. The earlier [student-lab.md](student-lab.md) is a different lab; its fork/direct-main instructions do not apply.

Expected integrated checks with the supplied code: **18 backend tests, 5 frontend tests**, passing backend lint and type checking. Each member's guide includes the same individual /10 rubric.

## Deliverables

One team repository, three feature PRs with substantive reviews, a PR-triggered Compose workflow, visible failed/repaired runs on {{MEMBER_A}} (A)'s PR, two competing conflict PRs with an actual conflict capture and resolution, and live final Docker demonstrations.

Each student creates their own evidence document through a reviewed PR:
- {{MEMBER_A}} (A): `docs/team-collab-evidence-A.md`
- {{MEMBER_B}} (B): `docs/team-collab-evidence-B.md`
- {{MEMBER_C}} (C): `docs/team-collab-evidence-C.md`

Templates and exact submission steps are in the member guides. Submit links on Teams and make sure instructor `chakirouAlabani` has repository access.
