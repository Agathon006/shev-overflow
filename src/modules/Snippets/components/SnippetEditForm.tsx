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
import { useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LocalSpinner } from '@/components/Spinner';
import { notify } from '@/utils/notify';

import { useCreateSnippet } from '../api/createSnippet';
import { useSnippetsLanguages } from '../api/getSnippetsLanguages';
import { SnippetEditSchema, snippetEditSchema } from '../schemas/snippetEdit';

export const SnippetEditForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: languages, isLoading } = useSnippetsLanguages();

  const { mutate, isPending } = useCreateSnippet({
    mutationConfig: {
      onSuccess: (snippet) => {
        navigate({ to: `/posts/${snippet.id}` });

        notify({
          type: 'success',
          title: t('api.create-post-page.created-post'),
        });
      },
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SnippetEditSchema>({
    resolver: zodResolver(snippetEditSchema),
  });

  const onSubmit = (data: SnippetEditSchema) => {
    mutate(data);
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
              disabled={isPending}
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
                readOnly: isPending,
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
        <Button disabled={isPending} variant="contained" type="submit">
          {t('create-post-page.create-post-button-span')}
        </Button>
      </Stack>
    </Box>
  );
};
