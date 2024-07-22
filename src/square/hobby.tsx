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
import { classNames } from "@fluentui/react/lib/components/Icon/Icon.styles";



const useStyles = makeStyles({
    card: {
        margin: "auto",
        width: "480px",
        maxWidth: "100%",
        borderRadius: "15px ", // 设置圆角
        backgroundColor: "#fafafa",

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

});


interface HobProps {
    onToggleView: () => void;
}

const Hob: React.FC<HobProps> = ({ onToggleView }) => {
    const styles = useStyles();

    const handleClick = () => {
        onToggleView();
    };
    return (
        <Card className={styles.card}>
            <CardHeader
                image={
                    <img
                        height={50}
                        width={50}
                        src="../../image/white.jpg"
                    />
                }
                header={
                    <Body1>
                        <b className={styles.title}>Game</b>
                    </Body1>
                }
                description={<Caption1 className={styles.des}>Founded by hemingguo in 2024-7-17 </Caption1>}
            />

            <CardPreview >
                <div className={styles.describe}>
                    This interest group is mainly for discussing games, and people who love games are welcome to join
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