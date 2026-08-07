# 📘 Node.js Notes - Day 4
# Built-in Module: `os` (Operating System)

---

# What is the `os` Module?

The `os` module is a **built-in Node.js module** that provides information about the **operating system** on which your Node.js application is running.

It acts as a bridge between your Node.js application and the operating system.

Using the `os` module, you can get information such as:

- Operating system platform
- Operating system name
- Operating system version
- CPU architecture
- CPU information
- Total memory (RAM)
- Free memory
- Hostname
- Home directory
- Temporary directory
- User information
- Network interfaces
- System uptime

Since it is a built-in module, **no installation is required**.

---

# Why does the `os` Module Exist?

When building backend applications, developers often need information about the computer or server where the application is running.

For example:

- How much RAM does the server have?
- Which operating system is running?
- What is the server's hostname?
- How many CPU cores are available?
- Which user is running the application?

Without the `os` module, Node.js would have no standard way to access this information.

The `os` module provides a simple API for communicating with the operating system.

---

# Why Do We Need the `os` Module?

Many backend applications use the `os` module for:

- Server monitoring
- Debugging
- Logging system information
- Performance analysis
- DevOps tools
- Cloud deployments
- System dashboards

### Real-world Examples

- PM2
- Docker monitoring
- AWS CloudWatch
- Kubernetes monitoring
- System Information Dashboards

---

# Importing the `os` Module

## ES Modules

```javascript
import os from "os";
```

## CommonJS

```javascript
const os = require("os");
```

---

# Important Methods

| Method | Purpose |
|---------|---------|
| `platform()` | Returns the operating system platform |
| `type()` | Returns the operating system name |
| `release()` | Returns the operating system version |
| `arch()` | Returns CPU architecture |
| `hostname()` | Returns the computer name |
| `homedir()` | Returns the user's home directory |
| `tmpdir()` | Returns the temporary directory |
| `uptime()` | Returns system uptime |
| `totalmem()` | Returns total RAM |
| `freemem()` | Returns available RAM |
| `cpus()` | Returns CPU information |
| `userInfo()` | Returns current user information |
| `networkInterfaces()` | Returns network information |
| `EOL` | Returns the correct end-of-line character |

---

# 1. `os.platform()`

Returns the operating system platform.

### Syntax

```javascript
os.platform()
```

### Example

```javascript
import os from "os";

console.log(os.platform());
```

### Output

Windows

```text
win32
```

Linux

```text
linux
```

macOS

```text
darwin
```

---

# 2. `os.type()`

Returns the operating system name.

### Syntax

```javascript
os.type()
```

### Example

```javascript
console.log(os.type());
```

### Output

Windows

```text
Windows_NT
```

Linux

```text
Linux
```

macOS

```text
Darwin
```

---

# Difference Between `platform()` and `type()`

| `platform()` | `type()` |
|--------------|----------|
| Returns a short platform identifier | Returns the operating system name |
| Examples: `win32`, `linux`, `darwin` | Examples: `Windows_NT`, `Linux`, `Darwin` |

---

# 3. `os.release()`

Returns the operating system version.

### Example

```javascript
console.log(os.release());
```

### Output

```text
10.0.26100
```

---

# 4. `os.arch()`

Returns the CPU architecture.

### Example

```javascript
console.log(os.arch());
```

### Output

```text
x64
```

Possible values:

```text
x64
arm64
ia32
```

---

# 5. `os.hostname()`

Returns the computer's hostname.

### Example

```javascript
console.log(os.hostname());
```

### Output

```text
DESKTOP-ABCD123
```

---

# 6. `os.homedir()`

Returns the current user's home directory.

### Example

```javascript
console.log(os.homedir());
```

### Output (Windows)

```text
C:\Users\Chaitanya
```

### Output (Linux)

```text
/home/chaitanya
```

---

# 7. `os.tmpdir()`

Returns the operating system's temporary directory.

