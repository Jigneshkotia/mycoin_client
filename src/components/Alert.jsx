import { IconCheckCircle, IconAlertCircle, IconInfoCircle } from './Icon';

const ICONS = {
  success: IconCheckCircle,
  error: IconAlertCircle,
  info: IconInfoCircle,
};

function Alert({ type = 'info', children }) {
  if (!children) return null;

  const IconComponent = ICONS[type] || ICONS.info;

  return (
    <div className={`alert alert-${type}`} role="status">
      <IconComponent size={18} className="alert-icon" />
      <span>{children}</span>
    </div>
  );
}

export default Alert;
