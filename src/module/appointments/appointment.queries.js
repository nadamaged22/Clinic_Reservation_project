const CreateAppointment="WITH inserted_appointment AS (INSERT INTO appointments (appointment_date, appointment_time, doctor_id, schedule_id, patient_id) SELECT s.date, s.hour, s.doctor_id, $1 AS schedule_id, u.id AS patient_id FROM schedules s JOIN users u ON u.role = 'Patient' WHERE s.schedule_id = $1 AND u.id = $2 RETURNING schedule_id) UPDATE schedules SET reserved = true WHERE schedule_id IN (SELECT schedule_id FROM inserted_appointment);"
const ShowAppointment="SELECT a.appointment_date,a.appointment_time,u.name AS doctor_name,a.appointment_id FROM appointments a JOIN doctors d ON a.doctor_id = d.doctor_id JOIN users u ON d.user_id = u.id WHERE a.patient_id =$1";
const EditAppointment="UPDATE appointments SET doctor_id = $1,schedule_id = $2,appointment_date = s.date,appointment_time = s.hour FROM schedules s WHERE appointments.appointment_id = $3 AND appointments.patient_id = $4 AND s.schedule_id = $2 RETURNING appointment_date,appointment_time,doctor_id "
module.exports={
    CreateAppointment,
    ShowAppointment,
    EditAppointment
}