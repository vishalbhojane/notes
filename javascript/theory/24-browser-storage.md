Browser storage allows for locally storing data in the user's browser. It is specific to the current browser and device.

## Types of Browser Storage

There are three main types of browser storage:

1. **Cookies** - Least useful, but can be sent to the server
2. **Local Storage** - Easy to use and most useful for client-side storage
3. **Session Storage** - Similar to Local Storage, but expires on tab close

## Comparison

| Feature         | Local Storage  | Session Storage | Cookies              |
| --------------- | -------------- | --------------- | -------------------- |
| Capacity        | 10MB           | 5MB             | 4KB                  |
| Expiration      | Never          | On tab close    | Manual               |
| Accessibility   | Client-side    | Client-side     | Client/Server        |
| Ease of use     | Easy           | Easy            | Complex              |
| Common use case | Shopping carts | Temporary data  | Server communication |

## Using Local Storage and Session Storage

```javascript
// Setting items
localStorage.setItem('Name', 'Asd');
sessionStorage.setItem('Age', '00');

// Updating values
localStorage.setItem('Name', 'Xyz');
sessionStorage.setItem('Age', '11');

// Getting items
console.log(localStorage.getItem('Name'));
console.log(sessionStorage.getItem('Age'));

// Removing items
localStorage.removeItem('Name');
sessionStorage.removeItem('Age');

// Clearing all items
localStorage.clear();
sessionStorage.clear();
```

## Using Cookies

```javascript
// Setting cookies
const futureDate = new Date(2050, 0, 1).toUTCString();
document.cookie = `name=Vishal; expires=${futureDate}`;
document.cookie = `age=27; expires=${futureDate}`;

// Accessing cookies
console.log(document.cookie);

// Deleting cookies
const pastDate = new Date(1996, 0, 1).toUTCString();
document.cookie = `name=; expires=${pastDate}`;
```

Note: Cookies are more complex to manage and have security implications. Use them when you need to send data to the server automatically.
