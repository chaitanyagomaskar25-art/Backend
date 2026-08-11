# Day 6 — HTTP Module

## Topics

* HTTP Server
* Routing
* Headers
* Status Codes
* Query Parameters
* URL Parsing
* REST Basics

---

# 1. What is HTTP?

**HTTP** stands for:

> HyperText Transfer Protocol

HTTP is a protocol used for communication between a **client** and a **server**.

For example:

```text
Browser
   |
   | HTTP Request
   ↓
Node.js Server
   |
   | HTTP Response
   ↓
Browser
```

The client sends a request, and the server sends a response.

---

# 2. Request and Response

Every HTTP communication mainly involves:

```text
Client
   |
   | Request
   ↓
Server
   |
   | Response
   ↓
Client
```

### HTTP Request

A request contains information such as:

* HTTP method
* URL
* Headers
* Body

Example:

```text
GET /users HTTP/1.1
Host: localhost:3000
Accept: application/json
```

### HTTP Response

A response contains:

* Status code
* Headers
* Body

Example:

```text
HTTP/1.1 200 OK
Content-Type: application/json

{
    "name": "Chaitanya"
}
```

---

# 3. What is an HTTP Server?

An HTTP server is a program that:

1. Waits for HTTP requests.
2. Receives the request.
3. Processes it.
4. Sends an HTTP response.

Node.js provides the built-in `http` module for creating HTTP servers.

---

# 4. Creating an HTTP Server

First import the module:

```javascript
import http from "http";
```

Create the server:

```javascript
const server = http.createServer((req, res) => {

    res.end("Hello World");

});
```

Start the server:

```javascript
server.listen(3000);
```

Complete example:

```javascript
import http from "http";

const server = http.createServer((req, res) => {

    res.end("Hello World");

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

Now open:

```text
http://localhost:3000
```

You should see:

```text
Hello World
```

---

# 5. Understanding `req` and `res`

The callback:

```javascript
(req, res) => {

}
```

receives two important objects.

## `req`

`req` means:

> Request

It contains information sent by the client.

For example:

```javascript
req.method
req.url
req.headers
```

---

## `res`

`res` means:

> Response

It is used to send information back to the client.

For example:

```javascript
res.statusCode
res.setHeader()
res.end()
```

---

# 6. HTTP Methods

HTTP methods describe what the client wants to do.

The most important methods are:

| Method | Meaning               |
| ------ | --------------------- |
| GET    | Read data             |
| POST   | Create data           |
| PUT    | Replace data          |
| PATCH  | Partially update data |
| DELETE | Delete data           |

Examples:

```text
GET /users
POST /users
PATCH /users/10
DELETE /users/10
```

---

# 7. Checking the HTTP Method

We can access the method using:

```javascript
req.method
```

Example:

```javascript
const server = http.createServer((req, res) => {

    console.log(req.method);

    res.end("Hello");

});
```

If you visit the URL normally:

```text
GET
```

will usually be printed.

---

# 8. What is Routing?

Routing means:

> Deciding what the server should do based on the HTTP method and URL/path.

For example:

```text
GET /users
```

should return users.

```text
GET /products
```

should return products.

```text
GET /about
```

should return an about page.

---

# 9. Basic Routing

```javascript
import http from "http";

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("Home Page");
    }

    else if (req.url === "/about") {
        res.end("About Page");
    }

    else if (req.url === "/users") {
        res.end("Users Page");
    }

    else {
        res.statusCode = 404;
        res.end("Page Not Found");
    }

});

