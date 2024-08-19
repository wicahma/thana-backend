const express = require("express");
const AssetValidator = require("../validator/AssetValidator");
const AssetController = require("../controllers/AssetController");
const router = express.Router();
const auth = require("../middlewares/auth");

const assetController = new AssetController();
const assetValidator = new AssetValidator();

router.post("/create", auth(), assetValidator.validateCreate, assetController.create);
router.get("/list", auth(), assetController.list);
router.get("/list/:id", auth(), assetValidator.validateGetById, assetController.detail);
router.put("/update/:id", auth(), assetValidator.validateUpdate, assetController.update);
router.delete("/delete/:id", auth(), assetValidator.validateDelete, assetController.delete);

module.exports = router;
