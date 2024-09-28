import {Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './middleware/auth';

import UserController from './app/controllers/UserContoller';
import SessionController from './app/controllers/SessionController';
import ProductsController from './app/controllers/ProductsController';
import CategoryController from './app/controllers/CategoryController';



const routes = new Router();

const upload = multer(multerConfig);

routes.post ('/users', UserController.store);
routes.post('/Session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', upload.single('file'),ProductsController.store);
routes.get('/products', ProductsController.index);

routes.post('/categories',CategoryController.store);
routes.get('/categories', CategoryController.index);

export default routes;