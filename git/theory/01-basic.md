### Console Operations

```shell
clear               # Clear the console
exit                # Exit the console
```

### Directory Operations

```shell
mkdir <dir_name>    # Create a folder
cd <dir_name>       # Navigate to a folder
```

### Git Configuration

```bash
# Set name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check name or email
git config --global user.name
git config --global user.email

# Edit configuration
git config --global --edit
```

### Repository Operations

```bash
git init            # Initialize a new Git repository
ls -a               # List all files (including hidden ones)
git status          # Check the status of changes in the repository
```

### Staging and Committing

```bash
git add <file>      # Stage a specific file
git add .           # Stage all changes
git commit -m "Commit message"  # Commit staged changes
```

### Viewing History

```bash
git log # View commit history
```

### Branching and Merging

```bash
git branch <branch_name>         # Create a new branch
git checkout <branch_name>       # Switch to a branch
git checkout -b <branch_name>    # Create and switch to a new branch
git merge <branch_name>          # Merge a branch into the current branch
```

### Ignoring Files

```bash
touch .gitignore # Create a .gitignore file
```

## Advanced Operations

### Empty Commit
