import { FC, useCallback, useMemo, useRef } from 'react';
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

    const memoComponent = useMemo(
      () => (props?: Omit<T, 'onClose'>) => () =>
        Component({
          ...props,
          onClose: closeDialog,
        } as T) as React.ReactElement,
      [closeDialog],
    );

    const openDialog = useCallback(
      (props?: Omit<T, 'onClose'>) => {
        idRef.current = v4();

        useDialogService
          .getState()
          .openDialog(idRef.current, memoComponent(props));
      },
      [memoComponent],
    );

    return [openDialog, closeDialog];
  };
};
