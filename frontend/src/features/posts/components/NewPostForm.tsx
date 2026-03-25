import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createPost } from "../store/postsSlice";

const NewPostForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.posts);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [content, setContent] = useState("");

  const maxLength = 300;
  const remaining = maxLength - content.length;

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await dispatch(createPost(content.trim()));

    setContent("");
  };

  return (
    <div className="card bg-base-100 shadow-sm mb-6">
      <div className="card-body gap-3">
        {/* header */}
        <div className="flex items-center gap-2">
          <div className="avatar placeholder">
            <div className="bg-primary/10 text-primary rounded-full w-8 flex items-center justify-center">
              <span className="text-xs font-bold">
                {isAuthenticated && user ? user.anonymousId.charAt(0) : "?"}
              </span>
            </div>
          </div>
          <span className="text-sm text-base-content/60">
            {isAuthenticated && user
              ? user.anonymousId
              : "Anonim (belum login)"}
          </span>
        </div>
        <textarea
          className="textarea textarea-ghost w-full resize-none text-base focus:outline-none min-h-24"
          placeholder="Mau keluhin apa nih...."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxLength}
        />

        {/* footer */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs ${
              remaining < 100 ? "text-error" : "text-base-content/40"
            }`}
          >
            {remaining} karakter tersisa
          </span>

          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading}
            className="btn btn-primary btn-sm"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "Keluhin!"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