### Example

```javascript
console.log(os.tmpdir());
```

### Output (Windows)

```text
C:\Users\User\AppData\Local\Temp
```

### Output (Linux)

```text
/tmp
```

---

# 8. `os.uptime()`

Returns how long the operating system has been running.

The value is returned in **seconds**.

### Example

```javascript
console.log(os.uptime());
```

### Output

```text
54673
```

### Convert Seconds to Hours

```javascript
console.log((os.uptime() / 3600).toFixed(2));
```

### Output

```text
15.19
```

Hours

---

# 9. `os.totalmem()`

Returns the total installed RAM.

The value is returned in **bytes**.

### Example

```javascript
console.log(os.totalmem());
```

### Output

```text
17179869184
```

### Convert to GB

```javascript
console.log((os.totalmem() / 1024 / 1024 / 1024).toFixed(2));
```

### Output

```text
16.00
```

GB

---

# 10. `os.freemem()`

Returns the currently available RAM.

### Example

```javascript
console.log(os.freemem());
```

### Convert to GB

```javascript
console.log((os.freemem() / 1024 / 1024 / 1024).toFixed(2));
```

---

# 11. `os.cpus()`

Returns detailed information about all CPU cores.

### Example

```javascript
console.log(os.cpus());
```

### Sample Output

```javascript
[
  {
    model: "Intel(R) Core(TM) i7",
    speed: 2800,
    times: {
      user: 12000,
      nice: 0,
      sys: 4500,
      idle: 60000,
      irq: 0
    }
  }
]
```

### Get Number of CPU Cores

```javascript
console.log(os.cpus().length);
```

Output

```text
8
```

### Get CPU Model

```javascript
console.log(os.cpus()[0].model);
```

---

# 12. `os.userInfo()`

Returns information about the current user.

### Example

```javascript
console.log(os.userInfo());
```

### Sample Output

```javascript
{
    uid: -1,
    gid: -1,
    username: "Chaitanya",
    homedir: "C:\\Users\\Chaitanya",
    shell: null
}
```

### Get Username Only

```javascript
console.log(os.userInfo().username);
```

Output

```text
Chaitanya
```

---

# 13. `os.networkInterfaces()`

Returns network interface information.

### Example

```javascript
console.log(os.networkInterfaces());
```

### Sample Output

```javascript
{
    Ethernet: [...],
    WiFi: [...]
}
```

This method is commonly used in networking applications.

---

# 14. `os.EOL`

Represents the correct end-of-line character for the current operating system.

### Windows

```text
\r\n
```

### Linux/macOS

```text
\n
```

### Example

```javascript
import os from "os";

console.log("Hello" + os.EOL + "World");
```

### Output

```text
Hello
World
```

---

# Practical Examples

## Example 1 - Platform

```javascript
console.log(os.platform());
```

---

## Example 2 - CPU Architecture

```javascript
console.log(os.arch());
```

---

## Example 3 - Hostname

```javascript
console.log(os.hostname());
```

---

## Example 4 - RAM

```javascript
console.log(
    (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
    "GB"
);
```

---

## Example 5 - Username

```javascript
console.log(os.userInfo().username);
```

---

# Mini Project

# System Information CLI

## Folder Structure

```text
system-info/

│── index.js
```

---

## index.js

```javascript
import os from "os";

console.log("===== SYSTEM INFORMATION =====");

console.log("Platform      :", os.platform());
console.log("OS Type       :", os.type());
console.log("OS Version    :", os.release());
console.log("Architecture  :", os.arch());
console.log("Hostname      :", os.hostname());
console.log("Home Directory:", os.homedir());

console.log(
    "RAM           :",
    (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
    "GB"
);

console.log(
    "Free RAM      :",
    (os.freemem() / 1024 / 1024 / 1024).toFixed(2),
    "GB"
);

console.log("CPU Cores     :", os.cpus().length);
console.log("CPU Model     :", os.cpus()[0].model);
console.log("Current User  :", os.userInfo().username);
console.log("Uptime        :", (os.uptime() / 3600).toFixed(2), "hours");
```

