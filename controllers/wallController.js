const consola = require("consola");
const Wall = require("../models/Wall");
const { wallsControl } = require("../utils/permissions");
const roles = require("../utils/roles");

exports.createWall = async(req,res) => {
    try {
    console.log(req.user.role);
    const wall = new Wall({ 
        user_id: req.user._id,
        model_id: req.body.model_id,
        geo_info_wall_dimension: req.body.geo_info_wall_dimension && req.body.geo_info_wall_dimension,
        wall_type: wallsControl.can(req.user.role).createOwn("wall_type") && req.body.wall_type && req.body.wall_type,
        wall_identity_data: wallsControl.can(req.user.role).createOwn("wall_identity_data") && req.body.wall_identity_data,
        analytical_properties: wallsControl.can(req.user.role).createOwn("analytical_properties") && req.body.analytical_properties,
        material_properties: {
            descriptive_info: wallsControl.can(req.user.role).createOwn("material_properties.descriptive_info") && (req.body.material_properties && req.body.material_properties.descriptive_info),
          //  appearance: wallsControl.can(req.user.role).createOwn("material_properties.appearance") && (req.body.material_properties && req.body.material_properties.appearance),
            annotation_info: wallsControl.can(req.user.role).createOwn("material_properties.annotation_info") && (req.body.material_properties && req.body.material_properties.annotation_info),
            graphics: wallsControl.can(req.user.role).createOwn("material_properties.graphics") && (req.body.material_properties && req.body.material_properties.graphics),
            physical: wallsControl.can(req.user.role).createOwn("material_properties.physical") && (req.body.material_properties && req.body.material_properties.physical),
            production_info: wallsControl.can(req.user.role).createOwn("material_properties.production_info") && (req.body.material_properties && req.body.material_properties.production_info),
            material_compressive_strength: wallsControl.can(req.user.role).createOwn("material_properties.material_compressive_strength") && (req.body.material_properties && req.body.material_properties.material_compressive_strength),
            thermal: wallsControl.can(req.user.role).createOwn("material_properties.thermal") && (req.body.material_properties && req.body.material_properties.thermal),
        },
        wall_structural_info: wallsControl.can(req.user.role).createOwn("wall_structural_info") && req.body.wall_structural_info,
        building_intervention: {
            repair_type: wallsControl.can(req.user.role).createOwn("building_intervention.repair_type") && (req.body.building_intervention && req.body.building_intervention.repair_type), 
            repair_time: wallsControl.can(req.user.role).createOwn("building_intervention.repair_time") && (req.body.building_intervention && req.body.building_intervention.repair_time),
            repair_comment: wallsControl.can(req.user.role).createOwn("building_intervention.repair_comment") && (req.body.building_intervention && req.body.building_intervention.repair_comment),
            restoration_year: wallsControl.can(req.user.role).createOwn("building_intervention.restoration_year") && (req.body.building_intervention && req.body.building_intervention.restoration_year),
            restoration_comment: wallsControl.can(req.user.role).createOwn("building_intervention.restoration_comment") && ( req.body.building_intervention && req.body.building_intervention.restoration_comment),
            restoration_report: wallsControl.can(req.user.role).createOwn("building_intervention.restoration_report") && (req.body.building_intervention && req.body.building_intervention.restoration_report),
            restoration_corporation: wallsControl.can(req.user.role).createOwn("building_intervention.restoration_corporation") && (req.body.building_intervention && req.body.building_intervention.restoration_corporation),
            change_year: wallsControl.can(req.user.role).createOwn("building_intervention.change_year") && (req.body.building_intervention && req.body.building_intervention.change_year),
            change_type: wallsControl.can(req.user.role).createOwn("building_intervention.change_type") && (req.body.building_intervention && req.body.building_intervention.change_type),
            change_comment: wallsControl.can(req.user.role).createOwn("building_intervention.change_comment") && (req.body.building_intervention && req.body.building_intervention.change_comment),
        }
    });    

    await wall.save();
    res.json({
        wall,
        success: true
    })
    } catch (error) {
     consola.error(error);
     res.status(500).json({error: error.message});  
    }
}

exports.getWalls = async(req,res) => {
    try {
        const walls = await Wall.find({user_id: req.user._id}).populate('user_id', '-password');
        res.send
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.getWall = async(req,res) => {
    try {
        const wall = await Wall.findOne({model: req.params.modelId});
        if(!wall) return res.status(404).json({error: "Wall info does not exist for this model"});

        res.status(200).json({
            wall,
            success: true
        })
        
    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.uploadWallImage = async(req,res) => {
    try {
    console.log(req.files);
    
    const wall = await Wall.updateOne({_id: req.params.wallId}, {
        'identity_data.type_image': `${serverLink}/assets/windows/${req.files.type_image[0].filename}`,
        'material_properties.appearance': `${serverLink}/assets/windows/${req.files.appearance[0].filename}`
       })

       res.send(wall);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.updateWallData = async (req,res) => {
    try {

        const requestKeys = Object.keys(req.body)
        const requestValues = Object.values(req.body)
        const updateQuery = {};

        for(let i=0; i<requestKeys.length; i++) {
            updateQuery[requestKeys[i]] = requestValues[i];
        }

        const updatedObject = await Wall.updateOne({_id: req.params.wallId}, {$set: updateQuery});

        res.json(updatedObject);

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }
}

exports.deleteWall = async(req,res) => {
    try {
        const result = await Wall.deleteOne({_id: req.params.wallId});
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