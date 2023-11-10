const pool = require("../../../../DB/connection");
const queries =require('../appointment.queries');
const { asyncHandler } = require("../../../../utils/errorHandling");

const CreateAppointment=asyncHandler(async(req,res,next)=>{
    let client
    try{
        client=await pool.connect()
        const SlotID=parseInt(req.params.SlotID)
        const CreateAppointment=await client.query(queries.CreateAppointment,[SlotID,req.user.id])
        const appointment = CreateAppointment.rows[0]
        res.status(201).json({message:"YOUR APPOINTMENT RESERVED SUCCESSFULLY!",appointment})
       
    }catch (error) {
        next(error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
            // await client.end()
        }
    }

})
const ShowAppointment=asyncHandler(async(req,res,next)=>{
    let client
    try{
        client=await pool.connect()
        const ShowAppointment=await client.query(queries.ShowAppointment,[req.user.id])
        const Appointments=ShowAppointment
        res.status(200).json({message:"DONE",Appointments})
       
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
    CreateAppointment,
    ShowAppointment
}