---

## Run

```bash
node index.js
```

---

## Sample Output

```text
===== SYSTEM INFORMATION =====

Platform       : win32
OS Type        : Windows_NT
OS Version     : 10.0.26100
Architecture   : x64
Hostname       : DESKTOP-ABCD123
Home Directory : C:\Users\Chaitanya

RAM            : 16.00 GB
Free RAM       : 7.24 GB

CPU Cores      : 8
CPU Model      : Intel(R) Core(TM) i7

Current User   : Chaitanya
Uptime         : 15.19 hours
```

---

# Common Mistakes

## 1. Forgetting that memory is returned in bytes

❌ Wrong

```javascript
console.log(os.totalmem());
```

Output

```text
17179869184
```

✅ Better

```javascript
console.log(
    (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
);
```

Output

```text
16.00
```

GB

---

## 2. Assuming every operating system returns the same values

`os.platform()` returns different values depending on the operating system.

Windows

```text
win32
```

Linux

```text
linux
```

macOS

```text
darwin
```

Always write platform-independent code.

---

## 3. Printing the entire CPU object

❌

```javascript
console.log(os.cpus());
```

This produces a very large output.

✅ Better

```javascript
console.log(os.cpus().length);
```

or

```javascript
console.log(os.cpus()[0].model);
```

---

## 4. Forgetting that `uptime()` returns seconds

Convert it into minutes or hours before displaying it to users.

---

# Best Practices

- Use `os.platform()` for platform-specific logic.
- Convert bytes into MB or GB before displaying memory.
- Use `os.cpus().length` instead of printing the full CPU array.
- Use `os.userInfo()` to get current user details.
- Use `os.tmpdir()` instead of hardcoding temporary folder paths.
- Avoid exposing sensitive system information in production APIs.

---

# Interview Questions

## 1. What is the `os` module?

The `os` module is a built-in Node.js module that provides information about the operating system.

---

## 2. Is the `os` module built into Node.js?

Yes.

No installation is required.

---

## 3. What does `os.platform()` return?

It returns the operating system platform.

Examples:

- `win32`
- `linux`
- `darwin`

---

## 4. Difference between `os.platform()` and `os.type()`?

| `platform()` | `type()` |
|--------------|----------|
| Returns a short platform identifier | Returns the operating system name |
| Examples: `win32`, `linux`, `darwin` | Examples: `Windows_NT`, `Linux`, `Darwin` |

---

## 5. What unit does `os.totalmem()` return?

It returns memory in **bytes**.

---

## 6. How do you get the number of CPU cores?

```javascript
os.cpus().length
```

---

## 7. How do you get the CPU model?

```javascript
os.cpus()[0].model
```

---

## 8. How do you get the current user's home directory?

```javascript
os.homedir()
```

---

## 9. What does `os.EOL` represent?

It returns the correct end-of-line character for the current operating system.

---

## 10. Why is the `os` module important?

It helps backend applications retrieve system information for monitoring, debugging, logging, performance analysis, and DevOps tools.

---

# Summary

- `os` is a built-in Node.js module.
- It provides information about the operating system.
- Use `platform()` to identify the operating system.
- Use `type()` to get the OS name.
- Use `arch()` to get CPU architecture.
- Use `hostname()` to get the computer's hostname.
- Use `homedir()` to get the user's home directory.
- Use `tmpdir()` to get the temporary directory.
- Use `totalmem()` and `freemem()` for memory information.
- Use `cpus()` to get CPU details.
- Use `userInfo()` to retrieve current user information.
- Use `networkInterfaces()` to inspect network configuration.
- Convert bytes into MB or GB before displaying memory.
- The `os` module is commonly used in server monitoring, logging, debugging, and DevOps applications.