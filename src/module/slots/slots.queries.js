const CheckUserId="SELECT s FROM users s WHERE s.id=$1";
const DoctorID="SELECT doctor_id FROM doctors WHERE user_id =$1";
const addslot="INSERT INTO schedules (doctor_id,date,hour) VALUES($1,$2,$3)";



module.exports={
    CheckUserId,
    addslot,
    DoctorID
}