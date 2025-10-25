import express from "express";
import cors from "cors";
const dbCon = require("./tools/db-connection");
const postRouter = require("./routes/postRoute.js");
const userRouter = require("./routes/userRoute.js");
import "dotenv";

const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));

app.use("/api", postRouter);
app.use("/api/user", userRouter);

// for testing
app.use(express.static("public"));
app.get("", (_req, res) => {
    res.send({ message: "pong" });
});

(async function () {
    await dbCon.connectDB();
})();

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
