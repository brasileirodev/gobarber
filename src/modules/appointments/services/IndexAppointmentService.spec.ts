import IndexAppointmentService from './IndexAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to list all appointments', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const indexAppointment = new IndexAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointments = await indexAppointment.execute();
    expect(appointments.length).toBe(1);
    expect(appointments[0].provider_id).toBe('12345');
  });
});
