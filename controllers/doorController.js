const consola = require("consola");
const Door = require("../models/Door");
const { doorControl } = require("../utils/permissions");
const roles = require("../utils/roles");

exports.createDoor = async(req,res) => {
    try {
    
    const door = new Door({
        user_id: req.user._id,
        model_id: req.body.model_id,
        geo_info_door_dimension: req.body.geo_info_door_dimension,
        door_type: doorControl.can(req.user.role).createOwn("door_type") && req.body.door_type,
        identity_data: {
           // type_image: doorControl.can(req.user.role).createOwn("identity_data.fire_type_image") && req.body.identity_data?.type_image,
            keynote: doorControl.can(req.user.role).createOwn("identity_data.keynote") && req.body.identity_data?.keynote,
            model: doorControl.can(req.user.role).createOwn("identity_data.model") && req.body.identity_data?.model,
            manufacturer: doorControl.can(req.user.role).createOwn("identity_data.manufacturer") && req.body.identity_data?.manufacturer,
            type_comments: doorControl.can(req.user.role).createOwn("identity_data.type.comments") && req.body.identity_data?.type_comments,
            url: doorControl.can(req.user.role).createOwn("identity_data.url") && req.body.identity_data?.url,
            description: doorControl.can(req.user.role).createOwn("identity_data.description") && req.body.identity_data?.description,
            fire_rating: doorControl.can(req.user.role).createOwn("identity_data.fire_rating") && req.body.identity_data?.fire_rating,
            cost: doorControl.can(req.user.role).createOwn("identity_data.cost") && req.body.identity_data?.cost,
        },
        analytical_properties: doorControl.can(req.user.role).createOwn("analytical_properties") && req.body.analytical_properties,
        material_properties: {
            descriptive_info: doorControl.can(req.user.role).createOwn("material_properties.descriptive_info") && req.body.material_properties?.descriptive_info,
           // appearance: doorControl.can(req.user.role).createOwn("material_properties.appearance") && req.body.material_properties?.appearance,
            annotation_info: doorControl.can(req.user.role).createOwn("material_properties.annotation_info") && req.body.material_properties?.annotation_info,
            graphics: doorControl.can(req.user.role).createOwn("material_properties.graphics") && req.body.material_properties?.graphics,
            physical: doorControl.can(req.user.role).createOwn("material_properties.physical") && req.body.material_properties?.physical,
            production_info: doorControl.can(req.user.role).createOwn("material_properties.production_info") && req.body.material_properties?.production_info,
            material_compressive_strength: doorControl.can(req.user.role).createOwn("material_properties.material_compressive_strength") && req.body.material_properties?.material_compressive_strength,
            thermal: doorControl.can(req.user.role).createOwn("material_properties.thermal") && req.body.material_properties?.thermal,
        },
        building_intervention: {
            repair_type: doorControl.can(req.user.role).createOwn("building_intervention.repair_type") && req.body.building_intervention?.repair_type, 
            repair_time: doorControl.can(req.user.role).createOwn("building_intervention.repair_time") && req.body.building_intervention?.repair_time,
            repair_comment: doorControl.can(req.user.role).createOwn("building_intervention.repair_comment") && req.body.building_intervention?.repair_comment,
            restoration_year: doorControl.can(req.user.role).createOwn("building_intervention.restoration_year") && req.body.building_intervention?.restoration_year,
            restoration_comment: doorControl.can(req.user.role).createOwn("building_intervention.restoration_comment") && req.body.building_intervention?.restoration_comment,
            restoration_report: doorControl.can(req.user.role).createOwn("building_intervention.restoration_report") && req.body.building_intervention?.restoration_report,
            restoration_corporation: doorControl.can(req.user.role).createOwn("building_intervention.restoration_corporation") && req.body.building_intervention?.restoration_corporation,
            change_year: doorControl.can(req.user.role).createOwn("building_intervention.change_year") && req.body.building_intervention?.change_year,
            change_type: doorControl.can(req.user.role).createOwn("building_intervention.change_type") && req.body.building_intervention?.change_type,
            change_comment: doorControl.can(req.user.role).createOwn("building_intervention.change_comment") && req.body.building_intervention?.change_comment,
        }
    });    

    await door.save();
    res.json({
        door,
        success: true
    })
    } catch (error) {
     consola.error(error);
     res.status(500).json({error: error.message});  
    }
}

exports.getDoors = async(req,res) => {
    try {
        const doors = await Door.find({user_id: req.user._id}).populate('user_id', '-password');
        res.send(doors)
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.getDoor = async(req,res) => {
    try {
        const door = await Door.findOne({model: req.params.modelId});
        if(!door) return res.status(404).json({error: "Wall info does not exist for this model"});

        res.status(200).json({
            door,
            success: true
        })
        
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.uploadDoorImage = async(req,res) => {
    try {
    console.log(req.files);
    
    const door = await Door.updateOne({_id: req.params.doorId}, {
        'identity_data.type_image': `${serverLink}/assets/windows/${req.files.type_image[0].filename}`,
        'material_properties.appearance': `${serverLink}/assets/windows/${req.files.appearance[0].filename}`
       })

       res.send(door);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.updateDoorData = async (req,res) => {
        try {

            const requestKeys = Object.keys(req.body)
            const requestValues = Object.values(req.body)
            const updateQuery = {};

            for(let i=0; i<requestKeys.length; i++) {
                updateQuery[requestKeys[i]] = requestValues[i];
            }

            const updatedObject = await Door.updateOne({_id: req.params.doorId}, {$set: updateQuery});

            res.json(updatedObject);

        } catch (error) {
            consola.error(error);
            res.status(500).json({error: error.message});
        }
}

exports.deleteDoor = async(req,res) => {
    try {
        const result = await Door.deleteOne({_id: req.params.doorId});
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
