const { asyncHandler } = require("../../../../utils/errorHandling");
const util = require('util');
const pool = require("../../../../DB/connection");
const { Pool } = require("pg")
const queries =require('../slots.queries');
const { count } = require("console");
const queryPromise = util.promisify(pool.query).bind(pool);

const addslot=asyncHandler(async(req,res,next)=>{
    let client;
    try{
        client = await pool.connect();
        const CheckUserExist=await client.query(queries.CheckUserId,[req.user.id])
        const usernotfound=!CheckUserExist.rows.length
        if(usernotfound){
            return next (new Error("THIS USER IS NOT EXIST!",{cause:404}))
        }
        const{date,hour}=req.body
        const Doctorid=await client.query(queries.DoctorID,[req.user.id])
        const doctorIdValue = Doctorid.rows[0].doctor_id;
        const checkSelectedSlots=await client.query(queries.getSlotsByDRId,[req.user.id])
        console.log(checkSelectedSlots)
        checkSelectedSlots.rows.forEach(row => {
            console.log(row.date,row.hour , row.doctor_id)
            if(row.date === date && row.hour === hour && row.doctor_id=== req.user.id){
                return next(new Error("YOU ALREADY CHOSE THIS SLOT!", { cause: 409 }));
            }
        });
        const result=await client.query(queries.addslot,[doctorIdValue,date,hour]);
        const slot = result.rows[0]
        res.status(201).json({message:"SLOT ADDED SUCCES!",slot})
       
    }catch (error) {
        next(error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
            // await client.end()
        }
    }
    



});
const getSlotsByDRId=asyncHandler(async(req,res,next)=>{
    const id=parseInt(req.params.id)
    const CheckUserExist=await client.query(queries.checkDrId,[id])
    const usernotfound=!CheckUserExist.rows.length
    if(usernotfound){
        return next (new Error("THIS DOCTOR IS NOT EXIST!",{cause:404}))
    }
    const result=await client.query(queries.getSlotsByDRId,[id])
    const AvaliableSlots=result.rows
    res.status(200).json({message:"DONE",AvaliableSlots})
})



module.exports={
    addslot,
    getSlotsByDRId
}