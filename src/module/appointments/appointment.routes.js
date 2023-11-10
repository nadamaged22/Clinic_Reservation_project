const{ Router } =require ("express");
const pc =require ('./controller/appointment');
const { endpoints } = require("./appointment.endpoints");
const { auth } = require("../../Midleware/auth");
const router = Router()

router.post('/add/:SlotID',auth(endpoints.AppointmentCrud),pc.CreateAppointment)

module.exports=router