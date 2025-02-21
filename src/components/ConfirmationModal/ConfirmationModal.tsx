import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

import { YesNoLabel } from '@/components/YesNoLabel';

type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
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
        <Button onClick={onConfirm} color="success" autoFocus>
          <YesNoLabel truth />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
