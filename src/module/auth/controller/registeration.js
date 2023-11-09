const { Pool } = require("pg")
const pool = require("../../../../DB/connection");
const { asyncHandler } = require("../../../../utils/errorHandling");
const queries =require('../auth.queries');
const { hash, compare } = require("../../../../utils/HashandCompare");
const util = require('util');
const { generateToken } = require("../../../../utils/GenerateandVerify");
// const { createHtml, sendEmail } = require("../../../../utils/email");
const queryPromise = util.promisify(pool.query).bind(pool);

// const SignUp=asyncHandler(async(req,res,next)=>{
//     const{name,email,role}=req.body
//     //check the existance of the email
//         const results = await queryPromise(queries.CheckEmailExist, [email]);

//         if (results.rows.length) {
//             return next(new Error(`THIS EMAIL '${email}' ALREADY EXIST!`, { cause: 409 }));
//         } else {
//             req.body.password = hash(req.body.password);
//             await queryPromise(queries.adduser, [name, email, req.body.password, role]);

//             res.status(201).json({ message: "SIGNUP SUCCESS!" });
//         }
    
// });

const SignUp = asyncHandler(async (req, res, next) => {
    let client; // Declare client variable

    try {
        client = await pool.connect(); // Acquire a client from the pool

        const { name, email, role } = req.body;
        // Check the existence of the email
        const results = await client.query(queries.CheckEmailExist, [email]);

        if (results.rows.length) {
            return next(new Error(`THIS EMAIL '${email}' ALREADY EXISTS!`, { cause: 409 }));
        } else {
            req.body.password = hash(req.body.password);
            await client.query(queries.adduser, [name, email, req.body.password, role]);

            res.status(201).json({ message: "SIGNUP SUCCESS!" });
        }
    } catch (error) {
        next(error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
            await client.end()
        }
    }
});

const Login=asyncHandler(async(req,res,next)=>{
    const{email,password}=req.body
    //check if the email exist or not
    const results = await queryPromise(queries.loginCheck, [email]);
    const user=results.rows[0]
    const notUserFound=!results.rows.length
    if (notUserFound) {
        return next(new Error(`THIS EMAIL '${email}' NOT FOUND !`, { cause: 404 }));
    }
    const checkpassword = user.password
    const match=compare(password,checkpassword)
    if(!match){
        return next(new Error("IN_VALID USER INFO!"),{cause:400})
    }
    const payload={
        id:user.id,
        email:user.email,
        role:user.role
    }
    const token=generateToken({payload})
    res.status(200).json({message:"SIGN IN SUCCESS!",token})




})

module.exports={
    SignUp,
    Login
}