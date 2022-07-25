const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPassword = async (req, res, next) => {
    console.log(req.body)
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8); // take the valid password then uses bcrypt to hash. The hash number is 8
        console.log(req.body);
        next();
    } catch (error) {
        console.log(error);
        res.send({error: error.code})
    }
};

exports.unHash = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            next()
        } else {
            throw new Error("Incorrect Credentials");
        }
    } catch (error) {
        console.log(error);
        res.send({ error: error.code })
    }
};

exports.tokenCheck = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const { decodedToken } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decodedToken);
        if (decodedToken.id) {
            next();
        } else {
           throw new Error("Token match error") 
        }
        next();
    } catch (error) {
        console.log(error);
        res.send({ error: error.code })
    }
};


