const db=require("../../data/dbConfig")
const jwt=require("jsonwebtoken");

//---> Sadece token için;
function generateToken(user){
    const payload={
        subject:user.id,
        username:user.username,
    }

    const secret=process.env.JWT_SECRET;

    const option={
        expiresIn:"1d"
    }

    return jwt.sign(payload,secret, option)
};


async function findByFilter(filter){
    let filteredUser=await db("users").where(filter)
    return filteredUser;
};

//verilen id ile bulacak
async function findById(id){
    let result=await db("users").where("id",id).first();
    return {id:result.id, username:result.username, password:result.password}
};


//register endpointinde kullanıcı ekleyecek
async function addNewUser(user){
    let newUser=await db("users").insert(user) //dizi içinde id döner
    return findById(newUser[0]) // dönen ilk id'yi kullanır
};



module.exports={
    generateToken,
    findByFilter,
    findById,
    addNewUser
}
