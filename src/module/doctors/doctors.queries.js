const getAllDoctors="SELECT u.name,u.id FROM users u JOIN doctors d ON u.id = d.user_id"; //we use join between the two tables to get data

module.exports={
    getAllDoctors
}