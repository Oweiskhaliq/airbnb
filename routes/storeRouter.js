// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");
const checkRole = require("../middleware/isAuth");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", checkRole(["guest"]), storeController.getHomes);
storeRouter.get("/bookings", checkRole(["guest"]), storeController.getBookings);
storeRouter.get(
  "/favourites",
  checkRole(["guest"]),
  storeController.getFavouriteList
);

storeRouter.get(
  "/homes/:homeId",
  checkRole(["guest"]),
  storeController.getHomeDetails
);
storeRouter.post(
  "/favourites",
  checkRole(["guest"]),
  storeController.postAddToFavourite
);
storeRouter.post(
  "/favourites/delete/:homeId",
  checkRole(["guest"]),
  storeController.postRemoveFromFavourite
);

module.exports = storeRouter;
