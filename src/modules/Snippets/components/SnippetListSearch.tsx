import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type SnippetListSearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

export const SnippetListSearch = ({
  search,
  setSearch,
}: SnippetListSearchProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t('snippet-list.search.label')}
      variant="outlined"
      fullWidth
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
  );
};
