// 该文件渲染发帖子页面

import {
    Select,
    makeStyles,
    Field,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
    mergeClasses,
    tokens,
    useId,
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
    sign: {
        color: "#7AC5CD",
        fontWeight: "400", // 半粗体
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    confirm: {
        color: "	#9ACD32",
        fontWeight: "800", // 半粗体
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    cancel: {
        color: "grey",
        fontWeight: "800", // 半粗体
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    icon: {
        marginRight: "8px", // 图标和文本之间的间距
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

    upLoadButton: {
        position: "absolute",
        bottom: "60px",
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
        bottom: "60px",
        left: "750px",
        backgroundColor: "#fbe8d3",
        color: "#f85f73",
        border: "none",
        padding: "10px 20px",
        borderRadius: "50px",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        fontWeight: "bold",
    },
    fileInput: {
        display: "none", // 隐藏文件选择器
    },
    ti: {
        color: "#8b00ff	",

    },
    select: {
        color: "	#3CB371",
        backgroundColor: "#FFF0F5",
        border: "none",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "1em",
        appearance: "none",
        cursor: "pointer",
        width: "100%",
        outline: "none",


    },
    inselect: {
        marginTop: "20px",
        marginBottom: "50px",
        border: "none",
    },
    
    filledLighter: {
        backgroundColor: "white",

    },

    base: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
    },

    sfield: {

        display: "grid",
        gridRowGap: tokens.spacingVerticalXXS,
        marginTop: tokens.spacingVerticalMNudge,
        padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
    },
});




const Pos = () => {
    const classes = useStyles();
    const selectId = useId();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [value, setValue] = React.useState("");


    // 处理返回按钮
    const handleButtonClick = () => {
        window.location.href = "/src/index.html";
    };

    // 输入框限制字数
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 500) {
            setValue(event.target.value);
        }
    };




    //-------------上传
    const handleUploadClick = () => {

        if (fileInputRef.current) {
            fileInputRef.current.click(); // 触发文件选择器的点击事件
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // 添加空值检查
        if (file) {
            // Handle file upload logic here, e.g., display preview or upload to backend
            alert("Selected file: " + file.name);
        }
    };
    //------------



    return (
        <>
            <button className={classes.roundButton} onClick={handleButtonClick}>
                <ArrowReply28Filled />
            </button>

            <div className={classes.title}>
                ~~ Share ~~
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

            {/* 隐藏文件选择器窗口 */}
            <input
                type="file"
                ref={fileInputRef}
                className={classes.fileInput}
                onChange={handleFileChange}
                accept="image/*" // 限制文件选择器仅显示图像文件
            />

            <button className={classes.upLoadButton} onClick={handleUploadClick}>
                Upload
            </button>


            <Dialog>

                <DialogTrigger disableButtonEnhancement>
                    <button className={classes.postButton}>
                        Post
                    </button>
                </DialogTrigger>


                <DialogSurface>
                    <DialogBody>

                        <DialogTitle className={classes.ti}>Select</DialogTitle>

                        <DialogContent>
                            <div className={classes.sign}>

                                Which interest group do you want to send to?
                            </div>
                            <div className={classes.inselect}>
                                <div className={mergeClasses(classes.sfield, classes.filledLighter)}>

                                    <Select id={`${selectId}-filledLighter`} appearance="filled-lighter">
                                        <option>Red</option>
                                        <option>Green</option>
                                        <option>Blue</option>
                                    </Select>
                                </div>

                            </div>
                        </DialogContent>


                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="subtle"><text className={classes.confirm}>Confirm</text></Button>
                            </DialogTrigger>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="subtle"><text className={classes.cancel}>Cancel</text></Button>
                            </DialogTrigger>
                        </DialogActions>


                    </DialogBody>
                </DialogSurface>


            </Dialog>
        </>
    );
};

export default Pos;
