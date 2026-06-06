import { ActionType } from '../action-types';
import { Dispatch } from 'redux';
import { ApiResponse, NewServiceWidget, ServiceWidget } from '../../interfaces';
import {
  AddServiceWidgetAction,
  DeleteServiceWidgetAction,
  GetServiceWidgetsAction,
  PinServiceWidgetAction,
  ReorderServiceWidgetsAction,
  SetEditServiceWidgetAction,
  UpdateServiceWidgetAction,
} from '../actions/serviceWidget';
import axios from 'axios';
import { applyAuth } from '../../utility';

export const getServiceWidgets =
  () =>
  async (
    dispatch: Dispatch<GetServiceWidgetsAction<undefined | ServiceWidget[]>>
  ) => {
    dispatch({
      type: ActionType.getServiceWidgets,
      payload: undefined,
    });

    try {
      const res = await axios.get<ApiResponse<ServiceWidget[]>>(
        '/api/service-widgets',
        { headers: applyAuth() }
      );

      dispatch({
        type: ActionType.getServiceWidgetsSuccess,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addServiceWidget =
  (formData: NewServiceWidget) =>
  async (dispatch: Dispatch<AddServiceWidgetAction>) => {
    try {
      const res = await axios.post<ApiResponse<ServiceWidget>>(
        '/api/service-widgets',
        formData,
        { headers: applyAuth() }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: 'Service widget added',
        },
      });

      dispatch({
        type: ActionType.addServiceWidgetSuccess,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteServiceWidget =
  (id: number) =>
  async (dispatch: Dispatch<DeleteServiceWidgetAction>) => {
    try {
      await axios.delete<ApiResponse<{}>>(`/api/service-widgets/${id}`, {
        headers: applyAuth(),
      });

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: 'Service widget deleted',
        },
      });

      dispatch({
        type: ActionType.deleteServiceWidget,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const updateServiceWidget =
  (id: number, formData: NewServiceWidget) =>
  async (dispatch: Dispatch<UpdateServiceWidgetAction>) => {
    try {
      const res = await axios.put<ApiResponse<ServiceWidget>>(
        `/api/service-widgets/${id}`,
        formData,
        { headers: applyAuth() }
      );

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: 'Service widget updated',
        },
      });

      dispatch({
        type: ActionType.updateServiceWidget,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const pinServiceWidget =
  (widget: ServiceWidget) =>
  async (dispatch: Dispatch<PinServiceWidgetAction>) => {
    try {
      const res = await axios.put<ApiResponse<ServiceWidget>>(
        `/api/service-widgets/${widget.id}`,
        { isPinned: !widget.isPinned },
        { headers: applyAuth() }
      );

      const status = widget.isPinned
        ? 'unpinned from Homescreen'
        : 'pinned to Homescreen';

      dispatch<any>({
        type: ActionType.createNotification,
        payload: {
          title: 'Success',
          message: `Widget ${widget.name} ${status}`,
        },
      });

      dispatch({
        type: ActionType.pinServiceWidget,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const reorderServiceWidgets =
  (widgets: ServiceWidget[]) =>
  async (dispatch: Dispatch<ReorderServiceWidgetsAction>) => {
    try {
      const updateQuery = {
        widgets: widgets.map((w, index) => ({
          id: w.id,
          orderId: index + 1,
        })),
      };

      await axios.put<ApiResponse<{}>>(
        '/api/service-widgets/0/reorder',
        updateQuery,
        { headers: applyAuth() }
      );

      dispatch({
        type: ActionType.reorderServiceWidgets,
        payload: widgets,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const setEditServiceWidget =
  (widget: ServiceWidget | null) =>
  (dispatch: Dispatch<SetEditServiceWidgetAction>) => {
    dispatch({
      type: ActionType.setEditServiceWidget,
      payload: widget,
    });
  };
