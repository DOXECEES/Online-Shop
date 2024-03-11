
const express = require('express');
const app = express();
const port = 5000;



var cors = require('cors');

app.use(cors());
app.use(express.json())


var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "myusername",
    password: "mypassword"
});

con.connect(function (err) {
    console.log("Connected!");
    /*Create a database named "mydb":*/
    con.query("CREATE DATABASE mydb", function (err, result) {
        console.log("Database created");
    });
});




app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
    res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const users = [
    { email: 'user123@user.com', password: 'password123' },
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simulated authentication logic (replace with your actual logic)
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

