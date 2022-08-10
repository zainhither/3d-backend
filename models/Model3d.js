const mongoose = require("mongoose");

const model3dSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Model3d = mongoose.model('Model3d', model3dSchema);
module.exports = Model3d;