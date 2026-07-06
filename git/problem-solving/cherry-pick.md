To apply a specific commit from one branch onto another without merging the whole branch, use `git cherry-pick`. This is useful when you only need one fix or feature, not the entire branch history.

1. First, make sure your local repository is up to date:

```text
git fetch origin
git status
```

2. Switch to the branch where you want to apply the commit:

```text
git checkout target-branch
git pull origin target-branch
```

3. Find the commit hash you want to cherry-pick. You can use:

```text
git log source-branch
```

Or view commits on the remote branch:

```text
git log origin/source-branch
```

Copy the commit hash of the commit you want to apply.

4. Cherry-pick the commit onto your current branch:

```text
git cherry-pick <commit-hash>
```

Git creates a new commit on `target-branch` with the same changes as the original commit.

5. If the cherry-pick succeeds, push the updated branch:

```text
git push origin target-branch
```

6. If Git reports conflicts, resolve them in your editor, then continue the cherry-pick:

```text
git add .
git cherry-pick --continue
```

If you want to cancel the cherry-pick instead:

```text
git cherry-pick --abort
```

---

## Common scenarios

### Cherry-pick multiple commits

To apply several commits in order:

```text
git cherry-pick <commit-hash-1> <commit-hash-2> <commit-hash-3>
```

Or cherry-pick a range of commits:

```text
git cherry-pick <oldest-commit-hash>^..<newest-commit-hash>
```

### Cherry-pick without committing

If you want to apply the changes but review or modify them before creating a commit:

```text
git cherry-pick -n <commit-hash>
```

The `-n` flag (or `--no-commit`) stages the changes without committing.

### Cherry-pick from another branch without checking it out

You can cherry-pick while staying on your target branch:

```text
git checkout target-branch
git cherry-pick <commit-hash>
```

You do not need to check out the source branch first.

---

## When to use cherry-pick

Cherry-pick is a good fit when:

- You need a hotfix from `main` on a release branch.
- You want one commit from a feature branch on `dev`, but not the whole branch.
- You are backporting a bug fix to an older branch.
- You need to move a commit to a cleaner branch after resolving conflicts elsewhere.

Cherry-pick is usually not the best choice when:

- You need most or all commits from another branch. Use merge or rebase instead.
- The source branch has many dependent commits. Cherry-picking one commit may miss required earlier changes.

IMPORTANT: A cherry-picked commit gets a new commit hash on the target branch. Git does not automatically track that it came from the original commit, so avoid cherry-picking the same change twice unless you intend to.

Remember, always resolve conflicts carefully during cherry-pick, especially when the source and target branches have diverged significantly.
