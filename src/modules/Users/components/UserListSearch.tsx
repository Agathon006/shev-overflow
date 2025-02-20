import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type UserListSearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const UserListSearch = ({ search, setSearch }: UserListSearchProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t('users.user-list-search.label')}
      variant="outlined"
      fullWidth
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
  );
};
