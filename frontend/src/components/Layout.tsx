import React from 'react';
import {
  AppBar,
  Box,
  PaletteMode,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';

import { ToggleTheme } from './ToggleTheme';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

interface TemplateFrameProps {
  theme: PaletteMode;
  onThemeToggle: () => void;
  children: React.ReactNode;
}

function App({ children, theme, onThemeToggle }: TemplateFrameProps) {
  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <StyledAppBar>
        <Toolbar
          variant="dense"
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            p: '8px 12px',
          }}
        >
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: 'text.secondary', mt: 1 }}
          >
            Stock Tracker
          </Typography>
          <ToggleTheme currentTheme={theme} toggleColorMode={onThemeToggle} />
        </Toolbar>
      </StyledAppBar>
      <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
    </Box>
  );
}

export default App;
