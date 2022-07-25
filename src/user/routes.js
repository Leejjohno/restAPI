const { Router } = require("express");
const userRouter = Router();
const { createUser, getAllUsers, getUser, login, deleteUser, updateEmail, updateUsername } = require("./controllers");
const { hashPassword } = require("../middleware"); //removed tokenCheck from here for login testing

userRouter.post("/user", hashPassword, createUser);
userRouter.get("/user", getAllUsers);
userRouter.get("/user/:username", getUser); 
userRouter.post("/login", login); //removed tokenCheck from here for login testing
userRouter.delete("/user/:username", deleteUser);
userRouter.put("/user/:account", updateUser);
// userRouter.put("/user/:username", updateUsername);

module.exports = userRouter;