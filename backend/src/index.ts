import express from "express";
import { connectDB } from "./tools/db-connection.ts";
import postRouter from "./routes/postRoute.ts";
import userRouter from "./routes/userRoute.ts"

const app = express();

app.use(express.json());
app.use("/api/post_router", postRouter);
app.use("/api/user_router", userRouter);

// express-async-handler
// deno-lint-ignore no-explicit-any
app.use((err: any, _req: any, res: any, _next: any) => {
    const status = err.status || 500;
    const message = err.message || "Server error";
    res.status(status).json({ error: message });
});

// for testing
app.use(express.static("public"));
app.get("", (_req, res) => {
    res.send({ message: "pong" });
});


(async function () {
    await connectDB();
})();

const PORT = process.env.port;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

