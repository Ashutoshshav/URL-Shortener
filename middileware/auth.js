const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.render("login");
    //return res.json({ msg: "Please login" });
  }

  const user = getUser(token);

  if (!user) {
    return res.render("login");
    //return res.json({ msg: "Please login" });
  }

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
};
