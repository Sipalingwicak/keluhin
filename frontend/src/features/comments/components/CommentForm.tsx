import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createComment } from "../store/commentSlice";

interface CommentFormProps {
  postId: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.comments);
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }
    await dispatch(createComment({ postId, content: content.trim() }));
    setContent("");
  };

  if (!isAuthenticated) {
    return (
      <div className="alert mt-4">
        <span className="text-sm">
          <a href="/login" className="text-primary font-medium">
            Login
          </a>{" "}
          dulu untuk bisa berkomentar!
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mt-4">
      {/* Avatar */}
      <div className="avatar placeholder shrink-0">
        <div className="bg-primary/10 text-primary rounded-full w-8 flex items-center justify-center">
          <span className="text-xs font-bold">
            {user?.anonymousId.charAt(0)}
          </span>
        </div>
      </div>

      {/* input */}
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          placeholder="Tulis komentar..."
          className="input input-bordered input-sm flex-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          maxLength={300}
        />
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || isLoading}
          className="btn btn-primary btn-sm"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            "Kirim"
          )}
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
