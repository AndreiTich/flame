import { ActionType } from '../action-types';
import { Action } from '../actions/index';
import { ServiceWidget } from '../../interfaces';

interface ServiceWidgetsState {
  loading: boolean;
  widgets: ServiceWidget[];
  widgetInUpdate: ServiceWidget | null;
}

const initialState: ServiceWidgetsState = {
  loading: true,
  widgets: [],
  widgetInUpdate: null,
};

export const serviceWidgetsReducer = (
  state: ServiceWidgetsState = initialState,
  action: Action
): ServiceWidgetsState => {
  switch (action.type) {
    case ActionType.getServiceWidgets: {
      return {
        ...state,
        loading: true,
      };
    }

    case ActionType.getServiceWidgetsSuccess: {
      return {
        ...state,
        loading: false,
        widgets: action.payload || [],
      };
    }

    case ActionType.addServiceWidgetSuccess: {
      return {
        ...state,
        widgets: [...state.widgets, action.payload],
      };
    }

    case ActionType.deleteServiceWidget: {
      return {
        ...state,
        widgets: state.widgets.filter((w) => w.id !== action.payload),
      };
    }

    case ActionType.updateServiceWidget:
    case ActionType.pinServiceWidget: {
      const idx = state.widgets.findIndex(
        (w) => w.id === action.payload.id
      );

      return {
        ...state,
        widgets: [
          ...state.widgets.slice(0, idx),
          action.payload,
          ...state.widgets.slice(idx + 1),
        ],
      };
    }

    case ActionType.reorderServiceWidgets: {
      return {
        ...state,
        widgets: action.payload,
      };
    }

    case ActionType.setEditServiceWidget: {
      return {
        ...state,
        widgetInUpdate: action.payload,
      };
    }

    default:
      return state;
  }
};
