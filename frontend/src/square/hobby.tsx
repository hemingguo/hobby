// 该文件渲染兴趣圈列表中具体的项

import * as React from "react";

import {
    makeStyles,
    Body1,
    Caption1,
    Button,
} from "@fluentui/react-components";

import {

    SendRegular,
} from "@fluentui/react-icons";


import {
    Card,
    CardFooter,
    CardHeader,
    CardPreview,

} from "@fluentui/react-components";

import Dia from './dialog.tsx';



const useStyles = makeStyles({
    card: {
        margin: "auto",
        width: "480px",
        maxWidth: "100%",
        borderRadius: "15px ", // 设置圆角
        backgroundColor: "#fafafa",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
    },
    describe: {
        fontFamily: "KaiTi",
        paddingLeft: "20px",
        paddingRight: "20px",
        color: "grey"
    },
    title: {
        fontFamily:"KaiTi",
        color: "#FFAA00"
    },
    des: {
        fontFamily: "Comic Sans MS", 
        color: "#756c83",

    },
    desx: {
        fontFamily: "Georgia",
        color: "#756c83",
        fontSize: '10px', // 副标题的字体大小，调小一点
    },
    look:{
        fontFamily: "Comic Sans MS", 
    }

});


interface HobProps {
    onToggleView: () => void;
    title: string;
    author_id: number;
    description: string;
    created: string;
    updated: string;
    imageUrl: string;
    circle_id: number;

}

const Hob: React.FC<HobProps> = ({ circle_id, title, author_id, description, created, updated, imageUrl, onToggleView }) => {
    const styles = useStyles();
    const [username, setUsername] = React.useState('');

    React.useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://127.0.0.1:7001/home/getUsername', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ author_id })
                });
                const res = await response.json();

                if (response.ok) {
                    setUsername(res.username || '');
                } else {
                    console.error('Error fetching username:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUsername();
    }, [author_id]);

    const handleClick = () => {
        localStorage.removeItem('circle_name');  // 移除存储的
        localStorage.setItem("circle_name", title);
        onToggleView();
    };
    return (
        <Card className={styles.card}>
            <CardHeader
                image={
                    <img
                        height={60}
                        width={60}
                        src={imageUrl}
                    />
                }
                header={
                    <Body1>
                        <b className={styles.title}>{title}</b>
                    </Body1>
                }
                description={<Caption1 >
                    <span className={styles.des}>Founded by No.{author_id} {username ? username : ""} </span><br />
                    <span className={styles.desx}>Created at {created}</span>
                </Caption1>}
            />

            <CardPreview className={styles.describe}>
                <div >
                    {description}
                </div>
            </CardPreview>

            <CardFooter>

                <Button onClick={handleClick} appearance="subtle" icon={<SendRegular fontSize={16} />}><div className={styles.look}>Look</div></Button>

                <Dia circle_id={circle_id} />
            </CardFooter>
        </Card>
    );
};

export default Hob;