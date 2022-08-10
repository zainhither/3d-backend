const { windowUpload } = require("../controllers/uploadController");
const { createWall, getWalls, uploadWallImage, updateWallData, getWall, deleteWall } = require("../controllers/wallController");
const protect = require("../middlewares/protect");


const router = require("express").Router();

router.post("/", protect, createWall);
router.get("/all", getWalls);
router.put("/images/:wallId", protect, windowUpload.fields([{
    name: 'type_image', maxCount: 1
}, {
    name: 'appearance', maxCount: 1
}]) , uploadWallImage);
router.put("/update/:wallId", protect, updateWallData);
router.get("/getdata/:modelId", protect, getWall);
router.delete("/remove/:wallId", protect, deleteWall);


module.exports = router;