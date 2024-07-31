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
        height: "calc(100vh - 300px)",
    },
    card: {
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        marginTop: "50px",

        marginBottom: "10px",
    },
    name: {

        color: "	#1E90FF"
    },
    des: {
        fontFamily: "Bahnschrift", // 副标题设置字体为 Bahnschrift
        color: "#756c83"
    },
    main: {
        color: "grey",
        fontFamily: "Bahnschrift",
        paddingLeft: "20px",
        wordWrap: "break-word", /* Allows long words to break and wrap onto the next line */
        overflowWrap: "break-word", /* Handles wrapping of long words */
        whiteSpace: "normal", /* Ensures text will wrap normally */
    },
    content: {
        margin: "auto",
        width: "720px",
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "#fafafa",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
    },
    input: {
        width: "65%",
        marginTop: "50px",
    }
});



interface ViewProps {
    onToggleView: () => void;
}

const View: React.FC<ViewProps> = ({ onToggleView }) => {
    const handleButtonClick = () => {
        onToggleView();
    };

    const classes = useStyles();

    // 表示点赞情况
    const [likes, setLikes] = React.useState<number[]>([]);
    const [liked, setLiked] = React.useState<boolean[]>([]);

    // 表示评论情况
    const [comments, setComments] = React.useState<string[][]>([]);
    const [dialogOpenIndex, setDialogOpenIndex] = React.useState<number | null>(null);
    const [currentComment, setCurrentComment] = React.useState<string>("");// 当前输入的评论
    const [commentCounts, setCommentCounts] = React.useState<number[]>([]);

    const [circleName, setCircleName] = React.useState<string | null>(localStorage.getItem('circle_name') || '');
    const [posts, setPosts] = React.useState<any[]>([]); // 用于存储帖子数据

    // 获取当前用户ID
    const userId = localStorage.getItem('userId') || '';

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 确保 circleName 不为 null
                if (!circleName) {
                    console.error('Circle name is not defined.');
                    return;
                }
                // 根据 circleName 获取 circle_id
                const response = await fetch(`http://127.0.0.1:7001/circle/id?name=${encodeURIComponent(circleName)}`);
                const data = await response.json();
                if (response.ok) {
                    const circle_id = data.id;
                    console.log(data.id);

                    // 根据 circle_id 获取帖子数据
                    const postsResponse = await fetch(`http://127.0.0.1:7001/post/circle?circle_id=${circle_id}`);
                    const postsData = await postsResponse.json();
                    if (postsResponse.ok) {
                        console.log('Posts Data:', postsData);

                        setPosts(postsData);

                        setLikes(postsData.map((post: any) => post.likes));
                        setLiked(postsData.map((post: any) => post.users && post.users.includes(parseInt(userId || '0'))));

                        // 统计每个帖子的评论数量
                        const commentCountsArray = await Promise.all(postsData.map(async (post: any) => {
                            const countResponse = await fetch(`http://127.0.0.1:7001/comment/count?postId=${post.id}`);
                            const countData = await countResponse.json();
                            return countData;
                        }));
                        setCommentCounts(commentCountsArray);

                        // 初始化评论
                        setComments(new Array(postsData.length).fill([]));

                    } else {
                        console.error('Failed to fetch posts:', postsData.message);
                    }
                } else {
                    console.error('Failed to fetch posts:', data.message);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [circleName]);

    const handleLikeClick = async (index: number) => {  // 点赞/取消点赞
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

        // 更新数据库中的点赞数
        try {
            const response = await fetch(`http://127.0.0.1:7001/post/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: posts[index].id,
                    likes: newLikes[index],
                    userId: userId,
                    liked: newLiked[index] // 传递点赞状态
                })
            });

            if (!response.ok) {
                console.error('Failed to update likes in the database');
            }
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    const handleCommentClick = async (index: number) => {
        console.log(`Opening dialog for post index: ${index}`); // Debugging line
        setDialogOpenIndex(index);

        // Fetch comments for the selected post
        try {
            const response = await fetch(`http://127.0.0.1:7001/comment?postId=${posts[index].id}`);
            const commentsData = await response.json();
            if (response.ok) {
                const newComments = [...comments];
                newComments[index] = commentsData.map((comment: any) => comment.content);
                setComments(newComments);



            } else {
                console.error('Failed to fetch comments:', commentsData.message);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const closeDialog = () => {  // 关闭评论窗口
        setDialogOpenIndex(null);
        setCurrentComment("");
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => { // 当前输入的评论
        setCurrentComment(event.target.value);
    };

    const handleAddComment = async () => {  // 提交评论
        if (dialogOpenIndex === null) return; // 确保有打开的对话框

        const index = dialogOpenIndex;
        const postId = posts[index].id;
        const authorId = parseInt(userId, 10);
        const content = currentComment;

        try {
            const response = await fetch('http://127.0.0.1:7001/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postId, authorId, content })
            });

            if (response.ok) {
                const newComment = await response.json();
                const newComments = [...comments];
                newComments[index] = [...newComments[index], newComment.content];
                setComments(newComments);
                setCurrentComment('');

                // 更新评论数量
                const newCommentCounts = [...commentCounts];
                newCommentCounts[index] += 1;
                setCommentCounts(newCommentCounts);

                closeDialog();
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment', error);
        }
    };



    return (
        <>
            <button className={classes.roundButton} onClick={handleButtonClick}>
                <ArrowReply28Filled />
            </button>



            <List className={classes.list} navigationMode="items">
                {posts.map((post, index) => (
                    <ListItem className={classes.card} key={post.id}>
                        <Card className={classes.content}>
                            <CardHeader
                                image={
                                    <img
                                        src={post.imageUrl}
                                        height={50}
                                        width={50}
                                        alt="Profile"
                                    />
                                }
                                header={
                                    <Body1>
                                        <b className={classes.name}>{post.author_id}</b>
                                    </Body1>
                                }
                                description={<Caption1 className={classes.des}>{post.created_at}</Caption1>}
                            />

                            <CardPreview className={classes.main}>
                                {post.content}
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
                                        <Button style={{ marginLeft: 24 }}
                                            appearance="transparent"
                                            icon={<ComposeRegular color="#87CEFA" />}
                                            onClick={() => handleCommentClick(index)}
                                        />
                                    </Tooltip>
                                    <span style={{ marginLeft: 8 }}>{commentCounts[index]}</span>
                                </div>
                            </CardFooter>
                        </Card>

                        <Dialog open={dialogOpenIndex === index}>
                            <DialogSurface>
                                <DialogBody>
                                    <DialogTitle>Comments</DialogTitle>
                                    <DialogContent>
                                        <div style={{ wordBreak: "break-all" }}>
                                            {comments[index] && comments[index].map((comment, i) => (
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
                                        <Button appearance="subtle" onClick={handleAddComment}><span style={{ color: '#1E90FF' }}>Submit</span></Button>
                                        <Button appearance="subtle" onClick={closeDialog}><span style={{ color: '#C0C0C0' }}>Close</span></Button>
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
