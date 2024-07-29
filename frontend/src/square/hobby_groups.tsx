// 该文件渲染兴趣圈列表

import { List, ListItem } from "@fluentui/react-list-preview";
import * as React from "react";
import Hob from './hobby.tsx';

import { makeStyles } from "@fluentui/react-components";

const names = [
    "Melda Bevel",
    "Demetra Manwaring",
    "Eusebia Stufflebeam",
    "Israel Rabin",
    "Bart Merrill",
    "Sonya Farner",
];

const useStyles = makeStyles({
    card: {
        margin: "auto",
        width: "480px",
        maxWidth: "100%",
        borderRadius: "15px", // 设置圆角

        position: "relative",
        boxSizing: "border-box",
        marginTop: "50px",
        marginBottom: "10px",

    },
    list: {
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        maxHeight: "100%",
    },
});


interface Profile {
    id: number;
    name: string;
    author: string;
    description: string;
    created_at: string;
    updated_at: string;
    imageUrl: string;
}


interface HobGProps {
    onToggleView: () => void;
}

const HobG: React.FC<HobGProps> = ({ onToggleView }) => {
    const classes = useStyles();
    const [profiles, setProfiles] = React.useState<Profile[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);


    React.useEffect(() => {
        fetch('/api/profiles') // 替换为实际 API 路径
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProfiles(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <List className={classes.list} navigationMode="items">
            {profiles.map((profile) => (
                <ListItem
                    className={classes.card}
                    key={profile.id}
                >
                    <Hob
                        title={profile.name}
                        author={profile.author}
                        description={profile.description}
                        created={profile.created_at}
                        updated={profile.updated_at}
                        imageUrl={profile.imageUrl}
                        onToggleView={onToggleView} />
                </ListItem>
            ))}
        </List>
    );
};

export default HobG;
