const jwt =require("jsonwebtoken");
const pool = require("../../DB/connection");
const queries =require('../module/auth/auth.queries');
const util = require('util');
const queryPromise = util.promisify(pool.query).bind(pool);


const roles={
    Patient:'Patient',
    Doctor:'Doctor'
}
Object.freeze(roles)

const auth = (roles=[])=>{
   return  async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization?.startsWith(process.env.BEARER)) {
                return res.json({ message: "In-valid bearer key" })
            }
            const token = authorization.split(process.env.BEARER_KEY)[1]
            if (!token) {
                return res.json({ message: "In-valid token" })
            }
            const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE)
            if (!decoded?.id) {
                return res.json({ message: "In-valid token payload" })
            }
            const result=await queryPromise(queries.CheckUserCredintials,[decoded.id])

            const authUser = result.rows[0]
            if (!authUser) {
                return res.json({ message: "Not register account" })
            }
            if(!roles.includes(authUser.role)){
                return res.status(401).json({message:'YOU ARE NOT AUTHORIZED!'})
            }
            req.user = authUser;
            return next()
        } catch (error) {
            return res.json({ message: "Catch error" , err:error?.message })
        }

    }
}
module.exports={
    roles,
    auth,
    
}

