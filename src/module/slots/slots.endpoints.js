const { roles } = require("../../Midleware/auth");

const endpoints={
    slotsCrud:[roles.Doctor],
    AvalibleSlots:[roles.Patient]
}
module.exports={
    endpoints
}