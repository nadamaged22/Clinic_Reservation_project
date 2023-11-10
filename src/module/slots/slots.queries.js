const CheckUserId="SELECT s FROM users s WHERE s.id=$1";
const DoctorID="SELECT doctor_id FROM doctors WHERE user_id =$1";
const addslot="INSERT INTO schedules (doctor_id,date,hour) VALUES($1,$2,$3)";
const getSlotsByDRId="SELECT s.schedule_id,s.date,s.hour FROM schedules s WHERE s.doctor_id = $1";
const checkDrId="SELECT d FROM doctors d WHERE doctor_id =$1";
const checkSelectedSlots="SELECT s.date,s.hour FROM schedules s WHERE s.doctor_id = $1 AND s.date=$2 AND s.hour=$3";
 const UserID="SELECT user_id  FROM doctors WHERE doctor_id =$1";


module.exports={
    CheckUserId,
    addslot,
    DoctorID,
    getSlotsByDRId,
    checkDrId,
    checkSelectedSlots,
    UserID
}