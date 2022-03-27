const requireAuth = (redisClient) => async (req, res, next) => {
  const { authorization, user_id } = req.headers;

  if (!authorization) return res.status(401).json("Unauthorized");

  const tokenId = await redisClient.get(authorization);

  if (user_id != tokenId) return res.status(401).json("Unauthorized");

  return next();
};

module.exports = {
  requireAuth,
};
