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
                const loggedInUser = databse.filter(db => { if (db.username === tokenVerify.username) { return db; } });
                delete loggedInUser.password;
                res
                    .json(loggedInUser)
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

// The secret should be an unguessable long string (you can use a password generator for this!)
const jsonwebtoken_SECRET =
    "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

app.post("/login", (req, res) => {
    // console.log(req.body.username);
    // console.log(res);
    // Get the username and password to the json body data
    const { username, password } = req.body;
    // Get the username to the json body data
    // const username = req.body.username;

    // Get the password to the json body data
    // const password = req.body.password;

    // Make two variable for further use
    let isPresent = false;
    let isPresnetIndex = null;

    // Iterate a loop to the data items and
    // check what data are method
    for (let i = 0; i < databse.length; i++) {

        // If data username are matched so check
        // the password are correct or not
        if (databse[i].username === username &&
            databse[i].password === password) {

            // If both are correct so make
            // isPresent variable true
            isPresent = true;

            // And store the data index
            isPresnetIndex = i;

            // Break the loop after matching
            // successfully
            break;
        }
    }

    // If isPresent is true, then create a
    // token and pass to the response
    if (isPresent) {

        // The jsonwebtoken.sign method are used
        // to create token
        const token = jsonwebtoken.sign(
            databse[isPresnetIndex],
            jsonwebtoken_SECRET
        );

        const user = Object.assign({}, databse[isPresnetIndex]);
        delete user.password;

        // Pass the data or token in response
        res.status(200).json({
            login: true,
            token: token,
            data: user
        });
    } else {

        // If isPresent is false return the error
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