import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '@repositories/AppointmentsRepository';
import CreateAppointmentService from '@services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    if (!(provider && date)) {
      throw Error("Missing datas to create appointments");
    }

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointmentService.execute({
      date: parsedDate,
      provider
    })
    return res.json(appointment);
  } catch (err:any) {
    return res.status(400).json({
      error: err.message
    });
  }
});

export default appointmentsRouter;
