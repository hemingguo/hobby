// 该文件渲染已加入的兴趣圈列表

import * as React from "react";
import {

    DeleteRegular,
    ArrowForwardRegular,
} from "@fluentui/react-icons";
import {
    makeStyles,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    
    Avatar,
    Button,
    useArrowNavigationGroup,
    useFocusableGroup,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogBody,
    DialogSurface,
} from "@fluentui/react-components";
import View from "./smallview";




const columns = [
    { columnKey: "name", label: "Name" },
    { columnKey: "creator", label: "Creator" },
    { columnKey: "totalNumber", label: "Total number" },
    { columnKey: "activeNumber", label: "Active number" },
    { columnKey: "actions", label: "Actions" },
];

const useStyles = makeStyles({
    column: {
        color: "	#FFA500",
        fontWeight: "bold",
        fontFamily: "Comic Sans MS", 
    },
    activeNumber: {
        color: "#41D800",
        fontFamily: "Comic Sans MS", 
    },
    totalNumber: {
        color: "#ff9de2",
        fontFamily: "Comic Sans MS", 
    },
    name: {
        color: "#530FAD",
        fontFamily: "Kaiti", 
    },
    people: {
        color: " #0B61A4",
        fontFamily: "Kaiti", 

    },
    button: {
        color: "#FF9200"
    },
    row: {
        //
    }

})

interface Item {
    _id: string;
    id: number;
    name: string;
    author_id: number;
    description: string;
    created_at: string;
    updated_at: string;
    users: number[];
    imageUrl: string;
    __v: number;
}
interface AuthorInfo {
    userId: number;
    image: string;
    username: string;
}

interface HobTProps {
    onToggleView: () => void;


}

