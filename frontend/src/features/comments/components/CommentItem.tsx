import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteComment } from "../store/commentSlice";
import type { Comment } from "../../../shared/types/api.types";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOwner = user && comment.userId === user._id;

  const handleDelete = () => {
    if (confirm("yakin mau menghapus?")) {
      dispatch(deleteComment(comment._id));
    }
  };

  return (
    <>
      <div className="flex gap-3 py-3 border-b border-base-200 last:border-0">
        {/* avatar */}
        <div className="avatar placeholder shrink-0">
          <div className="bg-secondary/10 text-secondary rounded-full w-8 flex items-center justify-center">
            <span className="text-xs font-bold">
              {comment.anonymousLabel.charAt(0)}
            </span>
          </div>
        </div>

        {/* comment content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-base-content/70">
              {comment.anonymousLabel}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-base-content/40">
                {formatDate(comment.createdAt)}
              </span>

              {/* tombol delete muncul untuk pemilik comment */}
              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="btn btn-ghost btn-xs text-error"
                >
                  hapus
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-base-content">{comment.content}</p>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
