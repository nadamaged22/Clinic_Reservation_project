const { asyncHandler } = require("../../../../utils/errorHandling");
const util = require('util');
const pool = require("../../../../DB/connection");
const { Pool } = require("pg")
const queries =require('../slots.queries');
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
        const checkSelectedSlots=await client.query(queries.checkSelectedSlots,[doctorIdValue,date,hour])
        if(checkSelectedSlots.rows.length){
            return next(new Error("YOU ALREADY CHOSE THIS SLOT!",{cause:409}));
        }else{
            const result=await client.query(queries.addslot,[doctorIdValue,date,hour]);
        const slot = result.rows[0]
        res.status(201).json({message:"SLOT ADDED SUCCES!",slot})

        }
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
    let client;
    try{
        client = await pool.connect();
        const id=parseInt(req.params.id)
        const CheckUserExist=await client.query(queries.checkDrId,[id])
        const usernotfound=!CheckUserExist.rows.length
        if(usernotfound){
            return next (new Error("THIS DOCTOR IS NOT EXIST!",{cause:404}))
        }
        const result=await client.query(queries.getSlotsByDRId,[id])
        const AvaliableSlots=result.rows
        res.status(200).json({message:"DONE",AvaliableSlots})
    }catch (error) {
        next(error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
            // await client.end()
        }
    }
})
const getDrSlots=asyncHandler(async(req,res,next)=>{
    let client;
    try{
        client=await pool.connect()
        const Doctorid=await client.query(queries.DoctorID,[req.user.id])
        const doctorIdValue = Doctorid.rows[0].doctor_id;
        const result=await client.query(queries.getSlotsByDRId,[doctorIdValue])
        const slots=result.rows
        res.status(200).json({message:"DONE",slots})
    }catch (error) {
        next(error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
            // await client.end()
        }
    }
})

module.exports={
    addslot,
    getSlotsByDRId,
    getDrSlots
}