require("./db/connection");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5001;
const userRouter = require("./user/routes");

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
