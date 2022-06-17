// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./model");

exports.createUser = async (req, res) => {
    console.log("Create User Hit")
    try {
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        console.log("User Object Hit: ", userObj)
        const newUser = await User.create(userObj);
        // const token = await jwt.sign( { id: newUser._id }, process.env.SECRET );
        console.log(token);
        console.log("NewUser: ", newUser)
        res.send({ newUser, token });
    } catch (error) {
        console.log(error);
        res.send({ error: error.code });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        // console.log(users)
        res.send( users )
    } catch (error) {
        console.log(error);
        res.send({ error: error.code })
    }
};

exports.getUser = async (req, res) => {
    try {
        const userObj = {
            username: req.body.username
        };
        const user = await User.findOne(userObj)
        console.log(user)
        res.send( user )
    } catch (error) {
        console.log(error);
        res.send({ error: error.code })
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userObj = {
            username: req.body.username
        };
        const user = await User.findOneAndDelete(userObj)
        console.log(user + " deleting")
        res.send(user)
        console.log(user + " deleted")
    } catch (error) {
        console.log(error);
        res.send({ error: error.code })
    }
};

exports.updateEmail = async (req, res) => {
    try {
        const user = await User.updateOne({ username: req.body.username }, { email: req.body.email });
        console.log(user)
        res.send(user.email)
    } catch (error) {
        console.log(error)
        res.send({ error: error.code })
    };
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username }})
        console.log(user);
        const passCheck = await bcrypt.compare(req.body.password, user.password);
        console.log(passCheck);
        if (passCheck) {
            res.send("user has logged in")
        } else {
            res.send("incorrect password")
        }
    } catch (error) {
        console.log(error);
    }
}

// exports.tokenLogin = async (req, res) => {
//     const token = await jwt.sign({ id: req.user._id }, process.env.SECRET);
//     res.send({ user: req.user, token });
// };

// update username doesn't seem to work, it always goes back to update email

exports.updateUsername = async (req, res) => {
    try {
        const user = await User.updateOne( { where: { username: req.body.username }}, { update: { username: req.body.updateUsername }});
        console.log(user)
        res.send(user.username)
    } catch (error) {
        console.log(error)
        res.send({ error: error.code })
    };
}

