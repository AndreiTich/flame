const asyncWrapper = require('../../middleware/asyncWrapper');
const { getAvailableTypes } = require('../../utils/serviceWidgets');

const getServiceTypes = asyncWrapper(async (req, res, next) => {
  const types = getAvailableTypes();

  res.status(200).json({
    success: true,
    data: types,
  });
});

module.exports = getServiceTypes;
