To handle merge conflicts when `dev` has diverged from `main`, use a copy or integration branch. This keeps your original feature branch clean while giving you a safe place to resolve conflicts against `dev`.

1. First, start your feature branch from the source of truth:

```text
git checkout main
git pull origin main
git checkout -b feature-new-work
```

2. Make your changes, commit them, and push the clean feature branch:

```text
git add .
git commit -m "feat: add new work"
git push origin feature-new-work
```

This branch should stay based on `main`. Do not use it to resolve conflicts from `dev`.

3. Create a copy branch from your feature branch:

```text
git checkout feature-new-work
git checkout -b feature-new-work-dev-sync
```

This copy branch is your temporary workspace for integrating with `dev`.

4. Bring the latest `dev` changes into the copy branch:

```text
git fetch origin
git merge origin/dev
```

Git will now show any merge conflicts.

5. Resolve the conflicts in your editor. After resolving them, stage and commit the conflict fixes:

```text
git add .
git commit -m "chore: resolve conflicts with dev"
git push origin feature-new-work-dev-sync
```

Since this is only a copy branch, your original `feature-new-work` branch remains untouched.

6. Raise a PR from the copy branch to `dev`:

```text
feature-new-work-dev-sync -> dev
```

This PR should not have conflicts because they were already resolved on the copy branch.

7. If `qa` also has conflicts, repeat the same idea with a separate sync branch:

```text
git checkout feature-new-work
git checkout -b feature-new-work-qa-sync
git fetch origin
git merge origin/qa
```

Resolve conflicts, commit the fixes, push the branch, and raise a PR from:

```text
feature-new-work-qa-sync -> qa
```

8. When the work is approved for production, raise the final PR from the original clean branch to `main`:

```text
feature-new-work -> main
```

Do not merge the `dev-sync` or `qa-sync` copy branch into `main`. Those branches contain environment-specific conflict resolutions.

---

## Why this works

The main idea is to separate your clean work from environment-specific conflict resolution:

- `feature-new-work` contains your actual code changes and stays based on `main`.
- `feature-new-work-dev-sync` is only used to make your work compatible with `dev`.
- `feature-new-work-qa-sync` is only used if `qa` also needs a separate conflict fix.

This protects your original branch from messy lower-environment changes while still allowing QA or dev testing to continue.

IMPORTANT: Always raise the final production PR from the clean feature branch, not from the copy branch.
