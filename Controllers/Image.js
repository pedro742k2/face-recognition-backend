const clarifai = require("clarifai");

const Api = new clarifai.App({
  apiKey: "2f2bc297f612444b83a3274058efbfba",
});

const handleApiCall = (req, res) => {
  Api.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((generalModel) => generalModel.predict(req.body.input))
    .then((data) => {
      res.json(data);
    })
    .catch(() => res.status(400).json("API not available"));
};

const handleImage = (db) => (req, res) => {
  const id = Number(req.body.id);

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      entries.length
        ? res.json(entries)
        : res.status(400).json("Unable to get id");
    })
    .catch(() => res.status(500).json("Unable to update entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
