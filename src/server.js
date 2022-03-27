const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes");
const morgan = require("morgan");

// Get .env constants
require("dotenv").config();
const serverPort = Number(process.env.PORT) || 4000;

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());
app.use("/api/", router);

// Start the server
app.listen(serverPort, () => {
  console.log(`Server started on port ${serverPort}`);
});
