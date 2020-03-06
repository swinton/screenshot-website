const Pageres = require('pageres');

const logger = require('./lib/logger');

(async () => {
  await new Pageres({delay: 2})
    .src('https://github.com/', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
    .dest(__dirname)
    .run();

    logger.info('Finished generating screenshots!');
})();
