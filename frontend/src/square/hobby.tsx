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
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
        paddingLeft: "20px",

        color: "grey"
    },
    title: {

        color: "#FFAA00"
    },
    des: {
        fontFamily: "Bahnschrift", // 副标题设置字体为 Bahnschrift
        color: "#756c83",

    },
    desx: {
        fontFamily: "Bahnschrift", // 副标题设置字体为 Bahnschrift
        color: "#756c83",
        fontSize: '10px', // 副标题的字体大小，调小一点
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


}

const Hob: React.FC<HobProps> = ({ title, author_id, description, created, updated, imageUrl, onToggleView }) => {
    const styles = useStyles();

    const handleClick = () => {
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
                    <span className={styles.des}>Founded by {author_id} in {created}</span><br />
                    <span className={styles.desx}>Updated at {updated}</span>
                </Caption1>}
            />

            <CardPreview >
                <div className={styles.describe}>
                    {description}
                </div>
            </CardPreview>

            <CardFooter>

                <Button onClick={handleClick} appearance="subtle" icon={<SendRegular fontSize={16} />}>Look</Button>

                <Dia />
            </CardFooter>
        </Card>
    );
};

export default Hob;