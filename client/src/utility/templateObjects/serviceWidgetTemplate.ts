import { NewServiceWidget, ServiceWidget } from '../../interfaces';

export const newServiceWidgetTemplate: NewServiceWidget = {
  name: '',
  serviceType: 'jellyfin',
  url: '',
  apiKey: '',
  isPublic: true,
};

export const serviceWidgetTemplate: ServiceWidget = {
  ...newServiceWidgetTemplate,
  isPinned: false,
  orderId: 0,
  id: -1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
