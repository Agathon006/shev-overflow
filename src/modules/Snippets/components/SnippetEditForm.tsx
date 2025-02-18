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
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LocalSpinner } from '@/components/Spinner';
import { notify } from '@/utils/notify';

import { useCreateSnippet } from '../api/createSnippet';
import { useEditSnippet } from '../api/editSnippet';
import { useSnippetById } from '../api/getSnippetById';
import { useSnippetsLanguages } from '../api/getSnippetsLanguages';
import { SnippetSchema } from '../schemas/snippet';
import { SnippetEditSchema, snippetEditSchema } from '../schemas/snippetEdit';

type SnippetEditFormProps = {
  snippetId?: SnippetSchema['id'];
};

export const SnippetEditForm = ({ snippetId }: SnippetEditFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: languages, isLoading: isLanguagesLoading } =
    useSnippetsLanguages();

  const { data: snippet, isLoading: isSnippetLoading } = useSnippetById({
    id: snippetId ?? '',
  });

  const { mutate: createSnippet, isPending: isCreating } = useCreateSnippet({
    mutationConfig: {
      onSuccess: (newSnippet) => {
        navigate({ to: `/posts/${newSnippet.id}` });
        notify({
          type: 'success',
          title: t('api.snippet-edit-form.created-post'),
        });
      },
    },
  });

  const { mutate: editSnippet, isPending: isEditing } = useEditSnippet({
    snippetId: snippet?.id ?? '',
    mutationConfig: {
      onSuccess: () => {
        navigate({ to: `/posts/${snippetId}` });
        notify({
          type: 'success',
          title: t('api.snippet-edit-form.edited-post'),
        });
      },
    },
  });

  const isPending = isCreating || isEditing;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SnippetEditSchema>({
    resolver: zodResolver(snippetEditSchema),
    defaultValues: snippetId ? undefined : { language: '', code: '' },
  });

  useEffect(() => {
    if (snippet) {
      reset({
        language: snippet.language,
        code: snippet.code,
      });
    }
  }, [snippet, reset]);

  const onSubmit = (data: SnippetEditSchema) => {
    if (snippetId) {
      editSnippet({ snippetId, ...data });
    } else {
      createSnippet(data);
    }
  };

  const language = watch('language');

  if (isLanguagesLoading || (snippetId && isSnippetLoading)) {
    return <LocalSpinner />;
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
              disabled={isPending}
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
                readOnly: isPending,
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
        <Button disabled={isPending} variant="contained" type="submit">
          {snippetId
            ? t('snippet-edit-form.edit-post-button-span')
            : t('snippet-edit-form.create-post-button-span')}
        </Button>
      </Stack>
    </Box>
  );
};
