import { FC, useCallback, useRef } from 'react';
import { v4 } from 'uuid';

import { useDialogService } from './dialogService';

export const createDialogHook = <T>(Component: FC<T>) => {
  Component.displayName = Component.name || 'DialogComponent';

  return function useDialog() {
    const idRef = useRef<string>();

    const closeDialog = useCallback(() => {
      if (idRef.current) {
        useDialogService.getState().closeDialog(idRef.current);
      }
    }, []);

    const openDialog = useCallback(
      (props?: Omit<T, 'onClose'>) => {
        idRef.current = v4();

        useDialogService.getState().openDialog(
          idRef.current,
          () =>
            Component({
              ...props,
              onClose: closeDialog,
            } as T) as React.ReactElement,
        );
      },
      [closeDialog],
    );

    return [openDialog, closeDialog];
  };
};
