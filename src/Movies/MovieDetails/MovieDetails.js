import React from 'react'
import { DialogTitle, Dialog, DialogContent, TextField, makeStyles, DialogActions, Button, withStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        marginBottom: '10px'
    },
}));

class MovieDetails extends React.Component {
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
            genre_id: event.target.value
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
                            <TextField label="Genre" fullWidth value={movie.genre_id} onChange={this.updateMovieGenre}></TextField>
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField label="Wikipedia Link" fullWidth value={movie.wikipedia_link} onChange={this.updateMovieLink}></TextField>
                        </div>
                        <div className={classes.inputContainer}>
                            <TextField label="Origin" fullWidth value={movie.origin_id} onChange={this.updateMovieOrigin}></TextField>
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