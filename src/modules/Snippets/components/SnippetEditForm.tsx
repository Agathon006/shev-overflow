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

import { snippetEditSchema } from '../schemas/snippetEdit';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'ruby', label: 'Ruby' },
];

export const SnippetEditForm = () => {
  const { t } = useTranslation();

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
            <Select {...field} fullWidth defaultValue={languages[0].value}>
              {languages.map((lang) => (
                <MenuItem key={lang.value} value={lang.value}>
                  {lang.label}
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
          render={({ field }) => (
            <MonacoEditor
              {...field}
              height="400px"
              language={language}
              theme="vs-dark"
              options={{
                selectOnLineNumbers: true,
                automaticLayout: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
                padding: {
                  top: 10,
                },
              }}
              onChange={(value) => field.onChange(value)}
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
