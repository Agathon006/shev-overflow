import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, IconButton } from '@mui/material';

export type NotificationProps = {
  notification: {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  return (
    <Alert
      severity={type}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => onDismiss(id)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ width: '100%', mb: 2 }}
    >
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};
