import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { getCustomRepository, getRepository } from 'typeorm';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { startOfHour } from 'date-fns';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const usersRepository = getRepository(User);
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
    const userExists = await usersRepository.findOne({
      where: { id: provider_id },
    });

    if (!userExists) {
      throw new AppError('Don\'t exist a user with this provider_id.', 401);
    }

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
    const appointment = appointmentsRepository.create({ provider_id, date: appointmentDate });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
