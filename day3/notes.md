# 📘 Node.js Notes - Day 3
## Topics Covered
- Modules
- CommonJS
- ES Modules
- `require()`
- `module.exports`
- `import`
- `export`
- npm
- `package.json`
- `package-lock.json`
- Semantic Versioning

---

# 1. Modules

## What is a Module?

A **module** is a separate JavaScript file that contains related code and can be reused in other files.

Instead of writing everything in one file, we split the application into multiple files.

### Example

```
project/
│── app.js
│── math.js
│── auth.js
│── user.js
```

Each file performs one specific task.

### Benefits

- Better code organization
- Easy to maintain
- Code reusability
- Easier debugging
- Team collaboration

---

# Types of Modules

## 1. Core Modules

Built into Node.js.

Examples:

- fs
- http
- path
- os
- crypto

Example:

```javascript
const fs = require("fs");
```

---

## 2. Local Modules

Modules created by the developer.

Example:

```
project/
│── app.js
│── math.js
```

---

## 3. Third-Party Modules

Modules installed using npm.

Example:

```bash
npm install express
```

---

# 2. CommonJS

CommonJS is the traditional module system used in Node.js.

It uses:

- require()
- module.exports

### Export

```javascript
// math.js

function add(a, b) {
    return a + b;
}

module.exports = add;
```

### Import

```javascript
// app.js

const add = require("./math");

console.log(add(5, 3));
```

Output

```
8
```

---

# require()

Used to import another module.

Syntax

```javascript
const variable = require("./module");
```

Example

```javascript
const fs = require("fs");
```

---

# module.exports

Used to export values from a module.

Example

```javascript
function greet(name) {
    return `Hello ${name}`;
}

module.exports = greet;
```

---

# Export Multiple Functions

```javascript
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

module.exports = {
    add,
    sub
};
```

Import

```javascript
const math = require("./math");

console.log(math.add(10,5));
console.log(math.sub(10,5));
```

---

# exports vs module.exports

Correct

```javascript
exports.add = add;
```

Correct

```javascript
module.exports = add;
```

Incorrect

```javascript
exports = add;
```

Reason:

`require()` always returns `module.exports`.

---

# Module Caching

Node.js executes a module only once.

Example

```javascript
require("./math");
require("./math");
```

The module is loaded only once and then reused from cache.

Benefits

- Faster execution
- Better performance

---

# 3. ES Modules (ESM)

ES Modules are the official JavaScript module system.

Instead of

```javascript
require()
module.exports
```

we use

```javascript
import
export
```

---

# Enabling ES Modules

Create or update package.json

```json
{
    "type": "module"
}
```

Now every `.js` file is treated as an ES Module.

---

# import

Used to import another module.

Example

```javascript
import fs from "fs";
```

---

# export

Used to export values.

Example

```javascript
export function add(a,b){
    return a+b;
}
```

Import

```javascript
import { add } from "./math.js";
```

---

# Default Export

```javascript
export default function greet(){
    console.log("Hello");
}
```

Import

```javascript
import greet from "./greet.js";
```

---

# Named Export

```javascript
export function add(){}
export function sub(){}
```

Import

```javascript
import { add, sub } from "./math.js";
```

---

# CommonJS vs ES Modules

| CommonJS | ES Modules |
|-----------|------------|
| require() | import |
| module.exports | export |
| Older Node.js system | Official JavaScript standard |
| Default in older projects | Used in modern projects |

---

# File Extensions

| Extension | Module Type |
|------------|-------------|
| .js | Depends on `"type"` in package.json |
| .mjs | Always ES Module |
| .cjs | Always CommonJS |

---

# Important Notes

If package.json contains

```json
{
    "type":"module"
}
```

Then

✅ Allowed

```javascript
import fs from "fs";
export {};
```

❌ Not Allowed

```javascript
const fs = require("fs");
module.exports = {};
```

If `"type":"module"` is **not** present

✅ Allowed

```javascript
const fs = require("fs");
module.exports = {};
```

---

# 4. npm

npm is the default package manager for Node.js.

It is used to

- Install packages
- Remove packages
- Update packages
- Manage dependencies
- Run scripts

---

# Common npm Commands

Initialize project

```bash
npm init
```

Initialize with default values

```bash
npm init -y
```

Install package

```bash
npm install express
```

Short form

```bash
npm i express
```

Remove package

```bash
npm uninstall express
```

Update packages

```bash
npm update
```

List installed packages

```bash
npm list
```

---

# 5. package.json

package.json is the **configuration file** of a Node.js project.

It stores

