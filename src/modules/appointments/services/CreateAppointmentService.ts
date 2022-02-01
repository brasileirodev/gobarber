import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { startOfHour } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequestDTO): Promise<Appointment> {
    const usersRepository = getRepository(User);
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
    const userExists = await usersRepository.findOne({
      where: { id: provider_id },
    });

    if (!userExists) {
      throw new AppError('Don\'t exist a user with this provider_id.', 401);
    }

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
