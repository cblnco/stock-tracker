import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import Content from './components/Content';

export default function Main() {
  const [theme, setTheme] = React.useState<PaletteMode>('dark');

  const handleOnThemeToggle = () => {
    const newMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(newMode);
  };

  const appTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <Layout theme={theme} onThemeToggle={handleOnThemeToggle}>
        <CssBaseline enableColorScheme />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 10, gap: 4 }}
        >
          <Content />
        </Container>
        <Footer />
      </Layout>
    </ThemeProvider>
  );
}
