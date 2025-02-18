import { zodResolver } from '@hookform/resolvers/zod';
import MonacoEditor from '@monaco-editor/react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LocalSpinner } from '@/components/Spinner';

import { useSnippetsLanguages } from '../api/getSnippetsLanguages';
import { snippetEditSchema } from '../schemas/snippetEdit';

export const SnippetEditForm = () => {
  const { t } = useTranslation();

  const { data: languages, isLoading } = useSnippetsLanguages();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(snippetEditSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log('Form submitted with data: ', data);
  };

  const language = watch('language');

  if (isLoading) return <LocalSpinner />;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} mb={3} mx={4}>
        <Typography variant="h6">
          {t('create-post-page.language-title')}
        </Typography>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              value={field.value ?? ''}
              onChange={(event) => field.onChange(event.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                {t('create-post-page.select-language-placeholder')}
              </MenuItem>
              {languages?.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.language && (
          <Typography color="error">
            {t('create-post-page.error.language-message')}
          </Typography>
        )}
      </Stack>
      <Stack direction="column" spacing={2} mb={3} mx={4}>
        <Typography variant="h6">{t('create-post-page.code-title')}</Typography>
        <Controller
          name="code"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MonacoEditor
              height="400px"
              language={language}
              theme="vs-dark"
              value={value}
              onChange={(val) => onChange(val)}
              options={{
                selectOnLineNumbers: true,
                automaticLayout: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
                padding: { top: 10 },
              }}
            />
          )}
        />
        {errors.code && (
          <Typography color="error">
            {t('create-post-page.error.code-message')}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Button variant="contained" type="submit">
          {t('create-post-page.create-post-button-span')}
        </Button>
      </Stack>
    </Box>
  );
};
