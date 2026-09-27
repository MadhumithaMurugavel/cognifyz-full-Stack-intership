const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static(__dirname));


// Open index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


// Temporary data
let users = [
    {
        id: 1,
        name: "Madhu",
        email: "madhu@gmail.com"
    }
];


// CREATE
app.post("/api/users", (req, res) => {

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);

    res.json(newUser);
});


// READ
app.get("/api/users", (req, res) => {

    res.json(users);
});


// UPDATE
app.put("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;
    user.email = req.body.email;

    res.json(user);
});


// DELETE
app.delete("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    users = users.filter(user => user.id !== id);

    res.json({
        message: "User deleted successfully"
    });
});


// Start server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});