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
    withStyles
} from '@material-ui/core';
import MovieDetails from './MovieDetails/MovieDetails';

const useStyles = theme => ({
    table: {
        minWidth: 650,
    },
});

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 10,
            results: [],
            detailsOpen: false,
            selectedMovie: null,
            movieCount: 0
        }
    }

    async componentDidMount() {
        await this.loadMovies(1, 10);
    }

    async loadMovies(page, size) {
        const movies = service.getMovies(page, size)
        const movieCount = this.loadMovieCount();
        this.setState({
            results: await movies,
            page,
            size,
            movieCount: await movieCount
        });
    }

    async loadMovieCount() {
        return await service.getMovieCount();
    }

    async openMovieDetails(movieId) {
        const movieDetails = await service.getMovieDetails(movieId);
        this.setState({
            detailsOpen: true,
            selectedMovie: movieDetails
        })
    }

    handleClose = () => {
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
        const { size } = this.state
        await this.loadMovies(newPage + 1, size);
    }

    handleChangeRowsPerPage = async (event) => {
        const pageSize = parseInt(event.target.value, 10);
        const { page } = this.state;
        await this.loadMovies(page, pageSize)
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
        await this.loadMovies(page, size)
    }

    render() {
        const { classes } = this.props;
        const { page, size, detailsOpen, selectedMovie, movieCount } = this.state
        return (
            <React.Fragment>
                <Paper>

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
                        count={movieCount}
                        rowsPerPage={size}
                        page={page === 0 ? page : page - 1}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage} />
                </Paper>
                <MovieDetails
                    movie={selectedMovie}
                    open={detailsOpen}
                    handleClose={this.handleClose}
                    movieUpdated={this.selectedMovieUpdated}
                    deleteMovie={this.deleteMovie} />
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(MovieList)