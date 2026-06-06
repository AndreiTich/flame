import { Model } from '.';

export interface NewServiceWidget {
  name: string;
  serviceType: string;
  url: string;
  apiKey: string;
  isPublic: boolean;
}

export interface ServiceWidget extends Model, NewServiceWidget {
  orderId: number;
  isPinned: boolean;
}

export interface ServiceWidgetStatus {
  status: 'ok' | 'error';
  line1: string;
  line2: string;
}

export interface ServiceType {
  key: string;
  name: string;
}
