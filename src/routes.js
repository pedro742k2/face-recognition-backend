// Libraries
const express = require("express");
const bcrypt = require("bcrypt");
const knex = require("knex");
const redis = require("redis");
// Controllers
const register = require("./Controllers/Register");
const signin = require("./Controllers/Signin");
const profile = require("./Controllers/Profile");
const image = require("./Controllers/Image");
// Middlewares
const auth = require("./Middlewares/Auth");

// Router
const router = express.Router();

/**
 * Redis connection
 */
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.on("error", console.error);
redisClient.connect();
redisClient.set("key", "value");

/**
 * DB connection
 */
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,

    // Comment the ssl object below when testing locally
    /* ssl: {
      rejectUnauthorized: false,
    }, */
  },
});

router.get("/", (req, res) => res.send("Face Recognition API"));
router.post("/signin", signin.signinAuthentication(db, bcrypt, redisClient));
router.post("/register", register.handleRegister(db, bcrypt, redisClient));
// Get user profile
router.get(
  "/profile/:id",
  auth.requireAuth(redisClient),
  profile.handleProfile(db)
);
// Edit user profile
router.post(
  "/profile/:id",
  auth.requireAuth(redisClient),
  profile.handleProfileUpdate(db)
);
// Increment entries on image insertion
router.put("/image", auth.requireAuth(redisClient), image.handleImage(db));
// Clarifai API call to get the image faces
router.post(
  "/image_url",
  auth.requireAuth(redisClient),
  image.handleApiCall(db, process.env.CLARIFAI_API_KEY)
);

module.exports = router;
