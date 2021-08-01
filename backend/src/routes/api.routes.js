import express from 'express';
import { userController, eventController, serviceController, prescriptionController } from '../controllers';
import { tokenCheck, adminCheck, providerCheck } from '../middlewares';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/test', userController.test);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

router.get('/events', eventController.getEvents);
router.get('/events/:useremail', eventController.getEventsByUserEmail);
router.post('/events/new', tokenCheck, eventController.createNewEvent);

router.get('/admin/users', tokenCheck, userController.getUsers);
router.get('/users/:service', tokenCheck, userController.getUsersByService);

router.put('/admin/users', tokenCheck, adminCheck, userController.updateUser);
router.get('/admin/users/:id', tokenCheck, adminCheck, userController.getUserById);
router.delete('/admin/users/:id', tokenCheck, adminCheck, userController.deleteUser);

router.post('/provider/prescription/new', tokenCheck, providerCheck, prescriptionController.createNewPrescription);

router.get('/services', tokenCheck, serviceController.getServices);
router.get('/admin/services/:id', tokenCheck, adminCheck, serviceController.getServiceById);
router.post('/admin/services/new', tokenCheck, adminCheck, serviceController.createService);
router.put('/admin/services/:id', tokenCheck, adminCheck, serviceController.updateService);
router.delete('/admin/services/:id', tokenCheck, adminCheck, serviceController.deleteService);

export default router;
