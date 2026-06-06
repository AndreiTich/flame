import { ActionType } from '../action-types';
import { ServiceWidget } from '../../interfaces';

export interface GetServiceWidgetsAction<T> {
  type:
    | ActionType.getServiceWidgets
    | ActionType.getServiceWidgetsSuccess;
  payload: T;
}

export interface AddServiceWidgetAction {
  type: ActionType.addServiceWidgetSuccess;
  payload: ServiceWidget;
}

export interface DeleteServiceWidgetAction {
  type: ActionType.deleteServiceWidget;
  payload: number;
}

export interface UpdateServiceWidgetAction {
  type: ActionType.updateServiceWidget;
  payload: ServiceWidget;
}

export interface PinServiceWidgetAction {
  type: ActionType.pinServiceWidget;
  payload: ServiceWidget;
}

export interface ReorderServiceWidgetsAction {
  type: ActionType.reorderServiceWidgets;
  payload: ServiceWidget[];
}

export interface SetEditServiceWidgetAction {
  type: ActionType.setEditServiceWidget;
  payload: ServiceWidget | null;
}
