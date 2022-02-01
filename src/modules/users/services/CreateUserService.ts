import { hash } from 'bcryptjs';
import AppError from '@errors/AppError';
import { inject, injectable } from 'tsyringe'
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('This email is already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({ name, email, password: hashedPassword });

    this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
