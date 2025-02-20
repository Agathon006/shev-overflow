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

import { Spinner } from '@/components/Spinner';
import { SnippetSchema } from '@/schemas/snippet';

import { useSnippetsLanguages } from '../api/getSnippetsLanguages';
import { SnippetEditSchema, snippetEditSchema } from '../schemas/snippetEdit';

type SnippetFormProps = {
  snippetId?: SnippetSchema['id'];
  defaultValues?: Partial<SnippetEditSchema>;
  onSubmit: (data: SnippetEditSchema) => void;
  isSubmitting?: boolean;
};

export const SnippetForm = ({
  snippetId,
  defaultValues,
  onSubmit,
  isSubmitting,
}: SnippetFormProps) => {
  const { t } = useTranslation();
  const { data: languages, isLoading: isLanguagesLoading } =
    useSnippetsLanguages();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SnippetEditSchema>({
    resolver: zodResolver(snippetEditSchema),
    defaultValues: defaultValues ?? { language: '', code: '' },
  });

  const language = watch('language');

  if (isLanguagesLoading) {
    return <Spinner />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} mb={3} mx={4}>
        <Typography variant="h6">
          {t('snippet-edit-form.language-title')}
        </Typography>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              disabled={isSubmitting}
              fullWidth
              value={field.value ?? ''}
              onChange={(event) => field.onChange(event.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                {t('snippet-edit-form.select-language-placeholder')}
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
            {t('snippet-edit-form.error.language-message')}
          </Typography>
        )}
      </Stack>
      <Stack direction="column" spacing={2} mb={3} mx={4}>
        <Typography variant="h6">
          {t('snippet-edit-form.code-title')}
        </Typography>
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
                readOnly: isSubmitting,
              }}
            />
          )}
        />
        {errors.code && (
          <Typography color="error">
            {t('snippet-edit-form.error.code-message')}
          </Typography>
        )}
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Button disabled={isSubmitting} variant="contained" type="submit">
          {snippetId
            ? t('snippet-edit-form.edit-post-button-span')
            : t('snippet-edit-form.create-post-button-span')}
        </Button>
      </Stack>
    </Box>
  );
};
