import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Fab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header(props) {
    const classes = useStyles();
    const { openNewMovieDialog } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Balto Movie Database
                    </Typography>
                    <Fab color="secondary" aria-label="add" size="small" onClick={openNewMovieDialog}>
                        <AddIcon />
                    </Fab>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header