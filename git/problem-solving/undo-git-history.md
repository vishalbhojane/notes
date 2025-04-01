To undo a pushed commit but keep the changes locally, you can follow these steps:

1. First, make sure your local repository is up to date:

```git
git fetch origin
   git status
```

2. Find the commit hash of the commit you want to undo. You can use:

```text
git log
```

3. Reset your local branch to the commit before the one you want to undo:

```text
git reset HEAD^
```

Or if you want to go back multiple commits:

```text
git reset HEAD~n
```

(where n is the number of commits to go back)

4. This will undo the commit but keep the changes in your working directory. You can verify this with:

```text
git status
```

5. Force push the change to the remote repository:

```text
git push origin +HEAD
```

The '+' before HEAD forces the push even though it's not a fast-forward.

IMPORTANT: Be cautious with force pushing, especially on shared branches, as it rewrites history.

6. Your changes are now back in your working directory as unstaged changes. You can modify them, stage them, and create a new commit when you're ready.

---

## Alternative method

If you want to keep the commit history intact and create a new commit that undoes the changes: 1. Use `git revert`:

```text
git revert <commit-hash>
```

2. This creates a new commit that undoes the specified commit. 3. Push the new revert commit:

```text
git push origin
```

4. Now, to get the original changes back locally without pushing:

```text
git reset HEAD^
```

This method is safer for shared repositories as it doesn't alter existing history.

Remember, always be careful when modifying git history, especially if you're working on shared branches.
