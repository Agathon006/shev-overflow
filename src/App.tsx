import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createCustomTheme } from './theme';

const App: React.FC = () => {
  const [theme] = useState(() => createCustomTheme('light'));

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>Hello World</div>
      </div>
    </ThemeProvider>
  );
};

export default App;
