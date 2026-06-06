const express = require('express');
const router = express.Router();

const { auth, requireAuth } = require('../middleware');

const {
  createServiceWidget,
  getAllServiceWidgets,
  getSingleServiceWidget,
  updateServiceWidget,
  deleteServiceWidget,
  reorderServiceWidgets,
  fetchStatus,
  getServiceTypes,
} = require('../controllers/serviceWidgets');

router
  .route('/')
  .post(auth, requireAuth, createServiceWidget)
  .get(auth, getAllServiceWidgets);

router.route('/types').get(getServiceTypes);

router.route('/0/reorder').put(auth, requireAuth, reorderServiceWidgets);

router
  .route('/:id')
  .get(auth, getSingleServiceWidget)
  .put(auth, requireAuth, updateServiceWidget)
  .delete(auth, requireAuth, deleteServiceWidget);

router.route('/:id/status').get(auth, fetchStatus);

module.exports = router;
