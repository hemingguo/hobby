import './register.css';
import React from 'react';
import {
    VoicemailFilled,
} from "@fluentui/react-icons";
import {
    Input,
    Label,
    Button,
    Toaster,
    useToastController,
    ToastTrigger,
    ToastTitle,
    Toast,
    useId,
    makeStyles,
} from '@fluentui/react-components';
import { useState } from 'react';


const useStyles = makeStyles({
    avatar: {
        width: "200px",
        height: "200px",
        borderRadius: "10px",
        backgroundColor: "#DCDCDC",
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
    avatarContainer: {
        position: "absolute",
        right: "100px", // 右侧添加间距
        top: "50%", // 使图片框垂直居中
        transform: "translateY(-50%)", // 使图片框垂直居中
    },
    fileInput: {
        display: "none", // 隐藏文件选择器
    },
    upload: {
        position: "absolute",
        bottom: "500px",
        left: "1025px",
        backgroundColor: "#fbe8d3",
        color: "#f85f73",
        border: "none",
        padding: "10px 20px",
        borderRadius: "50px",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        fontWeight: "bold",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
        '&:hover': {

            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            transform: "translateY(-4px)", /* More pronounced lift on hover */
        },

    }

})

const Reg = () => {
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const classes = useStyles();
    const toasterId = useId('toaster');
    const { dispatchToast } = useToastController(toasterId);


    const showToast = (message: string, intent: 'success' | 'error' | 'warning' | 'info') => {
        dispatchToast(
            <Toast>
                <ToastTitle
                    action={
                        <ToastTrigger>
                            <Button appearance="transparent" size="small">Close</Button>
                        </ToastTrigger>
                    }
                >
                    {message}
                </ToastTitle>
            </Toast>,
            { intent: intent }
        );
    };

    const handleRegister = async () => {
        if (!/^\d{11}$/.test(phone)) {
            showToast('Phone number must be 11 digits!', 'warning');
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters!', 'warning');
            return;
        }


        if (password !== confirmPassword) {
            showToast('Passwords do not match!', 'error');
            return;
        }


        try {
            // 1. 获取图片URL   OSS操作
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

            // 提交用户信息到数据库 mongodb操作
            const response = await fetch('http://127.0.0.1:7001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone,
                    username: username,
                    password: password,
                    imageUrl: imageUrl,
                }),
            });

            if (response.ok) {
                showToast('Registration successful!', 'success');
                setTimeout(() => {
                    window.location.href = '../logic/logic.html';
                }, 800);
            } else {
                showToast('Registration failed', 'error');
            }
        } catch (error) {
            showToast('Registration failed', 'error');
            console.error(error); // 打印错误信息
        }
    };

    const handleCancel = async () => {
        window.location.href = '../logic/logic.html';
    };

    // 头像更改处理函数
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


    //-------------上传
    const handleUploadClick = () => {

        if (fileInputRef.current) {
            fileInputRef.current.click(); // 触发文件选择器的点击事件
        }
    };

    return (
        <>
            <div className="welcome-message">
                ~~   WELCOME   ~~
            </div>
            <div className="icon-container">
                <VoicemailFilled fontSize="128px" />
            </div>



            <div className="input-container">
                <div className="input-group">
                    <Label className="label-n">Phone</Label>
                    <Input
                        appearance="filled-lighter-shadow"
                        className="input"
                        placeholder="Enter your phone number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <Label className="label-name">Username</Label>
                    <Input
                        appearance="filled-lighter-shadow"
                        className="input"
                        placeholder="Enter your username"
                        type="tel"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <Label className="label-a">Password</Label>
                    <Input
                        appearance="filled-lighter-shadow"
                        className="input"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <Label className="label-p">Confirm</Label>
                    <Input
                        appearance="filled-lighter-shadow"
                        className="input"
                        placeholder="Re-enter to confirm"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            <button className={classes.upload} onClick={handleUploadClick} >Upload</button>
            <div className="button-group">
                <Button className="button button-register" onClick={handleRegister} shape="circular">OK</Button>
                <Button className="button button-cancel" onClick={handleCancel} shape="circular">Cancel</Button>

            </div>



            {/* 隐藏文件选择器窗口 */}
            <input
                type="file"
                ref={fileInputRef}
                className={classes.fileInput}
                onChange={handleFileChange}
                accept="image/*" // 限制文件选择器仅显示图像文件
            />

            {/* 头像框 */}
            <div className={classes.avatarContainer}>
                <div className={classes.avatar}>
                    {avatar ? (
                        <img src={avatar} alt="Avatar" className={classes.avatarImage} />
                    ) : null}
                </div>
            </div>


            <Toaster toasterId={toasterId} />
        </>
    );
};

export default Reg;
