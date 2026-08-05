import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const { default: aiRouter } = await import("./routes/ai.js");

app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRouter);

const PORT = Number(process.env.PORT) || 8787;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
  console.log(`OpenAI key configured: ${Boolean(process.env.OPENAI_API_KEY)}`);
});