const { roles } = require("../../Midleware/auth");

const endpoints={
    AppointmentCrud:[roles.Patient]
}
module.exports={
    endpoints
}