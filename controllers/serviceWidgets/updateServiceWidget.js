const asyncWrapper = require('../../middleware/asyncWrapper');
const ServiceWidget = require('../../models/ServiceWidget');
const ErrorResponse = require('../../utils/ErrorResponse');

const updateServiceWidget = asyncWrapper(async (req, res, next) => {
  let widget = await ServiceWidget.findOne({
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

  widget = await widget.update(req.body);

  res.status(200).json({
    success: true,
    data: widget,
  });
});

module.exports = updateServiceWidget;
