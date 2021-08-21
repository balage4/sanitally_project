import express from 'express';
import { userController, eventController, serviceController, prescriptionController, categoryController } from '../controllers';
import { tokenCheck, adminCheck, providerCheck } from '../middlewares';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/test', userController.test);
router.post('/login', userController.loginUser); // doc
router.post('/register', userController.registerUser); // doc

router.get('/events', tokenCheck, eventController.getEvents); // doc
router.get('/events/:useremail', tokenCheck, eventController.getEventsByUserEmail); // doc
router.get('/provider/events/:provideremail', tokenCheck, providerCheck, eventController.getEventsByProvider); // doc
router.post('/events/new', tokenCheck, eventController.createNewEvent); // doc

router.post('/provider/prescriptions/new', tokenCheck, providerCheck, prescriptionController.createNewPrescription);
router.get('/prescriptions/:email', tokenCheck, prescriptionController.getPrescriptionsByUser);

router.get('/users/:service', tokenCheck, userController.getUsersByService); // doc
router.get('/admin/users', tokenCheck, userController.getUsers); // doc
router.put('/admin/users', tokenCheck, adminCheck, userController.updateUser); // doc
router.get('/admin/users/:id', tokenCheck, adminCheck, userController.getUserById); // doc
router.delete('/admin/users/:id', tokenCheck, adminCheck, userController.deleteUser); // doc

router.get('/admin/services/:id', tokenCheck, adminCheck, serviceController.getServiceById); // doc
router.post('/admin/services/new', tokenCheck, adminCheck, serviceController.createService); // doc
router.put('/admin/services/:id', tokenCheck, adminCheck, serviceController.updateService); // doc
router.delete('/admin/services/:id', tokenCheck, adminCheck, serviceController.deleteService); // doc
router.get('/services', tokenCheck, serviceController.getServices); // doc

router.put('/admin/categories', tokenCheck, adminCheck, categoryController.updateCategory);
router.post('/categories/init', categoryController.initCategories); // doc
router.get('/categories', categoryController.getCategories); // doc

export default router;
