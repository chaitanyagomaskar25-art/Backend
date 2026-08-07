# 📘 Node.js Notes - Day 4
# Built-in Module: `path`

---

# What is `path`?

The `path` module is a **built-in Node.js module** used to work with **file and directory paths**.

It helps you:

- Create file paths
- Join multiple path segments
- Find file names
- Find directory names
- Get file extensions
- Convert relative paths into absolute paths
- Parse paths into useful information

Since it is a built-in module, **no installation is required**.

---

# Why does `path` exist?

Different operating systems use different path separators.

### Windows

```text
uploads\images\photo.jpg
```

### Linux/macOS

```text
uploads/images/photo.jpg
```

If you manually write paths, your application may not work correctly on every operating system.

The `path` module automatically handles these differences, making your code **cross-platform**.

Instead of writing:

```javascript
const file = "uploads/images/photo.jpg";
```

Write:

```javascript
import path from "path";

const file = path.join("uploads", "images", "photo.jpg");
```

Node.js automatically creates the correct path for the current operating system.

---

# Why do we need `path`?

The `path` module is used in almost every backend application.

Examples:

- Reading configuration files
- Uploading images
- Saving log files
- Reading HTML templates
- Working with Express static files
- Creating backup folders
- Building file upload paths

Real-world examples:

- Express serves static files using paths.
- Multer stores uploaded files using paths.
- VS Code works with project paths.
- npm locates `package.json` using paths.

---

# Importing `path`

## ES Modules

```javascript
import path from "path";
```

## CommonJS

```javascript
const path = require("path");
```

---

# Important Methods

| Method | Purpose |
|---------|---------|
| `join()` | Join multiple path segments |
| `resolve()` | Create an absolute path |
| `basename()` | Get the file name |
| `dirname()` | Get the directory name |
| `extname()` | Get the file extension |
| `parse()` | Break a path into an object |
| `format()` | Build a path from an object |
| `isAbsolute()` | Check whether a path is absolute |
| `normalize()` | Remove unnecessary separators |

---

# 1. `path.join()`

Joins multiple path segments.

### Syntax

```javascript
path.join(path1, path2, path3, ...)
```

### Example

```javascript
import path from "path";

const file = path.join("uploads", "images", "cat.jpg");

console.log(file);
```

### Output

Linux/macOS

```text
uploads/images/cat.jpg
```

Windows

```text
uploads\images\cat.jpg
```

### Why use `join()`?

Instead of:

```javascript
const file = "uploads/images/cat.jpg";
```

Use:

```javascript
const file = path.join("uploads", "images", "cat.jpg");
```

This makes your application platform-independent.

---

# 2. `path.resolve()`

Creates an **absolute path**.

### Syntax

```javascript
path.resolve(path)
```

### Example

```javascript
import path from "path";

console.log(path.resolve("uploads"));
```

### Output

Windows

```text
C:\Users\Chaitanya\project\uploads
```

Linux/macOS

```text
/home/chaitanya/project/uploads
```

---

# Relative Path vs Absolute Path

## Relative Path

```text
uploads/image.jpg
```

Starts from the current working directory.

---

## Absolute Path

```text
C:\Users\Chaitanya\project\uploads\image.jpg
```

Starts from the root of the file system.

---

# Difference between `join()` and `resolve()`

| `join()` | `resolve()` |
|----------|-------------|
| Joins path segments | Returns an absolute path |
| Usually returns a relative path | Always returns an absolute path |
| Does not consider the current working directory unless given | Uses the current working directory if needed |

Example:

```javascript
path.join("uploads", "cat.jpg");
```

Output

```text
uploads/cat.jpg
```

Example

```javascript
path.resolve("uploads", "cat.jpg");
```

Output

```text
C:\Users\...\project\uploads\cat.jpg
```

---

# 3. `path.basename()`

Returns the file name.

### Syntax

```javascript
path.basename(path)
```

### Example

```javascript
console.log(path.basename("/images/cat.jpg"));
```

Output

```text
cat.jpg
```

---

## Remove the Extension

```javascript
console.log(path.basename("/images/cat.jpg", ".jpg"));
```

Output

```text
cat
```

---

# 4. `path.dirname()`

Returns the directory name.

### Example

```javascript
console.log(path.dirname("/images/cat.jpg"));
```

Output

```text
/images
```

---

# 5. `path.extname()`

Returns the extension of a file.

### Example

```javascript
console.log(path.extname("photo.png"));
```

Output

```text
.png
```

Another example

```javascript
console.log(path.extname("resume.pdf"));
```

Output

```text
.pdf
```

---

# 6. `path.parse()`

Breaks a file path into an object.

### Example

```javascript
console.log(path.parse("/images/photo.jpg"));
```

Output

```javascript
{
    root: "/",
    dir: "/images",
    base: "photo.jpg",
    ext: ".jpg",
    name: "photo"
}
```

### Explanation

