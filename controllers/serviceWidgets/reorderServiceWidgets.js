const asyncWrapper = require('../../middleware/asyncWrapper');
const ServiceWidget = require('../../models/ServiceWidget');

const reorderServiceWidgets = asyncWrapper(async (req, res, next) => {
  await Promise.all(
    req.body.widgets.map(({ id, orderId }) =>
      ServiceWidget.update({ orderId }, { where: { id } })
    )
  );

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = reorderServiceWidgets;
