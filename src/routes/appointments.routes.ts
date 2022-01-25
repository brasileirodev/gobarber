import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '@repositories/AppointmentsRepository';
import CreateAppointmentService from '@services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body;

    if (!(provider && date)) {
      throw Error('Missing datas to create appointments');
    }

    const parsedDate = parseISO(date);
    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (err:any) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

export default appointmentsRouter;
