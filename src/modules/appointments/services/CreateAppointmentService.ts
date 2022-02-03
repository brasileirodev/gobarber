import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import AppError from '@shared/errors/AppError';
import { startOfHour } from 'date-fns';
// import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

// @injectable()
class CreateAppointmentService {
  constructor(
    // @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    // @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ provider_id, date }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
    const userExists = await this.usersRepository.findById(provider_id);

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
