const express = require("express");
const bcrypt = require("bcrypt");
const knex = require("knex");

// Controllers
const register = require("./Controllers/Register");
const login = require("./Controllers/Login");
const profile = require("./Controllers/Profile");
const image = require("./Controllers/Image");

// Get .env constants
require("dotenv").config();

// Router
const router = express.Router();

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

router.post("/signin", login.handleLogin(db, bcrypt));
router.post("/register", register.handleRegister(db, bcrypt));
router.get("/profile/:id", profile.handleProfile(db));
router.put("/image", image.handleImage(db));
router.post(
  "/image_url",
  image.handleApiCall(db, process.env.CLARIFAI_API_KEY)
);

module.exports = router;
