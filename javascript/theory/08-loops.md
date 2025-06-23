Loops are used to execute a block of code repeatedly, either a fixed number of times or until a condition is met.

## for Loop

Basic structure (this will create an infinite loop `for (;;) {}`)

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

Looping over array

```javascript
const arr = ['a', 'b', 'c'];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

## while Loop

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

Useful for unknown iteration count

```javascript
let currentPerson = person;
while (currentPerson != null) {
  console.log(currentPerson.name);
  currentPerson = currentPerson.friend;
}
```

## do...while Loop

Executes at least once

```javascript
let retryCount = 0;
do {
  callService();
  retryCount++;
} while (isConnected() && retryCount <= 3);
```

## for...in Loop

Iterates over object properties

```javascript
const capitals = {a: 'Athens', b: 'Belgrade', c: 'Cairo'};
for (let key in capitals) {
  console.log(key + ': ' + capitals[key]);
}
```

## for...of Loop

Iterates over iterable objects (like arrays)

```javascript
const arr2 = ['Fred', 'Tom', 'Bob'];
for (let item of arr2) {
  console.log(item);
}
```

## Control Statements

`continue`: Skips to the next iteration
`break`: Exits the loop

```javascript
for (let i = 0; i <= 10; i++) {
  if (i === 2) continue;
  if (i === 5) break;
  console.log(i);
}
```
