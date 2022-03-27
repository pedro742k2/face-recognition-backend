const jwt = require("jsonwebtoken");

const handleRegister = (db, bcrypt, redisClient) => (req, res) => {
  const { givenName, givenUser, givenEmail, givenPassword } = req.body;

  if (
    !givenName?.trim() ||
    !givenUser?.trim() ||
    !givenEmail?.trim() ||
    !givenPassword?.trim()
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Incorrect form submission" });
  }

  bcrypt.hash(givenPassword, 10, (error, hash) => {
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: givenEmail,
          user_name: givenUser,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              name: givenName,
              user_name: givenUser,
              email: loginEmail[0],
              joined: new Date(),
            })
            .then(async (data) => {
              console.log(data);

              const { id } = data[0];

              if (id) {
                // Generates JWT token
                const token = jwt.sign(
                  { userName: data[0].user_name },
                  process.env.JWT_SECRET,
                  { expiresIn: "2 days" }
                );

                // Store token on Redis
                redisClient.set(token, id);

                return res.json({
                  success: true,
                  userId: id,
                  token,
                });
              }

              res.status(400).json({
                success: false,
                error: "Unable to return the user",
              });
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        error: "Unable to register: " + error,
      });
    });
  });
};

module.exports = {
  handleRegister,
};
