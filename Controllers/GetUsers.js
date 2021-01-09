const handleGetUsers = (db) => (req, res) => {
  db.select("*")
    .from("users")
    .join("login", function () {
      this.on("users.email", "=", "login.email");
      this.orOn("users.user_name", "=", "login.user_name");
    })
    .then((data) => {
      if (data.length) {
        res.json(data);
        console.log(data);
      } else {
        res.status(400).json("No users found");
        console.log("No users found");
      }
    })
    .catch(() => {
      res.status(500).json("Unable to get users");
      console.log("Unable to get users");
    });
};

module.exports = {
  handleGetUsers,
};
