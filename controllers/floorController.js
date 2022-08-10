const consola = require("consola");
const Floor = require("../models/Floor");
const { floorControl } = require("../utils/permissions");
const roles = require("../utils/roles");

exports.createFloor = async(req,res) => {
    try {
    
    const floor = new Floor({
        user_id: req.user._id,
        model_id: req.body.model_id,
        geomatic_info_floor_dimension: req.body.geo_info_floor_dimension,
        floor_type: {
            thickness: floorControl.can(req.user.role).createOwn("floor_type.thickness") && req.body.floor_type?.thickness,
            material: floorControl.can(req.user.role).createOwn("floor_type.material") && req.body.floor_type?.material,
            resistance: floorControl.can(req.user.role).createOwn("floor_type.resistance") && req.body.floor_type?.resistance,
            thermal_mass: floorControl.can(req.user.role).createOwn("floor_type.thermal_mass") && req.body.floor_type?.thermal_mass,
        },
        identity_data: {
           // type_image: floorControl.can(req.user.role).createOwn("identity_data.fire_type_image") && req.body.identity_data.fire_type_image,
            keynote: floorControl.can(req.user.role).createOwn("identity_data.keynote") && req.body.identity_data?.keynote,
            model: floorControl.can(req.user.role).createOwn("identity_data.model") && req.body.identity_data?.model,
            manufacturer: floorControl.can(req.user.role).createOwn("identity_data.manufacturer") && req.body.identity_data?.manufacturer,
            type_comments: floorControl.can(req.user.role).createOwn("identity_data.type.comments") && req.body.identity_data?.type_comments,
            url: floorControl.can(req.user.role).createOwn("identity_data.url") && req.body.identity_data?.url,
            description: floorControl.can(req.user.role).createOwn("identity_data.description") && req.body.identity_data?.description,
            fire_rating: floorControl.can(req.user.role).createOwn("identity_data.fire_rating") && req.body.identity_data?.fire_rating,
            cost: floorControl.can(req.user.role).createOwn("identity_data.cost") && req.body.identity_data?.cost,
        },
        analytical_properties: floorControl.can(req.user.role).createOwn("analytical_properties") && req.body.analytical_properties,
        material_properties: {
            descriptive_info: floorControl.can(req.user.role).createOwn("material_properties.descriptive_info") && req.body.material_properties?.descriptive_info,
           // appearance: floorControl.can(req.user.role).createOwn("material_properties.appearance") && req.body.material_properties?.appearance,
            annotation_info: floorControl.can(req.user.role).createOwn("material_properties.annotation_info") && req.body.material_properties?.annotation_info,
            graphics: floorControl.can(req.user.role).createOwn("material_properties.graphics") && req.body.material_properties?.graphics,
            physical: floorControl.can(req.user.role).createOwn("material_properties.physical") && req.body.material_properties?.physical,
            production_info: floorControl.can(req.user.role).createOwn("material_properties.production_info") && req.body.material_properties?.production_info,
            material_compressive_strength: floorControl.can(req.user.role).createOwn("material_properties.material_compressive_strength") && req.body.material_properties?.material_compressive_strength,
            thermal: floorControl.can(req.user.role).createOwn("material_properties.thermal") && req.body.material_properties?.thermal,
        },
        building_intervention: {
            repair_type: floorControl.can(req.user.role).createOwn("building_intervention.repair_type") && req.body.building_intervention?.repair_type, 
            repair_time: floorControl.can(req.user.role).createOwn("building_intervention.repair_time") && req.body.building_intervention?.repair_time,
            repair_comment: floorControl.can(req.user.role).createOwn("building_intervention.repair_comment") && req.body.building_intervention?.repair_comment,
            restoration_year: floorControl.can(req.user.role).createOwn("building_intervention.restoration_year") && req.body.building_intervention?.restoration_year,
            restoration_comment: floorControl.can(req.user.role).createOwn("building_intervention.restoration_comment") && req.body.building_intervention?.restoration_comment,
            restoration_report: floorControl.can(req.user.role).createOwn("building_intervention.restoration_report") && req.body.building_intervention?.restoration_report,
            restoration_corporation: floorControl.can(req.user.role).createOwn("building_intervention.restoration_corporation") && req.body.building_intervention?.restoration_corporation,
            change_year: floorControl.can(req.user.role).createOwn("building_intervention.change_year") && req.body.building_intervention?.change_year,
            change_type: floorControl.can(req.user.role).createOwn("building_intervention.change_type") && req.body.building_intervention?.change_type,
            change_comment: floorControl.can(req.user.role).createOwn("building_intervention.change_comment") && req.body.building_intervention?.change_comment,
        }
    });    

    await floor.save();
    res.json({
        door,
        success: true
    })
    } catch (error) {
     consola.error(error);
     res.status(500).json({error: error.message});  
    }
}

exports.getFloors = async(req,res) => {
    try {
        const floors = await Floor.find({user_id: req.user._id}).populate('user_id', '-password');
        res.send(floors);
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.getFloor = async(req,res) => {
    try {
        const floor = await Floor.findOne({model: req.params.modelId});
        if(!floor) return res.status(404).json({error: "Wall info does not exist for this model"});

        res.status(200).json({
            floor,
            success: true
        })
        
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}


exports.uploadFloorImage = async(req,res) => {
    try {
    console.log(req.files);
    
    const floor = await Floor.updateOne({_id: req.params.floorId}, {
        'identity_data.type_image': `${serverLink}/assets/windows/${req.files.type_image[0].filename}`,
        'material_properties.appearance': `${serverLink}/assets/windows/${req.files.appearance[0].filename}`
       })

       res.send(floor);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.updateFloorData = async (req,res) => {
    try {

        const requestKeys = Object.keys(req.body)
        const requestValues = Object.values(req.body)
        const updateQuery = {};

        for(let i=0; i<requestKeys.length; i++) {
            updateQuery[requestKeys[i]] = requestValues[i];
        }

        const updatedObject = await Floor.updateOne({_id: req.params.floorId}, {$set: updateQuery});

        res.json(updatedObject);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.deleteFloor = async(req,res) => {
    try {
        const result = await Roof.deleteOne({_id: req.params.roofId});
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