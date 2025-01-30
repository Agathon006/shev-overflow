import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

export type ButtonProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
} & MuiButtonProps;

export const Button: React.FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  text,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      startIcon={leftIcon}
      endIcon={rightIcon}
      variant="contained"
      sx={{
        padding: text ? '8px 16px' : '8px',
      }}
    >
      {text || null}
    </MuiButton>
  );
};
