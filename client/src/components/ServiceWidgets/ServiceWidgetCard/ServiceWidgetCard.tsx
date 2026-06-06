import { ServiceWidget, ServiceWidgetStatus } from '../../../interfaces';

import classes from './ServiceWidgetCard.module.css';

interface Props {
  widget: ServiceWidget;
  status: ServiceWidgetStatus | null;
}

export const ServiceWidgetCard = ({ widget, status }: Props): JSX.Element => {
  const loading = status === null;

  const dotClass = loading
    ? classes.StatusLoading
    : status.status === 'ok'
    ? classes.StatusOk
    : classes.StatusError;

  return (
    <div className={classes.ServiceWidgetCard}>
      <div className={`${classes.StatusDot} ${dotClass}`} />
      <div className={classes.Details}>
        <h5>{widget.name}</h5>
        {status?.line1 && <span>{status.line1}</span>}
        {status?.line2 && <span>{status.line2}</span>}
      </div>
    </div>
  );
};
