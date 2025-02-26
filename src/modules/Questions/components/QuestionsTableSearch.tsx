import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type QuestionsTableSearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const QuestionsTableSearch = ({
  search,
  setSearch,
}: QuestionsTableSearchProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t('questions-table.search.label')}
      variant="outlined"
      fullWidth
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
  );
};
