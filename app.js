// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require("express-session");
const mongoDbSessionStore = require("connect-mongodb-session")(session);
const DB_Path =
  "mongodb+srv://root:root@cluster0.7oucb.mongodb.net/mongooseAirbnb?retryWrites=true&w=majority&appName=Cluster0";

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");
const app = express();

// create and connect mongodbSession
const store = new mongoDbSessionStore({
  uri: DB_Path,
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
// express-session middleware
app.use(
  session({
    secret: "helloIamDeveloper",
    resave: false,
    saveUninitialized: true,
    store,
  })
);
// get the cookies
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    return next();
  }
  res.redirect("/login");
});
app.use("/host", hostRouter);
app.use(authRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose
  .connect(DB_Path)
  .then(() => {
    console.log("DB Connected Successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error while connecting database", error);
  });
