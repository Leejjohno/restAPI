const { Router } = require("express");
const userRouter = Router();
const { createUser, login, deleteUser, getAllUsers, getUser } = require("./controllers");
const { hashPassword, unHash, tokenCheck } = require("../middleware");

userRouter.post("/user", hashPassword, createUser);
userRouter.get("/user", getAllUsers);
userRouter.get("/user/:username", getUser);
userRouter.post("/login", login);
userRouter.delete("/user/:username", deleteUser);

module.exports = userRouter;