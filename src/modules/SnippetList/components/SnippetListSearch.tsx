import { TextField } from '@mui/material';
import { useDeferredValue, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type SnippetListSearchProps = {
  onSearchChange: (search: string) => void;
};

export const SnippetListSearch = ({
  onSearchChange,
}: SnippetListSearchProps) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    onSearchChange(deferredSearchTerm);
  }, [deferredSearchTerm, onSearchChange]);

  return (
    <TextField
      label={t('snippet-list.search.label')}
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleChange}
      sx={{ marginBottom: 2 }}
    />
  );
};
