// 该文件渲染查看已加入的某一兴趣圈的帖子部分

import * as React from "react";
import {
    makeStyles,
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
    Body1,
    Caption1,
    Button,
    Tooltip,
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Input,
} from "@fluentui/react-components";
import { List, ListItem } from "@fluentui/react-list-preview";
import {
    ArrowReply28Filled,
    ThumbLikeRegular,
    ThumbLikeFilled,
    ComposeRegular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
    title: {
        fontSize: "2em",
        fontWeight: "bold",
        color: "rgb(148, 235, 17)",
        marginLeft: "450px",
        marginBottom: "40px",
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
    list: {
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        maxHeight: "100%",
        height: "calc(100vh - 160px)",
    },
    card: {
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        marginTop: "50px",
        marginBottom: "10px",
    },
    content: {
        margin: "auto",
        width: "720px",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    input: {
        width: "65%",
        marginTop: "50px",
    }
});

const names = [
    "Melda Bevel",
    "Demetra Manwaring",
    "Eusebia Stufflebeam",
    "Israel Rabin",
    "Bart Merrill",
    "MAO",
];

interface ViewProps {
    onToggleView: () => void;
}

const View: React.FC<ViewProps> = ({onToggleView}) => {


    const classes = useStyles();

    const [likes, setLikes] = React.useState<number[]>(Array(names.length).fill(0));
    const [liked, setLiked] = React.useState<boolean[]>(Array(names.length).fill(false));
    const [comments, setComments] = React.useState<string[][]>(Array(names.length).fill([]));//表示整个评论内容数组
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean[]>(Array(names.length).fill(false));
    const [currentComment, setCurrentComment] = React.useState<string>("");//当前输入的评论



    const handleLikeClick = (index: number) => {  //  点赞/取消点赞
        const newLikes = [...likes];
        const newLiked = [...liked];

        if (newLiked[index]) {
            newLikes[index] -= 1;
        } else {
            newLikes[index] += 1;
        }
        newLiked[index] = !newLiked[index];

        setLikes(newLikes);
        setLiked(newLiked);
    };

    const handleCommentClick = (index: number) => { // 打开评论窗口
        const newDialogState = [...isDialogOpen];
        newDialogState[index] = true;
        setIsDialogOpen(newDialogState);
    };

    const closeDialog = (index: number) => {  //关闭评论窗口
        const newDialogState = [...isDialogOpen];
        newDialogState[index] = false;
        setIsDialogOpen(newDialogState);
        setCurrentComment("");
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => { //当前输入的评论
        setCurrentComment(event.target.value);
    };

    const handleAddComment = (index: number) => {  //提交评论
        const newComments = [...comments];
        newComments[index] = [...newComments[index], currentComment];//更新对应的评论数组
        setComments(newComments);// 将整个评论数组更新提交

        closeDialog(index);

    };
    const handleButtonClick = () => {
        onToggleView();

    }
    return (
        <>
            <button className={classes.roundButton} onClick={handleButtonClick}>
                <ArrowReply28Filled />
            </button>



            <List className={classes.list} navigationMode="items">
                {names.map((name, index) => (
                    <ListItem className={classes.card} key={name}>
                        <Card className={classes.content}>
                            <CardHeader
                                image={
                                    <img
                                        src="../../image/white.jpg"
                                        height={50}
                                        width={50}
                                        alt="Profile"
                                    />
                                }
                                header={
                                    <Body1>
                                        <b>Hemingguo</b>
                                    </Body1>
                                }
                                description={<Caption1>2024-7-21</Caption1>}
                            />

                            <CardPreview >
                            </CardPreview >

                            <CardFooter>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Tooltip content="Like" relationship="label">
                                        <Button
                                            appearance="transparent"
                                            onClick={() => handleLikeClick(index)}
                                            icon={liked[index]
                                                ? <ThumbLikeFilled color="#00BFFF" />
                                                : <ThumbLikeRegular color="#87CEFA" />}
                                        />
                                    </Tooltip>
                                    <span style={{ marginLeft: 8 }}>{likes[index]}</span>
                                    <Tooltip content="Comment" relationship="label">
                                        <DialogTrigger disableButtonEnhancement>
                                            <Button style={{ marginLeft: 24 }}
                                                appearance="transparent"
                                                icon={<ComposeRegular color="#87CEFA" />}
                                                onClick={() => handleCommentClick(index)}
                                            />
                                        </DialogTrigger>
                                    </Tooltip>
                                    <span style={{ marginLeft: 8 }}>{comments[index].length}</span>
                                </div>
                            </CardFooter>
                        </Card>
                        <Dialog open={isDialogOpen[index]} onOpenChange={() => closeDialog(index)}>
                            <DialogSurface>
                                <DialogBody>
                                    <DialogTitle>Comments</DialogTitle>
                                    <DialogContent>
                                        <div>
                                            {comments[index].map((comment, i) => (
                                                <p key={i}>{comment}</p>
                                            ))}
                                        </div>
                                        <Input
                                            appearance="filled-lighter-shadow"
                                            className={classes.input}
                                            value={currentComment}
                                            onChange={handleCommentChange}
                                            placeholder="Type here"

                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button appearance="subtle" onClick={() => handleAddComment(index)}><span style={{ color: '	#1E90FF' }}>Submit</span></Button>
                                        <Button appearance="subtle" onClick={() => closeDialog(index)}><span style={{ color: '	#C0C0C0' }}>Close</span></Button>
                                    </DialogActions>
                                </DialogBody>
                            </DialogSurface>
                        </Dialog>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default View;
