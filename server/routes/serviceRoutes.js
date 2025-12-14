const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.post("/services", createService);
router.get("/services", getAllServices);
router.get("/services/:id", getServiceById);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

module.exports = router;
