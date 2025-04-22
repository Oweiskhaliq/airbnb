const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = async (req, res, next) => {
  const isLoggedIn = req.session.user ? true : false;
  let favourites = [];
  let user = null;

  if (isLoggedIn) {
    try {
      const userId = req.session.user._id;
      user = await User.findById(userId);
      favourites = user.favourites || [];
    } catch (err) {
      console.log("Error fetching user:", err);
    }
  }

  Home.find()
    .then((registeredHomes) => {
      res.render("store/index", {
        registeredHomes,
        pageTitle: "airbnb Home",
        currentPage: "index",
        isLoggedIn,
        user: req.session.user,
        favourites,
      });
    })
    .catch((error) => {
      console.log("Error while fetching homes:", error);
    });
};

exports.getHomes = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  Home.find()
    .then((registeredHomes) => {
      res.render("store/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Homes List",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
        favourites: user.favourites,
      });
    })
    .catch((err) => {
      console.log("Error while fetching.", err);
    });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favourite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
  }

  res.redirect("/favourites");
};

exports.getHomeDetails = async (req, res, next) => {
  const homeId = req.params.homeId;
  const isLoggedIn = req.session.user ? true : false;

  try {
    const home = await Home.findById(homeId);

    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    }

    let favourites = [];
    if (isLoggedIn) {
      const user = await User.findById(req.session.user._id);
      favourites = user.favourites || [];
    }

    res.render("store/home-detail", {
      home,
      pageTitle: "Home Detail",
      currentPage: "Home",
      isLoggedIn,
      user: req.session.user,
      favourites,
    });
  } catch (err) {
    console.error("Error fetching home detail:", err);
    res.redirect("/homes");
  }
};
