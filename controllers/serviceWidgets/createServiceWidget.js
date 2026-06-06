const asyncWrapper = require('../../middleware/asyncWrapper');
const ServiceWidget = require('../../models/ServiceWidget');

const createServiceWidget = asyncWrapper(async (req, res, next) => {
  const widget = await ServiceWidget.create(req.body);

  res.status(201).json({
    success: true,
    data: widget,
  });
});

module.exports = createServiceWidget;
