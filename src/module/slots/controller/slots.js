const { asyncHandler } = require("../../../../utils/errorHandling");
const util = require('util');
const pool = require("../../../../DB/connection");
const { Pool } = require("pg")
const queries =require('../slots.queries');
const queryPromise = util.promisify(pool.query).bind(pool);




const addslot=asyncHandler(async(req,res,next)=>{
    const CheckUserExist=await queryPromise(queries.CheckUserId,[req.user.id])
    const usernotfound=!CheckUserExist.rows.length
    if(usernotfound){
        return next (new Error("THIS USER IS NOT EXIST!",{cause:404}))
    }
    const{date,hour}=req.body
    const result=await queryPromise(queries.addslot,[req.user.id,date,hour]);
    const slot=result.rows[0]
    res.status(201).json({message:"SLOT ADDRD SUCCES!",slot})
})
module.exports={
    addslot
}