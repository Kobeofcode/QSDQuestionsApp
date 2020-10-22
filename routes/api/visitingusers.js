const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../autentikacija/auth")
//Ubacujem user model 
const User = require("../../models/user");

// Registracija novog usera- Kako cu praviti mongo reference?Normalization?denormalization?
//putanja metoda   Post api/users
//radimo     Register new user
//pristup   Public
router.post("/",(req,res)=>{
    const {name,email,password} = req.body;
    //Validacija u slucaju da user prodje neispravna
    if(!name||!email||!password) return res.status(400).json({msg:"Please enter all fields"})

    //Provjera da li se vec registrovao koristiti email
    User.findOne({ email })
        .then(user=>{
            if(user) return res.status(400).json({ msg:"User already exists "})
            //Ako ne postoji unos

            const newUser = new User({
                name,
                email,
                password
            })
            //Saltiraj i hasiraj password
            bcrypt.genSalt(10,(err,salt)=>{
                if(err) throw err;
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password= hash;
                    newUser.save()
                        .then(user=>{
                            //Dajemo Token
                            jwt.sign(
                                { id:user.id },
                                config.get("jwtSecret"),
                                //Rok trajanja 1h
                                { expiresIn: 3600 },
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
       
       
        })

})

// Promjena passworda
//putanja metoda   Post api/users/password
//radimo     Pass change
//pristup   Private
router.post("/password",auth,(req,res)=>{
    let newPass = req.body.password;
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) throw err;
        bcrypt.hash(newPass,salt,(err,hash)=>{
            if(err) throw err;
            newPass= hash;})})
    User.updateOne({_id:req.body.userid},{password:newPass})
            .then(resp=>res.json({msg:"Password changed successfully"}))
        
            

})








module.exports= router;