import { useNotifications } from '@/components/Notifications';

export const notify = useNotifications.getState().addNotification;
