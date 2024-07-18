import * as React from "react";
import { Image, makeStyles, InfoLabel, InfoLabelProps, Link } from "@fluentui/react-components";
import { Card, CardHeader, CardPreview, CardFooter, Body1, Caption1, Button } from "@fluentui/react-components";
import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";
import { List, ListItem } from "@fluentui/react-list-preview";
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
        right: "70px",
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

const Per = () => {
    const classes = useStyles();
    const [isPrimaryView, setIsPrimaryView] = React.useState(true);

    const handleButtonClick = () => {
        setIsPrimaryView(!isPrimaryView);
    };

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
                                src="../../image/white.jpg"
                            />
                        </div>
                        <div className={classes.title}>
                            ~~ Personal Page ~~
                        </div>
                        <div className={classes.table}>
                            <table className={classes.tableElement}>
                                <thead>
                                    <tr>
                                        <th className={`${classes.tableCell2} ${classes.headerCell}`}>Posts</th>
                                        <th className={`${classes.tableCell2} ${classes.headerCell}`}>Groups</th>
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
                                        <td className={`${classes.tableCell} ${classes.headerCell}`}>Data 1</td>
                                        <td className={`${classes.tableCell} ${classes.headerCell}`}>Data 2</td>
                                        <td className={`${classes.tableCell} ${classes.headerCell}`}>Data 3</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={classes.diamondButton} onClick={handleButtonClick}>
                            <span className={classes.diamondButtonText}>+</span>
                        </div>

                    </div>

                    <div className={classes.hobbyTable}>
                        <Hobby_table />
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
