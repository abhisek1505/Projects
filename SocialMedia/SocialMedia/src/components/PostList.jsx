import { useContext } from "react";
import Posts from "./Posts";
import { PostLists } from "../store/post-list-store";

const PostList = () => {
  const { postList } = useContext(PostLists);
  return (
    <>
      {postList.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
