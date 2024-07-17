import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import HobG from './hobby_groups.tsx';

const useStyles = makeStyles({
    title: {
        fontSize: "2em",
        fontWeight: "bold",
        color: "rgb(148, 235, 17)",
        marginLeft: "400px",
    },
    hobby: {
        marginTop: "50px",
        marginLeft: "40px",
        height: "calc(100vh - 160px)", // Adjust height to fit the viewport with some padding
        overflow: "auto", // Enable scrolling if content exceeds the container
    },
});

const Squ = () => {
    const [isPrimaryView, setIsPrimaryView] = React.useState(true);
    const classes = useStyles();

    return (
        <>
            {isPrimaryView ? (
                <>
                    <div className={classes.title}>
                        ~~ Hobby Square ~~
                    </div>
                    <div className={classes.hobby}>
                        <HobG />
                    </div>
                </>
                // 以上为渲染兴趣圈主页部分
            ) : (
                // 以下为渲染进入某一兴趣圈部分
                <>
                </>
            )}
        </>
    );
};

export default Squ;