server.listen(3000);
```

Now:

```text
/          → Home Page
/about     → About Page
/users     → Users Page
/anything  → 404
```

---

# 10. Routing Using Method + URL

A better approach is to check both:

```javascript
req.method
```

and:

```javascript
req.url
```

Example:

```javascript
if (
    req.method === "GET" &&
    req.url === "/users"
) {
    res.end("Get users");
}
```

Another route:

```javascript
if (
    req.method === "POST" &&
    req.url === "/users"
) {
    res.end("Create user");
}
```

Notice that both use:

```text
/users
```

but perform different operations because the HTTP methods are different.

---

# 11. What are HTTP Headers?

HTTP headers contain additional information about a request or response.

Think of headers as **metadata**.

For example:

```text
Content-Type: application/json
```

tells the client:

> The response contains JSON data.

---

# 12. Request Headers

Request headers are sent by the client to the server.

Example:

```text
GET /users HTTP/1.1
Host: localhost:3000
Accept: application/json
User-Agent: Chrome
```

In Node.js:

```javascript
req.headers
```

can be used to access them.

Example:

```javascript
const server = http.createServer((req, res) => {

    console.log(req.headers);

    res.end("Hello");

});
```

---

# 13. Accessing a Specific Request Header

For example:

```javascript
console.log(req.headers.host);
```

Or:

```javascript
console.log(req.headers["user-agent"]);
```

---

# 14. Response Headers

Response headers are sent by the server to the client.

We can set a response header using:

```javascript
res.setHeader(name, value);
```

Example:

```javascript
res.setHeader(
    "Content-Type",
    "text/plain"
);
```

---

# 15. `Content-Type`

`Content-Type` tells the client what kind of data is being sent.

Common values:

```text
text/plain
text/html
application/json
image/png
```

Examples:

### Plain text

```javascript
res.setHeader(
    "Content-Type",
    "text/plain"
);
```

### HTML

```javascript
res.setHeader(
    "Content-Type",
    "text/html"
);
```

### JSON

```javascript
res.setHeader(
    "Content-Type",
    "application/json"
);
```

---

# 16. Sending JSON

Suppose:

```javascript
const user = {
    id: 1,
    name: "Chaitanya"
};
```

Set the content type:

```javascript
res.setHeader(
    "Content-Type",
    "application/json"
);
```

Then convert the object to a JSON string:

```javascript
res.end(JSON.stringify(user));
```

Complete:

```javascript
const user = {
    id: 1,
    name: "Chaitanya"
};

res.setHeader(
    "Content-Type",
    "application/json"
);

res.end(
    JSON.stringify(user)
);
```

---

# 17. Why `JSON.stringify()`?

JavaScript object:

```javascript
{
    name: "Chaitanya"
}
```

needs to be converted into a string before sending it as the HTTP response body.

```javascript
JSON.stringify(user)
```

produces:

```json
{"name":"Chaitanya"}
```

---

# 18. HTTP Status Codes

A status code tells the client the result of the request.

Example:

```text
200 OK
```

means:

> The request succeeded.

Another:

```text
404 Not Found
```

means:

> The requested resource was not found.

---

# 19. Status Code Categories

HTTP status codes are divided into five groups:

```text
1xx → Informational
2xx → Success
3xx → Redirection
4xx → Client Error
5xx → Server Error
```

Remember:

```text
1 → Information
2 → Success
3 → Redirect
4 → Client problem
5 → Server problem
```

---

# 20. Important 2xx Status Codes

## 200 OK

The request was successful.

```javascript
res.statusCode = 200;
```

Example:

```text
GET /users
→ 200 OK
```

---

## 201 Created

A new resource was successfully created.

```javascript
res.statusCode = 201;
```

Example:

```text
POST /users
→ 201 Created
```

---

## 204 No Content

The request succeeded, but there is no response body.

```javascript
res.statusCode = 204;
res.end();
```

Common example:

```text
DELETE /users/10
→ 204 No Content
```

---

# 21. Important 4xx Status Codes

## 400 Bad Request

The client sent an invalid request.

```javascript
res.statusCode = 400;
```

Example:

```text
Invalid input
→ 400 Bad Request
```

---

## 401 Unauthorized

The client has not provided valid authentication credentials.

Think:

```text
401
↓
"Who are you?"
```

Example:

```text
GET /profile
→ 401 Unauthorized
```

---

## 403 Forbidden

The server knows who the user is but the user doesn't have permission.

Think:

```text
403
↓
"I know who you are,
but you are not allowed."
```

---

## 404 Not Found

The requested resource doesn't exist.

```javascript
res.statusCode = 404;
```

Example:

```text
GET /unknown
→ 404 Not Found
```

---

# 22. Important 5xx Status Code

## 500 Internal Server Error

Something went wrong on the server.

```javascript
res.statusCode = 500;
```

Example:

```text
Database error
→ 500 Internal Server Error
```

---

# 23. Important Status Codes Cheat Sheet

```text
200 → OK
201 → Created
204 → No Content

