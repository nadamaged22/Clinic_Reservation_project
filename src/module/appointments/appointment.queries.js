const CreateAppointment="INSERT INTO appointments (appointment_date, appointment_time, doctor_id, schedule_id)SELECT s.date, s.hour, $1 AS doctor_id, $2 AS schedule_id FROM schedules s WHERE s.schedule_id = $2";


module.exports={
    CreateAppointment
}