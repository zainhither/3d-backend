const { getRoofs, createRoof, uploadRoofImage, updateRoofData, getRoof, deleteRoof } = require("../controllers/roofController");
const { windowUpload } = require("../controllers/uploadController");
const protect = require("../middlewares/protect");

const router = require("express").Router();

router.post("/", protect, createRoof);
router.get("/all", getRoofs);
router.put("/images/:roofId", protect, windowUpload.fields([{
    name: 'type_image', maxCount: 1
}, {
    name: 'appearance', maxCount: 1
}]) , uploadRoofImage);
router.put("/update/:roofId", protect, updateRoofData);
router.get("/getdata/:modelId", protect, getRoof);
router.delete("/remove/:roofId", protect, deleteRoof);

module.exports = router;