400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found

500 → Internal Server Error
```

---

# 24. Setting Status Code

Simple:

```javascript
res.statusCode = 404;

res.end("Not Found");
```

---

# 25. `res.writeHead()`

You can set the status code and headers together:

```javascript
res.writeHead(200, {
    "Content-Type": "application/json"
});

res.end(
    JSON.stringify({
        message: "Success"
    })
);
```

This is similar to:

```javascript
res.statusCode = 200;

res.setHeader(
    "Content-Type",
    "application/json"
);
```

---

# 26. What are Query Parameters?

Query parameters are extra information added to a URL.

Example:

```text
/products?category=mobile
```

Here:

```text
/products
```

is the path.

And:

```text
category=mobile
```

is a query parameter.

---

# 27. Multiple Query Parameters

Example:

```text
/products?category=mobile&page=2&limit=10
```

Parameters:

```text
category = mobile
page     = 2
limit    = 10
```

The `?` starts the query string.

The `&` separates parameters.

Structure:

```text
/path?key=value&key=value
```

---

# 28. Why Query Parameters Are Used

Query parameters are commonly used for:

* Filtering
* Searching
* Sorting
* Pagination

Examples:

### Filtering

```text
/products?category=mobile
```

### Searching

```text
/products?search=iphone
```

### Pagination

```text
/products?page=2&limit=10
```

### Sorting

```text
/products?sort=price&order=asc
```

---

# 29. URL Parsing

URL parsing means:

> Breaking a URL into useful parts.

Example:

```text
http://localhost:3000/products?category=mobile&page=2
```

can be broken into:

```text
protocol → http:

host → localhost:3000

pathname → /products

query parameters:
category → mobile
page → 2
```

---

# 30. Using the `URL` Class

In Node.js:

```javascript
const url = new URL(
    req.url,
    `http://${req.headers.host}`
);
```

Now we can access different parts.

---

# 31. Getting the Pathname

```javascript
url.pathname
```

For:

```text
/products?category=mobile&page=2
```

we get:

```text
/products
```

---

# 32. Getting Query Parameters

Use:

```javascript
url.searchParams.get("category")
```

Example:

```javascript
const category =
    url.searchParams.get("category");
```

For:

```text
/products?category=mobile
```

result:

```text
mobile
```

---

# 33. Getting Multiple Query Parameters

```javascript
const category =
    url.searchParams.get("category");

const page =
    url.searchParams.get("page");

console.log(category);
console.log(page);
```

For:

```text
/products?category=mobile&page=2
```

output:

```text
mobile
2
```

---

# 34. Query Parameter Values are Strings

This is important.

Suppose:

```text
?page=2
```

Then:

```javascript
const page =
    url.searchParams.get("page");
```

returns:

```javascript
"2"
```

not:

```javascript
2
```

If you need a number:

```javascript
const page =
    Number(url.searchParams.get("page"));
