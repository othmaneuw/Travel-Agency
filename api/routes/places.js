const express = require("express");
const {
  addPlace,
  ShowPlacesByUser,
  findPlaceById,
  updatePlace,
  getAllPlaces,
} = require("../controllers/places");

const router = express.Router();

router.post("/", addPlace);
router.get("/user", ShowPlacesByUser);
router.get("/:id", findPlaceById);
router.put("/", updatePlace);
router.get("/", getAllPlaces);

module.exports = router;
