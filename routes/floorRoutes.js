const { getFloors, createFloor, uploadFloorImage, updateFloorData, getFloor, deleteFloor } = require("../controllers/floorController");
const { windowUpload } = require("../controllers/uploadController");
const protect = require("../middlewares/protect");

const router = require("express").Router();

router.post("/", protect, createFloor);
router.get("/all", getFloors);
router.put("/images/:floorId", protect, windowUpload.fields([{
    name: 'type_image', maxCount: 1
}, {
    name: 'appearance', maxCount: 1
}]) , uploadFloorImage);
router.put("/update/:floorId", protect, updateFloorData);
router.get("/getdata/:modelId", protect, getFloor);
router.delete("/remove/:floorId", protect, deleteFloor);

module.exports = router;