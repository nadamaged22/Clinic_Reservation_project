const{ Pool } =require ("pg")
const pool =new Pool({
    user:'postgres',
    host:'localhost',
    database:'clinic2',
    password:'nnn123nnn',
    port:3000,
    // user:process.env.DB_USER,
    // host:process.env.DB_HOST,
    // database:process.env.DATABASE,
    // password:process.env.PASSWORD,
    // port:process.env.PORT,
})
pool.on("connect", () => {
    console.log("Connected to DB Successfully!");
});
module.exports=pool