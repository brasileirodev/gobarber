import { Router } from 'express';
import ensureAuhenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsControler = new AppointmentsController();

appointmentsRouter.use(ensureAuhenticated);
appointmentsRouter.get('/', appointmentsControler.index);
appointmentsRouter.post('/', appointmentsControler.create);

export default appointmentsRouter;
