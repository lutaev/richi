const app = require('app');
const logger = require('util/logger');

const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
