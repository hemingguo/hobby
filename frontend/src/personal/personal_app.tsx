// 该文件为个人主页面
import { useEffect } from "react";
import * as React from "react";
import { Image, makeStyles, InfoLabel } from "@fluentui/react-components";

import Hobby_table from './hobby_table.tsx'
import Pos from './post.tsx'


const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateAreas: `
            "image title"
            "image table"
            "image card"
        `,
        gap: "50px", // 增加间距
        alignItems: "start",
        position: "relative", // 使容器成为相对定位
    },
    image: {
        gridArea: "image",
        marginLeft: "200px", // 调整图像位置，使其向左移动
    },
    title: {
        gridArea: "title",
        fontSize: "2em",
        fontWeight: "bold",
        color: "rgb(148, 235, 17)",
        marginLeft: "50px",
    },
    table: {
        gridArea: "table",
        textAlign: "left",
        marginLeft: "50px", // 向右偏移
        marginTop: "-20px", // 向上偏移
    },
    tableElement: {
        width: "100%",
        borderCollapse: "collapse",
    },
    tableCell: {
        borderBottom: "2px dotted orange", //
        padding: "10px", // 增加单元格内边距
        textAlign: "left",
    },
    tableCell2: {
        borderTop: "2px dotted orange", //
        padding: "10px", // 增加单元格内边距
        textAlign: "left",
    },
    headerCell: {
        color: "#7579eb", // 设置字体颜色为淡蓝色
    },
    diamondButton: {

        transform: "rotate(45deg)",
        position: "fixed",
        top: "55px",
        left: "1000px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        backgroundColor: "#f7c0e3",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
    diamondButtonText: {
        color: "#ff8c00",
        position: "absolute",
        fontSize: "38px",
        fontWeight: "600",
        top: "50%",
        left: "52%",
        transform: "translate(-66%, -68%) rotate(-45deg)", // 调整十字中心位置
    },
    hobbyTable: {
        position: "absolute",
        left: "150px",
        marginTop: "20px",
        width: "800px",
    },


});

const Per: React.FC = () => {
    const classes = useStyles();
    const [isPrimaryView, setIsPrimaryView] = React.useState(true);
    const [postCount, setPostCount] = React.useState<number | null>(null);
    const [circleCount, setCircleCount] = React.useState<number | null>(null);
    const [totalLikes, setTotalLikes] = React.useState<number | null>(null);
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const [imageUrl, setImageUrl] = React.useState<string>("");

    const handleButtonClick = () => {
        const post = "true";
        localStorage.setItem("post", post);
        setIsPrimaryView(!isPrimaryView);
    };


    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                console.log("发出了请求"+ userId)
                const response = await fetch('http://127.0.0.1:7001/home/image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setImageUrl(data.imageUrl);
                } else {
                    console.error('Failed to fetch image URL');
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };
        fetchImageUrl();
    }, [userId]);


    const handleToggle = () => {
        updateCircleCount(userId);
    }



    // 更新加入的圈子数量
    const updateCircleCount = async (userId: number) => {

        try {
            const response = await fetch('http://127.0.0.1:7001/circle/user/count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                setCircleCount(data.data);
                console.log("删除重新渲染" + data.data)
            } else {
                console.error('Failed to fetch post count');
            }
        } catch (error) {
            console.error('Error fetching post count:', error);
        }
    };

    useEffect(() => {

        // 渲染发帖数
        const fetchPostCount = async () => {
            try {
                const response = await fetch('http://127.0.0.1:7001/post/user/count', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setPostCount(data.data);
                } else {
                    console.error('Failed to fetch post count');
                }
            } catch (error) {
                console.error('Error fetching post count:', error);
            }
        };



        fetchPostCount();

    }, [userId]);

    useEffect(() => {
        // 渲染加入过的兴趣圈数量
        const fetchCircleCount = async () => {

            try {
                const response = await fetch('http://127.0.0.1:7001/circle/user/count', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setCircleCount(data.data);
                } else {
                    console.error('Failed to fetch post count');
                }
            } catch (error) {
                console.error('Error fetching post count:', error);
            }
        };
        fetchCircleCount();
    }, [userId]);

    useEffect(() => {
        // 渲染发帖共计获赞数
        const fetchTotalLikes = async () => {
            try {

                const response = await fetch('http://127.0.0.1:7001/post/user/likes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setTotalLikes(data.data);
                } else {
                    console.error('Failed to fetch total likes');
                }
            } catch (error) {
                console.error('Error fetching total likes:', error);
            }
        };



        fetchTotalLikes();
    }, [userId]);



    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);



    return (
        <div>
            {isPrimaryView ? (
                <>
                    <div className={classes.container}>
                        <div className={classes.image}>
                            <Image
                                height={100}
                                width={100}
                                shape="circular"
                                src={imageUrl}
                                
                            />
                        </div>
                        <div className={classes.title}>
                            <div style={{ fontFamily: 'Comic Sans MS, sans-serif' }}>~~ Personal Page ~~</div>
                        </div>
                        <div className={classes.table}>
                            <table className={classes.tableElement}>
                                <thead>
                                    <tr>
                                        <th className={`${classes.tableCell2} ${classes.headerCell}`}>Posts<InfoLabel size="small"
                                            info={
                                                <>
                                                    It shows how many posts you have shared.
                                                </>
                                            }

                                        >
                                        </InfoLabel></th>
                                        <th className={`${classes.tableCell2} ${classes.headerCell}`}>Groups<InfoLabel size="small"
                                            info={
                                                <>
                                                    It shows how many groups you have joined.
                                                </>
                                            }

                                        >
                                        </InfoLabel></th>
                                        <th className={`${classes.tableCell2} ${classes.headerCell}`}>Likes<InfoLabel size="small"
                                            info={
                                                <>
                                                    It shows how many likes your posts have received.
                                                </>
                                            }

                                        >
                                        </InfoLabel></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className={`${classes.tableCell} ${classes.headerCell}`}>
                                            {postCount !== null ? postCount : 'Loading...'}
                                        </td>
                                        <td className={`${classes.tableCell} ${classes.headerCell}`}>
                                            {circleCount !== null ? circleCount : 'Loading...'}
                                        </td>
                                        <td className={`${classes.tableCell} ${classes.headerCell}`}>
                                            {totalLikes !== null ? totalLikes : 'Loading...'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={classes.diamondButton} onClick={handleButtonClick}>
                            <span className={classes.diamondButtonText}>+</span>
                        </div>

                    </div>

                    <div className={classes.hobbyTable}>
                        <Hobby_table onToggleView={handleToggle} />
                    </div>

                </>

                // 以上为渲染个人主页部分
            ) : (
                // 以下为渲染发表帖子部分

                <Pos />

            )}
        </div>
    );
};

export default Per;
