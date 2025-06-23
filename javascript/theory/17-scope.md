Scope is a policy that manages the availability of variables. It determines where variables are accessible in your code.

## Types of Scope

1. Global Scope: Accessible everywhere in the script.
2. Function Scope: Accessible only within the function.
3. Block Scope: Accessible only within the block (introduced with `let` and `const` in ES6).

## Global Scope

Variables declared outside any function or block have global scope.

```javascript
let globalVar = 1;
// Accessible everywhere in the script
```

## Function Scope

Variables declared within a function are only accessible inside that function.

```javascript
function myFunction() {
  let functionVar = 'Local';
  // functionVar is only accessible here
}
// functionVar is not accessible here
```

## Block Scope

Variables declared with `let` and `const` within a block (`{}`) are only accessible within that block.

```javascript
{
  let blockVar = 2;
  const BLOCK_CONST = 3;
  // blockVar and BLOCK_CONST are only accessible here
}
// blockVar and BLOCK_CONST are not accessible here
```

## Scope Chain

The scope chain is a hierarchical structure that determines the order in which JavaScript looks for variables.

```javascript
let global = 1;

function outer() {
  let outer = 2;

  function inner() {
    let inner = 3;
    console.log(global, outer, inner);
    // Can access global, outer, and inner
  }

  inner();
  // Can access global and outer, but not inner
}

outer();
// Can access only global
```

## Key Points:

1. Variables should be declared in the narrowest scope possible.
2. `var` has function scope, while `let` and `const` have block scope.
3. Global variables should be used sparingly to avoid naming conflicts.
4. The scope chain allows inner scopes to access variables from outer scopes, but not vice versa.
5. Understanding scope is crucial for writing clean, maintainable code and avoiding unintended variable access or modification.
