const jwt = require("jsonwebtoken");

const handleSignin = (db, bcrypt, req) => {
  const { givenUser, givenPassword } = req.body;

  if (!givenUser?.trim() || !givenPassword?.trim()) {
    return Promise.reject({ success: false, msg: "Incorrect form submission" });
  }

  return db
    .select("hash", "email", "user_name")
    .from("login")
    .where("user_name", givenUser.toLocaleLowerCase())
    .orWhere("email", givenUser.toLocaleLowerCase())
    .then((data) => {
      if (data.length) {
        return (
          bcrypt
            .compare(givenPassword, data[0].hash)
            .then((result) => {
              if (result) {
                return db
                  .select("*")
                  .from("users")
                  .where("email", givenUser)
                  .orWhere("user_name", givenUser)
                  .then((user) => ({
                    success: true,
                    msg: user[0],
                  }))
                  .catch((error) =>
                    Promise.reject({
                      success: false,
                      msg: "Unable to get the user",
                    })
                  );
              }

              // Wrong password
              return Promise.reject({
                success: false,
                msg: "Wrong credentials",
              });
            })
            // Error comparing passwords (bcrypt)
            .catch((error) => Promise.reject(error))
        );
      } else {
        // Wrong username/email
        return Promise.reject({
          success: false,
          msg: "Wrong credentials",
        });
      }
    })
    .catch((error) => {
      console.warn(error);
      return Promise.reject(error);
    });
};

const getAuthTokenId = (redisClient, authorization) => {
  const promise = new Promise(async (resolve, reject) => {
    const value = await redisClient.get(authorization);

    if (!value) reject("Unauthorized");

    resolve({ id: value });
  });

  return promise;
};

const setToken = (redisClient, token, id) => {
  return Promise.resolve(redisClient.set(token, id));
};

const signToken = (userName) => {
  const jwtPayload = { userName: userName };
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2 days" });
};

const createSession = (redisClient, user) => {
  // Create a JWT token and return the user data
  const { id, user_name } = user.msg;
  const token = signToken(user_name);

  return setToken(redisClient, token, id)
    .then(() => ({ success: true, userId: id, token }))
    .catch(console.error);
};

const signinAuthentication = (db, bcrypt, redisClient) => (req, res) => {
  const { authorization } = req.headers;

  return authorization
    ? getAuthTokenId(redisClient, authorization)
        .then((data) => res.json(data))
        .catch((error) => {
          console.warn("Error on signin: " + error);
          res.status(400).json(error);
        })
    : handleSignin(db, bcrypt, req, res)
        .then((data) =>
          data.msg.id && data.msg.email
            ? createSession(redisClient, data)
            : Promise.reject({ success: false, msg: "Wrong credentials." })
        )
        .then((session) => res.json(session))
        .catch((error) => res.status(error?.code || 400).json(error));
};

module.exports = {
  signinAuthentication,
};
