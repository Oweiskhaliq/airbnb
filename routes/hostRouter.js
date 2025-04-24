// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const hostController = require("../controllers/hostController");
const checkRole = require("../middleware/isAuth");
hostRouter.get("/add-home", checkRole(["host"]), hostController.getAddHome);
hostRouter.post("/add-home", checkRole(["host"]), hostController.postAddHome);
hostRouter.get(
  "/host-home-list",
  checkRole(["host"]),
  hostController.getHostHomes
);
hostRouter.get(
  "/edit-home/:homeId",
  checkRole(["host"]),
  hostController.getEditHome
);
hostRouter.post("/edit-home", checkRole(["host"]), hostController.postEditHome);
hostRouter.post(
  "/delete-home/:homeId",
  checkRole(["host"]),
  hostController.postDeleteHome
);

module.exports = hostRouter;
