import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class IndexAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAll();
    return appointments;
  }
}
export default IndexAppointmentService;
