const mongoose = require("mongoose");
const roles = require("../utils/roles");
const bcrypt = require("bcryptjs");
const consola = require("consola");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 40,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 256,
        },
        role: {
            type: String,
            required: true,
            enum: [
                roles.architect,
                roles.artHistorian,
                roles.civilEngineer,
                roles.desider,
                roles.electricalEngineer,
                roles.geomaticEngineer,
                roles.mechanicalEngineer,
            ],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    try {
      return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
      consola.error(error);
    }
  }

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
      next();
    } 
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password,salt);
  })  

const User = mongoose.model('User', userSchema);
module.exports = User;
