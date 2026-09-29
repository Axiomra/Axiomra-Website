import { useEffect, useState } from "react";

/**
 * False on the server and during hydration, true from the first effect on.
 * For things that only exist in the browser (portals to <body>), so the
 * prerendered HTML and the hydrating render agree.
 */
export default function useMounted() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one render after hydration
  useEffect(() => setMounted(true), []);
  return mounted;
}
