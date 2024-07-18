import { List, ListItem } from "@fluentui/react-list-preview";
import * as React from "react";
import Hob from './hobby.tsx';

import { makeStyles } from "@fluentui/react-components";

const names = [
    "Melda Bevel",
    "Demetra Manwaring",
    "Eusebia Stufflebeam",
    "Israel Rabin",
    "Bart Merrill",
    "Sonya Farner",
];

const useStyles = makeStyles({
    card: {
        position: "relative",
        width: "50%",
        boxSizing: "border-box",
        marginTop: "50px",
    },
    list: {
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        maxHeight: "100%",
    },
    
});

const HobG = () => {
    const classes = useStyles();

    return (
        <List className={classes.list} navigationMode="items">
            {names.map((name) => (
                <ListItem
                    className={classes.card}
                    key={name}
                >
                    <Hob />

                </ListItem>
            ))}
        </List>
    );
};

export default HobG;
