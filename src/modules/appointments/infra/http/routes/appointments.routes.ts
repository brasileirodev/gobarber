import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@errors/AppError';
import ensureAuhenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuhenticated);
/* appointmentsRouter.get('/', async (req, res) => {
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
}); */

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  if (!(provider_id && date)) {
    throw new AppError('Missing datas to create appointments');
  }

  const parsedDate = parseISO(date);
  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
