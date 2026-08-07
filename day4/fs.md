# 📘 Node.js Notes - Day 4
# Built-in Module: `fs` (File System)

---

# What is `fs`?

`fs` stands for **File System**.

It is a **built-in Node.js module** that allows JavaScript to interact with the file system of your computer.

Using `fs`, you can:

- Read files
- Create files
- Write data
- Append data
- Rename files
- Delete files
- Create folders
- Read folder contents

Since it is a built-in module, there is **no need to install it** using npm.

---

# Why does `fs` exist?

JavaScript running in the browser **cannot directly access your computer's files** because of security reasons.

Node.js was created to build server-side applications where working with files is essential.

The `fs` module exists to provide a safe API for interacting with the operating system's file system.

Example:

Without `fs`

```
User enters data

↓

Program ends

↓

Data is lost
```

With `fs`

```
User enters data

↓

Data is written to a file

↓

Program ends

↓

Data is still available
```

---

# Why do we need `fs`?

Almost every backend application uses `fs`.

Examples:

- Reading configuration files (`package.json`)
- Reading `.env` files
- Uploading images
- Saving logs
- Creating reports
- Reading HTML templates
- Managing files and folders

Real-world examples:

- VS Code reads project files.
- npm reads `package.json`.
- Git reads `.gitignore`.
- Express applications often save uploaded files using `fs`.

---

# Importing `fs`

## ES Modules

```javascript
import fs from "fs";
```

## CommonJS

```javascript
const fs = require("fs");
```

---

# Types of File Operations

Node.js provides two types of file operations.

## 1. Synchronous

The program waits until the file operation finishes.

```
Read File

↓

Wait

↓

Continue Execution
```

Example:

```javascript
const data = fs.readFileSync("notes.txt", "utf8");

console.log(data);

console.log("Finished");
```

---

## 2. Asynchronous

The program continues executing while the file operation runs in the background.

```
Read File

↓

Continue Other Work

↓

File Finished

↓

Callback Executes
```

Example:

```javascript
fs.readFile("notes.txt", "utf8", (err, data) => {
    console.log(data);
});

console.log("Finished");
```

Output

```
Finished

Hello World
```

Node.js recommends using **asynchronous methods** because they do not block the Event Loop.

---

# Important Methods

| Method | Purpose |
|---------|---------|
| readFile() | Read a file |
| writeFile() | Create or overwrite a file |
| appendFile() | Add data to an existing file |
| rename() | Rename a file |
| unlink() | Delete a file |
| mkdir() | Create a directory |
| readdir() | Read directory contents |
| existsSync() | Check if a file exists |
| stat() | Get file information |
| copyFile() | Copy a file |

---

# 1. readFile()

Reads the contents of a file.

### Syntax

```javascript
fs.readFile(path, encoding, callback);
```

### Example

Suppose `student.txt` contains:

```
Hello Chaitanya
```

```javascript
import fs from "fs";

fs.readFile("student.txt", "utf8", (err, data) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log(data);

});
```

Output

```
Hello Chaitanya
```

### Parameters

**path**

```javascript
"student.txt"
```

Specifies which file to read.

---

**encoding**

```javascript
"utf8"
```

Converts the file into readable text.

Without encoding, Node.js returns a **Buffer**.

---

**callback**

```javascript
(err, data) => {}
```

Runs after reading the file.

---

# Error Handling

```javascript
fs.readFile("abc.txt", "utf8", (err, data) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log(data);

});
```

If the file doesn't exist:

```
ENOENT: no such file or directory
```

---

# 2. writeFile()

Creates a new file.

If the file already exists, its contents are **overwritten**.

### Example

```javascript
import fs from "fs";

fs.writeFile("notes.txt", "Learning Node.js", (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log("File Created");

});
```

Result

```
notes.txt
```

Content

```
Learning Node.js
```

---

# Overwrite Example

Before

```
Hello
```

```javascript
fs.writeFile("notes.txt", "Bye", () => {});
```

After

```
Bye
```

---

# 3. appendFile()

Adds data to the end of a file without removing existing content.

```javascript
import fs from "fs";

fs.appendFile("notes.txt", "\nLearning Express", (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log("Data Added");

});
```

Before

```
Hello
```

After

```
Hello
Learning Express
```

---

# writeFile() vs appendFile()

## writeFile()

```
Old Content

↓

Deleted

↓

New Content
```

## appendFile()

```
Old Content

↓

Kept

↓

New Content Added
```

---

# 4. rename()

Renames a file.

