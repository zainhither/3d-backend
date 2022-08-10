const consola = require("consola");
const Roof = require("../models/Roof");
const { roofControl } = require("../utils/permissions");
const roles = require("../utils/roles");

exports.createRoof = async(req,res) => {
    try {
    
    const roof = new Roof({
        user_id: req.user._id,
        model_id: req.body.model_id,
        geo_info_roof_dimension: req.body.geo_info_roof_dimension,
        roof_type: {
            thickness: roofControl.can(req.user.role).createOwn("roof_type.thickness") && req.body.roof_type?.thickness,
            material: roofControl.can(req.user.role).createOwn("roof_type.material") && req.body.roof_type?.material,
            resistance: roofControl.can(req.user.role).createOwn("roof_type.resistance") && req.body.roof_type?.resistance,
            thermal_mass: roofControl.can(req.user.role).createOwn("roof_type.thermal_mass") && req.body.roof_type?.thermal_mass,
        },
        identity_data: {
           // type_image: roofControl.can(req.user.role).createOwn("identity_data.fire_type_image") && req.body.identity_data?.type_image,
            keynote: roofControl.can(req.user.role).createOwn("identity_data.keynote") && req.body.identity_data?.keynote,
            model: roofControl.can(req.user.role).createOwn("identity_data.model") && req.body.identity_data?.model,
            manufacturer: roofControl.can(req.user.role).createOwn("identity_data.manufacturer") && req.body.identity_data?.manufacturer,
            type_comments: roofControl.can(req.user.role).createOwn("identity_data.type.comments") && req.body.identity_data?.type_comments,
            url: roofControl.can(req.user.role).createOwn("identity_data.url") && req.body.identity_data?.url,
            description: roofControl.can(req.user.role).createOwn("identity_data.description") && req.body.identity_data?.description,
            fire_rating: roofControl.can(req.user.role).createOwn("identity_data.fire_rating") && req.body.identity_data?.fire_rating,
            cost: roofControl.can(req.user.role).createOwn("identity_data.cost") && req.body.identity_data?.cost,
        },
        analytical_properties: roofControl.can(req.user.role).createOwn("analytical_properties") && req.body.analytical_properties,
        material_properties: {
            descriptive_info: roofControl.can(req.user.role).createOwn("material_properties.descriptive_info") && req.body.material_properties?.descriptive_info,
          //  appearance: roofControl.can(req.user.role).createOwn("material_properties.appearance") && req.body.material_properties?.appearance,
            annotation_info: roofControl.can(req.user.role).createOwn("material_properties.annotation_info") && req.body.material_properties?.annotation_info,
            graphics: roofControl.can(req.user.role).createOwn("material_properties.graphics") && req.body.material_properties?.graphics,
            physical: roofControl.can(req.user.role).createOwn("material_properties.physical") && req.body.material_properties?.physical,
            production_info: roofControl.can(req.user.role).createOwn("material_properties.production_info") && req.body.material_properties?.production_info,
            material_compressive_strength: roofControl.can(req.user.role).createOwn("material_properties.material_compressive_strength") && req.body.material_properties?.material_compressive_strength,
            thermal: roofControl.can(req.user.role).createOwn("material_properties.thermal") && req.body.material_properties?.thermal,
        },
        building_intervention: {
            repair_type: roofControl.can(req.user.role).createOwn("building_intervention.repair_type") && req.body.building_intervention?.repair_type, 
            repair_time: roofControl.can(req.user.role).createOwn("building_intervention.repair_time") && req.body.building_intervention?.repair_time,
            repair_comment: roofControl.can(req.user.role).createOwn("building_intervention.repair_comment") && req.body.building_intervention?.repair_comment,
            restoration_year: roofControl.can(req.user.role).createOwn("building_intervention.restoration_year") && req.body.building_intervention?.restoration_year,
            restoration_comment: roofControl.can(req.user.role).createOwn("building_intervention.restoration_comment") && req.body.building_intervention?.restoration_comment,
            restoration_report: roofControl.can(req.user.role).createOwn("building_intervention.restoration_report") && req.body.building_intervention?.restoration_report,
            restoration_corporation: roofControl.can(req.user.role).createOwn("building_intervention.restoration_corporation") && req.body.building_intervention?.restoration_corporation,
            change_year: roofControl.can(req.user.role).createOwn("building_intervention.change_year") && req.body.building_intervention?.change_year,
            change_type: roofControl.can(req.user.role).createOwn("building_intervention.change_type") && req.body.building_intervention?.change_type,
            change_comment: roofControl.can(req.user.role).createOwn("building_intervention.change_comment") && req.body.building_intervention?.change_comment,
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

exports.getRoofs = async(req,res) => {
    try {
        const roofs = await Roof.find({user_id: req.user._id}).populate('user_id', '-password');
        res.send(roofs);
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.getRoof = async(req,res) => {
    try {
        const roof = await Roof.findOne({model: req.params.modelId});
        if(!roof) return res.status(404).json({error: "Wall info does not exist for this model"});

        res.status(200).json({
            roof,
            success: true
        })
        
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.uploadRoofImage = async(req,res) => {
    try {
    console.log(req.files);
    
    const roof = await Roof.updateOne({_id: req.params.wallId}, {
        'identity_data.type_image': `${serverLink}/assets/windows/${req.files.type_image[0].filename}`,
        'material_properties.appearance': `${serverLink}/assets/windows/${req.files.appearance[0].filename}`
       })

       res.send(roof);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.updateRoofData = async (req,res) => {
    try {

        const requestKeys = Object.keys(req.body)
        const requestValues = Object.values(req.body)
        const updateQuery = {};

        for(let i=0; i<requestKeys.length; i++) {
            updateQuery[requestKeys[i]] = requestValues[i];
        }

        const updatedObject = await Roof.updateOne({_id: req.params.roofId}, {$set: updateQuery});

        res.json(updatedObject);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.deleteRoof = async(req,res) => {
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