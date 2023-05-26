const express = require("express");
const {
  addPlace,
  ShowPlacesByUser,
  findPlaceById,
  updatePlace,
  getAllPlaces,
  filterTrips,
} = require("../controllers/places");

const router = express.Router();

router.post("/", addPlace);
router.get("/user", ShowPlacesByUser);
router.get("/:id", findPlaceById);
router.put("/", updatePlace);
router.get("/", getAllPlaces);
// router.get('/search',(req,res)=>{
//   res.send('ok');
// });

module.exports = router;
