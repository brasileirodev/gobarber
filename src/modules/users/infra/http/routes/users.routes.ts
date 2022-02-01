import { Router } from 'express';
import multer from 'multer';
import { omit } from 'lodash';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuhenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = container.resolve(CreateUserService);
  const user = await createUser.execute({ name, email, password });

  return res.json(omit(user, 'password'));
});

usersRouter.patch('/avatar', ensureAuhenticated, upload.single('avatar'), async (req, res) => {
  const updateUserAvatar = container.resolve(UpdateUserAvatarService);

  const user = await updateUserAvatar.execute({
    user_id: req.user.id,
    avatarFilename: req.file?.filename,
  });

  return res.json(omit(user, 'password'));
});

export default usersRouter;
