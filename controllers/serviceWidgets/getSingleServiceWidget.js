const asyncWrapper = require('../../middleware/asyncWrapper');
const ServiceWidget = require('../../models/ServiceWidget');
const ErrorResponse = require('../../utils/ErrorResponse');

const getSingleServiceWidget = asyncWrapper(async (req, res, next) => {
  const widget = await ServiceWidget.findOne({
    where: { id: req.params.id },
  });

  if (!widget) {
    return next(
      new ErrorResponse(
        `Service widget with id ${req.params.id} was not found`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: widget,
  });
});

module.exports = getSingleServiceWidget;
