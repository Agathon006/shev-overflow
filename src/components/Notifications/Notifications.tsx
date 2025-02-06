import { Box } from '@mui/material';

import { Notification } from './Notification';
import { useNotifications } from './notifications-store';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </Box>
  );
};
