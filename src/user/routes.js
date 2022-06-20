const { Router } = require("express");
const userRouter = Router();
const { createUser, login, deleteUser, getAllUsers, getUser, updateEmail, updateUsername } = require("./controllers");
const { hashPassword, tokenCheck } = require("../middleware");

userRouter.post("/user", hashPassword, createUser);
userRouter.get("/user", getAllUsers);
userRouter.get("/user/:username", tokenCheck, getUser);
userRouter.post("/login", tokenCheck, login);
userRouter.delete("/user/:username", deleteUser);
userRouter.put("/user/:email", updateEmail);
userRouter.put("/user/:username", updateUsername);

module.exports = userRouter;