import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '@/hooks/useDebounce';

type SnippetListSearchProps = {
  onSearchChange: (search: string) => void;
};

export const SnippetListSearch = ({
  onSearchChange,
}: SnippetListSearchProps) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  return (
    <TextField
      label={t('snippet-list.search.label')}
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
  );
};
