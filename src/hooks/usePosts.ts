import { useSelector } from "react-redux";
import {
  selectPosts,
  selectUserPosts,
  selectIsLoading,
  selectIsUpdateLoading,
  selectError,
} from "../redux/posts/selectors";

const usePosts = () => {
  const posts = useSelector(selectPosts);
  const userPosts = useSelector(selectUserPosts);
  const isPostsLoading = useSelector(selectIsLoading);
  const isPostUpdateLoading = useSelector(selectIsUpdateLoading);
  const postsError = useSelector(selectError);

  return { posts, userPosts, isPostsLoading, isPostUpdateLoading, postsError };
};

export default usePosts;
