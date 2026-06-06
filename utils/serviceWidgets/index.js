const jellyfin = require('./jellyfin');
const homeassistant = require('./homeassistant');

const parsers = {
  jellyfin,
  homeassistant,
};

const getParser = (serviceType) => parsers[serviceType] || null;

const getAvailableTypes = () =>
  Object.entries(parsers).map(([key, parser]) => ({
    key,
    name: parser.name,
  }));

module.exports = { getParser, getAvailableTypes };
