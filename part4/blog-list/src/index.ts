import App from './app.js'
import { connectDB } from './utils/mongoose.js'
import Logger from './utils/logger.js'
import Env from './utils/env.js'

await connectDB();

App.listen(Env.PORT, () => {
	Logger.info(`Server running on port ${Env.PORT}`);
});
