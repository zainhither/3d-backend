const express = require("express");
const { uploadModel, upload, allModels, myModels, modelDetails } = require("../controllers/model3dController");
const router = express.Router();
const protect = require("../middlewares/protect");

router.post("/upload", protect, upload.single("file"), uploadModel);
router.get("/all", protect, allModels);
router.get("/my", protect, myModels);
router.get("/:id", protect, modelDetails);

module.exports = router;