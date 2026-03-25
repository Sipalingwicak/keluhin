import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { likePost, dislikePost } from "../store/postsSlice";
import type { Post } from "../../../shared/types/api.types";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      alert("kamu harus login sebelum like");
      return;
    }
    dispatch(likePost(post._id));
  };

  const handleDislike = () => {
    if (!isAuthenticated) {
      alert("kamu harus login sebelum dislike");
      return;
    }
    dispatch(dislikePost(post._id));
  };

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="card-body gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="avater placeholder">
              <div className="bg-primary/10 text-primary rounded-full w-8">
                <span className="text-sm font-bold">
                  {post.anonymousLabel.charAt(0)}
                </span>
              </div>
            </div>
            <span className="text-sm font-medium text-base-content/70">
              {post.anonymousLabel}
            </span>
          </div>
          <span className="text-xs text-base-content/40">
            {formatDate(post.createdAt)}
          </span>
        </div>
        {/* keluhan */}
        <p className="text-base-content leading-relaxed">{post.content}</p>

        {/* footer like, dislike, comment */}
        <div className="flex items-center gap-4 pt-2 border-t border-base-200">
          {/* like button */}
          <button
            onClick={handleLike}
            className="btn btn-ghost btn-sm gap-1 text-base-content/60 hover:text-succes"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span>{post.likes.length}</span>
          </button>

          {/* dislike button */}
          <button
            onClick={handleDislike}
            className="btn btn-ghost btn-sm gap-1 text-base-content/60 hover:text-error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
              />
            </svg>
            <span>{post.dislikes.length}</span>
          </button>

          {/* Comment count */}

          <a
            href={`/posts/${post._id}`}
            className="btn btn-ghost btn-sm gap-1 text-base-content/60 hover:text-primary ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{post.commentsCount} komentar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
