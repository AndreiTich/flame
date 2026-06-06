import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

import { ServiceWidget } from '../../../interfaces';
import { EntityTable } from '../../UI/Tables/EntityTable/EntityTable';

interface Props {
  openFormForUpdating: (widget: ServiceWidget) => void;
}

const columns = [
  {
    header: 'Name',
    accessor: (w: ServiceWidget) => w.name,
    width: '200px',
  },
  {
    header: 'Type',
    accessor: (w: ServiceWidget) => w.serviceType,
    width: '150px',
  },
  {
    header: 'URL',
    accessor: (w: ServiceWidget) => w.url,
    width: '200px',
  },
  {
    header: 'Visibility',
    accessor: (w: ServiceWidget) => (w.isPublic ? 'Visible' : 'Hidden'),
    width: '100px',
  },
];

export const ServiceWidgetTable = (props: Props): JSX.Element => {
  const {
    serviceWidgets: { widgets },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const {
    pinServiceWidget,
    deleteServiceWidget,
    reorderServiceWidgets,
    updateServiceWidget,
  } = bindActionCreators(actionCreators, dispatch);

  const deleteHandler = (id: number, name: string) => {
    const proceed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (proceed) deleteServiceWidget(id);
  };

  const updateHandler = (id: number) => {
    const widget = widgets.find((w) => w.id === id) as ServiceWidget;
    props.openFormForUpdating(widget);
  };

  const pinHandler = (id: number) => {
    const widget = widgets.find((w) => w.id === id) as ServiceWidget;
    pinServiceWidget(widget);
  };

  const changeVisibilityHandler = (id: number) => {
    const widget = widgets.find((w) => w.id === id) as ServiceWidget;
    updateServiceWidget(id, { ...widget, isPublic: !widget.isPublic });
  };

  return (
    <EntityTable<ServiceWidget>
      entities={widgets}
      columns={columns}
      droppableId="service-widgets"
      onDelete={deleteHandler}
      onUpdate={updateHandler}
      onPin={pinHandler}
      onChangeVisibility={changeVisibilityHandler}
      onReorder={reorderServiceWidgets}
    />
  );
};
