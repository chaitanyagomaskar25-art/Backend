# 📘 Node.js Notes - Day 4
# Built-in Module: `url`

---

# What is the `url` Module?

The `url` module is a **built-in Node.js module** used to **parse, create, and manipulate URLs**.

It helps Node.js understand every part of a URL instead of treating it as a normal string.

For example, consider the following URL:

```text
https://www.example.com:3000/products/mobile?id=25&sort=price#reviews
```

Using the `url` module, Node.js can separate it into:

- Protocol
- Host
- Hostname
- Port
- Pathname
- Query Parameters
- Hash (Fragment)
- Origin

Since it is a built-in module, **no installation is required**.

---

# Why does the `url` Module Exist?

Every website and backend application communicates using URLs.

Whenever a user:

- Opens a webpage
- Searches for something
- Logs in
- Makes an API request
- Uploads a file
- Pays online

A URL is sent to the server.

Without the `url` module, developers would have to manually split strings to extract useful information.

Example:

```text
https://example.com/products?id=25&page=2
```

Instead of manually writing:

```javascript
const query = url.split("?")[1];
```

Node.js provides the `URL` class to safely parse URLs.

---

# Why Do We Need the `url` Module?

The `url` module is commonly used for:

- API development
- Search functionality
- Pagination
- Authentication redirects
- Payment gateways
- OAuth login
- Query parameter handling
- URL validation
- Building URLs dynamically

### Real-world Examples

Google Search

```text
https://google.com/search?q=nodejs
```

YouTube

```text
https://youtube.com/watch?v=abcd1234
```

Amazon

```text
https://amazon.in/s?k=laptop
```

GitHub

```text
https://github.com/user/repository
```

---

# Importing the `url` Module

## ES Modules

```javascript
import { URL } from "url";
```

## CommonJS

```javascript
const { URL } = require("url");
```

---

# Understanding URL Structure

Consider this URL:

```text
https://www.example.com:3000/products/mobile?id=25&sort=price#reviews
```

| Part | Value | Description |
|------|------|-------------|
| Protocol | `https:` | Communication protocol |
| Host | `www.example.com:3000` | Domain + Port |
| Hostname | `www.example.com` | Domain name |
| Port | `3000` | Server port |
| Pathname | `/products/mobile` | Requested resource |
| Search | `?id=25&sort=price` | Query string |
| Hash | `#reviews` | Fragment identifier |
| Origin | `https://www.example.com:3000` | Protocol + Host |

---

# Creating a URL Object

### Syntax

```javascript
new URL(url)
```

### Example

```javascript
import { URL } from "url";

const myURL = new URL(
    "https://www.example.com:3000/products/mobile?id=25&sort=price#reviews"
);
```

---

# Important Properties & Methods

| Property / Method | Purpose |
|-------------------|---------|
| `href` | Complete URL |
| `protocol` | Protocol |
| `host` | Domain + Port |
| `hostname` | Domain only |
| `port` | Port number |
| `pathname` | URL path |
| `search` | Query string |
| `searchParams` | Query parameter object |
| `hash` | Fragment |
| `origin` | Protocol + Host |
| `toString()` | Converts URL object to string |

---

# 1. `href`

Returns the complete URL.

### Example

```javascript
console.log(myURL.href);
```

### Output

```text
https://www.example.com:3000/products/mobile?id=25&sort=price#reviews
```

---

# 2. `protocol`

Returns the communication protocol.

### Example

```javascript
console.log(myURL.protocol);
```

### Output

```text
https:
```

Possible values:

```text
http:
https:
ftp:
file:
```

---

# 3. `host`

Returns the hostname along with the port.

### Example

```javascript
console.log(myURL.host);
```

### Output

```text
www.example.com:3000
```

---

# 4. `hostname`

Returns only the domain name.

### Example

```javascript
console.log(myURL.hostname);
```

### Output

```text
www.example.com
```

---

# Difference Between `host` and `hostname`

| host | hostname |
|------|----------|
| Includes port | Does not include port |
| `example.com:3000` | `example.com` |

---

# 5. `port`

Returns the port number.

### Example

```javascript
console.log(myURL.port);
```

### Output

```text
3000
```

If no port exists:

```text
""
```

(empty string)

---

# 6. `pathname`

Returns the requested path.

### Example

```javascript
console.log(myURL.pathname);
```

### Output

```text
/products/mobile
```

---

# 7. `search`

Returns the entire query string.

### Example

```javascript
console.log(myURL.search);
```

### Output

```text
?id=25&sort=price
```

---

# 8. `searchParams`

Returns a `URLSearchParams` object.

This is one of the most useful features of the `url` module.

---

## Get a Query Parameter

```javascript
console.log(
    myURL.searchParams.get("id")
);
```

### Output

```text
25
```

---

## Get Another Query Parameter

```javascript
console.log(
    myURL.searchParams.get("sort")
);
```

### Output

```text
price
```

---

## Add a Query Parameter

```javascript
myURL.searchParams.set("page", "2");

console.log(myURL.href);
```

### Output

```text
https://www.example.com:3000/products/mobile?id=25&sort=price&page=2#reviews
```

---

## Delete a Query Parameter

```javascript
myURL.searchParams.delete("sort");

console.log(myURL.href);
```

---

## Check if a Parameter Exists

```javascript
console.log(
    myURL.searchParams.has("id")
);
```

### Output

```text
true
```

---

## Get All Parameters

```javascript
for (const [key, value] of myURL.searchParams) {
    console.log(key, value);
}
```

### Output

```text
id 25
sort price
```

---

# 9. `hash`

Returns the fragment part of the URL.

### Example