```

Now it becomes:

```javascript
2
```

---

# 35. Checking if a Query Parameter Exists

Use:

```javascript
url.searchParams.has("page")
```

Example:

```javascript
if (url.searchParams.has("page")) {
    console.log("Page parameter exists");
}
```

---

# 36. Getting All Query Parameters

You can use:

```javascript
Object.fromEntries(
    url.searchParams
);
```

For:

```text
/products?category=mobile&page=2
```

result:

```javascript
{
    category: "mobile",
    page: "2"
}
```

---

# 37. Why Use `url.pathname` Instead of `req.url`?

Suppose:

```text
/products?category=mobile
```

Then:

```javascript
req.url
```

is:

```text
/products?category=mobile
```

Therefore:

```javascript
req.url === "/products"
```

is:

```text
false
```

But:

```javascript
url.pathname
```

returns:

```text
/products
```

Therefore:

```javascript
url.pathname === "/products"
```

is:

```text
true
```

This is why URL parsing is extremely useful when routing.

---

# 38. Query Parameters vs URL Parameters

Compare:

```text
/users/10
```

and:

```text
/users?role=admin
```

### `/users/10`

The `10` identifies a specific user.

```text
/users/10
       ↑
     user ID
```

### `/users?role=admin`

The query parameter filters users.

```text
/users?role=admin
      ↑
    filter
```

Simple rule:

```text
/users/10
→ Specific resource

/users?role=admin
→ Filter/options
```

---

# 39. What is REST?

REST stands for:

> Representational State Transfer

Practically:

> REST is a style for designing APIs around resources and standard HTTP methods.

A REST API usually treats things such as:

```text
users
posts
products
comments
orders
```

as resources.

---

# 40. REST Resources

Suppose your application has users.

The resource is:

```text
users
```

A REST-style API could be:

```text
GET     /users
GET     /users/10
POST    /users
PUT     /users/10
PATCH   /users/10
DELETE  /users/10
```

---

# 41. REST and HTTP Methods

| Method | Purpose          |
| ------ | ---------------- |
| GET    | Read             |
| POST   | Create           |
| PUT    | Replace          |
| PATCH  | Partially update |
| DELETE | Delete           |

---

# 42. GET

```text
GET /users
```

Means:

> Get all users.

```text
GET /users/10
```

Means:

> Get user 10.

---

# 43. POST

```text
POST /users
```

Means:

> Create a new user.

Request body:

```json
{
    "name": "Chaitanya",
    "email": "chai@example.com"
}
```

Response:

```text
201 Created
```

---

# 44. PUT

```text
PUT /users/10
```

Means:

> Replace the user with ID 10.

Example:

```json
{
    "name": "Rahul",
    "email": "rahul@example.com"
}
```

---

# 45. PATCH

```text
PATCH /users/10
```

Means:

> Partially update user 10.

For example:

```json
{
    "name": "Rahul"
}
```

Only the name needs to change.

---

# 46. PUT vs PATCH

Easy mental model:

```text
PUT
↓
Replace

PATCH
↓
Partially update
```

---

# 47. DELETE

```text
DELETE /users/10
```

Means:

> Delete user 10.

Possible response:

```text
204 No Content
```

---

# 48. CRUD

CRUD is one of the most important backend concepts.

CRUD means:

```text
C → Create
R → Read
U → Update
D → Delete
```

REST maps naturally to CRUD:

```text
CREATE
POST /users

READ
GET /users

UPDATE
PUT/PATCH /users/10

DELETE
DELETE /users/10
```

---

# 49. RESTful URLs

REST APIs generally use **nouns** for resources.

Good:

```text
/users
/products
/posts
/comments
```

Less RESTful:

```text
/getUsers
/createUser
/deleteUser
```

Why?

Because the HTTP method already tells us the action.

```text
GET /users
```

means:

> Get users.

```text
POST /users
```

means:

> Create a user.

```text
DELETE /users/10
```

means:

> Delete user 10.

---

# 50. REST + Query Parameters

REST APIs commonly use query parameters for filtering, searching, sorting and pagination.

Example:

```text
GET /products?category=mobile&page=2
```

Breakdown:

```text
GET
↓
Read

/products
↓
Products resource

category=mobile
↓
Filter

