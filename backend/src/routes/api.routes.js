import express from 'express';
import { userController, eventController, serviceController } from '../controllers';
import { tokenCheck, adminCheck } from '../middlewares';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/test', userController.test);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

router.get('/events', eventController.getEvents);
router.post('/events/new', tokenCheck, eventController.createNewEvent);

router.get('/admin/users', tokenCheck, adminCheck, userController.getUsers);
router.put('/admin/users', tokenCheck, adminCheck, userController.updateUser);
router.delete('/admin/users/:id', tokenCheck, adminCheck, userController.deleteUser);


router.get('/services', tokenCheck, serviceController.getServices);
router.get('/admin/services/:id', tokenCheck, adminCheck, serviceController.getServiceById);
router.post('/admin/services/new', tokenCheck, adminCheck, serviceController.createService);
router.put('/admin/services/:id', tokenCheck, adminCheck, serviceController.updateService);
router.delete('/admin/services/:id', tokenCheck, adminCheck, serviceController.deleteService);

export default router;
