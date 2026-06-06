const { DataTypes } = require('sequelize');
const { STRING, BOOLEAN, INTEGER } = DataTypes;

const up = async (query) => {
  await query.createTable('service_widgets', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    serviceType: {
      type: STRING,
      allowNull: false,
    },
    url: {
      type: STRING,
      allowNull: false,
    },
    apiKey: {
      type: STRING,
      allowNull: true,
      defaultValue: '',
    },
    isPinned: {
      type: BOOLEAN,
      defaultValue: false,
    },
    orderId: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    isPublic: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

const down = async (query) => {
  await query.dropTable('service_widgets');
};

module.exports = {
  up,
  down,
};
