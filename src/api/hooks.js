// Data hooks: render the bundled fallback instantly, then swap in live
// backend content when it arrives. The site never blanks if the API is down.
import { useEffect, useState } from "react";
import { apiGet, apiGetAll } from "./client";

export function useApi(path, fallback = null) {
  const [state, setState] = useState({ data: fallback, loading: true, live: false });

  useEffect(() => {
    let active = true;
    setState({ data: fallback, loading: true, live: false });
    apiGet(path)
      .then((data) => active && setState({ data, loading: false, live: true }))
      .catch(() => active && setState((s) => ({ ...s, loading: false })));
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return state;
}

export function useApiAll(path, fallback = []) {
  const [state, setState] = useState({ data: fallback, loading: true, live: false });

  useEffect(() => {
    let active = true;
    setState({ data: fallback, loading: true, live: false });
    apiGetAll(path)
      .then((data) => active && setState({ data, loading: false, live: true }))
      .catch(() => active && setState((s) => ({ ...s, loading: false })));
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return state;
}
