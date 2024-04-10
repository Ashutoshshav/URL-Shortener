const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectToMongoDB = require("./utils/db");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const { restrictToLoggedinUserOnly} = require("./middileware/auth");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("DB connected");
});

app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId);

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log(entry.redirectURL);
  res.redirect(entry.redirectURL);
});

app.listen(port, (req, res) => {
  console.log("Listen on ", port);
});
