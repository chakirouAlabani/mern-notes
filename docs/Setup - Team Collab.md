# Team setup — Complete before the one-hour lab

Everyone follows [the common lab guide](../README.md) after setup. Assign one repository owner and make sure each team member uses their own GitHub account.

## 1. Create one shared repository

1. Download a ZIP of the provided starter's **main** branch and extract it.
2. The owner creates a new empty public GitHub repository. Do not fork or initialize it with extra files.
3. From the extracted folder containing `compose.yaml`, replace the URL placeholders and run:
```sh
git init
git branch -M main
git add .
git commit -m "chore: import collaboration starter"
git remote add origin https://github.com/OWNER/TEAM-REPOSITORY.git
git push -u origin main
```
4. Under **Settings → Collaborators**, invite the other two team members. Both must accept.
5. The other two members clone the team repository:
```sh
git clone https://github.com/OWNER/TEAM-REPOSITORY.git
cd TEAM-REPOSITORY
```
The owner keeps working in the imported folder. Everyone runs `git remote -v` and confirms the same team repository URL.

## 2. Check Git identity and repository settings

Each member runs these with their own values:
```sh
git config user.name "YOUR NAME"
git config user.email "YOUR GITHUB EMAIL"
```
Make sure GitHub authentication works on each computer; never share credentials.

Enable GitHub Actions in the team repository. The initial import should run **Team PR checks** successfully. The supplied `.github/workflows/team-pr.yml` runs the existing tests automatically.

The repository owner enables merge commits and, where available, adds a main branch rule requiring a PR, one approval, and the successful `tests` check. Select the check only after its first run exists. Do not require branches to be up to date for this short exercise. If a rule is unavailable, follow the same approval and green-check requirements manually.

## 3. Prepare Docker on every computer

Start Docker Desktop. Copy root `.env.example` to root `.env` and set `SESSION_SECRET` to your own long random local value. Keep .env out of Git. The GHCR image variables are unused in this lab.

Run from the repository root, one command at a time:
```sh
docker compose -f compose.test.yaml build
docker compose -f compose.test.yaml run --rm backend-test
docker compose -f compose.test.yaml run --rm frontend-test
docker compose -f compose.test.yaml run --rm backend-test npm run lint
docker compose -f compose.test.yaml run --rm backend-test npm run typecheck
docker compose -f compose.test.yaml down --volumes
docker compose up --build -d --wait
docker compose ps
```
Expected: **5 backend tests, 2 frontend tests**, successful lint/type checking, and a healthy app at http://localhost:3000. Sign up and create one note. The test stack uses a separate temporary database.

First-time downloads and builds may take several minutes. Finish them before the timed hour. Stop the app with `docker compose down` when finished; do not add `--volumes` to the app command unless you intend to delete its saved data.

## Ready checklist

- [ ] Three accepted collaborators, each with their own account and working clone.
- [ ] The same team origin URL on all computers.
- [ ] A green Team PR checks run and the agreed PR/approval rules.
- [ ] Docker app startup and all seven starter tests pass on every computer.
- [ ] Everyone can open the [common lab guide](../README.md) and identify their assigned file, branch, and reviewer.
