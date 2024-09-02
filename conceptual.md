### Conceptual Exercise

Answer the following questions below:
### Question 1
- What are some ways of managing asynchronous code in JavaScript?
### Answer
- **Callbacks**: The traditional approach to handle asynchronous operations, where a function is passed as an argument and executed once the asynchronous operation completes.
- **Promises**: Introduced as a more structured alternative to callbacks, promises represent the eventual completion or failure of an asynchronous operation.
- **async/await**: A modern way to handle asynchronous code built on top of promises. It allows writing asynchronous code that looks more like synchronous code.
- **Event Listeners and Observables**: These approaches allow reacting to events or streams of data over time, often used in reactive programming.
### Question 2
- What is a Promise?
### Answer
A promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It has three states:

- **Pending**: The initial state, neither fulfilled nor rejected.
- **Fulfilled**: The operation completed successfully, with a result.
- **Rejected**: The operation failed, with an error.
### Question 3
- What are the differences between an async function and a regular function?
### Answer
- **`async` functions**: Automatically return a promise. The `await` keyword can be used within an `async` function to pause execution until the awaited promise resolves.
- **Regular functions**: Do not handle asynchronous operations directly. They return the result immediately, which could be a value, function, or another expression.
### Question 4
- What is the difference between Node.js and Express.js?
### Answer
- **Node.js**: A runtime environment that allows JavaScript to be executed outside the browser. It provides built-in modules to handle file systems, `HTTP requests`, etc.
- **Express.js**: A web application framework built on top of Node.js, simplifying the process of building web applications and APIs by providing `middleware`, `routing`, and more.

### Question 5
- What is the error-first callback pattern?

### Answer
In Node.js, callbacks often follow the error-first pattern, where the first argument of the callback is reserved for an error (if any), and the subsequent arguments are used for the results. Example:
```js
function callback(err, result) {
  if (err) {
    // Handle error
  } else {
    // Handle result
  }
}
```
### Question 6
- What is middleware?

### Answer
Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the next middleware function. They can execute code, make changes to req and res, end the request-response cycle, or call next to pass control to the next middleware.

### Question 7
- What does the `next` function do?
### Answer
The next function is used in middleware to pass control to the next middleware function in the stack. If `next()` is not called, the request will be left hanging.

### Question 8
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
### Answer
Issues:

- **Sequential Requests**: The requests are being made one after the other, leading to longer wait times. They should be made in parallel using Promise.all.
- **Inconsistent Order**: The array returned has the elements in a different order (elie, matt, joel) compared to the requests (elie, joel, matt), which could be confusing.
- **Error Handling**: There is no error handling for the await calls. If one request fails, the entire function would throw an error without providing helpful feedback.
- **Hardcoded URLs**: The URLs are hardcoded. It might be better to store them in an array and loop over them to reduce redundancy.

```js
async function getUsers() {
  const urls = [
    'https://api.github.com/users/elie',
    'https://api.github.com/users/joelburton',
    'https://api.github.com/users/mmmaaatttttt'
  ];

  try {
    const users = await Promise.all(urls.map(url => $.getJSON(url)));
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
```
