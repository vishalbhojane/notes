### 1. Regular Script Tag

```html
<script src="script.js"></script>
```

- HTML parsing stops when the script is encountered
- Script is downloaded and executed immediately
- HTML parsing resumes after script execution

### 2. Async

```html
<script async src="script.js"></script>
```

- Script downloads asynchronously during HTML parsing
- HTML parsing pauses for script execution once downloaded
- Execution order is not guaranteed
- Best for independent scripts

### 3. Defer

```html
<script defer src="script.js"></script>
```

- Script downloads during HTML parsing
- Execution occurs after HTML parsing is complete
- Scripts execute in the order they appear in the document
- Ideal for scripts with dependencies

## Usage Guidelines

- Use `async` for independent scripts
- Use `defer` for scripts with dependencies or those relied upon by other scripts
- For small, critical scripts relied upon by async scripts, use inline scripts without attributes, placed before async scripts