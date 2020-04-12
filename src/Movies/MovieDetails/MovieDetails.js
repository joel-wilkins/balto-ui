import React from 'react'
import {
    DialogTitle,
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    withStyles
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import service from '../../service'
import debounce from 'lodash/debounce'

const useStyles = (theme) => ({
    inputContainer: {
        marginBottom: '30px'
    }
});

class MovieDetails extends React.Component {
    castFunction = null;
    directorFunction = null;
    genreFunction = null;

    constructor(props) {
        super(props);
        this.state = {
            cast: [],
            directors: [],
            origins: [],
            genres: []
        }
    }

    async componentDidMount() {
        await this.loadOrigins();
    }

    async loadOrigins() {
        const origins = await service.getOrigins();
        this.setState({
            origins
        })
    }

    updateMovieTitle = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            title: event.target.value
        }))
    };

    updateMovieYear = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            release_year: event.target.value
        }))
    };

    updateMovieGenre = (event, value, reason) => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            genre: Object.assign({}, value)
        }))
    };

    updateMovieLink = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            wikipedia_link: event.target.value
        }))
    };

    updateMovieOrigin = (event, value, reason) => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            origin: value
        }))
    };

    updateMoviePlot = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            plot: event.target.value
        }))
    };

    handleCastChange = (event, value, reason) => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            cast: value
        }))
    }

    handleDirectorChange = (event, value, reason) => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            directors: value
        }))
    }

    autocompleteCast = event => {
        if (event.target.value.length < 3) {
            return;
        }
        event.persist();

        if (!this.castFunction) {
            this.castFunction = debounce(async () => {
                if (event && event.target && event.target.value) {
                    const cast = await service.findCast(event.target.value);
                    this.setState({
                        cast: cast.slice(0, 50)
                    })
                }
            }, 250);
        }

        this.castFunction();
    }

    autocompleteDirectors = event => {
        if (event.target.value.length < 3) {
            return;
        }
        event.persist();

        if (!this.directorFunction) {
            this.directorFunction = debounce(async () => {
                if (event && event.target && event.target.value) {
                    const directors = await service.findDirectors(event.target.value);
                    this.setState({
                        directors: directors.slice(0, 50)
                    })
                }
            }, 250);
        }

        this.directorFunction();
    }

    autocompleteGenre = event => {
        if (event.target.value.length < 3) {
            return;
        }
        event.persist();

        if (!this.genreFunction) {
            this.genreFunction = debounce(async () => {
                if (event && event.target && event.target.value) {
                    const genres = await service.findGenres(event.target.value);
                    this.setState({
                        genres: genres.slice(0, 50)
                    })
                }
            }, 250)
        }

        this.genreFunction();
    }

    renderCast(movie) {
        const { cast } = this.state;
        return (
            <Autocomplete
                autoComplete
                multiple
                includeInputInList
                options={cast}
                freeSolo
                filterOptions={(x) => x}
                onChange={this.handleCastChange}
                getOptionLabel={(option) => option.full_name}
                value={movie.cast}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Cast Members"
                        onChange={this.autocompleteCast}
                    />
                )}
            />
        )
    }

    renderDirectors(movie) {
        const { directors } = this.state;
        return (
            <Autocomplete
                autoComplete
                multiple
                includeInputInList
                onChange={this.handleDirectorChange}
                options={directors}
                filterOptions={(x) => x}
                freeSolo
                value={movie.directors}
                getOptionLabel={(option) => option.full_name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Directors"
                        onChange={this.autocompleteDirectors}
                    />
                )}
            />
        )
    }

    renderGenre(movie) {
        const { genres } = this.state;
        return (
            <Autocomplete
                autoComplete
                includeInputInList
                onChange={this.updateMovieGenre}
                options={genres}
                filterOptions={(x) => x}
                freeSolo
                value={movie.genre}
                getOptionLabel={(option) => option.genre}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Genre"
                        onChange={this.autocompleteGenre}
                    />
                )}
            />
        )
    }

    renderOrigin(movie) {
        const { origins } = this.state;
        return (
            <Autocomplete
                autoComplete
                includeInputInList
                onChange={this.updateMovieOrigin}
                options={origins}
                filterOptions={(x) => x}
                freeSolo
                value={movie.origin}
                getOptionLabel={(option) => option.origin}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Origin"
                    />
                )}
            />
        )
    }

    renderModalBody() {
        const { movie, classes, deleteMovie, updateMovie } = this.props

        if (movie) {
            return (
                <React.Fragment>
                    <DialogTitle>{movie.title}</DialogTitle>
                    <DialogContent>
                        <div className={classes.inputContainer}>
                            <TextField label="Title" fullWidth value={movie.title} onChange={this.updateMovieTitle}></TextField>
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField label="Year" fullWidth value={movie.release_year} onChange={this.updateMovieYear}></TextField>
                        </div>
                        <div className={classes.inputContainer}>
                            {this.renderGenre(movie)}
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField label="Wikipedia Link" fullWidth value={movie.wikipedia_link} onChange={this.updateMovieLink}></TextField>
                        </div>
                        <div className={classes.inputContainer}>
                            {this.renderOrigin(movie)}
                        </div>
                        <div className={classes.inputContainer}>
                            {this.renderCast(movie)}
                        </div>
                        <div className={classes.inputContainer}>
                            {this.renderDirectors(movie)}
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField label="Plot" multiline fullWidth value={movie.plot} onChange={this.updateMoviePlot}></TextField>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={updateMovie} color="primary">
                            Save Changes
                        </Button>
                        <Button disabled={!movie.id} variant="contained" onClick={deleteMovie} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </React.Fragment>
            )
        }
    }

    render() {
        const { open, handleClose } = this.props;
        return (
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                {this.renderModalBody()}
            </Dialog>
        )
    }
}

export default withStyles(useStyles)(MovieDetails)