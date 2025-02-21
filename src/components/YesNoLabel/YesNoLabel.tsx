import { Box, Theme } from '@mui/material';
import { styled } from '@mui/system';

const StyledLabel = styled(Box)`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
`;

export const YesNoLabel = ({ truth = false }: { truth?: boolean }) => {
  return (
    <StyledLabel
      sx={(theme: Theme) => ({
        color: truth
          ? theme.palette.customSuccess.main
          : theme.palette.customError.main,
        backgroundColor: truth
          ? theme.palette.customSuccess.light
          : theme.palette.customError.light,
      })}
    >
      {truth ? 'Yes' : 'No'}
    </StyledLabel>
  );
};
