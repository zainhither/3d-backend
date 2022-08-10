const mongoose = require("mongoose");

const roofSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,   
        required: true,
        ref: "User" 
    },
    model_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Model3d'
    },
    geo_info_roof_dimension: {
        length: {
            type: Number
        },
        area: {
            type: Number
        },
        volume: {
            type: Number
        },
        angle: {
            type: Number,
        },
        mass_density: {
            type: Number
        }
    },
    roof_type: {
        thickness: {
            type: Number
        },
        material: {
            type: Number
        },
        resistance: {
            type: Number
        },
        thermal_mass: {
            type: Number
        }
    },
    identity_data: {
        type_image: {
            type: String
        },
        keynote: {
            type: String
        },
        model: {
            type: String
        },
        manufacturer: {
            type: String
        },
        type_comments: {
            type: String
        },
        url: {
            type: String
        },
        description: {
            type: String
        },
        fire_rating: {
            type: Number
        },
        cost: {
            type: Number
        }
    },
    analytical_properties: {
        heat_transfer_coefficient: {
            type: Number
        },
        thermal_resistance: {
            type: Number
        },
        thermal_mass: {
            type: Number
        },
        absorptance: {
            type: Number
        },
        roughness: {
            type: Number
        }
    },
    material_properties: {
        descriptive_info: {
            type: String
        },
        production_info: {
            type: String
        },
        annotation_info: {
            type: String
        },
        material_compressive_strength: {
            type: Number
        },
        graphics: {
            type: String
        },
        appearance: {
            type: String /* image */
        },
        physical: {
            type: String
        },
        thermal: {
            type: Number
        }
    },
    building_intervention: {
        repair_type: {
            type: String
        },
        repair_time: {
            type: Date
        },
        repair_comment: {
            type: String
        },
        restoration_year: {
            type: Date
        },
        restoration_corporation: {
            type: String
        },
        restoration_report: {
            type: String
        },
        restoration_comment: {
            type: String
        },
        change_year: {
            type: Date
        },
        change_type: {
            type: String
        },
        change_comment: {
            type: String
        }
    }

}, {
    timestamps: true
});

const Roof = mongoose.model("Roof", roofSchema);
module.exports = Roof;