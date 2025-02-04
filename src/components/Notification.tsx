import { Slide, SlideProps, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';

type Severity = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  title: string;
  severity: Severity;
  message?: string;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const Notification: React.FC<NotificationProps> = ({
  title,
  severity,
  message,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: '100%', alignItems: 'center' }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        {message && <Typography variant="body2">{message}</Typography>}
      </Alert>
    </Snackbar>
  );
};
