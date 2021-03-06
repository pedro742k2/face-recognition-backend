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

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    msg: "Hey, you're on the root",
    availableRoutes: [
      "/get_users",
      "/signin",
      "/register",
      "/profile/:id",
      "/image",
      "/image_url",
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
