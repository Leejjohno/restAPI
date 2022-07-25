const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./model");

exports.createUser = async (req, res, next) => {
    console.log("Create User Hit")
    try {
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        console.log("User Object Hit: ", userObj)
        const newUser = await User.create(userObj);
        console.log("!!!!!", newUser)
        const token = await jwt.sign( { id: newUser._id }, process.env.SECRET );
        console.log("Token: ", token);
        console.log("NewUser: ", newUser);
        res.send({ newUser, token });
    } catch (error) {
        console.log(error);
        res.send({ error: error.code });
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        // console.log(users)
        res.send( users )
    } catch (error) {
        console.log(error);
        res.send({ error: error.code })
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const userObj = {
            username: req.body.username
        };
        const user = await User.findOne(userObj)
        console.log( user )
        res.send( user )
    } catch (error) {
        console.log(error);
        res.send({ error: error.code })
    }
};

exports.deleteUser = async (req, res, next) => {
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

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        console.log(user)
        if (req.body.password)  user.password = req.body.password;
        if (req.body.email)     user.email = req.body.email; 
        if (req.body.username) user.full_name = req.body.username;
    } catch (error) {
        console.log(error)
        res.send({ error: error.code })
    };
};

exports.login = async (req, res, next) => {
    try {
        console.log("Login hit")
        const returnUser = await User.findOne( { username: req.body.username } ) // change to `{ where: { username: req.body.username } }` for Thunder Client
        console.log(returnUser);
        const passCheck = await bcrypt.compare(req.body.password, returnUser.password);
        console.log(passCheck);
        if (returnUser && passCheck) {
            return res.send({ returnUser });
        } else {
            res.send("incorrect password");
        }
    } catch (error) {
        console.log(error);
        res.send({ error: error.code })
    }
}

exports.tokenLogin = async (req, res, next) => {
    const token = await jwt.sign({ id: req.user._id }, process.env.SECRET);
    res.send({ user: req.user, token });
};

// update username doesn't seem to work, it finds a match but doesn't do anything with it
// we don't need this if we simply have an update splash for all user needs
// exports.updateUsername = async (req, res) => {
//     try {
/*        const user = await User.updateOne( { username: req.body.username }, { username: req.body.updateUsername });
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error)
        res.send({ error: error.code })
    }; 
}
*/
