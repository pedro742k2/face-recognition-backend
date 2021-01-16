const handleLogin = (db, bcrypt) => (req, res) => {
  const { givenUser, givenPassword } = req.body;

  db.select("hash", "email", "user_name")
    .from("login")
    .where("user_name", givenUser.toLocaleLowerCase())
    .orWhere("email", givenUser.toLocaleLowerCase())
    .then((data) => {
      if (data.length) {
        bcrypt.compare(givenPassword, data[0].hash).then((result) => {
          if (result) {
            return db
              .select("*")
              .from("users")
              .where("email", givenUser)
              .orWhere("user_name", givenUser)
              .then((user) => {
                res.json({
                  isSuccessful: true,
                  msg: user,
                });
              })
              .catch(() => {
                res.status(400).json({
                  isSuccessful: false,
                  msg: "Unable to get the user",
                });
              });
          } else {
            res.status(400).json({
              isSuccessful: false,
              msg: "Wrong credentials",
            });
          }
        });
      } else {
        res.status(400).json({
          isSuccessful: false,
          msg: "Wrong credentials",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        isSuccessful: false,
        msg: "Wrong credentials",
      });
    });
};

module.exports = {
  handleLogin,
};
