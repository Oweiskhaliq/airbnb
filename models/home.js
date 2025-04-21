// Core Modules

const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: String, required: true },
  photoUrl: String,
  description: String,
});

// houseSchema.pre("findOneAndDelete", async function (next) {
//   const homeId = this.getQuery()._id;
//   await Favourite.deleteMany({ houseId: homeId });
//   next();
// });
module.exports = mongoose.model("Home", houseSchema);
