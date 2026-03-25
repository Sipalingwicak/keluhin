// import {} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useEffect } from "react";
import { googleLogin } from "../store/authSlice";
import { GoogleLogin } from "@react-oauth/google";

const Component = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) return;
    dispatch(googleLogin(credentialResponse.credential));
  };

  const handleGoogleError = () => {
    console.error("Google login gagal");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-sm w-full max-w-sm">
        <div className="card-body items-center text-center gap-6">
          {/* logo & tagline */}
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">Keluhin</h1>
            <p className="text-base-content/60 text-sm">Ngeluh ga mesti ragu</p>
          </div>

          <div className="text-6xl">😮‍💨</div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-3 text-sm text-base-content/70">
              <span className="text-lg">👻</span>
              <span>Identitasmu tersembunyi sebagai Anonim</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-base-content/70">
              <span className="text-lg">💬</span>
              <span>Login buat ngelike dan comment</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-base-content/70">
              <span className="text-lg">📝</span>
              <span>Curhat gak mesti harus login</span>
            </div>

            <div className="divider text-xs text-base-content/40">
              Masuk dengan
            </div>

            {/* pesan error */}
            {error && (
              <div className="alert alert-error w-full">
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* loading state */}
            {isLoading ? (
              <span className="loading loading-spinner loading-md text-primary" />
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                text="signin_with"
              />
            )}

            <a
              href="/"
              className="text-sm text-base-content/40 hover:text-primary transition-colors"
            >
              ← Balik ke beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Component };
