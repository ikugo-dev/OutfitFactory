import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const { connectDB } =  require("./tools/db-connection.ts");  

app.use(express.json());
//app.use(/api) TODO idk if needed

(async function () {
    await connectDB();
})();

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

