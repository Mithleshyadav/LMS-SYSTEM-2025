const jwt = require("jsonwebtoken");
const 


exports.auth = async (req, res, next) => {
  try {

    let token;
if (req.cookies && req.cookies.token) {
  token = req.cookies.token;
} else if (req.body && req.body.token) {
  token = req.body.token;
} else if (req.headers.authorization) {
  // This splits the header into "Bearer" and the token
  token = req.headers.authorization.split(" ")[1];
}


    // if token missing
     if (!token){
       return res.status(404).json({
        success: false,
        message: "JWT token is missing",
       })
     }

     // validating token
     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
     }
     catch(err){
        return res.status(401).json({
          success: false,
          message: "Error occured while verifying jwt token",
        })
     }
     next();
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error occured while authenticating user",
    });
  }

};