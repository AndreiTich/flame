import { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { NewServiceWidget, ServiceType, ApiResponse } from '../../../interfaces';
import { ModalForm, InputGroup, Button } from '../../UI';
import { inputHandler, newServiceWidgetTemplate } from '../../../utility';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';
import { State } from '../../../store/reducers';

interface Props {
  modalHandler: () => void;
}

export const ServiceWidgetForm = ({ modalHandler }: Props): JSX.Element => {
  const { widgetInUpdate } = useSelector(
    (state: State) => state.serviceWidgets
  );

  const dispatch = useDispatch();
  const {
    addServiceWidget,
    updateServiceWidget,
    setEditServiceWidget,
    createNotification,
  } = bindActionCreators(actionCreators, dispatch);

  const [formData, setFormData] =
    useState<NewServiceWidget>(newServiceWidgetTemplate);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  useEffect(() => {
    axios
      .get<ApiResponse<ServiceType[]>>('/api/service-widgets/types')
      .then((res) => setServiceTypes(res.data.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (widgetInUpdate) {
      setFormData({ ...widgetInUpdate });
    } else {
      setFormData(newServiceWidgetTemplate);
    }
  }, [widgetInUpdate]);

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: { isNumber?: boolean; isBool?: boolean }
  ) => {
    inputHandler<NewServiceWidget>({
      e,
      options,
      setStateHandler: setFormData,
      state: formData,
    });
  };

  const formSubmitHandler = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    for (let field of ['name', 'url'] as const) {
      if (/^ +$/.test(formData[field])) {
        createNotification({
          title: 'Error',
          message: `Field cannot be empty: ${field}`,
        });
        return;
      }
    }

    if (!widgetInUpdate) {
      addServiceWidget(formData);
    } else {
      updateServiceWidget(widgetInUpdate.id, formData);
      modalHandler();
    }

    setFormData(newServiceWidgetTemplate);
    setEditServiceWidget(null);
  };

  return (
    <ModalForm modalHandler={modalHandler} formHandler={formSubmitHandler}>
      <InputGroup>
        <label htmlFor="name">Service name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="My Jellyfin"
          required
          value={formData.name}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="serviceType">Service type</label>
        <select
          id="serviceType"
          name="serviceType"
          value={formData.serviceType}
          onChange={(e) => inputChangeHandler(e)}
        >
          {serviceTypes.map((t) => (
            <option key={t.key} value={t.key}>
              {t.name}
            </option>
          ))}
        </select>
      </InputGroup>

      <InputGroup>
        <label htmlFor="url">Service URL</label>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="http://192.168.1.100:8096"
          required
          value={formData.url}
          onChange={(e) => inputChangeHandler(e)}
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="apiKey">API Key</label>
        <input
          type="password"
          name="apiKey"
          id="apiKey"
          placeholder="API key or token"
          value={formData.apiKey}
          onChange={(e) => inputChangeHandler(e)}
        />
        <span>Required for most service types</span>
      </InputGroup>

      <InputGroup>
        <label htmlFor="isPublic">Visibility</label>
        <select
          id="isPublic"
          name="isPublic"
          value={formData.isPublic ? 1 : 0}
          onChange={(e) => inputChangeHandler(e, { isBool: true })}
        >
          <option value={1}>Visible (anyone can access it)</option>
          <option value={0}>Hidden (authentication required)</option>
        </select>
      </InputGroup>

      {!widgetInUpdate ? (
        <Button>Add new service</Button>
      ) : (
        <Button>Update service</Button>
      )}
    </ModalForm>
  );
};
