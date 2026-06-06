const asyncWrapper = require('../../middleware/asyncWrapper');
const ServiceWidget = require('../../models/ServiceWidget');

const deleteServiceWidget = asyncWrapper(async (req, res, next) => {
  await ServiceWidget.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = deleteServiceWidget;
