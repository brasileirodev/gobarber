import { Router } from 'express';
import { omit } from 'lodash';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { token, user } = await authenticateUser.execute({
    email,
    password,
  });

  return res.json({ token, user: omit(user, 'password') });
});

export default sessionsRouter;