page=2
↓
Pagination
```

---

# 51. REST + URL Parameters

Example:

```text
GET /posts/25
```

means:

> Get post 25.

While:

```text
GET /posts?author=chaitanya
```

means:

> Get posts filtered by author.

---

# 52. Statelessness

One important REST principle is **statelessness**.

Stateless means:

> Each request should contain the information needed by the server to process it.

For example:

```text
GET /users/10
Authorization: Bearer token
```

The server should be able to understand the request without depending on a previous request.

Stateless does **not** mean:

> The server cannot have a database.

The server can still store data in:

* MongoDB
* PostgreSQL
* MySQL
* Redis
* etc.

It means the request should be independently understandable.

---

# 53. Complete REST Request

Example:

```text
POST /users HTTP/1.1

Content-Type: application/json

{
    "name": "Chaitanya",
    "email": "chai@example.com"
}
```

Breakdown:

```text
POST
↓
Operation

/users
↓
Resource

Headers
↓
Additional information

Body
↓
Data
```

---

# 54. Complete REST Response

The server might return:

```text
HTTP/1.1 201 Created

Content-Type: application/json

{
    "id": 10,
    "name": "Chaitanya",
    "email": "chai@example.com"
}
```

Breakdown:

```text
201
↓
Operation succeeded and resource was created

Headers
↓
Information about response

Body
↓
Created resource
```

---

# 55. Complete Example — Node.js REST Server

```javascript
import http from "http";

const users = [
    {
        id: 1,
        name: "Chaitanya"
    },
    {
        id: 2,
        name: "Rahul"
    }
];

const server = http.createServer((req, res) => {

    const url = new URL(
        req.url,
        `http://${req.headers.host}`
    );

    /*
        GET /users
        GET /users?name=Chaitanya
    */

    if (
        req.method === "GET" &&
        url.pathname === "/users"
    ) {

        const name =
            url.searchParams.get("name");

        let result = users;

        if (name) {
            result = users.filter(
                user => user.name === name
            );
        }

        res.statusCode = 200;

        res.setHeader(
            "Content-Type",
            "application/json"
        );

        return res.end(
            JSON.stringify(result)
        );
    }

    /*
        Route not found
    */

    res.statusCode = 404;

    res.setHeader(
        "Content-Type",
        "application/json"
    );

    return res.end(
        JSON.stringify({
            message: "Route not found"
        })
    );
});

server.listen(3000, () => {
    console.log(
        "Server running on port 3000"
    );
});
```

---

# 56. Testing the Server

Start:

```bash
node server.js
```

Then visit:

```text
http://localhost:3000/users
```

Response:

```json
[
    {
        "id": 1,
        "name": "Chaitanya"
    },
    {
        "id": 2,
        "name": "Rahul"
    }
]
```

Now try:

```text
http://localhost:3000/users?name=Chaitanya
```

Response:

```json
[
    {
        "id": 1,
        "name": "Chaitanya"
    }
]
```

---

# 57. The Complete HTTP Mental Model

This is the most important diagram from today's topic:

```text
                         CLIENT
                           |
                           |
                    HTTP REQUEST
                           |
              ┌────────────┼────────────┐
              ↓            ↓            ↓
           METHOD         URL         BODY
              |            |            |
              |            |            |
              |       ┌────┴─────┐       |
              |       ↓          ↓       |
              |   pathname     query     |
              |   /users      ?page=2   |
              |                         |
              └────────────┬────────────┘
                           ↓
                     NODE.JS SERVER
                           |
                        ROUTING
                           |
                           ↓
                     PROCESS REQUEST
                           |
                           ↓
                    HTTP RESPONSE
                           |
              ┌────────────┼────────────┐
              ↓            ↓            ↓
          STATUS CODE    HEADERS       BODY
              |            |            |
             200      Content-Type    JSON
