const { roles } = require("../../Midleware/auth");

const endpoints={
    DoctorCrud:[roles.Patient]
}
module.exports={
    endpoints
}