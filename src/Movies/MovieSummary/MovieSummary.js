import React from 'react';
import { TableCell, TableRow, makeStyles, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    tableRow: {
        cursor: 'pointer',
    },
    linkCell: {
        maxWidth: '300px',
        overflow: 'hidden'
    }
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
                {movie.genre.genre}
            </TableCell>
            <TableCell className={classes.linkCell}>
                <Typography>
                    <Link href={movie.wikipedia_link} target="none" color="secondary">{movie.wikipedia_link}</Link>
                </Typography>
            </TableCell>
        </TableRow >
    );
}

export default MovieSummary;