| Property | Meaning |
|----------|----------|
| root | Root directory |
| dir | Folder path |
| base | File name with extension |
| ext | File extension |
| name | File name without extension |

---

# 7. `path.format()`

Builds a path from an object.

### Example

```javascript
const file = path.format({
    dir: "/images",
    base: "photo.jpg"
});

console.log(file);
```

Output

```text
/images/photo.jpg
```

---

# 8. `path.isAbsolute()`

Checks whether a path is absolute.

### Example

```javascript
console.log(path.isAbsolute("/images"));
```

Output

```text
true
```

Example

```javascript
console.log(path.isAbsolute("images"));
```

Output

```text
false
```

---

# 9. `path.normalize()`

Removes unnecessary separators from a path.

### Example

```javascript
console.log(path.normalize("images//cats///photo.jpg"));
```

Output

```text
images/cats/photo.jpg
```

---

# Practical Examples

## Example 1

Create an upload path.

```javascript
const upload = path.join("uploads", "users", "profile.png");

console.log(upload);
```

---

## Example 2

Find the file name.

```javascript
console.log(path.basename("resume.pdf"));
```

Output

```text
resume.pdf
```

---

## Example 3

Find the extension.

```javascript
console.log(path.extname("notes.txt"));
```

Output

```text
.txt
```

---

## Example 4

Find the directory.

```javascript
console.log(path.dirname("/project/index.js"));
```

Output

```text
/project
```

---

## Example 5

Get the absolute path.

```javascript
console.log(path.resolve("uploads"));
```

---

# Mini Project

# File Path Analyzer

## Folder Structure

```text
project/

│── index.js
```

### index.js

```javascript
import path from "path";

const file = process.argv[2];

console.log("Full Path :", path.resolve(file));
console.log("File Name :", path.basename(file));
console.log("Directory :", path.dirname(file));
console.log("Extension :", path.extname(file));
```

### Run

```bash
node index.js uploads/image.png
```

### Output

```text
Full Path : C:\Users\...\uploads\image.png

File Name : image.png

Directory : uploads

Extension : .png
```

---

# Common Mistakes

## 1. Hardcoding Paths

❌ Wrong

```javascript
const file = "uploads/images/photo.jpg";
```

✅ Correct

```javascript
const file = path.join("uploads", "images", "photo.jpg");
```

---

## 2. Confusing Relative and Absolute Paths

Relative

```text
uploads/image.png
```

Absolute

```text
C:\Users\John\project\uploads\image.png
```

Use `path.resolve()` whenever you need the complete location of a file.

---

## 3. Ignoring File Extensions

❌ Wrong

```javascript
if (file.endsWith(".jpg")) {}
```

✅ Better

```javascript
if (path.extname(file) === ".jpg") {}
```

---

## 4. Manually Splitting Paths

❌ Wrong

```javascript
const parts = file.split("/");
```

This may fail on Windows.

✅ Better

```javascript
path.parse(file);
```

---

# Best Practices

- Always use `path.join()` to create file paths.
- Use `path.resolve()` for absolute paths.
- Use `path.basename()` to get file names.
- Use `path.dirname()` to get folder names.
- Use `path.extname()` to get file extensions.
- Use `path.parse()` when you need detailed file information.
- Avoid hardcoding `/` or `\` in file paths.
- Let the `path` module handle operating system differences.

---

# Interview Questions

## 1. What is the `path` module?

The `path` module is a built-in Node.js module used for working with file and directory paths in a platform-independent way.

---

## 2. Why should we use `path.join()`?

Because different operating systems use different path separators.

`path.join()` automatically creates the correct path for the current operating system.

---

## 3. Difference between `join()` and `resolve()`?

| `join()` | `resolve()` |
|----------|-------------|
| Joins multiple path segments | Returns an absolute path |
| Usually returns a relative path | Always returns an absolute path |

---

## 4. What does `path.basename()` return?

The file name.

Example

```javascript
path.basename("/images/photo.png");
```

Output

```text
photo.png
```

---

## 5. What does `path.dirname()` return?

The directory containing the file.

Example

```javascript
path.dirname("/images/photo.png");
```

Output

```text
/images
```

---

## 6. What does `path.extname()` return?

The extension of a file.

Example

```javascript
path.extname("resume.pdf");
```

Output

```text
.pdf
```

---

## 7. What does `path.parse()` return?

An object containing:

- root
- dir
- base
- ext
- name

---

## 8. Why is the `path` module important?

Because it makes file path handling safe and platform-independent, allowing Node.js applications to run correctly on Windows, Linux, and macOS.

---

# Summary

- `path` is a built-in Node.js module.
- It helps create and manipulate file paths.
- `path.join()` joins path segments safely.
- `path.resolve()` creates absolute paths.
- `path.basename()` returns the file name.
- `path.dirname()` returns the directory name.
- `path.extname()` returns the file extension.
- `path.parse()` breaks a path into useful components.
- Avoid hardcoding file paths—always use the `path` module for cross-platform compatibility.