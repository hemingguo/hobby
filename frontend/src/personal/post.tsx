// 该文件渲染发帖子页面
import * as React from "react";
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

import { useEffect } from "react";
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

    uploadtext: {
        color: "grey",
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    field: {
        width: "500px",
        marginLeft: "280px",
        position: "relative", // 添加 position: relative 以使按钮位置基于此容器
    },
    avatarContainer: {
        position: "absolute",
        right: "-300px", // 调整这个值以在右侧添加间距
        top: "50%", // 使图片框垂直居中
        transform: "translateY(-50%)", // 使图片框垂直居中
    },
    avatar: {
        width: "200px",
        height: "200px",
        borderRadius: "10px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginLeft: "20px",
    },
    avatarImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",

    },

});




const Pos = () => {
    const classes = useStyles();
    const selectId = useId();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = React.useState<string | null>(null);
    const [value, setValue] = React.useState("");
    const [circleNames, setCircleNames] = React.useState<string[]>([]);
    const [selectedCircle, setSelectedCircle] = React.useState<string>('');


    useEffect(() => {
        // Fetch circle names from the backend
        const fetchCircleNames = async () => {
            try {

                const response = await fetch('http://127.0.0.1:7001/circle/names');
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    // Check if data.circles is an array and map it
                    if (Array.isArray(data.circles)) {
                        setCircleNames(data.circles.map((circle: any) => circle.name));
                    } else {
                        console.error('Unexpected data structure:', data);
                    }
                } else {
                    console.error('Failed to fetch circle names:', data.message);
                }
            } catch (error) {
                console.error('Error fetching circle names:', error);
            }
        };

        fetchCircleNames();
    }, []);


    // 记录发帖至哪一兴趣圈
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCircle(event.target.value);
    };


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
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    //------------

    const handleConfirm = async () => {   // 处理提交
        try {
            // 分为三步


            // 1. 获取 circle_id   MONGODB操作
            const name = selectedCircle;


            const res = await fetch(`http://127.0.0.1:7001/circle/id?name=${encodeURIComponent(name)}`);

            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await res.json();
            const circleId = data.id;

            console.log("兴趣圈id为 " + circleId)

            if (circleId === null) {
                console.error('Failed to fetch circle ID.');
                return;
            }

            // 2. 获取图片URL   OSS操作
            let imageUrl = "";


            if (avatar) {
                console.log("发帖子~~~~准备上传图片...");

                if (fileInputRef.current?.files?.[0]) {
                    const file = fileInputRef.current.files[0];
                    console.log("选择的文件:", file);

                    const formData = new FormData();
                    formData.append('file', file);

                    const uploadResponse = await fetch("http://127.0.0.1:7001/upload", {
                        method: 'POST',
                        body: formData,
                    });

                    if (!uploadResponse.ok) {
                        throw new Error(`HTTP error! status: ${uploadResponse.status}`);
                    }

                    const uploadResult = await uploadResponse.json();
                    console.log("Upload result:", uploadResult); // 打印上传结果
                    imageUrl = uploadResult.url;

                } else {
                    console.error("No file selected for upload.");
                    return;
                }
            }

            const author_id = localStorage.getItem("userId");



            // 3. 提交圈子信息到后端  MONGODB操作

            const response = await fetch("http://127.0.0.1:7001/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    circle_id: circleId,
                    content: value,
                    imageUrl: imageUrl,
                    author_id: author_id,

                }),
            });

            const result = await response.json();

            if (result.success) {
                console.log('Post created successfully:', result);
                window.location.href = "../../index.html";
            } else {
                console.error("Error creating post:", result.message);
            }

        } catch (error) {
            console.error("Error creating post:", error);
        }


    }


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
                    <div className={classes.avatarContainer}>
                        <div className={classes.avatar}>
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className={classes.avatarImage} />
                            ) : null}
                        </div>
                    </div>
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

                                    <Select
                                        id={`${selectId}-filledLighter`}
                                        appearance="filled-lighter"
                                        onChange={handleSelectChange}  // 绑定事件处理器
                                        value={selectedCircle}  // 确保设置为 selectedCircle
                                    >
                                        <option value="" disabled>Select a circle</option>  // 添加默认选项
                                        {circleNames.map((name, index) => (
                                            <option key={index} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </Select>
                                </div>

                            </div>
                        </DialogContent>


                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button onClick={handleConfirm} appearance="subtle"><span className={classes.confirm}>Confirm</span></Button>
                            </DialogTrigger>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="subtle"><span className={classes.cancel}>Cancel</span></Button>
                            </DialogTrigger>
                        </DialogActions>


                    </DialogBody>
                </DialogSurface>


            </Dialog>
        </>
    );
};

export default Pos;
