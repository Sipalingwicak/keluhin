import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchPostById } from "../store/postsSlice";
import {
  fetchComments,
  clearComments,
} from "../../comments/store/commentSlice";
import Navbar from "../../../shared/components/Navbar";
import CommentItem from "../../comments/components/CommentItem";
import CommentForm from "../../comments/components/CommentForm";

const Component = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedPost, isLoading: postLoading } = useAppSelector(
    (state) => state.posts
  );

  const { comments, isLoading: commentsLoading } = useAppSelector(
    (state) => state.comments
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
      dispatch(fetchComments(id));
    }
    return () => {
      dispatch(clearComments());
    };
  }, [id, dispatch]);

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
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* tombol back */}
        <a href="/" className="btn btn-ghost btn-sm mb-4 gap-1">
          ← Kembali
        </a>

        {/* loading */}
        {postLoading && (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {/* post Detail */}
        {!postLoading && selectedPost && (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body gap-4">
              {/* header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-primary/10 text-primary rounded-full w-9 flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {selectedPost.anonymousLabel.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-base-content/70">
                    {selectedPost.anonymousLabel}
                  </span>
                </div>
                <span className="text-xs text-base-content/40">
                  {formatDate(selectedPost.createdAt)}
                </span>
              </div>

              {/* isi post */}

              <p className="text-base-content leading-relaxed text-lg">
                {selectedPost.content}
              </p>

              {/* stats */}
              <div className="flex gap-4 text-sm text-base-content/50 pt-2 border-t border-base-200">
                <span>👍 {selectedPost.likes.length} like</span>
                <span>👎 {selectedPost.dislikes.length} dislike</span>
                <span>💬 {selectedPost.commentsCount} comments</span>
              </div>

              <div className="divider text-sm text-base-content/40">
                Komentar
              </div>

              {/* comment Form */}

              <CommentForm postId={selectedPost._id} />

              {/* commentLists */}
              {commentsLoading ? (
                <div className="flex justify-center py-6">
                  <span className="loading loading-spinner loading-md text-primary" />
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-6 text-base-content/40">
                  <p className="text-2xl mb-2">🦗</p>
                  <p className="text-sm">Belum ada komentar.</p>
                  <p className="text-sm">Jadilah yang pertama!</p>
                </div>
              ) : (
                <div>
                  {comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export { Component };
