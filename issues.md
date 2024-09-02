# Broken App Issues
The issue with your app.js code lies primarily in handling the asynchronous operations and ensuring that the results from axios.get are properly resolved before constructing the final output.

Here's an explanation of what's wrong:

- **Incorrect Handling of Promises**: In the original code, you’re mapping over req.body.developers using map with an async function. This returns an array of unresolved promises, not the actual results.

- **Missing await for the Results**: The code attempts to access the data from the unresolved promises directly (r.data.name, r.data.bio). You need to wait for all promises to resolve before you can access their contents.

- **Error Handling**: The catch block should capture and handle the error in case the axios.get call fails.

### Key Changes:
- **Use of `Promise.all`**: This ensures all the promises are resolved before moving forward. It's also more efficient as it runs the requests in parallel.
- **Proper Error Handling**: The error is captured correctly and passed to the next middleware.
- **JSON Parsing Middleware**: Added express.json() to parse incoming JSON requests.