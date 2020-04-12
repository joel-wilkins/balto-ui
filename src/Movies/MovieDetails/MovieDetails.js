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
    },
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        width: '100%',
        minHeight: ''
    }
});

class MovieDetails extends React.Component {
    castFunction = null;

    constructor(props) {
        super(props);
        this.state = {
            cast: [],
            directors: []
        }
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

    updateMovieGenre = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            genre: Object.assign({}, movie.genre, {
                genre: event.target.value
            })
        }))
    };

    updateMovieLink = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            wikipedia_link: event.target.value
        }))
    };

    updateMovieOrigin = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            origin_id: event.target.value
        }))
    };

    updateMovieOrigin = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            plot: event.target.value
        }))
    };

    handleCastChange = event => {
        const { movie, movieUpdated } = this.props;
        movieUpdated(Object.assign({}, movie, {
            cast: event.target.value
        }))
    }

    autocompleteCast = event => {
        if (event.target.value.length < 3) {
            return;
        }
        event.persist();

        if (!this.castFunction) {
            this.castFunction = debounce(async () => {
                const cast = await service.findCast(event.target.value);
                this.setState({
                    cast: cast.slice(0, 50)
                })
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
                const directors = await service.findDirectors(event.target.value);
                this.setState({
                    directors: directors.slice(0, 50)
                })
            }, 250);
        }

        this.directorFunction();
    }

    renderCast(movie) {
        const { cast } = this.state;
        return (
            <Autocomplete
                multiple
                autoComplete
                includeInputInList
                options={cast}
                freeSolo
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.full_name}
                defaultValue={movie.cast}
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
                multiple
                autoComplete
                includeInputInList
                options={directors}
                filterOptions={(x) => x}
                freeSolo
                defaultValue={movie.directors}
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

    renderModalBody() {
        const { movie, classes, handleClose } = this.props

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
                            <TextField label="Genre" fullWidth value={movie.genre.genre} onChange={this.updateMovieGenre}></TextField>
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField label="Wikipedia Link" fullWidth value={movie.wikipedia_link} onChange={this.updateMovieLink}></TextField>
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField label="Origin" fullWidth value={movie.origin.origin} onChange={this.updateMovieOrigin}></TextField>
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
                        <Button variant="contained" onClick={handleClose} color="primary">
                            Save Changes
                        </Button>
                        <Button variant="contained" onClick={handleClose} color="secondary">
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