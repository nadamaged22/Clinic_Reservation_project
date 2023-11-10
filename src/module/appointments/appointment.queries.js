const CreateAppointment="WITH inserted_appointment AS (INSERT INTO appointments (appointment_date, appointment_time, doctor_id, schedule_id, patient_id) SELECT s.date, s.hour, s.doctor_id, $1 AS schedule_id, u.id AS patient_id FROM schedules s JOIN users u ON u.role = 'Patient' WHERE s.schedule_id = $1 AND u.id = $2 RETURNING schedule_id) UPDATE schedules SET reserved = true WHERE schedule_id IN (SELECT schedule_id FROM inserted_appointment);"
const ShowAppointment="SELECT a.appointment_date,a.appointment_time,a.appointment_id,u.name AS doctor_name FROM appointments a JOIN doctors d ON a.doctor_id = d.doctor_id JOIN users u ON d.user_id = u.id WHERE a.patient_id =$1";

module.exports={
    CreateAppointment,
    ShowAppointment
}