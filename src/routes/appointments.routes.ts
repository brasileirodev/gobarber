import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  if (!(provider && date)) {
    return res.status(400).json({
      error: 'Missing datas to create appointments',
    });
  }
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(
    (appointment) => isEqual(appointment.date, parsedDate),
  );

  if (findAppointmentInSameDate) {
    return res.status(400).json({
      error: 'This appointment is already booked',
    });
  }

  const appointment: Appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };
  appointments.push(appointment);
  return res.json({ appointments });
});

export default appointmentsRouter;
