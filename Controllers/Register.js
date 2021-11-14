const handleRegister = (db, bcrypt) => (req, res) => {
  const { givenName, givenUser, givenEmail, givenPassword } = req.body;

  if (!givenName || !givenUser || !givenEmail || !givenPassword) {
    return res
      .status(400)
      .json({ isSuccessful: false, error: "Incorrect form submission" });
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
            .then((data) => {
              if (data[0].id) {
                res.json({
                  isSuccessful: true,
                  user: data,
                });
              } else {
                res.status(400).json({
                  isSuccessful: false,
                  error: "Unable to return the user",
                });
              }
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((error) => {
      res.status(500).json({
        isSuccessful: false,
        error: "Unable to register",
      });
      console.log(error)
    });
  });
};

module.exports = {
  handleRegister,
};
