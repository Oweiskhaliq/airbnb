const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        return res.redirect("/host/host-home-list");
      }
      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit your Home",
        currentPage: "host-homes",
        editing: editing,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log("Error while editing the record.", err);
    });
};

exports.getHostHomes = (req, res, next) => {
  const userId = req.session.user._id;
  Home.find({ userId: userId }).then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const userId = req.session.user._id;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
    userId,
  });

  home
    .save()
    .then(() => {
      console.log("insertion Successfull..");
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("error while inserting the record", err);
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photoUrl = photoUrl;
      home.description = description;
      home
        .save()
        .then((result) => console.log("home Updated", result))
        .catch((err) => console.log("Error Editing  the home. ", err));
      res.redirect("/host/host-home-list");
    })
    .catch((error) => console.log("Home not found"));
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while delteing the home. ", err);
    });
};
