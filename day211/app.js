// app.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const upload = require("./middlewares/multer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("images")); // static images
app.use(express.static("pages"));  // serve HTML pages

// "მონაცემთა ბაზა"
const users = [];

// --- ROUTES --- //

// Register HTML
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/register.html"));
});

// Login HTML
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/login.html"));
});

// Profile HTML
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/profile.html"));
});

// POST /register
app.post("/register", upload.single("image"), (req, res) => {
  const { email, password } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!email || !password || !image) {
    return res.status(400).send("All fields are required.");
  }

  users.push({ email, password, image });
  res.redirect("/login");
});

// POST /login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.redirect("/profile");
  } else {
    res.status(401).send("Invalid email or password");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
