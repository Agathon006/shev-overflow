import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

import { YesNoLabel } from '@/components/YesNoLabel';
import { createDialogHook } from '@/services/dialogService';

type ConfirmationDialogProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationDialog = ({ onClose, onConfirm }: ConfirmationDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t('confirmation-modal.title')}
      </DialogTitle>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={onClose} color="error">
          <YesNoLabel />
        </Button>
        <Button
          onClick={() => {
            onClose();
            onConfirm();
          }}
          color="success"
          autoFocus
        >
          <YesNoLabel truth />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const useConfirmationDialog = createDialogHook<ConfirmationDialogProps>(
  (props) => <ConfirmationDialog {...props} />,
);
