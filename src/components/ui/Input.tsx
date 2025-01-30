import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export type InputProps = {
  label: string;
  fullWidth?: boolean;
} & TextFieldProps;

export const Input: React.FC<InputProps> = ({
  label,
  fullWidth = true,
  sx,
  variant = 'filled',
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant={variant} 
      fullWidth={fullWidth}
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
