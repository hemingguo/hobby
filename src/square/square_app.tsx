// 该文件渲染兴趣广场的主页面，是跳转兴趣圈内部，创建新兴趣圈的入口


import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import HobG from './hobby_groups.tsx';
import View from './view.tsx';
import AddGroup from "./add_group.tsx";


const useStyles = makeStyles({
    roundButton: {
        transform: "rotate(45deg)",
        position: "fixed",
        top: "55px",
        left: "1000px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        backgroundColor: "#f7c0e3",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
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
    diamondButtonText: {
        color: "#ff8c00",
        position: "absolute",
        fontSize: "38px",
        fontWeight: "normal",
        top: "50%",
        left: "52%",
        transform: "translate(-50%, -50%) rotate(-45deg)", // 调整十字中心位置
    },
});

const Squ: React.FC = () => {
    const [isPrimaryView, setIsPrimaryView] = React.useState(1);
    const classes = useStyles();
    const handleAddClick = () => {
        setIsPrimaryView(3);
    };

    const renderContent = () => {
        switch (isPrimaryView) {
            case 1:
                return (
                    <>
                        <button className={classes.roundButton} onClick={handleAddClick}>
                            <span className={classes.diamondButtonText}>+</span>
                        </button>

                        <div className={classes.title}>
                            ~~ Hobby Square ~~
                        </div>
                        <div className={classes.hobby}>
                            <HobG onToggleView={() => setIsPrimaryView(2)} />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <View onToggleView={() => setIsPrimaryView(1)} />
                    </>
                );
            case 3:
                return (
                    <>
                        <AddGroup />
                    </>
                );
            
        }
    };

    return (
        <>
            {renderContent()}
        </>
    );
};

export default Squ;
