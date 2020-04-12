import React, { useState } from 'react';
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
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header openNewMovieDialog={() => setNewDialogOpen(true)} />
      <Container maxWidth="xl">
        <MovieList newDialogOpen={newDialogOpen} closeDialog={() => setNewDialogOpen(false)} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
