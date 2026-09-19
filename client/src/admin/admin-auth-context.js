import { createContext } from "react";

/**
 * Session state for the admin panel.
 *
 * `user` is null when signed out and undefined while the initial /auth/me
 * probe is still running, because the guard needs to tell "not signed in" apart from
 * "not known yet", or it redirects to the login page on every reload.
 */
export const AdminAuthContext = createContext({
  user: undefined,
  signIn: async () => {},
  signOut: async () => {},
  refresh: async () => {},
});
