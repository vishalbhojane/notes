### Empty Commit

```bash
git commit --allow-empty -m "Empty Commit"
```

### Remote Operations

```bash
git push origin <branch_name>    # Push changes to a remote branch
git pull origin <branch_name>    # Pull changes from a remote branch
```

### Stashing

```bash
git stash                   # Stash changes
git stash pop               # Apply and remove the latest stash
git stash list              # List all stashes
```

### Reverting Changes

```bash
git reset HEAD~1            # Undo the last commit, keeping changes
git reset --hard HEAD~1     # Undo the last commit, discarding changes
git revert <commit_hash>    # Create a new commit that undoes a specific commit
```

### Tagging

```bash
git tag <tag_name>          # Create a lightweight tag
git tag -a <tag_name> -m "Tag message"  # Create an annotated tag
git push origin <tag_name>  # Push a specific tag to remote
```

### Viewing Differences

```bash
git diff                    # Show unstaged changes
git diff --staged           # Show staged changes
git diff <commit1> <commit2>  # Compare two commits
```
