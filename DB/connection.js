const{ Pool } =require ("pg")
const pool =new Pool({
    host:process.env.POSTGRESQL_ADDON_HOST,
    database:process.env.POSTGRESQL_ADDON_DB,
    user:process.env.POSTGRESQL_ADDON_USER,
    port:process.env.POSTGRESQL_ADDON_PORT,
    password:process.env.POSTGRESQL_ADDON_PASSWORD,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  
})
pool.on("connect", () => {
    console.log("Connected to DB Successfully!");
});
module.exports=pool