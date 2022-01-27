import { Router } from 'express';
import multer from 'multer';
import { omit } from 'lodash';
import CreateUserService from '@services/CreateUserService';
import ensureAuhenticated from 'src/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    return res.json(omit(user, 'password'));
  } catch (err:any) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

usersRouter.patch('/avatar', ensureAuhenticated, upload.single('avatar'), async (req, res) => {
  try {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file?.filename,
    });

    return res.json(omit(user, 'password'));
  } catch (err:any) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

export default usersRouter;
