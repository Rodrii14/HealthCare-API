const { verify } = require('../tools/jwt.tools');
const userModel = require('../models/auth.models');
const middlewares = {};

middlewares.auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const [prefix, token] = authorization.split(" ");
        
        //Verify is the correct prefix
        if(prefix !== "Bearer"){
            return res.status(409).json({ error: "An error ocurred" });
        }

        //Verify token is correct
        if(!token){
            return res.status(409).json({ error: "An error ocurred" });
        }

        const payload = await verify(token);
        //get user id
        const userID = payload.sub

        //Verify user exists
       const _user = await userModel.findById(userID);

       if(!_user){
            return res.status(404).json({ error: "No coincidences" });
       }

       //Verify the actual token exists on tokens arrays
       const { tokens } = _user;
       const tokenStatus = tokens.includes(token);
       if(!tokenStatus){
            return res.status(409).json({ error: "An error ocurred" }); 
       }

       //As token is valid -> modify the request
       req.user = userID;
       next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = middlewares;