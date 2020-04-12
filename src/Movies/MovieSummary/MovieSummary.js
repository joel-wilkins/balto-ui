import React from 'react';
import { TableCell, TableRow, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    tableRow: {
        cursor: 'pointer',
    },
}));

function MovieSummary(props) {
    const { movie } = props
    const classes = useStyles();
    return (
        <TableRow hover onClick={props.onClick} className={classes.tableRow}>
            <TableCell>
                {movie.release_year}
            </TableCell>
            <TableCell>
                {movie.title}
            </TableCell>
            <TableCell>
                {movie.genre_id}
            </TableCell>
            <TableCell>
                Placeholder
            </TableCell>
            <TableCell>
                Placeholder
            </TableCell>
        </TableRow>
    );
}

export default MovieSummary;
