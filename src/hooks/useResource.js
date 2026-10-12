import { useEffect, useState } from "react";

export function useResource(loader, key = "") {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState(null);
  useEffect(() => {
    let active = true;
    Promise.resolve()
      .then(() => loader(key))
      .then(
        (data) => {
          if (active) setState({ key, attempt, data, error: null });
        },
        (error) => {
          if (active) setState({ key, attempt, data: null, error });
        },
      );
    return () => {
      active = false;
    };
  }, [loader, key, attempt]);
  const current = state?.key === key && state?.attempt === attempt;
  return {
    data: current ? state.data : null,
    previousData: state?.data ?? null,
    error: current ? state.error : null,
    loading: !current,
    retry: () => setAttempt((value) => value + 1),
  };
}
