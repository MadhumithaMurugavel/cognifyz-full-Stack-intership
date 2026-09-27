const express = require("express");

const app = express();
const PORT = 3000;

// Read form data
app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Form submission
app.post("/result", (req, res) => {
    const { name, email } = req.body;

    res.send(`Hello ${name}! Your email is ${email}.`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});