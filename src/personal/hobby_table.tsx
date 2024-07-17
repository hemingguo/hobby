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

const items = [
    {
        name: { label: "Game", icon: <DocumentRegular /> },
        creator: { label: "Max Mustermann", status: "available" },
        totalNumber: { label: "7", timestamp: 1 },
        activeNumber: {
            label: "6",
            icon: <EditRegular />,
        },
    },
    {
        name: { label: "Sports", icon: <FolderRegular /> },
        creator: { label: "Erika Mustermann", status: "busy" },
        totalNumber: { label: "4", timestamp: 2 },
        activeNumber: {
            label: "0",
            icon: <OpenRegular />,
        },
    },
    {
        name: { label: "Painting", icon: <VideoRegular /> },
        creator: { label: "John Doe", status: "away" },
        totalNumber: { label: "8", timestamp: 2 },
        activeNumber: {
            label: "4",
            icon: <OpenRegular />,
        },
    },
    {
        name: { label: "Music", icon: <DocumentPdfRegular /> },
        creator: { label: "Jane Doe", status: "offline" },
        totalNumber: { label: "20", timestamp: 3 },
        activeNumber: {
            label: "14",
            icon: <PeopleRegular />,
        },
    },
];

const columns = [
    { columnKey: "name", label: "Name" },
    { columnKey: "creator", label: "Creator" },
    { columnKey: "totalNumber", label: "Total number" },
    { columnKey: "activeNumber", label: "Active number" },
    { columnKey: "actions", label: "Actions" },
];

const Hobby_table = () => {
    const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
    const focusableGroupAttr = useFocusableGroup({
        tabBehavior: "limited-trap-focus",
    });

    return (
        <Table
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
                        <TableHeaderCell key={column.columnKey}>
                            {column.label}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.name.label}>

                        <TableCell tabIndex={0} role="gridcell">
                            <TableCellLayout media={item.name.icon}>
                                {item.name.label}
                            </TableCellLayout>
                        </TableCell>

                        <TableCell tabIndex={0} role="gridcell">
                            <TableCellLayout
                                media={
                                    <Avatar
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

                        <TableCell tabIndex={0} role="gridcell">
                            {item.totalNumber.label}
                        </TableCell>

                        <TableCell tabIndex={0} role="gridcell">  
                                {item.activeNumber.label}
                        </TableCell>

                        <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                            <TableCellLayout>
                                <Button icon={<ArrowForwardRegular />} aria-label="Look" />
                                <Button icon={<DeleteRegular />} aria-label="Delete" />
                            </TableCellLayout>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default Hobby_table;
