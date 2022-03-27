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
    })
    .catch((error) => {
      console.warn(error);
      res.status(500).json("Internal Server Error");
    });
};

const handleProfileUpdate = (db) => (req, res) => {
  console.log(req.params, req.body.formInput);

  const { id } = req.params;

  const { name, email, birthday, avatar_url } = req.body.formInput;

  if (name.trim() == "" || email.trim() == "") {
    res.status(400).json("Empty name/email fields are not allowed.");
  }

  db("users")
    .where({ id })
    .update({ name, email, birthday, avatar_url })
    .then((response) => {
      // If there is an update
      if (response) {
        return res.json({ code: 1, msg: "Successfuly updated." });
      }

      return res.status(400).json({ code: 0, msg: "Unable to update." });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ code: 0, msg: "Internal error updating the user." });
    });
};

module.exports = {
  handleProfile,
  handleProfileUpdate,
};
