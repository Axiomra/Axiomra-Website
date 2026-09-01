import { useCallback, useEffect, useMemo, useState } from "react";
import { adminAuth } from "../lib/adminApi";
import { AdminAuthContext } from "./admin-auth-context";

/**
 * Holds the admin session. There is no token to keep: the cookie is httpOnly,
 * so the only way to know whether a session exists is to ask the server.
 */
export default function AdminAuthProvider({ children }) {
  // undefined = probe in flight, null = signed out, object = signed in.
  const [user, setUser] = useState(undefined);

  const probe = useCallback(
    (signal) =>
      adminAuth
        .me(signal)
        .then((data) => {
          setUser(data.user);
          return data.user;
        })
        .catch((err) => {
          if (err?.name === "AbortError") return undefined;
          // A 401 here is the normal signed-out case, not an error worth surfacing.
          setUser(null);
          return null;
        }),
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    probe(controller.signal);
    return () => controller.abort();
  }, [probe]);

  const signIn = useCallback(async (email, password) => {
    const data = await adminAuth.login(email, password);
    setUser(data.user);
    return data.user;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await adminAuth.logout();
    } finally {
      // Clear locally even if the request failed: the cookie may already be
      // gone, and leaving a stale user on screen is worse than a spurious
      // sign-out.
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, signIn, signOut, refresh: probe }),
    [user, signIn, signOut, probe]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
