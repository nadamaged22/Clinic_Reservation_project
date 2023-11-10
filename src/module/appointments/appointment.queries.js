const CreateAppointment="INSERT INTO appointments (appointment_date, appointment_time, doctor_id, schedule_id, patient_id) SELECT s.date, s.hour, s.doctor_id, $1 AS schedule_id ,u.id AS patient_id FROM schedules s JOIN users u ON u.role = 'Patient' WHERE s.schedule_id = $1 AND u.id= $2";


module.exports={
    CreateAppointment
}