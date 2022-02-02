import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { token, user } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ token, user: omit(user, 'password') });
  }
}
