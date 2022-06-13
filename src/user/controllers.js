const User = require("./model");

exports.createUser = async (req, res) => {
    try {
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const newUser = await User.create(userObj)
        res.send({ newUser })
    } catch (error) {
        console.log(error);
        res.send({ error: error.code });
    }
};