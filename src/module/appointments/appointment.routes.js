const{ Router } =require ("express");
const pc =require ('./controller/appointment');
const { endpoints } = require("./appointment.endpoints");
const { auth } = require("../../Midleware/auth");
const router = Router()

router.post('/add',auth(endpoints.AppointmentCrud),pc.CreateAppointment)

module.exports=router