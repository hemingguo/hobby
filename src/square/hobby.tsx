import * as React from "react";

import {
    makeStyles,
    Body1,
    Caption1,
    Button,
} from "@fluentui/react-components";

import { 
    ArrowSquareUpRightRegular,
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
        borderRadius: "15px", // 设置圆角
        backgroundColor: "#fafafa", 
    },
    describe:{
        marginLeft: "30px",
    },
});

const Hob = () => {
    const styles = useStyles();

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
                        <b>Game</b> 
                    </Body1>
                }
                description={<Caption1>Founded by hemingguo in 2024-7-17 </Caption1>}
            />

            <CardPreview >
                <div className={styles.describe}>
                    This interest group is mainly for discussing games, and people who love games are welcome to join
                </div>
            </CardPreview>

            <CardFooter>
                
                <Button appearance="subtle"  icon={<SendRegular fontSize={16} />}>Look</Button>
               
                <Dia />
            </CardFooter>
        </Card>
    );
};

export default Hob;