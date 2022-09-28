const user = require('../models').user;
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const secretKey="dhfgfuggjhkuijipok';opo";
module.exports = {
  create(req, res) {
    return user
      .create({
        name: req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  signin(req,res){
    const {email,password}=req.body;
    return user
    .findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{
        //
        if(!user){
            return res.status(404).send({message:"user not found."});
        }
        // else{
        //     return res.send({message:"successfully signed in"});
        // }
        const passwordIsValid=bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                message:"Invalid pasword!"
            });
        }
        else{
            
           let token=jwt.sign({email,password},secretKey,{expiresIn:'1d'});
                
                res.status(200).send({
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    accesstoken:token,
                    msg:"success"
                });
                                 
           }
         })

    },
       
    logout(req,res){
         const token=res.header("x-access-token");
         return user
        .destroy(token)
        .then(res.send({token:null,msg:"token deleted successfully"}))
    },
};
