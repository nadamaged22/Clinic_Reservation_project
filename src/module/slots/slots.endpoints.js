const { roles } = require("../../Midleware/auth");

const endpoints={
    slotsCrud:[roles.Doctor]
}
module.exports={
    endpoints
}