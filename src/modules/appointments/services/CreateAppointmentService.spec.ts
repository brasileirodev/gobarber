import CreateUserService from '@modules/users/services/CreateUserService';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
    );
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: user.id,
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(user.id);
  });

  // it('should not be able to create two appointmets on the same time', async () => {
  //   expect(true).toBe(true);
  // });
});
