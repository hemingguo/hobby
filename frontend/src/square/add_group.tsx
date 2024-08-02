// 渲染创建兴趣圈的内容

import { useEffect, useRef, useState } from "react";
import * as React from "react";
import {
    makeStyles,
    Field,
    Input,
} from "@fluentui/react-components";
import { List, ListItem } from "@fluentui/react-list-preview";
import {
    ArrowReply28Filled,
} from "@fluentui/react-icons";




const useStyles = makeStyles({
    container: {
        marginTop: "5%",
        width: "1050px",
        maxHeight: "70%",
        overflowY: "auto",
        overflowX: "auto",
        padding: "20px",
        border: "none",
        borderRadius: "10px",
    },
    title: {
        fontFamily: "Comic Sans MS", 
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
        marginLeft: "15%",
    },
    input: {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#f9f9f9",
        marginTop: "20px",
        width: "700px",
        border: "none",
        transition: "border-bottom-color 0.3s ease",
        borderBottom: "2px solid #ccc",
        '&:focus': {
            outline: "none",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0.2)",
        },
    },
    textarea: {
        marginTop: "20px",
        width: "700px",
        height: "200px",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        fontSize: "16px",
        resize: "none",
        transition: "border-bottom-color 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        '&:focus': {
            outline: "none",
            borderBottom: "2px solid #0000CD",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0.2)",
        },
    },
    createButton: {
        fontWeight: "700",
        padding: "10px 20px",
        backgroundColor: "#fbe8d3",
        color: "#f85f73",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#ebcbae",
        },
        marginTop: "50px",
        marginLeft: "800px",
        marginBottom: "20px",
        justifyContent: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
    },
    avatarContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: "20px",
    },
    avatar: {
        width: "200px",
        height: "200px",
        borderRadius: "10px",
        backgroundColor: "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "10px",
        overflow: "hidden",
    },
    avatarImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    uploadtext: {
        color: "grey",
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    uploadButton: {
        marginLeft: "70px",
        padding: "6px 12px",
        background: "linear-gradient(90deg, rgba(138, 43, 226, 0.8), rgba(0, 206, 209, 0.8))", /* Intense blue-yellow gradient */
        color: "#FFAA00",
        fontWeight: "800",
        border: "none",
        borderRadius: "0", /* Remove border radius for the parallelogram effect */
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", /* Enhanced shadow for a stronger 3D effect */
        fontSize: "14px",

        
        clipPath: "polygon(10% 0%, 100% 10%, 90% 100%, 0% 90%)", /* Parallelogram shape */
        backdropFilter: "blur(8px)", /* Blur effect for a frosted glass appearance */
        position: "relative", /* Positioning for the animation */
        overflow: "hidden", /* Hide overflow for the gradient animation */
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
        transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
        '&:hover': {
            backgroundColor: "rgba(0, 128, 255, 0.9)", /* Slightly darker on hover */
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
            transform: "translateY(-4px)", /* More pronounced lift on hover */
        },

    },


});

const AddGroup = () => {
    const [name, setName] = useState("");
    const [intro, setIntro] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBackClick = () => {
        window.location.href = "/src/index.html";
    };

    const classes = useStyles();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);



    const handleCreateClick = async () => {   // * 处理提交
        try {
            let imageUrl = "";

            if (avatar) {
                console.log("准备上传图片...");

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
            // 提交圈子信息到后端
            // console.log("帖子的图片是！！！ " + imageUrl)
            const response = await fetch("http://127.0.0.1:7001/square", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    intro: intro,
                    imageUrl: imageUrl,
                    author_id: author_id,
                }),
            });

            const result = await response.json();

            if (result.success) {

                console.log('Circle created successfully:', result);
                window.location.href = "../../index.html";
            } else {
                console.error("Error creating circle:", result.message);
            }

        } catch (error) {
            console.error("Error creating circle:", error);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger file input click
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
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

            <List className={classes.container}>
                <ListItem>
                    <Field className={classes.Field} label={<span className={classes.field}>Name</span>}>
                        <Input
                            className={classes.input}
                            appearance="filled-lighter-shadow"
                            onChange={(_ev, data) => setName(data.value)}
                            value={name}
                        />
                    </Field>
                </ListItem>

                <ListItem>
                    <Field className={classes.Field} label={<span className={classes.field}>Avatar</span>}>
                        <div className={classes.avatarContainer}>
                            <div className={classes.avatar}>
                                {avatar ? (
                                    <img src={avatar} alt="Avatar" className={classes.avatarImage} />
                                ) : (
                                    <span className={classes.uploadtext}>Upload Image</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                ref={fileInputRef}
                            />
                            <button onClick={handleUploadClick} className={classes.uploadButton}>
                                Choose Image
                            </button>
                        </div>
                    </Field>
                </ListItem>

                <ListItem>
                    <Field className={classes.Field} label={<span className={classes.field}>Introduce</span>}>
                        <textarea
                            className={classes.textarea}
                            onChange={(ev) => setIntro(ev.target.value)}
                            value={intro}
                        />
                    </Field>
                </ListItem>

                <ListItem>
                    <button className={classes.createButton} onClick={handleCreateClick}>
                        Create
                    </button>
                </ListItem>
            </List>
        </>
    );
};

export default AddGroup;
