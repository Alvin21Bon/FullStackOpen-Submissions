import Express from 'express'
import blogsRouter from './routers/blogs-router.js'
import usersRouter from './routers/users-router.js'
import Middlewares from './utils/middlewares.js'

const App = Express();

App.use(Express.json());
App.use(Middlewares.requestLogger);

App.use('/api/blogs', blogsRouter);
App.use('/api/users', usersRouter);

App.use(Middlewares.unknownEndpoint);
App.use(Middlewares.errorMiddlewares);

export default App;
