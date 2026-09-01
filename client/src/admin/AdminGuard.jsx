import { Navigate, useLocation } from "react-router-dom";
import useAdminAuth from "./useAdminAuth";

/**
 * Route gate for the panel.
 *
 * This is a convenience, not a security boundary: it only decides what to
 * render. Every /api/leads route independently verifies the JWT, so a user who
 * edits their way past this component still gets 401s and an empty screen.
 */
export default function AdminGuard({ children }) {
  const { user } = useAdminAuth();
  const location = useLocation();

  if (user === undefined) {
    return (
      <div
        className="grid min-h-[100svh] place-items-center bg-surface"
        role="status"
        aria-live="polite"
      >
        <span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
        <span className="sr-only">Checking your session…</span>
      </div>
    );
  }

  if (!user) {
    // `from` lets the login page send them back where they were aiming.
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
