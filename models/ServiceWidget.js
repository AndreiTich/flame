const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ServiceWidget = sequelize.define(
  'ServiceWidget',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    isPublic: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: 'service_widgets',
  }
);

module.exports = ServiceWidget;