const Hobby_table: React.FC<HobTProps> = ({ onToggleView }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
    const focusableGroupAttr = useFocusableGroup({
        tabBehavior: "limited-trap-focus",
    });
    const Id = localStorage.getItem("userId") || '';
    const userId = parseInt(Id, 10);
    // 获取用户加入的集合数据
    const [items, setItems] = React.useState<Item[]>([]);
  
    const [authorsInfo, setAuthorsInfo] = React.useState<{ [key: number]: AuthorInfo }>({});
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [activeUserCounts, setActiveUserCounts] = React.useState<{ [key: number]: number }>({});
    React.useEffect(() => {
        const fetchCircles = async () => {
            try {
                // 获取加入的兴趣圈
                const response = await fetch(`http://127.0.0.1:7001/circle/user/${userId}`);
                const data = await response.json();
                if (data.status === "success") {
                    setItems(data.data);
                    const authorIds = data.data.map((item: Item) => item.author_id);

                    fetchAuthorsInfo(authorIds);
                    fetchActiveUserCounts(data.data.map((item: Item) => item.id));
                } else {
                    console.error("Failed to fetch circles");
                }
            } catch (error) {
                console.error("Error fetching circles:", error);
            }
        };

        //获取兴趣圈的作者信息
        const fetchAuthorsInfo = async (authorIds: number[]) => {
            try {
                const response = await fetch(`http://127.0.0.1:7001/home/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userIds: authorIds }),
                });
                const data = await response.json();

                if (data.status === "success") {
                    // 直接将获取的数据设置到状态中
                    const authorsInfoMap: { [key: number]: AuthorInfo } = data.data;
                    
                    setAuthorsInfo(authorsInfoMap);
                   
                   
                } else {
                    console.error("Failed to fetch authors info");
                }
            } catch (error) {
                console.error("Error fetching authors info:", error);
            }
        };

        // 获取每个圈子的活跃人数
        const fetchActiveUserCounts = async (circleIds: number[]) => {
            try {
                const counts = await Promise.all(circleIds.map(async (circleId) => {
                    const response = await fetch(`http://127.0.0.1:7001/circle/activeUserCount?circle_id=${circleId}`);
                    const data = await response.json();
                    return { circleId, count: data.count };
                }));
                const countsMap = counts.reduce((acc: { [key: number]: number }, item) => {
                    acc[item.circleId] = item.count;
                    return acc;
                }, {});
                console.log('aaaaaa:', JSON.stringify(countsMap, null, 2));
                setActiveUserCounts(countsMap);
            } catch (error) {
                console.error("Error fetching active user counts:", error);
            }
        };

        fetchCircles();
    }, [userId]);

    // 用户要查看的兴趣圈id
    
    const handleJump = (id: number) => {
        setSelectedId(id);
        setValue(2);
        
    };

    // 退出兴趣圈
    const handleDelete = async (id: number) => {
        const currentItemId = id;

        if (currentItemId !== null) {
            try {
                const response = await fetch(`http://127.0.0.1:7001/circle/removeUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            id: currentItemId,
                            userId: userId,
                        }
                    ),
                });
                const data = await response.json();
                if (data.status === "success") {
                    setItems(items.filter(item => item.id !== currentItemId));

                    onToggleView();
                } else {
                    console.error("Failed to delete user from circle");
                }
            } catch (error) {
                console.error("Error deleting user from circle:", error);
            }
        };
    }

    return (
        <>
            {value === 1
                ? <Table
                    {...keyboardNavAttr}
                    role="grid"
                    aria-label="Table with grid keyboard navigation"
                    style={{ minWidth: "620px" }}
                >
                    <TableHeader>
                        <TableRow >
                            <TableHeaderCell
                                style={{ fontWeight: "bold", color: "#da3b01" }}
                            >
                                Joined & Created
                            </TableHeaderCell>
                        </TableRow>
                        <TableRow appearance="brand">
                            {columns.map((column) => (
                                <TableHeaderCell className={classes.column} key={column.columnKey}>
                                    {column.label}
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index} className={classes.row}>

                                <TableCell tabIndex={0} role="gridcell">
                                    <TableCellLayout className={classes.name} media={
                                        <Avatar
                                            shape="square"
                                            image={{ src: item.imageUrl }}
                                            name={item.name}

                                        />
                                    }>
                                        {item.name}
                                    </TableCellLayout>
                                </TableCell>

                                <TableCell tabIndex={0} role="gridcell">
                                    <TableCellLayout
                                        className={classes.people}
                                        media={
                                            <Avatar
                                                image={{ src: authorsInfo[item.author_id] ? authorsInfo[item.author_id].image : '' }}


                                            // TODO badge={{
                                            //     status: item.creator.status as PresenceBadgeStatus,
                                            // }}
                                            />
                                        }
                                    >
                                        {authorsInfo[item.author_id] ? (
                                            authorsInfo[item.author_id].username
                                        ) : (
                                            "Loading..."  // 数据尚未加载完成时显示的内容
                                        )}
                                    </TableCellLayout>
                                </TableCell>

                                <TableCell tabIndex={0} role="gridcell" className={classes.totalNumber}>
                                    {item.users.length}
                                </TableCell>

                                <TableCell tabIndex={0} role="gridcell" className={classes.activeNumber}>
                                    {activeUserCounts[item.id]}
                                </TableCell>

                                <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                                    <TableCellLayout>
                                        <Button appearance="transparent" className={classes.button} onClick={() => handleJump(item.id)} icon={<ArrowForwardRegular />} aria-label="Look" />
                                        <Dialog>
                                            <DialogTrigger disableButtonEnhancement>
                                                <Button appearance="transparent" className={classes.button} icon={<DeleteRegular />} aria-label="Delete" />
                                            </DialogTrigger>
                                            <DialogSurface>

                                                <DialogBody>
                                                    <DialogTitle>Confirm</DialogTitle>

                                                    <DialogContent>
                                                        Are you sure you want to delete this interest group?
                                                    </DialogContent>

                                                    <DialogActions>

                                                        <DialogTrigger disableButtonEnhancement>
                                                            <Button onClick={() => handleDelete(item.id)} appearance="primary">Yes</Button>
                                                        </DialogTrigger>
                                                        <DialogTrigger disableButtonEnhancement>
                                                            <Button appearance="secondary">Not yet</Button>
                                                        </DialogTrigger>


                                                    </DialogActions>
                                                </DialogBody>

                                            </DialogSurface>
                                        </Dialog>

                                    </TableCellLayout>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                : <View onToggleView={() => setValue(1)} id={selectedId} />
            }

        </>
    );
};

export default Hobby_table;
