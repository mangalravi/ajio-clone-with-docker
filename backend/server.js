import dns from "node:dns";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({ path: "./.env" });

// Workaround for the Node.js DNS issue
dns.setServers(["8.8.8.8"]);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();