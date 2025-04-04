import Express from 'express'
import blogsRouter from './routers/blogs-router.js'
import Middlewares from './utils/middlewares.js'
import { connectDB } from './utils/mongoose.js'

connectDB();

const App = Express();

App.use(Express.json());
App.use(Middlewares.requestLogger);

App.use('/api/blogs', blogsRouter);

App.use(Middlewares.unknownEndpoint);
App.use(Middlewares.errorRouter);

export default App;
