import 'dotenv/config'

import { connectDB } from './mongoose/mongoose.js'
import App from './express-server.js'

connectDB();

const port = process.env.PORT;
App.listen(port);

console.log(`Server listening on port ${port}`);
