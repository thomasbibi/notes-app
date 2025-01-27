import express from 'express';
import notesRoute from '../notes/notesRoutes.js';
import authRoute from '../auth/authRoute.js'

const route = express();

route.use(notesRoute);
route.use(authRoute);

export default route;
