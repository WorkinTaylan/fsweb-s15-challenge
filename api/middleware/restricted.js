const jwt=require("jsonwebtoken")

module.exports = async (req, res, next) => {
  
  try {
    const token=req.header.authorization;
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedJWT))
        if(err){
          res.status(401).json({message:"Token geçersizdir"})
        }
        else{
          req.decodeToken=decodedJWT
          next()
        }
      }
    else{
      res.status(401).json({message:"Token gereklidir"})
    }  
  } catch (error) {
    next(error)
  }
  /*
    EKLEYİN

    1- Authorization headerında geçerli token varsa, sıradakini çağırın.

    2- Authorization headerında token yoksa,
      response body şu mesajı içermelidir: "token gereklidir".

    3- Authorization headerında geçersiz veya timeout olmuş token varsa,
	  response body şu mesajı içermelidir: "token geçersizdir".
  */
};
