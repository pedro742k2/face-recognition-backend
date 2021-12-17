const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes");

// Get .env constants
require("dotenv").config();
const serverPort = Number(process.env.SERVER_PORT);

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use("/", router);

// Start the server
app.listen(serverPort, () => {
  console.log(`Server started on port ${serverPort}`);
});
