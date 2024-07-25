// 该文件渲染兴趣圈列表

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
        margin: "auto",
        width: "480px",
        maxWidth: "100%",
        borderRadius: "15px", // 设置圆角
        backgroundColor: "#fafafa",
        position: "relative",
        boxSizing: "border-box",
        marginTop: "50px",
        marginBottom: "10px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
    },
    list: {
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        maxHeight: "100%",
    },
});

interface HobGProps {
    onToggleView: () => void;
}

const HobG: React.FC<HobGProps> = ({ onToggleView }) => {
    const classes = useStyles();

    return (
        <List className={classes.list} navigationMode="items">
            {names.map((name) => (
                <ListItem
                    className={classes.card}
                    key={name}
                >
                    <Hob onToggleView={onToggleView} />
                </ListItem>
            ))}
        </List>
    );
};

export default HobG;
