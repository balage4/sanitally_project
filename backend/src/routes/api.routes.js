import express from 'express';
import { userController, eventController, serviceController, prescriptionController, categoryController } from '../controllers';
import { tokenCheck, adminCheck, providerCheck } from '../middlewares';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/test', userController.test);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

router.get('/events', eventController.getEvents);
router.get('/events/:useremail', tokenCheck, eventController.getEventsByUserEmail);
router.get('/provider/events/:provideremail', tokenCheck, providerCheck, eventController.getEventsByProvider);
router.post('/events/new', tokenCheck, eventController.createNewEvent);

router.get('/admin/users', tokenCheck, userController.getUsers);
router.get('/users/:service', tokenCheck, userController.getUsersByService);

router.put('/admin/users', tokenCheck, adminCheck, userController.updateUser);
router.get('/admin/users/:id', tokenCheck, adminCheck, userController.getUserById);
router.delete('/admin/users/:id', tokenCheck, adminCheck, userController.deleteUser);

router.post('/provider/prescriptions/new', tokenCheck, providerCheck, prescriptionController.createNewPrescription);

router.get('/prescriptions/:email', tokenCheck, prescriptionController.getPrescriptionsByUser);

router.get('/services', tokenCheck, serviceController.getServices);
router.get('/admin/services/:id', tokenCheck, adminCheck, serviceController.getServiceById);
router.post('/admin/services/new', tokenCheck, adminCheck, serviceController.createService);
router.put('/admin/services/:id', tokenCheck, adminCheck, serviceController.updateService);
router.delete('/admin/services/:id', tokenCheck, adminCheck, serviceController.deleteService);

router.post('/categories/init', categoryController.initCategories);
router.get('/categories', categoryController.getCategories);
router.put('/admin/categories', tokenCheck, adminCheck, categoryController.updateCategory);

export default router;
