import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Navbar from "../../../shared/components/Navbar";
import NewPostForm from "../../posts/components/NewPostForm";
import { fetchPosts } from "../store/postsSlice";
import PostCard from "../components/PostCard";

const Component = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, error, pagination } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Hero text */}
          <div className="text-center mb-8">
            <h1 className="text 3xl font-bold text-base-content mb-2">
              Keluhin aja di sini
            </h1>
            <p className="text-center text-base-content/60">
              Keluhin semuanya di sini secara anonym tanpa perlu ragu ada yang
              nyinyirin.
            </p>
          </div>

          {/* form ngeluh */}
          <NewPostForm />

          <div className="divider text-base-content/40 text-sm">
            Orang-orang ngeluhin
          </div>

          {/* loading state */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          )}

          {/* error state */}
          {!isLoading && !error && (
            <div className="flex flex-col gap-4">
              {posts.length === 0 ? (
                <div className="text-center py-12 text-base-content/40">
                  <p className="text-4xl mb-3">🌵</p>
                  <p>Belum ada yang ngeluh nih.</p>
                  <p className="text-sm">Ngeluh yukk</p>
                </div>
              ) : (
                posts.map((post) => <PostCard key={post._id} post={post} />)
              )}
            </div>
          )}

          {/* pagination  */}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => dispatch(fetchPosts(pagination.currentPage - 1))}
                className="btn btn-sm"
              >
                ← Sebelumnya
              </button>
              <span className="btn btn-sm btn-ghost no-animation">
                {pagination.currentPage} / {pagination.totalPages}
              </span>
              <button
                disabled={!pagination.hasNextPage}
                onClick={() => dispatch(fetchPosts(pagination.currentPage + 1))}
                className="btn btn-sm"
              >
                Berikutnya →
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export { Component };
