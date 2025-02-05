import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

export type NotificationProps = {
  notification: {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    titleTranslationKey: string;
    messageTranslationKey?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, titleTranslationKey, messageTranslationKey },
  onDismiss,
}: NotificationProps) => {
  const { t } = useTranslation();
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
      <AlertTitle>{t(titleTranslationKey)}</AlertTitle>
      {t(messageTranslationKey ?? '')}
    </Alert>
  );
};
