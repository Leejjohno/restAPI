const { Router } = require("express");
const userRouter = Router();
const { createUser } = require("./controllers");

userRouter.post("/user", createUser);

module.exports = userRouter;