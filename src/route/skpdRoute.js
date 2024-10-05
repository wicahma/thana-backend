const express = require("express");
const SkpdController = require("../controllers/SkpdController");
const SkpdValidator = require("../validator/SkpdValidator");
const router = express.Router();
const auth = require("../middlewares/auth");

const skpdController = new SkpdController();
const skpdValidator = new SkpdValidator();

router.post("/create", auth(), skpdValidator.validateCreate, skpdController.create);
router.post("/bulk-create", auth(), skpdValidator.validateBulkCreate, skpdController.bulkCreate);
router.get("/list", auth(), skpdController.list);
router.put("/update/:id", auth(),skpdValidator.validateUpdate, skpdController.update);
router.delete("/delete/:id", auth(), skpdController.delete);

module.exports = router;
