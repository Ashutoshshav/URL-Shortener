const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
  //return res.json({ msg: "User created" });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("signup", { error: "Invalid Username or Password" });
    //return res.json({ msg: "User not found Please Signup" });
  }

  const token = setUser(user);
  res.cookie("token", token);
  console.log(token);

  return res.redirect("/");
  //return res.json({ msg: "User Login" });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
