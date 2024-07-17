import * as React from "react";
import { Image, makeStyles } from "@fluentui/react-components";
import { Card, CardHeader, CardPreview, CardFooter, Body1, Caption1, Button } from "@fluentui/react-components";
import { ArrowReplyRegular, ShareRegular } from "@fluentui/react-icons";
import { List, ListItem } from "@fluentui/react-list-preview";
import Hobby_table from './hobby_table.tsx'

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
        position: "absolute",
        left: "1000px",
        width: "40px",
        height: "40px",
        backgroundColor: "#7579eb",
        transform: "rotate(45deg)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        cursor: "pointer",
    },
    diamondButtonText: {
        position: "absolute",
        fontSize: "28px",
        top: "50%",
        left: "50%",
        transform: "translate(-60%, -60%) rotate(-45deg)", // 调整十字中心位置
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
                                        <th className={`${classes.tableCell2} ${classes.headerCell}`}>Num of Pos</th>
                                        <th className={`${classes.tableCell2} ${classes.headerCell}`}>Num of Grp</th>
                                        <th className={`${classes.tableCell2} ${classes.headerCell}`}>Num of Likes</th>
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

                <div className={classes.title}>
                    ~~~~ Primary School ~~~~
                </div>
            )}
        </div>
    );
};

export default Per;
