const{ Router } =require ("express");
const pc =require ('./controller/registeration')
const router = Router()

router.post('/signup',pc.SignUp)
router.post('/login',pc.Login)

module.exports=router