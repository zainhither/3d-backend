const consola = require("consola");
const Window = require("../models/Window");
const { windowControl} = require("../utils/permissions");
const roles = require("../utils/roles");
const {serverLink} = require("../utils/api");

exports.createWindow = async(req,res) => { 
    try {
    
    const window = new Window({
        user_id: req.user._id,
        model_id: req.body.model_id,
        geo_info_window_dimension: req.body.geo_info_window_dimension && req.body.geo_info_window_dimension,
        glass_type: windowControl.can(req.user.role).createOwn("glass_type") && req.body.glass_type,
        identity_data: {
           // type_image: windowControl.can(req.user.role).createOwn("identity_data.type_image") && req.body.identity_data?.type_image,
            keynote: windowControl.can(req.user.role).createOwn("identity_data.keynote") && req.body.identity_data?.keynote,
            model: windowControl.can(req.user.role).createOwn("identity_data.model") && req.body.identity_data?.model,
            manufacturer: windowControl.can(req.user.role).createOwn("identity_data.manufacturer") && req.body.identity_data?.manufacturer,
            type_comments: windowControl.can(req.user.role).createOwn("identity_data.type_comments") && req.body.identity_data?.type_comments,
            url: windowControl.can(req.user.role).createOwn("identity_data.url") && req.body.identity_data?.url,
            description: windowControl.can(req.user.role).createOwn("identity_data.description") && req.body.identity_data?.description,
            fire_rating: windowControl.can(req.user.role).createOwn("identity_data.fire_rating") && req.body.identity_data?.fire_rating,
            cost: windowControl.can(req.user.role).createOwn("identity_data.cost") && req.body.identity_data?.cost,
        },
        analytical_properties: windowControl.can(req.user.role).createOwn("analytical_properties") && req.body.analytical_properties,
        material_properties: {
            descriptive_info: windowControl.can(req.user.role).createOwn("material_properties.descriptive_info") && req.body.material_properties?.descriptive_info,
           // appearance: windowControl.can(req.user.role).createOwn("material_properties.appearance") && req.body.material_properties?.appearance,
            annotation_info: windowControl.can(req.user.role).createOwn("material_properties.annotation_info") && req.body.material_properties?.annotation_info,
            graphics: windowControl.can(req.user.role).createOwn("material_properties.graphics") && req.body.material_properties?.graphics,
            physical: windowControl.can(req.user.role).createOwn("material_properties.physical") && req.body.material_properties?.physical,
            production_info: windowControl.can(req.user.role).createOwn("material_properties.production_info") && req.body.material_properties?.production_info,
            material_compressive_strength: windowControl.can(req.user.role).createOwn("material_properties.material_compressive_strength") && req.body.material_properties?.material_compressive_strength,
            thermal: windowControl.can(req.user.role).createOwn("material_properties.thermal") && req.body.material_properties?.thermal,
        },
        building_intervention: {
            repair_type: windowControl.can(req.user.role).createOwn("building_intervention.repair_type") && req.body.building_intervention?.repair_type, 
            repair_time: windowControl.can(req.user.role).createOwn("building_intervention.repair_time") && req.body.building_intervention?.repair_time,
            repair_comment: windowControl.can(req.user.role).createOwn("building_intervention.repair_comment") && req.body.building_intervention?.repair_comment,
            restoration_year: windowControl.can(req.user.role).createOwn("building_intervention.restoration_year") && req.body.building_intervention?.restoration_year,
            restoration_comment: windowControl.can(req.user.role).createOwn("building_intervention.restoration_comment") && req.body.building_intervention?.restoration_comment,
            restoration_report: windowControl.can(req.user.role).createOwn("building_intervention.restoration_report") && req.body.building_intervention?.restoration_report,
            restoration_corporation: windowControl.can(req.user.role).createOwn("building_intervention.restoration_corporation") && req.body.building_intervention?.restoration_corporation,
            change_year: windowControl.can(req.user.role).createOwn("building_intervention.change_year") && req.body.building_intervention?.change_year,
            change_type: windowControl.can(req.user.role).createOwn("building_intervention.change_type") && req.body.building_intervention?.change_type,
            change_comment: windowControl.can(req.user.role).createOwn("building_intervention.change_comment") && req.body.building_intervention?.change_comment,
        }
    });    

    await window.save();
    res.json({
        window,
        success: true
    })
    } catch (error) {
     consola.error(error);
     res.status(500).json({error: error.message});  
    }
}

exports.uploadWindowImage = async(req,res) => {
    try {
    console.log(req.files);
    
    const window = await Window.updateOne({_id: req.params.windowId}, {
        'identity_data.type_image': `${serverLink}/assets/windows/${req.files.type_image[0].filename}`,
        'material_properties.appearance': `${serverLink}/assets/windows/${req.files.appearance[0].filename}`
       })

       res.send(window);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.getWindows = async(req,res) => {
    try {
        const windows = await Window.find({user_id: req.user._id}).populate('user_id', '-password');
        res.send(windows);
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.getWindow = async(req,res) => {
    try {
        const window = await Window.findOne({model: req.params.modelId});
        if(!window) return res.status(404).json({error: "Window info does not exist for this model"});

        res.status(200).json({
            window,
            success: true
        })
        
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.updateWindowData = async (req,res) => {
    try {

        const requestKeys = Object.keys(req.body)
        const requestValues = Object.values(req.body)
        const updateQuery = {};

        for(let i=0; i<requestKeys.length; i++) {
            updateQuery[requestKeys[i]] = requestValues[i];
        }

        const updatedObject = await Window.updateOne({_id: req.params.windowId}, {$set: updateQuery});

        res.json(updatedObject);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.deleteWindow = async(req,res) => {
    try {
        const result = await Window.deleteOne({_id: req.params.windowId});
        if(result.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "Resource has been deleted successfully"
            })
        }

        else {
            res.status(500).json({
                error: "Resource could not be deleted. Make sure the id is correct."
            })
        }


    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}