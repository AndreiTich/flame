import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ServiceWidget, ServiceWidgetStatus, ApiResponse } from '../../../interfaces';
import { applyAuth } from '../../../utility';
import { ServiceWidgetCard } from '../ServiceWidgetCard/ServiceWidgetCard';
import { Message } from '../../UI';

import classes from '../../UI/Grids/Grid.module.css';

interface Props {
  widgets: ServiceWidget[];
  totalWidgets?: number;
}

export const ServiceWidgetGrid = (props: Props): JSX.Element => {
  const [statuses, setStatuses] = useState<Record<number, ServiceWidgetStatus>>({});

  useEffect(() => {
    if (!props.widgets.length) return;

    const fetchAllStatuses = () => {
      Promise.all(
        props.widgets.map((w) =>
          axios
            .get<ApiResponse<ServiceWidgetStatus>>(
              `/api/service-widgets/${w.id}/status`,
              { headers: applyAuth() }
            )
            .then((res) => ({ id: w.id, status: res.data.data }))
            .catch(() => ({
              id: w.id,
              status: { status: 'error' as const, line1: 'Fetch failed', line2: '' },
            }))
        )
      ).then((results) => {
        const map: Record<number, ServiceWidgetStatus> = {};
        results.forEach((r) => (map[r.id] = r.status));
        setStatuses(map);
      });
    };

    fetchAllStatuses();
    const interval = setInterval(fetchAllStatuses, 60000);
    return () => clearInterval(interval);
  }, [props.widgets.length]);

  if (props.widgets.length) {
    return (
      <div className={classes.Grid}>
        {props.widgets.map((widget) => (
          <ServiceWidgetCard
            key={widget.id}
            widget={widget}
            status={statuses[widget.id] || null}
          />
        ))}
      </div>
    );
  }

  if (props.totalWidgets) {
    return (
      <Message>
        There are no pinned services. You can pin them from the{' '}
        <Link to="/services">/services</Link> menu
      </Message>
    );
  }

  return (
    <Message>
      You don't have any services. You can add one from{' '}
      <Link to="/services">/services</Link> menu
    </Message>
  );
};