- Project information
- Scripts
- Dependencies
- Project metadata

Example

```json
{
    "name":"backend-course",
    "version":"1.0.0",
    "main":"index.js",
    "scripts":{
        "start":"node index.js"
    }
}
```

---

# Important Fields

### name

Project name

```json
"name":"backend-course"
```

---

### version

Current version

```json
"version":"1.0.0"
```

---

### main

Entry point

```json
"main":"index.js"
```

---

### scripts

Custom commands

```json
"scripts":{
    "start":"node index.js"
}
```

Run

```bash
npm start
```

instead of

```bash
node index.js
```

---

### dependencies

Installed packages

```json
"dependencies":{
    "express":"^5.1.0"
}
```

---

# 6. package-lock.json

package-lock.json stores the **exact versions** of every installed package and all of their dependencies.

It is automatically created by npm.

You should **not edit it manually**.

---

# Why Do We Need package-lock.json?

Imagine two developers are working on the same project.

Without package-lock.json

Developer A

```
Express 5.1.0
```

Developer B

```
Express 5.1.3
```

Different versions may behave differently.

With package-lock.json

Everyone installs

```
Express 5.1.0
```

and the exact same versions of all sub-dependencies.

This ensures the project behaves consistently on every machine.

---

# package.json vs package-lock.json

## package.json

Think of it as a **Shopping List**.

```
Need

✔ Express
✔ Mongoose
✔ JWT
```

It tells npm **what packages are required**.

---

## package-lock.json

Think of it as the **Shopping Receipt**.

```
Express 5.1.0

Mongoose 8.18.0

JWT 9.0.2

+ Every dependency with exact version
```

It records **exactly what was installed**.

---

# Difference

| package.json | package-lock.json |
|--------------|-------------------|
| Configuration file | Lock file |
| Stores project information | Stores exact installed dependency versions |
| Small and readable | Large file |
| Can be edited | Auto-generated by npm |
| Lists direct dependencies | Lists complete dependency tree |

---

# node_modules

After installing packages

```
project/

│── node_modules/
│── package.json
│── package-lock.json
```

node_modules contains the actual downloaded packages.

Do **not** upload node_modules to GitHub.

Instead, commit

- package.json
- package-lock.json

Anyone can recreate node_modules using

```bash
npm install
```

---

# npm Installation Flow

```
npm init -y

        │

        ▼

package.json

        │

        ▼

npm install express

        │

        ▼

Downloads Packages

        │

        ▼

node_modules

        │

        ▼

Updates package.json

        │

        ▼

Creates package-lock.json
```

---

# 7. Semantic Versioning (SemVer)

Version format

```
MAJOR.MINOR.PATCH

Example

1.4.2
```

---

## PATCH

Bug fixes only.

```
1.4.2

↓

1.4.3
```

No new features.

---

## MINOR

New features added without breaking existing code.

```
1.4.2

↓

1.5.0
```

---

## MAJOR

Breaking changes.

```
1.4.2

↓

2.0.0
```

Old code may stop working.

---

# Version Symbols

## Caret (^)

Example

```json
"express":"^5.1.0"
```

Allows

```
5.1.1

5.2.0

5.9.0
```

Not

```
6.0.0
```

---

## Tilde (~)

```json
"express":"~5.1.0"
```

Allows

```
5.1.1

5.1.5
```

Not

```
5.2.0
```

---

## Exact Version

```json
"express":"5.1.0"
```

Only installs

```
5.1.0
```

---

# Interview Questions

### What is a module?

A module is a reusable JavaScript file containing related code.

---

### What is CommonJS?

The traditional Node.js module system that uses `require()` and `module.exports`.

---

### What is ES Module?

The official JavaScript module system that uses `import` and `export`.

---

### Difference between CommonJS and ES Modules?

| CommonJS | ES Modules |
|-----------|------------|
| require() | import |
| module.exports | export |

---

### What is npm?

The default package manager for Node.js used to install and manage packages.

---

### What is package.json?

The configuration file that stores project information, scripts, and dependencies.

---

### What is package-lock.json?

A lock file that stores the exact versions of all installed packages and their dependency tree to ensure consistent installations.

---

### Difference between package.json and package-lock.json?

- `package.json` tells npm **what packages your project needs**.
- `package-lock.json` records **the exact versions that were installed**, ensuring everyone gets the same setup.

---

### What is Semantic Versioning?

A versioning system using the format:

```
MAJOR.MINOR.PATCH
```

where:

- **MAJOR** → Breaking changes
- **MINOR** → New backward-compatible features
- **PATCH** → Bug fixes