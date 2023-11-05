const CheckUserId="SELECT s FROM users s WHERE s.id=$1";
const DoctorID="SELECT doctor_id FROM doctors WHERE user_id =$1";
const addslot="INSERT INTO schedules (doctor_id,date,hour) VALUES($1,$2,$3)";
const getSlotsByDRId="SELECT s.date,s.hour FROM schedule s WHERE s.doctor_id = $1";
const checkDrId="SELECT d FROM doctors d WHERE doctor_id =$1";
 
 


module.exports={
    CheckUserId,
    addslot,
    DoctorID,
    getSlotsByDRId,
    checkDrId
}