import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/store/authSlice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "sunset";
  });

  useEffect(() => {
    const theme = isDark ? "sunset" : "caramellatte";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-50">
      {/* Kiri: Logo */}
      <div className="flex-1">
        <a href="/" className="text-xl font-bold text-primary">
          Keluhin
        </a>
      </div>

      {/* Kanan Menu */}

      <div className="flex items-center gap-3">
        {/* toogle tema */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={isDark}
            onChange={() => setIsDark(!isDark)}
          />
          {/* Icon matahari — light mode */}
          <svg
            className="swap-off w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7,5,6.34A1,1,0,0,0,3.51,7.76L4.22,8.46A1,1,0,0,0,5.64,7ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Zm6.36-9.36a1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0l-.71.71A1,1,0,0,0,17.66,7Z" />
          </svg>
          {/* Icon bulan — dark mode */}
          <svg
            className="swap-on w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {/* Kalau sudah login muncul avatar dan logout */}

        {isAuthenticated && user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder:"
            >
              <div className="bg-primary text-primary-content rounded-full w-9">
                <span className="text-sm">{user.anonymousId.charAt(0)}</span>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt=3 w-52 p-2 shadow"
            >
              <li className="menu-title">
                <span className="text-xs opacity-60"> {user.anonymousId}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <a href="/login" className="btn btn-primary btn-sm">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
