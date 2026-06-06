import { Fragment, useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';

import { Message, Table } from '../../';
import { TableActions } from '../../../Actions/TableActions';

interface Entity {
  id: number;
  name: string;
  isPinned?: boolean;
  isPublic: boolean;
}

interface Column<T> {
  header: string;
  accessor: (entity: T) => string | number | boolean;
  width?: string;
}

interface Props<T extends Entity> {
  entities: T[];
  columns: Column<T>[];
  droppableId: string;
  orderingEnabled?: boolean;
  onDelete: (id: number, name: string) => void;
  onUpdate: (id: number) => void;
  onPin: (id: number) => void;
  onChangeVisibility: (id: number) => void;
  onReorder: (entities: T[]) => void;
}

export function EntityTable<T extends Entity>(props: Props<T>): JSX.Element {
  const {
    entities,
    columns,
    droppableId,
    orderingEnabled = true,
    onDelete,
    onUpdate,
    onPin,
    onChangeVisibility,
    onReorder,
  } = props;

  const [localEntities, setLocalEntities] = useState<T[]>([]);

  useEffect(() => {
    setLocalEntities([...entities]);
  }, [entities]);

  const dragEndHandler = (result: DropResult): void => {
    if (!result.destination) return;

    const tmp = [...localEntities];
    const [moved] = tmp.splice(result.source.index, 1);
    tmp.splice(result.destination.index, 0, moved);

    setLocalEntities(tmp);
    onReorder(tmp);
  };

  const headers = [...columns.map((c) => c.header), 'Actions'];

  return (
    <Fragment>
      <Message isPrimary={false}>
        {orderingEnabled ? (
          <p>You can drag and drop single rows to reorder</p>
        ) : (
          <p>
            Custom order is disabled. You can change it in the{' '}
            <Link to="/settings/general">settings</Link>
          </p>
        )}
      </Message>

      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <Table headers={headers} innerRef={provided.innerRef}>
              {localEntities.map((entity, index) => (
                <Draggable
                  key={entity.id}
                  draggableId={entity.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => {
                    const style = {
                      border: snapshot.isDragging
                        ? '1px solid var(--color-accent)'
                        : 'none',
                      borderRadius: '4px',
                      ...provided.draggableProps.style,
                    };

                    return (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={style}
                      >
                        {columns.map((col, i) => (
                          <td
                            key={i}
                            style={{ width: col.width || '200px' }}
                          >
                            {String(col.accessor(entity))}
                          </td>
                        ))}

                        {!snapshot.isDragging && (
                          <TableActions
                            entity={entity}
                            deleteHandler={onDelete}
                            updateHandler={onUpdate}
                            pinHanlder={onPin}
                            changeVisibilty={onChangeVisibility}
                          />
                        )}
                      </tr>
                    );
                  }}
                </Draggable>
              ))}
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
}
