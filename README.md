# Node-App-Server

> A reference implementation server built on top of the Node-App framework.

Node-App-Server is a real-world HTTP server that uses the **Node-App** framework to verify that the framework behaves correctly and can support production-style architecture similar to Express.js.

It serves as both:

- A validation that Node-App is well-designed and functional
- A demonstration of how to build a complete server using Node-App
- A practical example for interviews and learning purposes

---

## ✨ Purpose

Node-App-Server exists to confirm that Node-App can support a typical backend structure:

- Modular routing
- Middleware stacking
- Error handling flow
- Controller–Service architecture
- Graceful shutdown
- Production-ready process handling

In short:

👉 If this server works, Node-App works.

---

## 🔧 Key Features Demonstrated from Node-App

This project intentionally focuses on **Node-App features**, not generic server setup.

### - Middleware Pipeline

Uses Node-App's middleware system exactly like Express:

```js
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
```

Demonstrates:

- Ordered middleware execution
- Prefix-based mounting
- Global middleware
- Error-handling middleware
- Final fallback handlers

---

### - Router System

Uses Node-App's built-in Router factory for modular routing.

```js
const { Router } = require('../../Node-App');
const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);
```

Routers are nested:

```
/api → users router → controllers
```

This confirms Node-App supports hierarchical routing similar to Express.

---

### - Route Handling

Standard REST-style endpoints:

- GET /api/users
- POST /api/users

Handled through controllers using Node-App request/response objects.

---

### - Response Utilities

Uses Node-App response helpers:

```js
res.status(201).json(user);
res.json(users);
```

Confirms proper status handling and JSON responses.

---

### - Request Utilities

Uses parsed request path provided by Node-App:

```js
req.path
```

Required for routing, middleware matching, and error reporting.

---

## 🧠 Custom Middleware Implementations

Since Node-App currently does not include built-in middleware like `express.json()`, this server implements its own.

### 🧾 Custom JSON Body Parser

Parses incoming JSON requests manually using Node.js streams.

Key behaviors:

- Only parses `application/json`
- Enforces size limit (1 MB)
- Handles malformed JSON
- Protects against oversized payloads
- Attaches parsed data to `req.body`

This demonstrates how Express-style middleware can be recreated using Node-App.

---

## 🔮 Why This Project Matters

This server proves that Node-App can support:

✅ Express-style development patterns  
✅ Modular architecture  
✅ Middleware chaining  
✅ Nested routing  
✅ Error propagation  
✅ Production-like server lifecycle  

It demonstrates practical backend engineering skills beyond framework usage.

---

## 📄 License

MIT License

---

## 👤 Author

Built by Alex Chen as a validation project for the Node-App framework.
