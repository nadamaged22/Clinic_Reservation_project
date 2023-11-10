const { asyncHandler } = require("../../../../utils/errorHandling");
const util = require('util');
const pool = require("../../../../DB/connection");
const { Pool } = require("pg")
const queries =require('../doctors.queries');
const queryPromise = util.promisify(pool.query).bind(pool);

const getAllDoctors=asyncHandler(async(req,res,next)=>{
  let client;
  try{
    
    const result=await queryPromise(queries.getAllDoctors)
    //do this to retrive all the doctors name with dr before the name
   const modifiedDoctors = result.rows.map(doctor => {
    return {
      ...doctor,
      name: `Dr. ${doctor.name}`
    };
  });
  res.status(200).json({ message: "DONE", Doctors: modifiedDoctors });
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
    getAllDoctors
}