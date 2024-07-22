// 该文件渲染创建兴趣圈页面


import * as React from "react";
import {
    makeStyles,
    Field,
    Input,
} from "@fluentui/react-components";

import {
    ArrowReply28Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
    title: {
        fontSize: "2em",
        fontWeight: "bold",
        color: "rgb(148, 235, 17)",
        marginLeft: "350px",
    },
    roundButton: {
        position: "fixed",
        top: "55px",
        left: "1000px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        backgroundColor: "#f7c0e3",
        color: "#ff8c00",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
    field: {
        fontWeight: "800",
        color: "#FFC300",
        backgroundColor: "#7872D8",
        borderRadius: "10px",
        padding: "5px 10px",
        display: "inline-block",
    },
    Field: {
        marginTop: "40px",
        marginLeft: "30%",
    },
    input: {
        marginTop: "20px",
        width: "700px",
        border: "none", // Remove border
        borderBottom: "2px solid #ccc", // Add bottom border
        transition: "border-bottom-color 0.3s ease", // Smooth transition
        '&:focus': {
            outline: "none", // Remove default outline
            borderBottom: "2px solid #0000FF", // Blue bottom border on focus
        },
    },

    textarea: {
        marginTop: "20px",
        width: "700px",
        height: "200px",
        padding: "10px",
        borderRadius: "5px",
        border: "2px solid #ccc",
        fontSize: "16px",
        resize: "none",
        transition: "border-bottom-color 0.3s ease",
        '&:focus': {
            outline: "none",
            borderBottom: "2px solid 		#0000CD", // Blue bottom border on focus
        },
    },

    createButton: {
        fontWeight: "700",
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "yellow",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#45a049",
        },
    },
    But: {
        position: "fixed",

        marginLeft: "1000px",
    }
});

const AddGroup = () => {
    const [name, setName] = React.useState("");
    const [intro, setIntro] = React.useState("");

    const handleBackClick = () => {
        window.location.href = "/src/index.html";
    };

    const classes = useStyles();

    const handleCreateClick = () => {
        // Handle the create button click event
        alert(`Group Created!\nName: ${name}\nIntroduce: ${intro}`);
    };
    return (
        <>
            <div>
                <button className={classes.roundButton} onClick={handleBackClick}>
                    <ArrowReply28Filled />
                </button>
            </div>
            <div className={classes.title}>
                ~~ Add A New Group! ~~
            </div>

            <div>
                <Field className={classes.Field} label={<span className={classes.field}>Name</span>}>
                    <Input
                        className={classes.input}
                        appearance="filled-lighter-shadow"
                        onChange={(ev, data) => setName(data.value)}
                        value={name}
                    />
                </Field>
                <Field className={classes.Field} label={<span className={classes.field}>Introduce</span>}>
                    <textarea
                        className={classes.textarea}
                        onChange={(ev) => setIntro(ev.target.value)}
                        value={intro}
                    />
                </Field>
            </div>

            <div className={classes.But}>
                <button className={classes.createButton} onClick={handleCreateClick}>
                    Create
                </button>
            </div>

        </>
    );
};

export default AddGroup;