import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@errors/AppError';
// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new authentication with a valid user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    const createAuthenticate = new AuthenticateUserService(fakeUsersRepository);

    const response = await createAuthenticate.execute({
      email: 'john@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('user');
    expect(response).toHaveProperty('token');
  });

  it('should not be able to create a new authentication with a invalid user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createAuthenticate = new AuthenticateUserService(fakeUsersRepository);

    expect(createAuthenticate.execute({
      email: 'john@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});

it('should not be able to create an authentication when the password not match', async () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const createUser = new CreateUserService(fakeUsersRepository);

  const user = await createUser.execute({
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '123456',
  });

  expect(user).toHaveProperty('password');

  const createAuthenticate = new AuthenticateUserService(fakeUsersRepository);
  expect(createAuthenticate.execute({
    email: 'john@gmail.com',
    password: '12345',
  })).rejects.toBeInstanceOf(AppError);
});
