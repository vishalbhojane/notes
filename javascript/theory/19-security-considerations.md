Security is critical in web development to protect users and data. Below are key threats and mitigation strategies.

## 1. Cross-Site Scripting (XSS)

What it is: Attackers inject malicious scripts into web pages viewed by users.

### Types of XSS

- Stored XSS: Malicious script stored in a database (e.g., comments)
- Reflected XSS: Script reflected off a web server (e.g., via URL parameters)
- DOM-based XSS: Client-side script execution due to unsafe DOM manipulation

### Prevention

- Escape user input before rendering:

```javascript
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
```

- Use textContent instead of innerHTML when possible
- Enable Content Security Policy (CSP) (see below)

## 2. Cross-Site Request Forgery (CSRF)

What it is: Attackers trick users into executing unwanted actions on a trusted site.

### Prevention

- Use CSRF tokens:

```html
<!-- Server generates a unique token -->
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="token123" />
</form>
```

- SameSite cookies:

```javascript
// Set cookies with SameSite attribute
document.cookie = "sessionId=abc123; SameSite=Strict; Secure";
```

- Check Origin/Referer headers on the server

## 3. Content Security Policy (CSP)

What it is: A security layer to restrict resources (scripts, styles) a page can load.

Example CSP Header

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;
```

**Key Directives:**

- default-src 'self' → Allow resources only from the same origin
- script-src → Control JavaScript sources
- style-src → Control CSS sources

## 4. Input Validation

Never trust user input! Always validate and sanitize.

### Client-Side Validation

```javascript
// Basic email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### Server-Side Validation

- Always revalidate on the server (client-side checks can be bypassed)
- Use libraries like validator.js or express-validator

## 5. Secure Authentication

### Best Practices

- Use HTTPS (prevent man-in-the-middle attacks)
- Hash passwords (bcrypt, Argon2) – never store plaintext!

```javascript
const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash(password, 10);
```

- Implement rate limiting (prevent brute-force attacks)
- Use JWT securely: - Store in HttpOnly cookies (not localStorage)
- Set short expiration times

## 6. HTTPS and SSL Why?

Encrypts data between client and server.

### How to Implement

- Get an SSL certificate (Let's Encrypt, Cloudflare)
- Force HTTPS redirects:

```javascript
// Express.js example
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});
```

- Use HSTS (HTTP Strict Transport Security):

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 7. Security Best Practices

| Practice                         | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| Keep dependencies updated        | Use npm audit to check for vulnerabilities              |
| Avoid eval()                     | Executing dynamic code is dangerous                     |
| Limit API exposure               | Require authentication for sensitive endpoints          |
| Sanitize database queries        | Use ORMs/parameterized queries to prevent SQL injection |
| Disable unnecessary HTTP methods | Block PUT, DELETE if unused                             |

## 8. Subresource Integrity (SRI)

#### What it is

A security feature that ensures externally loaded resources (scripts/styles) haven't been tampered with.

#### Implementation

```html
<script
  src="https://cdn.example/library.js"
  integrity="sha384-{HASH}"
  crossorigin="anonymous"
></script>
```

#### How to Generate

```bash
# Get the file's hash using OpenSSL:
openssl dgst -sha384 -binary library.js | openssl base64 -A
```

- Or use online tools like SRI Hash Generator

#### Browser Support

- All modern browsers
- Falls back to regular loading if integrity check fails

## 9. CORS & Same-Origin Policy

### Same-Origin Policy (SOP)

- Definition: Restricts how documents/scripts from one origin can interact with resources from another origin
- Origins Match if protocol, domain, and port are identical

### Cross-Origin Resource Sharing (CORS)

Purpose: Allows controlled cross-origin requests

Server Implementation (Example headers):

http

```http
Access-Control-Allow-Origin: https://trusted-site.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

### Common Scenarios

| Request Type     | SOP Behavior     | CORS Solution                                                |
| ---------------- | ---------------- | ------------------------------------------------------------ |
| Simple GET       | Blocked by SOP   | Access-Control-Allow-Origin                                  |
| POST with JSON   | Preflighted      | Handle OPTIONS requests                                      |
| With Credentials | Cookies not sent | Allow-Credentials: true + client-side credentials: 'include' |

### Security Considerations

- Avoid Access-Control-Allow-Origin: \* with credentials
- Whitelist specific origins instead of using wildcards
- Use Vary: Origin header to prevent cache poisoning

## 10. Trusted Types for DOM XSS Prevention

#### What it is

A browser API that enforces safe handling of dangerous DOM APIs to prevent DOM-based XSS.

#### Implementation

Enable CSP Header:

```http
Content-Security-Policy: require-trusted-types-for 'script'
```

Create Policies:

```javascript
if (window.trustedTypes) {
  const escapePolicy = trustedTypes.createPolicy("escapePolicy", {
    createHTML: (input) => {
      // Custom sanitization logic
      return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
  });
}
```

Use Policies:

```javascript
element.innerHTML = escapePolicy.createHTML(userInput);
```

#### Protected APIs

- innerHTML
- outerHTML
- document.write()
- script.src
- setTimeout(string)

#### Fallback Strategy

```javascript
const sanitizer = window.trustedTypes
  ? escapePolicy.createHTML.bind(escapePolicy)
  : (input) => input; // Basic fallback (not secure)
```
