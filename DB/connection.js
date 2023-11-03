const{ Pool } =require ("pg")
const pool =new Pool({
    user:'postgres',
    host:"postgres://:@ep-nameless-cake-42829107.us-east-1.postgres.vercel-storage.com:5432/verceldb",
    database:'clinic2_1dow',
    password:'71jaS9kFJeyOUyZxXBaWBqY5EaNiaVrb',
    port:5432,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  
})
pool.on("connect", () => {
    console.log("Connected to DB Successfully!");
});
module.exports=pool