const awilix = require('awilix');
const { StackOverFlowSearchService } = require('../services');
const { TextSearchValidator } = require('../validators');

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  searchService: awilix.asClass(StackOverFlowSearchService).singleton(),
  validateTextSearch: awilix.asClass(TextSearchValidator).singleton(),
});

module.exports = container;
