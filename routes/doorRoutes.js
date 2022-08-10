const { getDoors, createDoor, uploadDoorImage, updateDoorData, getDoor, deleteDoor } = require("../controllers/doorController");
const { windowUpload } = require("../controllers/uploadController");
const protect = require("../middlewares/protect");

const router = require("express").Router();

router.post("/", protect, createDoor);
router.get("/all", getDoors);
router.put("/images/:doorId", protect, windowUpload.fields([{
    name: 'type_image', maxCount: 1
}, {
    name: 'appearance', maxCount: 1
}]) , uploadDoorImage);
router.put("/update/:doorId", protect ,updateDoorData);
router.get("/getdata/:modelId", protect, getDoor);
router.delete("/remove/:doorId", protect, deleteDoor);

module.exports = router;