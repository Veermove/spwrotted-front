import { FC, useState } from "react";
import { useQuery } from "react-query";
import { getPostsPagin } from "../../utils/EntityStoreClient";
import { Post } from "../../utils/Post";
import { Dashboard } from "./Dashboard";

export const MainColumn: FC<{
}> = ({}) => {

    const [lastPost, setLastPost] = useState<Post | undefined>(undefined);

    // #TODO posts should be queired based on currently selected tags
    const [searchTags, setSearchTags] = useState<string[]>([]);

    const {
        isLoading,
        isError,
        data
    } = useQuery(
        ["posts", searchTags],
        () => {
            return getPostsPagin(undefined)
                .then((posts) => {
                    setLastPost(posts[posts.length - 1]);
                    return posts;
                })
        },
        { keepPreviousData: true }
    );

    return <>
        <Dashboard
            data={data}
            isLoading={isLoading}
            isError={isError}
        />
    </>
}
