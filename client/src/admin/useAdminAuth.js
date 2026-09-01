import { useContext } from "react";
import { AdminAuthContext } from "./admin-auth-context";

export default function useAdminAuth() {
  return useContext(AdminAuthContext);
}
