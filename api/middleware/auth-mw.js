const userModels=require("../models/modelFunctions")
const bcrypt=require("bcryptjs")


async function checkPayload(req,res,next){
    try {
        let {username,password}=req.body;
        if(!username || !password){
            res.status(422).json({message:"kullanıcı adını veya parolayı kontrol et"})
        }
        else if(password.length<2){
            res.status(422).json({message:"Parolan 2 karakterden fazla olmalı"})
        }
        
        else{
            next()
        }
    } catch (error) {
            next(error)
    }
};


async function userNameExist(req,res,next){
    try {
        
        let filteredUserName=await userModels.findByFilter({username:req.body.username}) //findByFilter(req.body.username) kabul etmedi. Filtre metoduna fonks. ya da obje göndermelisin.
        if(filteredUserName.length>0){ // !!filteredUsername.length'de çalışıyor.
            next({
                status:422,
                message:"Username kullanılıyor"
            })
        }
        else{
            next()
        }
    } catch (error) {
        next(error)
    }
};

async function IsPayloadValid(req,res,next){

try {
    const userByUserName=await userModels.findByFilter({username:req.body.username})
    const isValidLogin=userByUserName && userByUserName.length>0 && bcrypt.compareSync(req.body.password, userByUserName[0].password)
    if(!isValidLogin){
        next({
            status:401,
            message:"Geçersiz giriş"
        })
    }
    else{
        req.user=userByUserName[0]
        next()
    }
} catch (error) {
    next(error)
}

};


module.exports={
    checkPayload,
    userNameExist,
    IsPayloadValid
}