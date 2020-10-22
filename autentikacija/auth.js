const config =require("config");
const jwt = require("jsonwebtoken");


function auth (req,res,next){
    const token = req.header("x-auth-token");
    //Provjera tokena i odbijanje ako nema tokena 
    if(!token) return res.status(401).json({ msg:"access denied" })
    try{
        //Validacija tokena
        const decoded = jwt.verify(token,config.get("jwtSecret"));
        // dodati token na usera i vratiti ako nije validan
        req.user = decoded;
        next()
    }catch(e){
        res.status(400).json({ msg:"Token is not valid" });

    }
    
}

module.exports = auth;