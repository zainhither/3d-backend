const ac = require("../utils/permissions");
const consola = require("consola");
const multer = require("multer");
const path = require("path");
const Model3d = require("../models/Model3d");
const {serverLink} = require("../utils/api");

// Multer Upload Handling
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})

//Upload 3D Model
exports.uploadModel = async(req,res) => {
    try {
        const permission = ac.can(req.user.role).createOwn('model');
    if(permission.granted) {
        if(!req.file) return res.status(400).json({error: "Error! File is missing.."});

        const filename = `${serverLink}/assets/${req.file.filename}`;

        const model = new Model3d({
            user: req.user._id,
            url: filename,
        });

        console.log(filename);

        await model.save();

        res.status(200).json({
            file: model,
            success: true,
            filename: req.file.filename
        })    

    }
    else {
        res.status(401).json({error: "You are not allowed to access this functionality!"});
    }
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: "You are not allowed to access this functionality!"});
    }
    
}

//View My 3D Models
exports.myModels = async(req,res) => {
    try {
        const models = await Model3d.find({user: req.user._id});
        if(!models) return res.status(404).json({error: "Sorry, no models found"});

        res.status(200).json({
            models,
            success: true
        })
        
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.allModels = async(req,res) => {
    try {

        const models = await Model3d.find().populate('user', '-password');
        if(!models) return res.status(404).json({error: "No one has created any models yet! "});

        res.json({
            models,
            success: true
        })
        
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.modelDetails = async(req,res) => {
    try {
        const model = await Model3d.findOne({ _id: req.params.id}).populate('user', '-password');
        if(!model) return res.status(404).json({error: "Model not found"});

        res.json({
            model,
            success: true
        })
    }

    catch(error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    } 
}

module.exports.upload = upload;