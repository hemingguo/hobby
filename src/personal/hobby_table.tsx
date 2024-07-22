// 该文件渲染已加入的兴趣圈列表

import * as React from "react";
import {
    FolderRegular,
    EditRegular,
    OpenRegular,
    DocumentRegular,
    PeopleRegular,
    DocumentPdfRegular,
    VideoRegular,
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
    PresenceBadgeStatus,
    Avatar,
    Button,
    useArrowNavigationGroup,
    useFocusableGroup,
} from "@fluentui/react-components";
import View from "./smallview";


const items = [
    {
        name: { label: "Game", icon: <DocumentRegular /> },
        creator: { label: "Max Mustermann", status: "available" },
        totalNumber: { label: "7", timestamp: 1 },
        activeNumber: {
            label: "6",
            icon: <EditRegular />,
        },
        nsrc: "../../image/white.jpg",
        psrc: "../../image/white.jpg",
    },
    {
        name: { label: "Sports", icon: <FolderRegular /> },
        creator: { label: "Erika Mustermann", status: "busy" },
        totalNumber: { label: "4", timestamp: 2 },
        activeNumber: {
            label: "0",
            icon: <OpenRegular />,
        },
        nsrc: "../../image/white.jpg",
        psrc: "../../image/white.jpg",
    },
    {
        name: { label: "Painting", icon: <VideoRegular /> },
        creator: { label: "John Doe", status: "away" },
        totalNumber: { label: "8", timestamp: 2 },
        activeNumber: {
            label: "4",
            icon: <OpenRegular />,
        },
        nsrc: "../../image/white.jpg",
        psrc: "../../image/white.jpg",
    },
    {
        name: { label: "Music", icon: <DocumentPdfRegular /> },
        creator: { label: "Jane Doe", status: "offline" },
        totalNumber: { label: "20", timestamp: 3 },
        activeNumber: {
            label: "14",
            icon: <PeopleRegular />,
        },
        nsrc: "../../image/white.jpg",
        psrc: "../../image/white.jpg",
    },
];

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
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    activeNumber: {
        color: "#41D800",
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    totalNumber: {
        color: "#ff9de2",
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    name: {
        color: "#530FAD",
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift
    },
    people: {
        color: " #0B61A4",
        fontFamily: "Bahnschrift", // 设置字体为 Bahnschrift

    },
    button: {
        color: "#FF9200"
    },
    row: {
        //
    }

})

const Hobby_table = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
    const focusableGroupAttr = useFocusableGroup({
        tabBehavior: "limited-trap-focus",
    });
    const handleJump = () => {
        setValue(2);
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
                        {items.map((item) => (
                            <TableRow key={item.name.label} className={classes.row}>

                                <TableCell tabIndex={0} role="gridcell">
                                    <TableCellLayout className={classes.name} media={
                                        <Avatar
                                            shape="square"
                                            image={{ src: item.nsrc }}
                                            aria-label={item.creator.label}
                                            name={item.creator.label}

                                        />
                                    }>
                                        {item.name.label}
                                    </TableCellLayout>
                                </TableCell>

                                <TableCell tabIndex={0} role="gridcell">
                                    <TableCellLayout
                                        className={classes.people}
                                        media={
                                            <Avatar
                                                image={{ src: item.psrc }}
                                                aria-label={item.creator.label}
                                                name={item.creator.label}
                                                badge={{
                                                    status: item.creator.status as PresenceBadgeStatus,
                                                }}
                                            />
                                        }
                                    >
                                        {item.creator.label}
                                    </TableCellLayout>
                                </TableCell>

                                <TableCell tabIndex={0} role="gridcell" className={classes.totalNumber}>
                                    {item.totalNumber.label}
                                </TableCell>

                                <TableCell tabIndex={0} role="gridcell" className={classes.activeNumber}>
                                    {item.activeNumber.label}
                                </TableCell>

                                <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                                    <TableCellLayout>
                                        <Button appearance="transparent" className={classes.button} onClick={handleJump} icon={<ArrowForwardRegular />} aria-label="Look" />
                                        <Button appearance="transparent" className={classes.button} icon={<DeleteRegular />} aria-label="Delete" />
                                    </TableCellLayout>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                : <View onToggleView={() => setValue(1)} />
            }
        </>
    );
};

export default Hobby_table;
