// 该文件渲染兴趣圈列表

import { List, ListItem } from "@fluentui/react-list-preview";
import * as React from "react";
import Hob from './hobby.tsx';

import { makeStyles } from "@fluentui/react-components";



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

        height: "calc(100vh - 200px)",
    },
});


interface Profile {
    id: number;
    name: string;
    author_id: number;
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



    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:7001/circle');
            const data = await response.json();
            console.log('Fetched data:', data);
            setProfiles(data.data); // 确保 data 包含在 data 属性中
            setLoading(false);
        };

        fetchData();
    }, []);


    if (loading) return <div>Loading...</div>;


    return (
        <List className={classes.list} navigationMode="items">
            {profiles.map((profile) => (
                <ListItem
                    className={classes.card}
                    key={profile.id}
                >
                    <Hob
                        title={profile.name}
                        author_id={profile.author_id}
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
