const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

/* Controllers */
const register = require("./Controllers/Register");
const login = require("./Controllers/Login");
const profile = require("./Controllers/Profile");
const image = require("./Controllers/Image");
/* Optional Controller: */
const getUsers = require("./Controllers/GetUsers");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
  client: "pg",
  connection: {
    connectString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log("db ->", data);
  });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    msg: "Hey, you're on the root",
    availableOptions: [
      "/get_users",
      "/signin",
      "/register",
      "/profile/:id",
      "/image",
      "/image_url",
      `process.env.DATABASE_URL: ${process.env.DATABASE_URL}`,
    ],
  });
});

app.get("/get_users", getUsers.handleGetUsers(db));

app.post("/signin", login.handleLogin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:id", profile.handleProfile(db));

app.put("/image", image.handleImage(db));

app.post("/image_url", image.handleApiCall);

/* Start the server */
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