```javascript
console.log(myURL.hash);
```

### Output

```text
#reviews
```

---

# 10. `origin`

Returns the protocol and host.

### Example

```javascript
console.log(myURL.origin);
```

### Output

```text
https://www.example.com:3000
```

---

# 11. `toString()`

Converts the URL object back into a string.

### Example

```javascript
console.log(myURL.toString());
```

### Output

```text
https://www.example.com:3000/products/mobile?id=25&sort=price#reviews
```

---

# Practical Examples

## Example 1 - Read Hostname

```javascript
import { URL } from "url";

const url = new URL(
    "https://google.com/search?q=nodejs"
);

console.log(url.hostname);
```

Output

```text
google.com
```

---

## Example 2 - Read Search Keyword

```javascript
console.log(
    url.searchParams.get("q")
);
```

Output

```text
nodejs
```

---

## Example 3 - Add Page Number

```javascript
url.searchParams.set("page", "2");

console.log(url.href);
```

Output

```text
https://google.com/search?q=nodejs&page=2
```

---

## Example 4 - Get Pathname

```javascript
console.log(url.pathname);
```

Output

```text
/search
```

---

## Example 5 - Check Protocol

```javascript
console.log(url.protocol);
```

Output

```text
https:
```

---

# Mini Project

# URL Analyzer CLI

## Folder Structure

```text
url-analyzer/

│── index.js
```

---

## index.js

```javascript
import { URL } from "url";

const input = process.argv[2];

const url = new URL(input);

console.log("===== URL ANALYZER =====");

console.log("Full URL  :", url.href);
console.log("Protocol  :", url.protocol);
console.log("Host      :", url.host);
console.log("Hostname  :", url.hostname);
console.log("Port      :", url.port || "Default");
console.log("Pathname  :", url.pathname);
console.log("Query     :", url.search);
console.log("Origin    :", url.origin);
console.log("Hash      :", url.hash);

console.log("\nQuery Parameters:");

for (const [key, value] of url.searchParams) {
    console.log(`${key} : ${value}`);
}
```

---

## Run

```bash
node index.js "https://example.com:3000/products?id=25&sort=price#reviews"
```

---

## Sample Output

```text
===== URL ANALYZER =====

Full URL  : https://example.com:3000/products?id=25&sort=price#reviews
Protocol  : https:
Host      : example.com:3000
Hostname  : example.com
Port      : 3000
Pathname  : /products
Query     : ?id=25&sort=price
Origin    : https://example.com:3000
Hash      : #reviews

Query Parameters:

id : 25
sort : price
```

---

# Common Mistakes

## 1. Treating URLs as Strings

❌ Wrong

```javascript
const id = url.split("=")[1];
```

✅ Better

```javascript
const myURL = new URL(url);

myURL.searchParams.get("id");
```

---

## 2. Forgetting `new`

❌ Wrong

```javascript
const url = URL("https://google.com");
```

✅ Correct

```javascript
const url = new URL("https://google.com");
```

---

## 3. Passing an Invalid URL

❌ Wrong

```javascript
new URL("google.com");
```

This throws an error because a protocol is missing.

✅ Correct

```javascript
new URL("https://google.com");
```

---

## 4. Reading Query Parameters Manually

❌ Wrong

```javascript
url.split("?")[1];
```

✅ Better

```javascript
url.searchParams;
```

---

## 5. Forgetting That `host` Includes the Port

`host`

```text
example.com:3000
```

`hostname`

```text
example.com
```

---

# Best Practices

- Always use the `URL` class instead of manually parsing strings.
- Use `searchParams` to work with query parameters.
- Validate URLs before processing user input.
- Use `origin` when comparing domains.
- Avoid string concatenation when creating URLs.
- Modify URLs using the `URL` object instead of string operations.

---

# Interview Questions

## 1. What is the `url` module?

The `url` module is a built-in Node.js module used to parse, create, and manipulate URLs.

---

## 2. Is the `url` module built into Node.js?

Yes.

No installation is required.

---

## 3. What is the difference between `host` and `hostname`?

| host | hostname |
|------|----------|
| Includes the port | Does not include the port |

Example

```text
https://example.com:3000
```

`host`

```text
example.com:3000
```

`hostname`

```text
example.com
```

---

## 4. How do you read a query parameter?

```javascript
url.searchParams.get("id");
```

---

## 5. How do you add a query parameter?

```javascript
url.searchParams.set("page", "2");
```

---

## 6. What does `pathname` return?

It returns the requested resource path.

Example

```text
https://example.com/products/mobile
```

Returns

```text
/products/mobile
```

---

## 7. What does `origin` return?

Protocol + Host.

Example

```text
https://example.com:3000
```

Returns

```text
https://example.com:3000
```

---

## 8. What does `search` return?

The complete query string.

Example

```text
?id=25&page=2
```

---

## 9. What is `URLSearchParams`?

`URLSearchParams` is an object used to read, add, update, delete, and iterate over query parameters.

---

## 10. Why is the `url` module important?

It helps backend applications safely parse URLs, read query parameters, build URLs, and handle routing logic without manual string manipulation.

---

# Summary

- `url` is a built-in Node.js module.
- Use `new URL()` to create a URL object.
- `protocol` returns the communication protocol.
- `host` returns the domain and port.
- `hostname` returns only the domain.
- `pathname` returns the requested resource path.
- `search` returns the query string.
- `searchParams` provides methods to work with query parameters.
- `hash` returns the fragment identifier.
- `origin` returns the protocol and host.
- Always use the `URL` class instead of manually splitting URL strings.
- The `url` module is widely used in REST APIs, Express.js applications, authentication, search, pagination, and redirects.