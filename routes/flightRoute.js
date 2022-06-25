const express = require("express");

const router = express.Router();
const controller = require("../controllers/flightController");

router.get("/", controller.example);
router.post("/flight", controller.addFlight);
router.get("/flights", controller.getAllFlights);
router.get("/flights/:id/", controller.getOneFlight);
router.patch("/flights/:id/", controller.updateFlight);
router.delete("/flights/:id/", controller.deleteFlight);


module.exports = router;
