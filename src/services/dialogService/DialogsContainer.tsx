import { useDialogService } from './dialogService';

export const DialogsContainer = () => {
  const { dialogs } = useDialogService();

  return (
    <>
      {dialogs.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </>
  );
};
