const{ Pool } =require ("pg")
const pool =new Pool({
    user:'postgres',
    host:'localhost',
    database:'clinic2',
    password:'nnn123nnn',
    port:8080,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  
})
pool.on("connect", () => {
    console.log("Connected to DB Successfully!");
});
module.exports=pool