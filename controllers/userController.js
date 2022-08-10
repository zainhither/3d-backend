const RegisterValidation = require("../validation/registerValidation");
const LoginValidation = require("../validation/loginValidation");
const consola = require("consola");
const User = require('../models/User');
const generateToken = require('../utils/genToken');

//User Registration
// Url => /api/users/register

exports.register = async(req,res) => {
    const {error} = RegisterValidation.validate(req.body);

    if(error) return res.status(400).json({error: error.message});

    if (req.body.password !== req.body.confirm_password)
      return res.status(400).json({
        error: "Passwords do not match",
      });

    try {
        const {name, email, password, role} = req.body;

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({error: "User already exists with this email"});
        }

        const user = new User({
            name,
            email,
            password,
            role
        });

        await user.save();
        
        res.status(200).json({
	    success: true,	
            _id: user._id,
            name,
            email,
            role,
            token: generateToken(user._id)
        });

    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});
    }

}

//Login User
//url => /api/users/login

exports.login = async(req,res) => {
    const {error} = LoginValidation.validate(req.body);
    if(error) return res.status(400).json({error: error.message});

    const {email, password} = req.body;

    try {
        
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({error: "Invalid Credentials"});

    const matchPassword = await user.matchPassword(password);

    if(matchPassword) {
        res.json({
	    success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    }

    else {
        res.status(400).json({error: "Invalid Credentials"});
    }


    } catch (error) {
        consola.error(error);
        res.status(500).json({error: error.message});   
    }
    
}