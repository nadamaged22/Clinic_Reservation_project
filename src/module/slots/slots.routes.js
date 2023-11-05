const{ Router } =require ("express");
const pc =require ('./controller/slots');
const router = require("../auth/auth.routes");
const { endpoints } = require("./slots.endpoints");
const router = Router()

router.post('/addslot',auth(endpoints.slotsCrud),pc.addslot)


module.exports=router