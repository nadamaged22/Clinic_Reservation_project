const { globalErrorHandling } = require("./utils/errorHandling")
const UserRouter=require('./src/module/auth/auth.routes.js')
const SlotRouter=require('./src/module/slots/slots.routes.js')
const DoctorRouter=require("./src/module/doctors/doctors.routes.js")
const initApp = (app, express) => {
    app.use(express.json())
    app.use('/user',UserRouter)
    app.use('/slot',SlotRouter)
    app.use('/doctor',DoctorRouter)
    

    app.all('*', (req, res, next) => {
        res.send("In-valid Routing Plz check url  or  method")
    })
    app.use(globalErrorHandling)

}
module.exports=initApp