const{ Router } =require ("express");
const pc =require ('./controller/slots');
const { endpoints } = require("./slots.endpoints");
const { auth } = require("../../Midleware/auth");
const router = Router()

router.post('/addslot',auth(endpoints.slotsCrud),pc.addslot)


module.exports=router