import React from 'react';
import service from '../service';
import MovieSummary from './MovieSummary/MovieSummary';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    withStyles,
    TextField
} from '@material-ui/core';
import MovieDetails from './MovieDetails/MovieDetails';
import debounce from 'lodash/debounce';

const useStyles = theme => ({
    table: {
        minWidth: 650,
    },
    searchBox: {
        marginLeft: "10px"
    }
});

class MovieList extends React.Component {
    newMovie = {
        title: 'New Movie',
        release_year: 2020,
        genre: {
            id: null,
            genre: ''
        },
        origin: {
            id: null,
            origin: ''
        },
        cast: [],
        directors: [],
        wikipedia_link: '',
        plot: ''
    }

    searchFunction = null;

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 10,
            results: [],
            detailsOpen: false,
            selectedMovie: null,
            movieCount: 0,
            searchTerm: ''
        }
    }

    async componentDidMount() {
        await this.loadMovies(1, 10, '');
    }

    async loadMovies(page, size, searchTerm) {
        const movies = service.getMovies(page, size, searchTerm);
        this.setState({
            results: (await movies),
            page,
            size
        });
    }

    async openMovieDetails(movieId) {
        const movieDetails = await service.getMovieDetails(movieId);
        this.setState({
            detailsOpen: true,
            selectedMovie: movieDetails
        })
    }

    handleClose = () => {
        const { closeDialog } = this.props
        closeDialog();
        this.setState({
            selectedMovie: null,
            detailsOpen: false
        });
    }

    getMovieResults() {
        return this.state.results.map(r =>
            <MovieSummary onClick={async () => await this.openMovieDetails(r.id)} key={r.id} movie={r}></MovieSummary>
        )
    }

    handleChangePage = async (event, newPage) => {
        const { size, searchTerm } = this.state
        await this.loadMovies(newPage + 1, size, searchTerm);
    }

    handleChangeRowsPerPage = async (event) => {
        const pageSize = parseInt(event.target.value, 10);
        const { page, searchTerm } = this.state;
        await this.loadMovies(page, pageSize, searchTerm)
    }

    selectedMovieUpdated = updatedMovie => {
        this.setState({
            selectedMovie: Object.assign({}, updatedMovie)
        })
    }

    deleteMovie = async () => {
        const { page, size, selectedMovie } = this.state;
        await service.deleteMovie(selectedMovie.id)
        this.handleClose();
        await this.loadMovies(page, size);
    }

    updateMovie = async () => {
        const { page, size, selectedMovie } = this.state;
        if (!selectedMovie.id) {
            this.setState({
                selectedMovie: await service.insertMovie(selectedMovie)
            });
        } else {
            await service.updateMovie(selectedMovie);
            this.handleClose();
        }
        await this.loadMovies(page, size);
    }

    changeSearchTerm = event => {
        this.setState({
            searchTerm: event.target.value
        });
        if (!this.searchFunction) {
            this.searchFunction = debounce(async () => {
                const { page, size, searchTerm } = this.state;
                this.loadMovies(page, size, searchTerm);
            }, 250);
        }
        this.searchFunction();
    }

    render() {
        const { classes, newDialogOpen } = this.props;
        const { page, size, detailsOpen, selectedMovie, searchTerm } = this.state

        return (
            <React.Fragment>
                <Paper>
                    <TextField className={classes.searchBox} value={searchTerm} label="Search" onChange={this.changeSearchTerm}></TextField>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Genre</TableCell>
                                    <TableCell>Wiki</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.getMovieResults()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={-1}
                        rowsPerPage={size}
                        page={page === 0 ? page : page - 1}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage} />
                </Paper>
                <MovieDetails
                    movie={selectedMovie || this.newMovie}
                    open={detailsOpen || newDialogOpen}
                    handleClose={this.handleClose}
                    movieUpdated={this.selectedMovieUpdated}
                    deleteMovie={this.deleteMovie}
                    updateMovie={this.updateMovie} />
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(MovieList)