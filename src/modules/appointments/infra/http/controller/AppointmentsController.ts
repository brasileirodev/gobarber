import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import IndexAppointmentService from '@modules/appointments/services/IndexAppointmentService';
import { parseISO } from 'date-fns';
import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
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
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const indexAppointmentService = container.resolve(IndexAppointmentService);
    const appointments = await indexAppointmentService.execute();
    return res.json(appointments);
  }
}
