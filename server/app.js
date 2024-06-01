// require('dotenv').config()
// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 5000;


const cors = require('cors');

// app.use(cors());
// app.use(express.json())



// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "blog_posts"
// });

// con.connect(function (err) {
//     console.log("Connected!");
//     /*Create a database named "mydb":*/
//     con.query("CREATE DATABASE mydb", function (err, result) {
//         console.log("Database created");
//     });
// });




// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// app.get('/express_backend', (req, res) => {
//     res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });

// const users = [
//     { email: 'user123@user.com', password: 'password123' },
// ];

// app.post('/api/auth/signup', (req, res) => {
//     const { email, password } = req.body;

//     // Simulated authentication logic (replace with your actual logic)
//     const user = users.find((u) => u.email === email && u.password === password);
//     if (user) {
//         return res.status(401).json({ message: 'Authentication failed' });
//     }

//     users.push({ email, password });

//     //Generate JWT token
//     //const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

//     res.status(200).json({ message: "its ok boii" });
// });
const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql');   
const router = require('./api/Routes/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express();
const mysqlConnection = require('./api/Database/MainDBRequester');

app.use(cors());

app.use(bodyParser.json());
app.use('/api', router)

// const mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '_12345MySql_',
//     database: 'users',
// });

// mysqlConnection.connect((error) => {
//     if (error) {
//         console.error('Error connecting to MySQL:', error);
//     } else {
//         console.log('Connected to MySQL');
//     }
// });



app.get('/api/shopping-cart/:email', async (req, res) => {
    const email = req.params.email;
    const sql = `SELECT ShoppingCart.*, products.title AS ProductName
                 FROM ShoppingCart
                 INNER JOIN user ON ShoppingCart.UserID = user.id
                 INNER JOIN Products ON ShoppingCart.ProductID = products.id
                 WHERE user.email = ?`;
    mysqlConnection.query(sql, email, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            throw err;
        }
        res.json(result);
    });
});

app.post('/api/shopping-cart/add', async (req, res) => {
    const { email, productID, quantity } = req.body;

    const getUserIDQuery = `SELECT id FROM user WHERE email = ?`;
    mysqlConnection.query(getUserIDQuery, email, (err, userResult) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            console.log(err);
            return;
        }
        if (userResult.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const userID = userResult[0].id;
        console.log([userID, productID, quantity])

        const addToCartQuery = `INSERT INTO shoppingcart (UserID, ProductID, Quantity) VALUES (?, ?, ?)`;
        mysqlConnection.query(addToCartQuery, [userID, productID, quantity], (err, result) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                console.log(err);
            }
            res.status(200).send('Item added to cart');
        });
    });
});

app.delete('/api/shopping-cart/:email/:itemID', async (req, res) => {
    const { email, itemID } = req.params;
    console.log(email);

    const getUserIDQuery = `SELECT id FROM user WHERE email = ?`;
    mysqlConnection.query(getUserIDQuery, email, (err, userResult) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            throw err;
        }
        if (userResult.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const userID = userResult[0].id;
        const removeFromCartQuery = `DELETE FROM ShoppingCart WHERE UserID = ? AND ItemID = ?`;
        mysqlConnection.query(removeFromCartQuery, [userID, itemID], (err, result) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                console.log(err);
                throw err;
            }
            res.status(200).send('Item removed from cart');
        });
    });
});

app.post("/api/role", async (req, res) => {
    const { email } = req.body;
    console.log("role " + email);
    try {
        mysqlConnection.query(`SELECT role FROM user WHERE email = ?`, email, (err, userResult) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                console.log(err);
                throw err;
            }
            if (userResult.length === 0) {
                res.status(404).send('User not found');
                return;
            }
            else {
                res.status(200).send((userResult[0].role).toString());
            } lore
        }
        )
    }
    catch (error) {
        console.log(error);
    }
})

app.post('/api/admin/add', async (req, res) => {
    const { description, name, price } = req.body;
    const image = "";
    const values = [description, image, name, price];

    mysqlConnection.query('INSERT INTO products(title, image, specifications, price) VALUES(?,?,?,?)', values, (error_, results_) => {
        if (error_) {
            console.error('Error writing data:', error_);
            res.status(500).json({ message: 'Произошла ошибка. Попробуйте позже' });
        }
        else {
            res.status(200).send('');
        }

    })
});

