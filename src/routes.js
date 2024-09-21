import {Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserContoller';
import SessionController from './app/controllers/SessionController';
import ProductsController from './app/controllers/ProductsController';


const routes = new Router();

const upload = multer(multerConfig);

routes.post ('/users', UserController.store);
routes.post('/Session', SessionController.store);
routes.post('/products', upload.single('file'),ProductsController.store);
routes.get('/products', ProductsController.index);

export default routes;