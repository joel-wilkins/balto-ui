import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container, createMuiTheme } from '@material-ui/core';
import Header from './Header/Header'
import MovieList from './Movies/MovieList';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl">
        <MovieList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
