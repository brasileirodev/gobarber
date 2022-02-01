import { Router } from 'express';
import { omit } from 'lodash';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const usersRepository = new UsersRepository();

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { token, user } = await authenticateUser.execute({
    email,
    password,
  });

  return res.json({ token, user: omit(user, 'password') });
});

export default sessionsRouter;
