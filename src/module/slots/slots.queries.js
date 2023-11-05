const CheckUserId="SELECT s FROM users s WHERE s.id=$1";
const DoctorID="SELECT doctor_id FROM doctors WHERE user_id =$1";
const addslot="INSERT INTO schedules (doctor_id,date,hour) VALUES($1,$2,$3)";
// const getSlotsByDRId="SELECT date,hour FROM schedules u JOIN doctors d ON u.id = d.user_id
// JOIN schedule s ON d.doctor_id = s.doctor_id
// WHERE u.id = <doctor_id>;
 


module.exports={
    CheckUserId,
    addslot,
    DoctorID
}