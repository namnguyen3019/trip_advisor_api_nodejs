import express from "express";
import userRoutes from "./routes/user.js";

const port = 3000;
const app = express();
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
