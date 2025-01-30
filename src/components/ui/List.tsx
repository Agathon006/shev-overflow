import React from 'react';
import {
  List as MuiList,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListProps as ListUIProps,
} from '@mui/material';

export type ListProps = {
  items: {
    icon: React.ReactNode;
    text: string;
  }[];
} & ListUIProps;

export const List: React.FC<ListProps> = ({ items, ...props }) => {
  return (
    <MuiList {...props}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </MuiList>
  );
};
