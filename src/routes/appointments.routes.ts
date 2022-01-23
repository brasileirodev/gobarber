import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '@repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  if (!(provider && date)) {
    return res.status(400).json({
      error: 'Missing datas to create appointments',
    });
  }
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return res.status(400).json({
      error: 'This appointment is already booked',
    });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);
  return res.json({ appointment });
});

export default appointmentsRouter;
