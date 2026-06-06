import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../store/reducers';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store';

import { App } from '../../../interfaces';
import { EntityTable } from '../../UI/Tables/EntityTable/EntityTable';

interface Props {
  openFormForUpdating: (app: App) => void;
}

const columns = [
  { header: 'Name', accessor: (a: App) => a.name, width: '200px' },
  { header: 'URL', accessor: (a: App) => a.url, width: '200px' },
  { header: 'Icon', accessor: (a: App) => a.icon, width: '200px' },
  {
    header: 'Visibility',
    accessor: (a: App) => (a.isPublic ? 'Visible' : 'Hidden'),
    width: '200px',
  },
];

export const AppTable = (props: Props): JSX.Element => {
  const {
    apps: { apps },
    config: { config },
  } = useSelector((state: State) => state);

  const dispatch = useDispatch();
  const { pinApp, deleteApp, reorderApps, createNotification, updateApp } =
    bindActionCreators(actionCreators, dispatch);

  const deleteHandler = (id: number, name: string) => {
    const proceed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (proceed) deleteApp(id);
  };

  const updateHandler = (id: number) => {
    const app = apps.find((a) => a.id === id) as App;
    props.openFormForUpdating(app);
  };

  const pinHandler = (id: number) => {
    const app = apps.find((a) => a.id === id) as App;
    pinApp(app);
  };

  const changeVisibilityHandler = (id: number) => {
    const app = apps.find((a) => a.id === id) as App;
    updateApp(id, { ...app, isPublic: !app.isPublic });
  };

  return (
    <EntityTable<App>
      entities={apps}
      columns={columns}
      droppableId="apps"
      orderingEnabled={config.useOrdering === 'orderId'}
      onDelete={deleteHandler}
      onUpdate={updateHandler}
      onPin={pinHandler}
      onChangeVisibility={changeVisibilityHandler}
      onReorder={reorderApps}
    />
  );
};
