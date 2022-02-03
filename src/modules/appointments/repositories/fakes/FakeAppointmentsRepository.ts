import { uuid } from 'uuidv4'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) => appointment.date === date);
    return findAppointment;
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date, provider_id });
    this.appointments.push(appointment);
    return appointment;
  }

  public async findAll(): Promise<Appointment[]> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), date: new Date(2020, 4, 20, 15, 0, 0), provider_id: '12345' });
    this.appointments.push(appointment);
    return this.appointments;
  }
}

export default AppointmentsRepository;
