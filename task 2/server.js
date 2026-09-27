const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Temporary storage
let users = [];

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

// Form submission
app.post("/result", (req, res) => {

    const { name, email, age, phone } = req.body;

    // Server-side validation
    if (!name || !email || !age || !phone) {
        return res.send("Please fill all the fields.");
    }

    if (name.length < 3) {
        return res.send("Name must contain at least 3 characters.");
    }

    if (age < 18 || age > 60) {
        return res.send("Age must be between 18 and 60.");
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        return res.send("Phone number must contain exactly 10 digits.");
    }

    // Store validated data
    const user = {
        name,
        email,
        age,
        phone
    };

    users.push(user);

    res.send(`
        <h1>Registration Successful!</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Age: ${age}</p>
        <p>Phone: ${phone}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});