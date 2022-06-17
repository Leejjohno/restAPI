const { Router } = require("express");
const userRouter = Router();
const { createUser, login, deleteUser, getAllUsers, getUser, updateEmail, updateUsername } = require("./controllers");
const { hashPassword } = require("../middleware");

userRouter.post("/user", hashPassword, createUser);
userRouter.get("/user", getAllUsers);
userRouter.get("/user/:username", getUser);
userRouter.post("/login", login);
userRouter.delete("/user/:username", deleteUser);
userRouter.put("/user/:email", updateEmail);
userRouter.put("/user/:username", updateUsername);

module.exports = userRouter;