app.post('/api/admin/delete', async (req, res) => {
    const { description, name, price } = req.body;
    const image = "";
    const values = [name, description, price];

    mysqlConnection.query('DELETE FROM products WHERE title = ? AND specifications=? AND price=?', values, (error_, results_) => {
        if (error_) {
            console.error('Error writing data:', error_);
            res.status(500).json({ message: 'Произошла ошибка. Попробуйте позже' });
        }
        else {
            res.status(200).send('');
        }

    })
});


app.post('/api/profile', (req, res) => {
    const { street, home, entranceway, city, telephone } = req.body;
    const values = [street, home, entranceway, city, telephone];

    mysqlConnection.query('INSERT INTO userData(street, home, entranceway, city, telephone) VALUES(?,?,?,?,?)', values, (error_, results_) => {
        if (error_) {
            console.error('Error writing data:', error_);
            res.status(500).json({ message: 'Произошла ошибка. Попробуйте позже' });
        }
        else {
            res.status(200).send('Item removed from cart');
        }
    })
})

app.get('/api/profile', (req, res) => {
    const value = 2;
    const query = `SELECT * FROM userData WHERE id=?`;
    mysqlConnection.query(query, value, (error_, results_) => {
        if (error_) {
            console.error('Error getting data:', error_);
            res.status(500).json({ message: 'Произошла ошибка. Попробуйте позже' });
        }
        else {
            res.status(200).json(results_);
        }

    })
})




app.post('/api/auth/signup', async (req, res) => {
    const { email, password, role } = req.body;

    const query = `INSERT INTO user (email, password, role) VALUES (?, ?, ?)`;
    const cheakQuery = `SELECT * FROM user WHERE email = ?`;

    const hPassword = await bcrypt.hash(password, 2);
    console.log(hPassword);
    const values = [email, hPassword, role];

    mysqlConnection.query(cheakQuery, values, (error_, results_) => {
        if (error_) {
            console.error('Error registering user:', error_);
            res.status(500).json({ message: 'Произошла ошибка. Попробуйте позже' });
        }
        else if (results_.length === 0) {

            mysqlConnection.query(query, null, (error, results) => {

                if (error) {
                    console.error('Error registering user:', error);
                    res.status(500).json({ message: 'Не удалось зарегистрировать' });
                } else {

                    const id = results.insertId;

                    const token = jwt.sign({ id, email, role }, "I_CREATE_THIS_KEY_IN_4:50", { expiresIn: "72h" });
                    res.json({ token });

                }
            });
        }
        else {
            console.error('User exists');
            res.status(500).json({ message: 'Email уже зарегистрирован' });
        }
    });

});

app.post('/api/auth/signin', async (req, res) => {

    const { email, password } = req.body;
    console.log(email);
    console.log(password);


    const query = `SELECT * FROM user WHERE email = ?`;
    const values = [email, password];

    mysqlConnection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Error logging in user' });
        } else if (results.length === 0) {
            res.status(401).json({ message: 'Неверный логин или пароль' });
        } else {
            const hpassword = results[0].password;

            let compare = bcrypt.compareSync(password, hpassword);
            if (!compare)
                return res.status(401).json({ message: 'Неверный логин или пароль' });

            const id = results[0].id;
            const email = results[0].email;
            const role = results[0].role;

            const token = jwt.sign({ id, email, role }, "I_CREATE_THIS_KEY_IN_4:50", { expiresIn: '72h' });
            res.json({ token });
        }
    });
});

app.get('/api/auth', async (req, res, next) => {

    const id = req.body.id;
    const email = req.body.email;
    const role = req.role;

    const tokenRaw = req.headers.authorization.split(' ')[1];
    if (!tokenRaw)
        return res.status(401).json({ message: 'Неавторизован' });

    const token = jwt.sign(
        { id, email, role },
        "I_CREATE_THIS_KEY_IN_4:50",
        { expiresIn: '72h' });

    console.log(token);
    return res.json({ token })
})


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});