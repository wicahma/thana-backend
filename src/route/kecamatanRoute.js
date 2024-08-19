const express = require("express");
const KecamatanController = require("../controllers/KecamatanController");
const KecamatanValidator = require("../validator/KecamatanValidator");
const router = express.Router();
const auth = require("../middlewares/auth");

const kecamatanController = new KecamatanController();
const kecamatanValidator = new KecamatanValidator();

router.post("/create", auth(), kecamatanValidator.validateCreate, kecamatanController.create);
router.get("/list", auth(), kecamatanController.list);
router.put("/update/:id", auth(), kecamatanValidator.validateUpdate, kecamatanController.update);
router.delete("/delete/:id", auth(), kecamatanValidator.validateDelete, kecamatanController.delete);

module.exports = router;
