import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, Box, Fade, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

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
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      setTimeout(() => onDismiss(id), 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => onDismiss(id), 500);
  };

  return (
    <Fade in={open} timeout={500}>
      <Box>
        <Alert
          variant="filled"
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ width: '100%', mb: 2 }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Box>
    </Fade>
  );
};
