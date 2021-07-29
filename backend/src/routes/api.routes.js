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

router.post('/events/new', eventController.createNewEvent);

router.post('/admin/services/new', tokenCheck, adminCheck, serviceController.createService);

// router.get('admin/services'),tokenCheck,adminCheck,serviceController.getServices

export default router;
