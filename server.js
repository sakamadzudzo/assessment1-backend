// server.js
const express = require("express");
const app = express();
app.use(express.json());
const jsonwebtoken = require("jsonwebtoken");

app.get("/super-secure-resource", (req, res) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            const tokenVerify = jsonwebtoken.verify(token, jsonwebtoken_SECRET);
            if (tokenVerify) {
                const loggedInUser = databse.filter(db => {
                    if (db.username === tokenVerify.username) {
                        return db;
                    }
                });
                const user = Object.assign({}, loggedInUser[0]);
                delete user.password;
                res
                    .json(user)
                    .status(200);
            }
        } catch (err) {
            res.status(400).json({ message: 'Invalid token' });
        }
    } else {
        res
            .status(401)
            .json({ message: "You need to be logged in to access this resource" });
    }
    return res;
});

app.get("/", (req, res) => {
    res
        .status(200)
        .json({ message: "Login first" });
});

const jsonwebtoken_SECRET =
    "the json web token secret for assesment 1 backend is super super long xxYXjs7e7wb!@";

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    let isPresent = false;
    let isPresnetIndex = null;

    for (let i = 0; i < databse.length; i++) {

        if (databse[i].username === username &&
            databse[i].password === password) {

            isPresent = true;

            isPresnetIndex = i;

            break;
        }
    }

    if (isPresent) {

        const token = jsonwebtoken.sign(
            databse[isPresnetIndex],
            jsonwebtoken_SECRET
        );

        const user = Object.assign({}, databse[isPresnetIndex]);
        delete user.password;

        res.status(200).json({
            login: true,
            token: token,
            data: user
        });
    } else {

        res.status(401).json({
            login: false,
            error: 'please check username and password.'
        });
    }
    return res;
});

app.listen(process.env.PORT || 3001, () => {
    console.log("API running on localhost:3001");
});

// A fake database object.
let databse = [
    {
        id: 1,
        username: "kali",
        password: "1@maFULL5t#(kENGINEER!",
        name: "One Kali",
        dob: "23/02/1984",
        gender: "Male"
    },
    {
        id: 2,
        username: "kali2",
        password: "I#mAFullSt@CkENGINEER!",
        name: "Another Kali",
        dob: "23/02/1984",
        gender: "Female"
    }
];