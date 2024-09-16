import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Layout from './components/Layout';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material';
import Content from './components/Content';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Main() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
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
