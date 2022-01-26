import { Router } from 'express';
import { omit } from 'lodash';
import AuthenticateUserService from '@services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { token, user } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ token, user: omit(user, 'password') });
  } catch (err:any) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

export default sessionsRouter;
