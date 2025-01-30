import React from 'react';
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';

export type BadgeProps = {
  badgeContent?: React.ReactNode;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  max?: number;
  showZero?: boolean;
} & MuiBadgeProps;

export const Badge: React.FC<BadgeProps> = ({
  badgeContent,
  color = 'primary',
  max = 99,
  showZero = false,
  sx,
  children,
  ...props
}) => {
  return (
    <MuiBadge
      badgeContent={badgeContent}
      color={color}
      max={max}
      showZero={showZero}
      sx={{
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiBadge>
  );
};
