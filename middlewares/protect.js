const jwt = require("jsonwebtoken");
const User = require("../models/User");
const consola = require("consola");

const protect = async(req,res,next) => {
  try {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token || !req.headers.authorization) {
       return res.status(401).json({ error: "You are not allowed to visit this route" });
    }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if(!user) return res.status(404).json({error: "No user found"})
        req.user = user;
        next();  
      }
      catch (ex) {
        consola.error(ex);
        return res.status(401).json({error: "Invalid token"});
      }
}

module.exports = protect;