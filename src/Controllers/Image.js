const clarifai = require("clarifai");

const handleApiCall = (db, apiKey) => (req, res) => {
  const Api = new clarifai.App({
    apiKey: apiKey,
  });

  const { input } = req.body;

  Api.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((generalModel) => generalModel.predict(input))
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
