import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '@errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    console.log({ usersRepository });
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('This email is already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({ name, email, password: hashedPassword });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
