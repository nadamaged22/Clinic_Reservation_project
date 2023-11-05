const{ Router } =require ("express");
const pc =require ('./controller/doctors');
const { endpoints } = require("./doctors.endpoints");
const { auth } = require("../../Midleware/auth");
const router = Router()

router.get('/getdoctors',auth(endpoints.DoctorCrud),pc.getAllDoctors)

module.exports=router