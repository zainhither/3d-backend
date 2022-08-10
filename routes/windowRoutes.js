const { windowUpload } = require("../controllers/uploadController");
const { createWindow, getWindows, uploadWindowImage, updateWindowData , getWindow, deleteWindow} = require("../controllers/windowController");
const protect = require("../middlewares/protect");

const router = require("express").Router();

router.put("/images/:windowId", protect, windowUpload.fields([{
    name: 'type_image', maxCount: 1
}, {
    name: 'appearance', maxCount: 1
}]) , uploadWindowImage);
router.post("/", protect, createWindow);
router.get("/all", getWindows);
router.put("/update/:windowId", protect, updateWindowData ); 
router.get("/getdata/:modelId", protect, getWindow);
router.delete("/remove/:windowId", protect, deleteWindow);

module.exports = router;