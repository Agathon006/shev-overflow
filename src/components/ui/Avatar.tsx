import React from 'react';
import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material';

export type AvatarProps = {
  src?: string;
  alt?: string;
  size?: number;
  text?: string;
} & MuiAvatarProps;

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'avatar',
  size = 40,
  text,
  sx,
  ...props
}) => {
  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{
        width: size,
        height: size,
        backgroundColor: 'var(--color-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size / 2,
        ...sx,
      }}
      {...props}
    >
      {text && text.substring(0, 2).toUpperCase()}{' '}
    </MuiAvatar>
  );
};
