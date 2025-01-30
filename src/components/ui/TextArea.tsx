import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export type TextAreaProps = {
  label: string;
  fullWidth?: boolean;
  rows?: number;
} & TextFieldProps;

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  fullWidth = true,
  rows = 4,
  sx,
  variant = 'filled',
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      multiline
      rows={rows}
      sx={{
        backgroundColor: 'var(--color-neutral-100)',
        borderRadius: '4px',
        '& .MuiFilledInput-root': {
          backgroundColor: 'var(--color-neutral-100)',
        },
        '& .MuiFilledInput-underline:before': {
          borderBottom: '2px solid var(--color-secondary)',
        },
        '& .MuiFilledInput-underline:hover:before': {
          borderBottom: '2px solid var(--color-secondary)',
        },
        '& .MuiFilledInput-underline.Mui-focused:before': {
          borderBottom: '2px solid var(--color-secondary)',
        },
        '& .MuiFilledInput-input': {
          color: 'var(--color-text-primary)',
        },
        '& .MuiInputLabel-root': {
          color: 'var(--color-text-primary)',
        },
        ...sx,
      }}
      {...props}
    />
  );
};
