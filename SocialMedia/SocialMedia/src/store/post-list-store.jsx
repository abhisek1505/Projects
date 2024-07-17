import { createContext, useReducer } from "react";

export const PostLists = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

//USE REDUCER IS USED ONLY FOR LIST OF POSTS
const PostListsProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userID: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostLists.Provider
      value={{ postList: postList, addPost: addPost, deletePost: deletePost }}
    >
      {children}
    </PostLists.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "xyz",
    body: "xxxksss",
    reactions: 2,
    userID: "user-1",
    tags: ["xxx", "yyyy", "zzzzz"],
  },
  {
    id: "2",
    title: "xyzaa",
    body: "xxxksssaa",
    reactions: 10,
    userID: "user-2",
    tags: ["xxxaa", "yyyyaa", "zzzzzaa"],
  },
];

export default PostListsProvider;
