const express = require("express");
const MapController = require("../controllers/MapController");
const MapValidator = require("../validator/MapValidator");
const router = express.Router();
const auth = require("../middlewares/auth");
const { fileHandler } = require("../middlewares/fileHandler");

const mapController = new MapController();
const mapValidator = new MapValidator();

router.post(
  "/add",
  auth(),
  fileHandler.fields([{ name: "layer", maxCount: 1 }]),
  mapValidator.validateCreate,
  mapController.create
);
router.get("/list", auth(), mapController.list);
router.put(
  "/update/:id",
  auth(),
  mapValidator.validateUpdate,
  mapController.update
);
router.delete("/delete/:id", auth(), mapController.delete);

module.exports = router;
