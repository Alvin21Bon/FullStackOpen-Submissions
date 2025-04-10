import App from './app.js'
import Logger from './utils/logger.js'
import Env from './utils/env.js'

App.listen(Env.PORT, () => {
	Logger.info(`Server running on port ${Env.PORT}`);
});
