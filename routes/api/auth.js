const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../autentikacija/auth");

//Uvodim Mongoose User Model
const User = require("../../models/user");


//Treba mi ruta za autentikaciju vec reg usera- Postavi Kasnije
//@ruta metoda    Post api/auth
//@radimo     Auth User
//@pristup   Public
router.post("/",(req,res)=>{
    const {email,password} = req.body;
    //Validacija
    if(!email || !password) return res.status(400).json({msg:"Please enter all fields"});
    //Naci Usera i javiti da ne postoji ako je tako
    User.findOne({email})
        .then(user=>{
            if(!user) return res.status(400).json({ msg:"User does not exist"});
            //Ako postoji provjera passworda 
            //bcrypt Promise? ili Callback?-provjeriti 
            bcrypt.compare(password,user.password)
                .then(matches=>{
                    if(!matches) return res.status(400).json({ msg:"Invalid credentials"})
                    //Ako prodje sve ok onda dajemo token
                    jwt.sign(
                        { id:user.id },
                        config.get("jwtSecret"),
                        //Postavi da istekne za 1h
                        { expiresIn:3600},
                        (err,token)=>{
                            if(err) throw err;
                            res.json({
                                token,
                                user:{
                                    id:user.id,
                                    name:user.name,
                                    email:user.email
                                }
                            })
                        }
                    )   




                })
        
        
        
        
        
        })


})
//Putanja za registrovane usere da se logiraju
//Putanja metoda    GET api/auth/user
//radimo     Get user data
//pristup   Private
router.get("/user",auth,(req,res)=>{
    User.findById(req.user.id)
        .select("-password")
        .then(user=>res.json({user:{id:user.id,name:user.name,email:user.email}}))
});

// Potencijalne greske Promise, callback,pisanje(user)
module.exports= router;