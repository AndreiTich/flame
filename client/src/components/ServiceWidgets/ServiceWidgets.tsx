import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store';

import { ServiceWidget } from '../../interfaces';

import { Headline, Spinner, ActionButton, Modal, Container } from '../UI';
import { ServiceWidgetGrid } from './ServiceWidgetGrid/ServiceWidgetGrid';
import { ServiceWidgetForm } from './ServiceWidgetForm/ServiceWidgetForm';
import { ServiceWidgetTable } from './ServiceWidgetTable/ServiceWidgetTable';

import classes from './ServiceWidgets.module.css';

export const ServiceWidgets = (): JSX.Element => {
  const {
    serviceWidgets: { widgets, loading },
    auth: { isAuthenticated },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const { getServiceWidgets, setEditServiceWidget } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    if (!widgets.length) {
      getServiceWidgets();
    }
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowTable(false);
      setModalIsOpen(false);
    }
  }, [isAuthenticated]);

  const toggleModal = (): void => {
    setModalIsOpen(!modalIsOpen);
  };

  const toggleEdit = (): void => {
    setShowTable(!showTable);
  };

  const openFormForUpdating = (widget: ServiceWidget): void => {
    setEditServiceWidget(widget);
    setModalIsOpen(true);
  };

  return (
    <Container>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <ServiceWidgetForm modalHandler={toggleModal} />
      </Modal>

      <Headline
        title="All Services"
        subtitle={<Link to="/">Go back</Link>}
      />

      {isAuthenticated && (
        <div className={classes.ActionsContainer}>
          <ActionButton
            name="Add"
            icon="mdiPlusBox"
            handler={() => {
              setEditServiceWidget(null);
              toggleModal();
            }}
          />
          <ActionButton name="Edit" icon="mdiPencil" handler={toggleEdit} />
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : !showTable ? (
        <ServiceWidgetGrid widgets={widgets} />
      ) : (
        <ServiceWidgetTable openFormForUpdating={openFormForUpdating} />
      )}
    </Container>
  );
};
