const handleProfile = (db) => (req, res) => {
  const id = Number(req.params.id);

  db.select("*")
    .from("users")
    .where({
      id,
    })
    .then((user) => {
      user[0] !== undefined
        ? res.json(user[0])
        : res.status(400).json("User not found");
    });
};

module.exports = {
  handleProfile,
};
