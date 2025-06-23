Control statements manage program execution based on specific conditions.

## if...else Statement

```javascript
const userIsLoggedIn = true;
if (userIsLoggedIn) {
  console.log('User is logged in');
} else {
  console.log('User is not logged in');
}
```

### Chaining if...else

```javascript
const totalPrice = 100;
if (totalPrice == null) {
  console.log('No total price');
} else if (totalPrice < 10) {
  console.log('Pretty cheap');
} else if (totalPrice < 50) {
  console.log('Not too bad');
} else {
  console.log('Expensive');
}
```

## Switch Statement

Used when comparing a single variable to multiple values:

```javascript
const favouriteAnimal = 'cat';
switch (favouriteAnimal) {
  case 'cat':
  case 'bobcat':
    console.log('Cats are cool');
    break;
  case 'dog':
    console.log('Dogs are loud');
    break;
  default:
    console.log('Interesting choice');
}
```

## Ternary Operator

Shorthand for simple if...else statements:

```javascript
const isUserLoggedIn = true;
const welcomeMessage = isUserLoggedIn ? 'Welcome' : 'Please log in';
```
