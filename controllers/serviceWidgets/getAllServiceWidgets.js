const asyncWrapper = require('../../middleware/asyncWrapper');
const ServiceWidget = require('../../models/ServiceWidget');

const getAllServiceWidgets = asyncWrapper(async (req, res, next) => {
  const where = req.isAuthenticated ? {} : { isPublic: true };

  const widgets = await ServiceWidget.findAll({
    order: [['orderId', 'ASC']],
    where,
  });

  res.status(200).json({
    success: true,
    data: widgets,
  });
});

module.exports = getAllServiceWidgets;
