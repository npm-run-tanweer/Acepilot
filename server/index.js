import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studyRoutes from "./routes/studyRoutes.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.VITE_FRONTEND_URL],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/study", studyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
