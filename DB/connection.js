const{ Pool } =require ("pg")
const pool =new Pool({
    host:process.env.POSTGRESQL_ADDON_HOST,
    database:process.env.POSTGRESQL_ADDON_DB,
    user:process.env.POSTGRESQL_ADDON_USER,
    port:process.env.POSTGRESQL_ADDON_PORT,
    password:process.env.POSTGRESQL_ADDON_PASSWORD,
    // user:'postgres',
    // host:"postgres://clinic2_1dow_user:71jaS9kFJeyOUyZxXBaWBqY5EaNiaVrb@dpg-cl2hl148s0fs738agid0-a/clinic2_1dow",
    // database:'clinic2_1dow',
    // password:'71jaS9kFJeyOUyZxXBaWBqY5EaNiaVrb',
    // port:5432,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  
})
pool.on("connect", () => {
    console.log("Connected to DB Successfully!");
});
module.exports=pool