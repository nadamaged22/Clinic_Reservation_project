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
    const Doctorid=await queryPromise(queries.DoctorID,[req.user.id])
    const doctorIdValue = Doctorid.rows[0].doctor_id;
    const checkSelectedSlots=await queryPromise(queries.checkSelectedSlots,[req.user.id])
    if(date,hour,req.user.id==checkSelectedSlots){
        return next(new Error("YOU ALREADY CHOOSE THIS SLOT!",{cause:409}))
    }
    const result=await queryPromise(queries.addslot,[doctorIdValue,date,hour]);
    const slot = result.rows[0]
    res.status(201).json({message:"SLOT ADDED SUCCES!",slot})
})

const getSlotsByDRId=asyncHandler(async(req,res,next)=>{
    const id=parseInt(req.params.id)
    const CheckUserExist=await queryPromise(queries.checkDrId,[id])
    const usernotfound=!CheckUserExist.rows.length
    if(usernotfound){
        return next (new Error("THIS DOCTOR IS NOT EXIST!",{cause:404}))
    }
    const result=await queryPromise(queries.getSlotsByDRId,[id])
    const AvaliableSlots=result.rows
    res.status(200).json({message:"DONE",AvaliableSlots})



})




module.exports={
    addslot,
    getSlotsByDRId
}