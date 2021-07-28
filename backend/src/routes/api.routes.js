import express from 'express';
import { userController, eventController, serviceController } from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/test', userController.test);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

router.post('/events/new', eventController.createNewEvent);
router.post('/services/new', serviceController.createService);

export default router;
