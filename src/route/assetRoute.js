const express = require("express");
const AssetValidator = require("../validator/AssetValidator");
const AssetController = require("../controllers/AssetController");
const router = express.Router();
const auth = require("../middlewares/auth");
const { fileHandler } = require("../middlewares/fileHandler");

const assetController = new AssetController();
const assetValidator = new AssetValidator();

router.get("/all", auth(), assetController.all);
router.get("/list", assetController.list);
router.get("/list-undone", assetController.listUndone);
router.get("/dashboard", auth(), assetController.dashboardPreview);
router.get(
  "/detail-guest/:id",
  assetValidator.validateGetByUuid,
  assetController.detailGuest
);
router.get(
  "/detail/:id",
  auth(),
  assetValidator.validateGetByUuid,
  assetController.detail
);
router.get("/search", assetController.search);
router.post(
  "/create",
  auth(),
  fileHandler.fields([
    { name: "foto_1", maxCount: 1 },
    { name: "foto_2", maxCount: 1 },
    { name: "pdf_legalitas", maxCount: 1 },
  ]),
  assetValidator.validateCreate,
  assetController.create
);
router.post(
  "/bulk-create",
  auth(),
  assetValidator.validateBulkCreate,
  assetController.bulkCreate
);
router.put(
  "/update/:id",
  auth(),
  fileHandler.fields([
    { name: "foto_1", maxCount: 1 },
    { name: "foto_2", maxCount: 1 },
    { name: "pdf_legalitas", maxCount: 1 },
  ]),
  assetValidator.validateUpdate,
  assetController.update
);
router.delete(
  "/delete/:id",
  auth(),
  assetValidator.validateDelete,
  assetController.delete
);

module.exports = router;
