Variables store data in JavaScript.

## Declaration and Initialization

```javascript
// var (older syntax)
var a; // Declaration
var b = 1; // Declaration and initialization
b = 2; // Re-assignment

// let (ES6+)
let x; // Declaration
let y = 1; // Declaration and initialization
y = 2; // Re-assignment allowed

// const (ES6+)
const z = 1; // Must be initialized when declared
// z = 2;        // Error: Re-assignment not allowed
```

## Comparison

| Keyword | Scope           | Initialization | Re-declaration | Re-assignment |
| :------ | --------------- | -------------- | -------------- | ------------- |
| `var`   | Function/Global | Optional       | Allowed        | Allowed       |
| `let`   | Block           | Optional       | Not allowed    | Allowed       |
| `const` | Block           | Required       | Not allowed    | Not allowed   |
