const CheckEmailExist="SELECT s FROM users s WHERE s.email=$1";
const adduser="INSERT INTO users (name,email,password,role) VALUES($1,$2,$3,$4)";
const loginCheck="SELECT email, password ,id FROM users WHERE email= $1";
const CheckUserCredintials="SELECT id, name, email,role FROM users WHERE id =$1";



module.exports={
    CheckEmailExist,
    adduser,
    loginCheck,
    CheckUserCredintials
};