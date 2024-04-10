const jwt = require('jsonwebtoken');
const SecretKey = "ASHU$SHAV";

function setUser(user) {
  const token = jwt.sign({
    _id: user._id,
    email: user.email
  }, SecretKey);
  return token;
}

function getUser(token) {
  if(!token) { return null };

  try {
    return jwt.verify(token, SecretKey);
  } catch {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
