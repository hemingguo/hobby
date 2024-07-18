import {
    makeStyles,
    Field,
} from "@fluentui/react-components";
import * as React from "react";
import {
    Status20Filled,
    ArrowReply28Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
    title: {
        fontSize: "2em",
        fontWeight: "bold",
        color: "rgb(148, 235, 17)",
        marginLeft: "450px",
        marginBottom: "40px",
    },

    textarea: {
        width: "500px",
        height: "309px",
        backgroundColor: "#e0f7fa", // 设置背景颜色为淡蓝色
        border: "none", // 去掉边框
        padding: "10px", // 添加一些内边距
        borderRadius: "5px", // 添加圆角
        outline: "none", // 去掉对焦时的边框
        boxShadow: "none", // 确保对焦时没有阴影
        resize: "none", // 防止用户调整大小
    },
    field: {
        width: "500px",
        marginLeft: "280px",
        position: "relative", // 添加 position: relative 以使按钮位置基于此容器
    },
    fieldLabel: {
        fontSize: "1.2em",
        color: "#8b00ff", // 紫色字体
        fontWeight: "500", // 半粗体
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
        display: "flex",
        alignItems: "center", // 使图标和文本垂直居中对齐
    },
    icon: {
        marginRight: "8px", // 图标和文本之间的间距
    },
    roundButton: {
        position: "fixed",
        top: "55px",
        right: "70px",
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
    upLoadButton: {
        position: "absolute",
        bottom: "70px",
        left: "280px",
        backgroundColor: "#fbe8d3",
        color: "#f85f73",
        border: "none",
        padding: "10px 20px",
        borderRadius: "50px",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        fontWeight: "bold",
    },
    postButton: {
        position: "absolute",
        bottom: "70px",
        right: "305px",
        backgroundColor: "#fbe8d3",
        color: "#f85f73",
        border: "none",
        padding: "10px 20px",
        borderRadius: "50px",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        fontWeight: "bold",
    },
});

const Pos = () => {
    const classes = useStyles();

    const [value, setValue] = React.useState("");

    const handleButtonClick = () => {
        window.location.href = "/src/index.html";
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 500) {
            setValue(event.target.value);
        }
    };

    const handleUpload = () => {
        // Add your submit logic here
        alert("Upload: " + value);
    };

    const handlePost = () => {
        // Add your submit logic here
        alert("Post: " + value);
    };

    return (
        <>
            <button className={classes.roundButton} onClick={handleButtonClick}>
                <ArrowReply28Filled />
            </button>

            <div className={classes.title}>
                ~~ Post ~~
            </div>

            <div className={classes.field}>
                <div className={classes.fieldLabel}>
                    <Status20Filled className={classes.icon} />
                    Share New Things
                </div>
                <Field label="">
                    <textarea
                        value={value}
                        onChange={handleChange}
                        placeholder="Type here..."
                        className={classes.textarea}
                    />
                </Field>
            </div>

            <button className={classes.upLoadButton} onClick={handleUpload}>
                Upload
            </button>
            <button className={classes.postButton} onClick={handlePost}>
                Post
            </button>
        </>
    );
};

export default Pos;
