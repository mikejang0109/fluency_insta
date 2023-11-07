import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PostCard from "../../components/postCard/post-card";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/post/postActions";
import UnfollowedUsers from "../../components/unfollowedUsers/UnfollowedUsers";

const Home = () => {
  const { posts } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    // window.location.reload();
    dispatch(getPosts());
  }, [posts]);
  return (
    <Box
      width={"65%"}
      display="flex"
      marginLeft="auto"
      justifyContent={"space-between"}
    >
      <Box display={"flex"} flexDirection={"column"} gap="1.5rem">
        {posts?.map((post) => {
          return <PostCard key={post._id} {...post} />;
        })}
      </Box>
      <UnfollowedUsers />
    </Box>
  );
};

export default Home;