```

---

# 58. Quick Revision

## HTTP Server

Creates a server that receives requests and sends responses.

```javascript
http.createServer((req, res) => {

});
```

---

## Routing

Decides what should happen based on:

```javascript
req.method
req.url
```

---

## Headers

Provide additional information.

```javascript
res.setHeader(
    "Content-Type",
    "application/json"
);
```

---

## Status Codes

Tell the client what happened.

```text
200 → Success
201 → Created
204 → No Content

400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found

500 → Server Error
```

---

## Query Parameters

Extra information in the URL.

```text
/products?category=mobile&page=2
```

---

## URL Parsing

Breaks a URL into useful pieces.

```javascript
const url = new URL(
    req.url,
    `http://${req.headers.host}`
);
```

Then:

```javascript
url.pathname
```

and:

```javascript
url.searchParams.get("category")
```

---

## REST

Design APIs around resources and HTTP methods.

```text
GET     /users
GET     /users/10
POST    /users
PUT     /users/10
PATCH   /users/10
DELETE  /users/10
```

---

# 59. Interview Questions

### Q1. What is an HTTP server?

An HTTP server receives HTTP requests from clients, processes them, and sends HTTP responses.

---

### Q2. What is routing?

Routing is the process of deciding how to handle a request based on its HTTP method and URL.

---

### Q3. What is `req`?

`req` represents the incoming HTTP request.

---

### Q4. What is `res`?

`res` represents the HTTP response that the server sends to the client.

---

### Q5. What are HTTP headers?

Headers contain additional information about an HTTP request or response.

---

### Q6. What does `Content-Type` do?

It tells the client what type of data is being sent.

Example:

```text
Content-Type: application/json
```

---

### Q7. What does status code 200 mean?

The request was successful.

---

### Q8. Difference between 401 and 403?

```text
401 → Authentication is missing/invalid.

403 → Authentication may be known,
      but the client does not have permission.
```

---

### Q9. What does 404 mean?

The requested resource could not be found.

---

### Q10. What are query parameters?

Query parameters are key-value pairs added to a URL to provide additional information.

Example:

```text
/products?page=2
```

---

### Q11. How do you access query parameters in Node.js?

Using `URL` and `searchParams`:

```javascript
const url = new URL(
    req.url,
    `http://${req.headers.host}`
);

const page =
    url.searchParams.get("page");
```

---

### Q12. What is REST?

REST is an architectural style for designing APIs around resources and standard HTTP methods.

---

### Q13. What is CRUD?

```text
Create
Read
Update
Delete
```

---

### Q14. Difference between PUT and PATCH?

```text
PUT
→ Replace the resource.

PATCH
→ Partially update the resource.
```

---

# 60. Final Cheat Sheet

```text
HTTP
│
├── Request
│   ├── Method
│   ├── URL
│   ├── Headers
│   └── Body
│
└── Response
    ├── Status Code
    ├── Headers
    └── Body
```

### Methods

```text
GET     → Read
POST    → Create
PUT     → Replace
PATCH   → Partial Update
DELETE  → Delete
```

### Status Codes

```text
200 → OK
201 → Created
204 → No Content

400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found

500 → Internal Server Error
```

### URL

```text
/products?category=mobile&page=2
   │
   ├── pathname → /products
   │
   └── query parameters
       ├── category → mobile
       └── page → 2
```

### Node.js URL Parsing

```javascript
const url = new URL(
    req.url,
    `http://${req.headers.host}`
);

url.pathname;

url.searchParams.get("category");

url.searchParams.has("page");

Object.fromEntries(url.searchParams);
```

### REST

```text
GET     /users
GET     /users/10
POST    /users
PUT     /users/10
PATCH   /users/10
DELETE  /users/10
```

### Core Mental Model

```text
METHOD
  +
URL
  +
HEADERS
  +
BODY
      ↓
    SERVER
      ↓
ROUTING + PROCESSING
      ↓
STATUS CODE
  +
HEADERS
  +
BODY
      ↓
   CLIENT
```

This completes the **Day 6 — HTTP Module** notes.
