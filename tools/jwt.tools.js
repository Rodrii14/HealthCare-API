const { SignJWT, jwtVerify } = require('jose');

const tokenTools = {};
const secret = new TextEncoder().encode(process.env.SECRET);
const exp_time = process.env.EXP_TIME;

tokenTools.create = async (id) => {
    const token = await new SignJWT()
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(id)
        .setIssuedAt()
        .setExpirationTime(exp_time)
        .sign(secret)
    
    return token;
}

tokenTools.verify = async (token) => {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    }catch(error){
        console.error(error);
        return false;
    }
}

module.exports = tokenTools;