```javascript
fs.rename("notes.txt", "daily-notes.txt", (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log("Renamed");

});
```

---

# 5. unlink()

Deletes a file.

```javascript
fs.unlink("notes.txt", (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log("Deleted");

});
```

---

# 6. mkdir()

Creates a new folder.

```javascript
fs.mkdir("uploads", (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log("Folder Created");

});
```

---

# 7. readdir()

Returns all files inside a folder.

Suppose

```
images/

dog.jpg
cat.jpg
bird.jpg
```

```javascript
fs.readdir("images", (err, files) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log(files);

});
```

Output

```javascript
[
  "bird.jpg",
  "cat.jpg",
  "dog.jpg"
]
```

---

# 8. existsSync()

Checks whether a file exists.

```javascript
if (fs.existsSync("notes.txt")) {

    console.log("File Exists");

}
```

Output

```
File Exists
```

---

# 9. stat()

Returns information about a file.

```javascript
fs.stat("notes.txt", (err, stats) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log(stats.size);

});
```

Output

```
125
```

This value represents the file size in bytes.

---

# 10. copyFile()

Copies one file to another.

```javascript
fs.copyFile("notes.txt", "backup.txt", (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log("Copied");

});
```

---

# Practical Examples

## Read a File

```javascript
fs.readFile("note.txt", "utf8", (err, data) => {

    console.log(data);

});
```

---

## Create a File

```javascript
fs.writeFile("hello.txt", "Hello World", () => {});
```

---

## Append Data

```javascript
fs.appendFile("hello.txt", "\nLearning Node.js", () => {});
```

---

## Delete a File

```javascript
fs.unlink("hello.txt", () => {});
```

---

# Mini Project

## Notes Manager CLI

### Folder Structure

```
notes-app/

│── index.js
│── notes.txt
```

### index.js

```javascript
import fs from "fs";

const note = process.argv[2];

fs.appendFile("notes.txt", note + "\n", (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log("Note Saved");

});
```

### Run

```bash
node index.js "Learn Express.js"
```

Output

```
Note Saved
```

Content of `notes.txt`

```
Learn Express.js
```

Every time you run the command, a new note is added.

---

# Common Mistakes

## 1. Forgetting the encoding

Incorrect

```javascript
fs.readFile("notes.txt", (err, data) => {

    console.log(data);

});
```

Output

```
<Buffer 48 65 6c 6c 6f ...>
```

Correct

```javascript
fs.readFile("notes.txt", "utf8", (err, data) => {

    console.log(data);

});
```

---

## 2. Ignoring errors

Incorrect

```javascript
fs.readFile("abc.txt", (err, data) => {

    console.log(data);

});
```

Correct

```javascript
if (err) {

    console.log(err);

    return;

}
```

---

## 3. Using writeFile() instead of appendFile()

If you want to preserve existing content, use `appendFile()`.

`writeFile()` always replaces the existing content.

---

## 4. Using synchronous methods unnecessarily

Avoid using methods like `readFileSync()` inside server request handlers because they block the Event Loop and reduce application performance.

---

# Best Practices

- Always use asynchronous methods when building servers.
- Always handle errors.
- Use `"utf8"` when reading text files.
- Use `appendFile()` for logs and notes.
- Use `path.join()` instead of hardcoding file paths (covered in the next lesson).
- Don't store large databases in text files; use a proper database for large-scale data.

---

# Interview Questions

## 1. What is the `fs` module?

`fs` is the built-in File System module of Node.js used to work with files and directories.

---

## 2. Is `fs` a built-in module?

Yes.

It comes with Node.js and does not require installation.

---

## 3. Difference between `writeFile()` and `appendFile()`?

| writeFile() | appendFile() |
|--------------|--------------|
| Creates or overwrites a file | Adds data to the end of a file |
| Existing content is removed | Existing content is preserved |

---

## 4. Difference between synchronous and asynchronous methods?

**Synchronous**

- Blocks execution until the task completes.

**Asynchronous**

- Does not block execution.
- Executes a callback when the operation finishes.

---

## 5. Why are asynchronous methods preferred?

Because they do not block the Event Loop, allowing Node.js to handle other operations while waiting for file I/O.

---

# Summary

- `fs` stands for **File System**.
- It is a built-in Node.js module.
- Used to read, write, update, rename, copy, and delete files.
- Prefer asynchronous methods over synchronous ones.
- Always handle errors.
- Use `appendFile()` to preserve existing data.
- Use `writeFile()` to create or overwrite files.
- `fs` is one of the most frequently used modules in backend development.