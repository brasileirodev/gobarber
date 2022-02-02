import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });
    return res.json(omit(user, 'password'));
  }
}
