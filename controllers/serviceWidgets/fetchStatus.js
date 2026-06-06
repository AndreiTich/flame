const asyncWrapper = require('../../middleware/asyncWrapper');
const ServiceWidget = require('../../models/ServiceWidget');
const ErrorResponse = require('../../utils/ErrorResponse');
const { getParser } = require('../../utils/serviceWidgets');

const fetchStatus = asyncWrapper(async (req, res, next) => {
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

  const parser = getParser(widget.serviceType);

  if (!parser) {
    return res.status(200).json({
      success: true,
      data: {
        status: 'error',
        line1: `Unknown service type: ${widget.serviceType}`,
        line2: '',
      },
    });
  }

  const status = await parser.fetchStatus(widget.url, widget.apiKey);

  res.status(200).json({
    success: true,
    data: status,
  });
});

module.exports = fetchStatus;
