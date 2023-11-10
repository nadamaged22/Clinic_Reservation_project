const{ Pool } =require ("pg")
const pool =new Pool({
    host:process.env.POSTGRESQL_ADDON_HOST,
    database:process.env.POSTGRESQL_ADDON_DB,
    user:process.env.POSTGRESQL_ADDON_USER,
    port:process.env.POSTGRESQL_ADDON_PORT,
    password:process.env.POSTGRESQL_ADDON_PASSWORD,
    max: 20, // Set the maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000,
  
})
pool.on("connect", () => {
    console.log("Connected to DB Successfully!");
});
module.exports=pool